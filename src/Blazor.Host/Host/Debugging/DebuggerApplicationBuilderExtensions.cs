using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using System.Net.WebSockets;
using System.Threading;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;
using System.IO;
using Blazor.Sdk.Host;

namespace Blazor.Host.Debugging
{
    public static class DebuggerApplicationBuilderExtensions
    {
        public static void UseBlazorDebugServer(
            this IApplicationBuilder applicationBuilder,
            string clientBinDir,
            string clientViewsAssemblyName)
        {
            applicationBuilder.UseRouter(router =>
            {
                // So that the Blazor debugger's debug-targets-discovery mechanism can determine
                // this site is exposing the Blazor debugger, respond to an OPTIONS request in a
                // special way. This isn't going to work if the site isn't hosted at the root
                // of the URL space, so might need some other discovery mechanism.
                router.MapVerb("options", "__v8debugger", context =>
                {
                    context.Response.StatusCode = 200;
                    context.Response.Headers.Add("blazor-debugger", "true");
                    return Task.CompletedTask;
                });

                router.MapGet("__v8debugger", async context =>
                {
                    // It's important that we don't accept remote connections to this endpoint, because
                    // it proxies arbitrary V8 debugger endpoints on the local machine. Even behind a
                    // corporate firewall, you wouldn't want coworkers to be able to connect a debugger
                    // to your web browser and inspect/modify it. I'm not sure whether this will cause
                    // trouble if running in Docker, so we might need to allow opting out of this check.
                    if (!ConnectionIsLocal(context))
                    {
                        context.Response.StatusCode = 401;
                        await context.Response.WriteAsync("Only local connections are accepted");
                        return;
                    }

                    if (!context.WebSockets.IsWebSocketRequest)
                    {
                        context.Response.StatusCode = 400;
                        return;
                    }

                    if (!context.Request.Query.TryGetValue("browserSocket", out var browserDebugSocketUrl))
                    {
                        context.Response.StatusCode = 400;
                        await context.Response.WriteAsync("The 'browserSocket' query string parameter must be provided.");
                        return;
                    }

                    using (var ideSocket = await context.WebSockets.AcceptWebSocketAsync())
                    using (var orchestrator = new V8DebugOrchestrator())
                    {
                        var applicationPortNumber = GetPortNumber(context.Request);
                        await orchestrator.ConnectAsync(ideSocket, browserDebugSocketUrl, clientBinDir, clientViewsAssemblyName);
                        await orchestrator.Run(context.RequestAborted);

                        try
                        {
                            await ideSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Finished", CancellationToken.None);
                        }
                        catch (WebSocketException)
                        {
                        }
                    }
                });
            });
        }

        public static void UseWdbServer(this IApplicationBuilder applicationBuilder, string rootDir, string clientBinDir)
        {
            applicationBuilder.Use((context, next) =>
            {
                var pathString = context.Request.Path.Value;
                if (pathString.EndsWith(".wdb"))
                {
                    context.Response.ContentType = "application/octet-stream";

                    var pdbFilename = Path.Combine(clientBinDir, Path.ChangeExtension(Path.GetFileName(pathString), "pdb"));
                    if (File.Exists(pdbFilename))
                    {
                        using (var peStream = File.OpenRead(Path.ChangeExtension(pdbFilename, "dll")))
                        using (var pdbStream = File.OpenRead(pdbFilename))
                        {
                            WdbWriter.WriteSequencePointsToFile(peStream, pdbStream, context.Response.Body);
                        }
                    }
                    else if (context.Request.Query["type"] == "razorviews")
                    {
                        // Use the in-memory compiled views
                        var compiledAssembly = RazorCompilation.GetCompiledViewsAssembly(rootDir, context.Request);
                        using (var peStream = new MemoryStream(compiledAssembly.Item1))
                        using (var pdbStream = new MemoryStream(compiledAssembly.Item2))
                        {
                            WdbWriter.WriteSequencePointsToFile(peStream, pdbStream, context.Response.Body);
                        }
                    }
                    else
                    {
                        // If we lack a PDB file, just serve an empty .wdb so it's not a runtime error
                        // The effect will be that you can't set breakpoints on this file or step into it.
                        context.Response.Body.WriteByte(0);
                    }

                    return Task.CompletedTask;
                }

                return next();
            });
        }

        private static bool ConnectionIsLocal(HttpContext context)
        {
            // TODO: Verify this logic is secure
            var isLocalConection = context.Connection.RemoteIpAddress == null
                || context.Connection.RemoteIpAddress.Equals(context.Connection.LocalIpAddress)
                || IPAddress.IsLoopback(context.Connection.RemoteIpAddress);
            return isLocalConection;
        }

        private static int GetPortNumber(HttpRequest request)
        {
            var specificPort = request.Host.Port;
            if (specificPort.HasValue)
            {
                return specificPort.Value;
            }
            else
            {
                return request.Scheme == "https" ? 443 : 80;
            }
        }
    }
}
