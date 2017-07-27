using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net.WebSockets;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Blazor.PdbReader;
using Blazor.Sdk.Host;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

namespace Blazor.Host
{
    public class BlazorUIOptions
    {
        public bool EnableServerSidePrerendering { get; set; }
        public bool EnableDeubugging { get; set; }
        public string ClientAssemblyName { get; set; }
    }

    public static class BlazorApplicationBuilderExtensions
    {
        private readonly static Assembly _hostAssembly = typeof(BlazorApplicationBuilderExtensions).GetTypeInfo().Assembly;
        private readonly static string _embeddedResourceProjectName = "Blazor.Host"; // Note: Not the same as _hostAssembly.Name

        public static IApplicationBuilder UseBlazorDebugger(this IApplicationBuilder app, string clientBinDir, string clientAssemblyName)
        {
            var clientAssemblyPath = Path.Combine(clientBinDir, clientAssemblyName);
            BlazorPdbReader.WriteSequencePointsToFile(clientAssemblyPath, Path.ChangeExtension(clientAssemblyPath, "wdb"));

            app.UseWebSockets();

            return app.UseRouter(routes =>
            {
                var sessions = new ConcurrentDictionary<string, DebugSession>();

                routes.MapGet("__debugger", async context =>
                {
                    // The debuggee is responsible for creating the session and the debuggee
                    // attaches to that session.
                    var sessionId = context.Request.Query["id"];
                    var isDebuggee = context.Request.Query.ContainsKey("d");
                    var isDebugger = !isDebuggee;

                    // No session id, this is a bad connection
                    if (string.IsNullOrEmpty(sessionId))
                    {
                        context.Response.StatusCode = 400;
                        return;
                    }

                    // If this client is the debugger and the session doesn't exist then
                    // fail
                    if (isDebugger && !sessions.ContainsKey(sessionId))
                    {
                        context.Response.StatusCode = 400;
                        return;
                    }

                    if (context.WebSockets.IsWebSocketRequest)
                    {
                        using (var ws = await context.WebSockets.AcceptWebSocketAsync())
                        {
                            if (!sessions.TryGetValue(sessionId, out var session))
                            {
                                Debug.Assert(isDebuggee, "Debuggee is the only one that can create a session");

                                // No session, this is the debuggee
                                session = new DebugSession
                                {
                                    Debuggee = ws,
                                    DebugeeSource = new CancellationTokenSource(),
                                    DebuggerSource = new CancellationTokenSource(),
                                    WaitForDebugger = new TaskCompletionSource<WebSocket>(),
                                    SessionId = sessionId
                                };

                                sessions[sessionId] = session;
                                var state = new DebugSession.State();

                                while (true)
                                {
                                    session.DebugeeSource = new CancellationTokenSource();

                                    var debugee = session.Debuggee;

                                    // Read from debuggee, send to debugger
                                    var completed = await DoProxy(debugee, session.WaitForDebugger.Task, state, session.DebugeeSource.Token);

                                    // The debuggee closed so shutdown the debugger because the session is toast
                                    if (debugee == completed)
                                    {
                                        // Kill the loop and remove the session from the list
                                        sessions.TryRemove(sessionId, out _);

                                        // Kill the session
                                        session.DebuggerSource.Cancel();
                                        break;
                                    }

                                    // Tell the client to reset it's state here since the debugger detached
                                }
                            }
                            else
                            {
                                Debug.Assert(isDebugger, "Debugger should be the one attaching");
                                var debugger = ws;

                                // We have a session, so connect!
                                if (!session.WaitForDebugger.TrySetResult(debugger))
                                {
                                    // RACE Condition: We're not using out 
                                    Debug.Fail("RACE Condition! We're not using the right debugger socket");
                                }

                                // Read from debugger, send to debuggee
                                var completed = await DoProxy(debugger, Task.FromResult(session.Debuggee), state: null, cancellationToken: session.DebuggerSource.Token);

                                if (completed == debugger)
                                {
                                    // Reset the tcs
                                    session.WaitForDebugger = new TaskCompletionSource<WebSocket>();

                                    // Cancel the debuggee so it stops trying to proxy to the old debugger socket
                                    session.DebugeeSource.Cancel();

                                    session.DebuggerSource = new CancellationTokenSource();
                                }
                                else
                                {
                                    // Something else ended the loop, so we need to send a close frame
                                    await debugger.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                                }
                            }
                        }
                    }
                    else
                    {
                        context.Response.StatusCode = 400;
                    }
                });
            });
        }

        private static async Task<WebSocket> DoProxy(
            WebSocket source,
            Task<WebSocket> destPromise,
            DebugSession.State state,
            CancellationToken cancellationToken)
        {
            var cumulative = new List<ArraySegment<byte>>();
            while (true)
            {
                byte[] data = new byte[4096];
                WebSocketReceiveResult result = null;

                var cancelledTask = Task.Delay(-1, cancellationToken);
                var sourceTask = state?.ReceiveResultTask != null ? state.ReceiveResultTask : source.ReceiveAsync(new ArraySegment<byte>(data), CancellationToken.None);

                var taskResult = await Task.WhenAny(cancelledTask, sourceTask);

                if (taskResult == cancelledTask)
                {
                    if (state != null)
                    {
                        state.ReceiveResultTask = sourceTask;
                    }
                    return null;
                }

                try
                {
                    result = await sourceTask;
                }
                catch (WebSocketException)
                {
                    // Likely a connection reset
                    return source;
                }
                finally
                {
                    if (state != null)
                    {
                        state.ReceiveResultTask = null;
                    }
                }

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await source.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                    return source;
                }

                var dest = await destPromise;

                cumulative.Add(new ArraySegment<byte>(data, 0, result.Count));

                if (result.EndOfMessage)
                {
                    var size = 0;
                    foreach (var chunk in cumulative)
                    {
                        size += chunk.Count;
                    }
                    var all = new byte[size];
                    int offset = 0;
                    foreach (var chunk in cumulative)
                    {
                        Buffer.BlockCopy(chunk.Array, chunk.Offset, all, offset, chunk.Count);
                        offset += chunk.Count;
                    }

                    try
                    {
                        await dest.SendAsync(new ArraySegment<byte>(all), WebSocketMessageType.Text, endOfMessage: true, cancellationToken: CancellationToken.None);
                    }
                    catch
                    {
                        return dest;
                    }
                    cumulative.Clear();
                }
            }
        }

        public static IApplicationBuilder UseBlazorUI(this IApplicationBuilder app, string rootPath, Action<BlazorUIOptions> configure = null)
        {
            var options = new BlazorUIOptions();
            if (configure != null)
            {
                configure(options);
            }

            var staticFilesRoot = Path.GetFullPath(Path.Combine(rootPath, "wwwroot"));
            var fileProvider = new PhysicalFileProvider(staticFilesRoot);

            var contentTypeProvider = new FileExtensionContentTypeProvider();
            contentTypeProvider.Mappings.Add(".dll", "application/octet-stream");
            contentTypeProvider.Mappings.Add(".exe", "application/octet-stream");
            contentTypeProvider.Mappings.Add(".wasm", "application/octet-stream");
            contentTypeProvider.Mappings[".wdb"] = "application/octet-stream";

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = fileProvider,
                // RequestPath = requestPath, // TODO: Allow mounting in subdir of URL space
                ContentTypeProvider = contentTypeProvider
            });

            app.UseRazorCompilation(rootPath);

            // For requests under /_framework, serve embedded resources
            app.Map("/_framework", frameworkBuilder =>
            {
                frameworkBuilder.Run(async context =>
                {
                    var pathValue = context.Request.Path.Value; // e.g., "/browser.js"
                    var resourceName = pathValue.Replace('/', '.');
                    var resourceStream = _hostAssembly.GetManifestResourceStream($"{_embeddedResourceProjectName}.wwwroot._framework{resourceName}");
                    if (resourceStream != null)
                    {
                        if (contentTypeProvider.TryGetContentType(pathValue, out var contentType))
                        {
                            context.Response.ContentType = contentType;
                        }
                        context.Response.ContentLength = resourceStream.Length;
                        await resourceStream.CopyToAsync(context.Response.Body);
                    }
                    else
                    {
                        context.Response.StatusCode = 404;
                    }
                });
            });

            // For requests under /_bin, serve assemblies from the client app's bin dir
            var clientBinDir = Path.GetFullPath(Path.Combine(rootPath, "bin", "Debug", "netcoreapp1.0"));

            if (!Directory.Exists(clientBinDir))
            {
                clientBinDir = Directory.GetCurrentDirectory();
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(clientBinDir),
                RequestPath = new PathString("/_bin"),
                ContentTypeProvider = contentTypeProvider
            });

            if (options.EnableDeubugging)
            {
                if (string.IsNullOrEmpty(options.ClientAssemblyName))
                {
                    throw new ArgumentException($"If {nameof(options.EnableDeubugging)} is true, then you must specify a value for {nameof(options.ClientAssemblyName)}.");
                }

                app.UseBlazorDebugger(clientBinDir, options.ClientAssemblyName);
            }

            app.UseLiveReloading();

            if (options.EnableServerSidePrerendering)
            {
                if (string.IsNullOrEmpty(options.ClientAssemblyName))
                {
                    throw new ArgumentException($"If {nameof(options.EnableServerSidePrerendering)} is true, then you must specify a value for {nameof(options.ClientAssemblyName)}.");
                }
                Prerendering.EnablePrerendering(rootPath, clientBinDir, options.ClientAssemblyName);
            }

            // SPA fallback routing - for requests that don't match physical files, and don't appear
            // to be attempts to fetch static files, map them all to /index.html
            app.Use(async (context, next) =>
            {
                var requestPath = context.Request.Path;
                if (!IsStaticFileRequest(requestPath.Value))
                {
                    if (options.EnableServerSidePrerendering)
                    {
                        var html = await Prerendering.PrerenderPage(rootPath, options.ClientAssemblyName, context);
                        context.Response.ContentType = "text/html";
                        await context.Response.WriteAsync(html);
                    }
                    else
                    {
                        // TODO: There's probably a better way to return this file using the static files middleware
                        context.Response.ContentType = "text/html";
                        await context.Response.SendFileAsync(Path.Combine(rootPath, "wwwroot", "index.html"));
                    }
                }
                else
                {
                    await next();
                }
            });

            return app;
        }

        private static bool IsStaticFileRequest(string path)
        {
            var lastSlash = path.LastIndexOf('/');
            var lastDot = path.LastIndexOf('.');
            return lastDot > 0 && lastDot < path.Length - 1 && lastDot > lastSlash;
        }

        private class DebugSession
        {
            public string SessionId { get; set; }
            public WebSocket Debuggee { get; set; }
            public CancellationTokenSource DebuggerSource { get; set; }
            public CancellationTokenSource DebugeeSource { get; set; }
            public TaskCompletionSource<WebSocket> WaitForDebugger { get; set; }

            public class State
            {
                public Task<WebSocketReceiveResult> ReceiveResultTask { get; set; }
            }
        }
    }
}
