using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging.Discovery
{
    public static class V8DebugTargetsEndpointExtensions
    {
        // TODO: Allow this to be changed at runtime (e.g., have a textbox you can type in
        // a different value then re-run the search for debug targets)
        const string browserDebuggerHost = "localhost:9222";

        static JsonSerializerSettings jsonSettings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            Formatting = Formatting.Indented
        };

        public static void UseV8DebugTargetsEndpoint(this IApplicationBuilder applicationBuilder)
        {
            // TODO: Support configuring this endpoint to listen on different ports
            var host = new WebHostBuilder()
                .UseSetting(nameof(WebHostBuilderIISExtensions.UseIISIntegration), false.ToString())
                .UseKestrel()
                .UseStartup<V8DebugTargetsEndpointStartup>()
                .UseUrls("http://localhost:9223")
                .Build();
            host.StartAsync();
        }

        class V8DebugTargetsEndpointStartup
        {
            public void ConfigureServices(IServiceCollection services)
            {
                services.AddRouting();
            }

            public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
            {
                loggerFactory.AddConsole();
                loggerFactory.AddDebug();
                app.UseDeveloperExceptionPage();

                app.UseRouter(router =>
                {
                    router.MapGet("", Home);
                    router.MapGet("json/{action?}", JsonList);
                });
            }

            public async Task Home(HttpContext context)
            {
                var endpoints = await GetDebuggableBlazorPagesOrShowErrorPage(context);
                if (endpoints != null)
                {
                    context.Response.ContentType = "text/html";
                    await context.Response.WriteAsync(
                        $"<style type='text/css'>" +
                        $"html {{ font-family: Helvetica, Arial, Sans-Serif; font-size: 13px;  }}" +
                        $".item {{ background-color: #f0f0f0; border-radius: 10px; padding: 12px 16px; margin-bottom: 4px; display: block; text-decoration: none; color: black; }}" +
                        $".item:hover {{ background-color: #e0e0e0; pointer: hand; }}" +
                        $".title {{ background-repeat: no-repeat; background-size: 16px; font-size: 15px; }}" +
                        $".title, .subtitle {{ margin: 4px 0px 0px 6px; overflow: hidden; padding-left: 20px; }}" +
                        $"</style>");
                    await context.Response.WriteAsync("<h2>Choose browser tab to debug</h2>");

                    if (endpoints.Count == 0)
                    {
                        await context.Response.WriteAsync("<p><strong>Cannot find any inspectable Blazor pages in the browser.</strong></p><p>Ensure that:</p>");
                        await context.Response.WriteAsync(
                            $"<ol>" +
                            $"<li>You have your app opened in a tab in your debuggable Chrome instance</li>" +
                            $"<li>That tab does <strong>not</strong> have the browser DevTools opened in it, or any other debugger attached</li>" +
                            $"</ol>" +
                            $"<p>If you have only just detached a debugger or the DevTools, you may need to refresh this page.</p>");
                    }
                    else
                    {
                        foreach (var endpoint in endpoints)
                        {
                            await context.Response.WriteAsync(
                                $"<a class='item' href='{WebUtility.HtmlEncode(endpoint.DevToolsFrontendUrl)}'>" +
                                $"    <div class='title' style='background-image: url(\"{WebUtility.HtmlEncode(endpoint.FaviconUrl)}\")'>" +
                                $"        {WebUtility.HtmlEncode(endpoint.Title)}" +
                                $"    </div>" +
                                $"    <div class='subtitle'>" +
                                $"        {WebUtility.HtmlEncode(endpoint.Url)}" +
                                $"    </div>" +
                                $"</a>");
                        }
                    }
                }
            }

            public async Task JsonList(HttpContext context)
            {
                var endpoints = await GetDebuggableBlazorPagesOrShowErrorPage(context);
                if (endpoints != null)
                {
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(endpoints, jsonSettings));
                }
            }

            private async Task<IList<DebuggablePageInfo>> GetDebuggableBlazorPagesOrShowErrorPage(HttpContext context)
            {
                DebuggablePageInfo[] nativePageList;
                try
                {
                    nativePageList = await V8DebugTargetsUtil.GetDebuggablePages(browserDebuggerHost);
                }
                catch (HttpRequestException ex)
                {
                    // TODO: Obviously this could be much more useful, for example giving different launch examples
                    // depending on your host OS. And it could be visually better styled. We might be able to detect
                    // the actual path to your default Chrome executable, and even have a button that launches it
                    // with the correct args (by passing a message back to the Host code, that then launches it).
                    await context.Response.WriteAsync(
                        $"<style type='text/css'>font-family: Sans Serif;</style>" +
                        $"<h1>Can't connect to browser's debugger</h1>" +
                        $"<p>The request to <tt>http://{browserDebuggerHost}</tt> failed.</p>" +
                        $"<h3>This is probably because your browser was not launched with the debugging flag.</h3>" +
                        $"<p><strong>To fix this:</strong>" +
                        $"<ol>" +
                        $"<li>Close all instances of Chrome</l1>" +
                        $"<li>Launch a new Chrome instance from the command-line, passing the <tt>--remote-debugging-port=9222</tt> option</li>" +
                        $"</ol>" +
                        $"For example, run:" +
                        $"</p>" +
                        $"<p><tt style='border: 1px solid #ccc; background-color: #eee; padding: 3px 6px; margin: 20px;'>\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\" --remote-debugging-port=9222</tt></p>" +
                        $"<div style='color: gray; font-size: 0.7em; margin-top: 40px;'>" +
                        $"<h3>Underlying exception</h3>" +
                        $"<pre>{ex}</pre>" +
                        $"</div>");
                    return null;
                }

                var resultList = new List<DebuggablePageInfo>();
                var httpClient = new HttpClient();
                await Task.WhenAll(nativePageList.Select(nativePage =>
                    TryGetBlazorDebugTargetInfo(nativePage, httpClient).ContinueWith(task =>
                    {
                        var blazorDebugInfoOrNull = task.Result;
                        if (blazorDebugInfoOrNull != null)
                        {
                            lock (resultList)
                            {
                                resultList.Add(blazorDebugInfoOrNull);
                            }
                        }
                    })
                ));

                return resultList;
            }

            private static async Task<DebuggablePageInfo> TryGetBlazorDebugTargetInfo(DebuggablePageInfo debuggablePage, HttpClient httpClient)
            {
                try
                {
                    // It would be better if we knew the host/port of the target application, then we
                    // could just use that for filtering. But we don't - it's hard to get that info,
                    // especially when the app could be behind a reverse proxy (e.g., for IIS hosting).
                    //
                    // As a temporary approximation, start by filtering down just to 'localhost' (any port)
                    var url = new Uri(debuggablePage.Url);
                    if (url.Host != "localhost")
                    {
                        return null;
                    }

                    // Then, for each such candidate browser tab, verify it really has a Blazor debugger
                    // listening for connections.
                    var debugServerUrl = new Uri(url, "/__v8debugger");
                    var optionsRequest = new HttpRequestMessage(HttpMethod.Options, debugServerUrl);
                    var optionsResponse = await httpClient.SendAsync(optionsRequest);
                    var isBlazorTab = optionsResponse.StatusCode == HttpStatusCode.OK
                        && optionsResponse.Headers.Contains("blazor-debugger");
                    if (isBlazorTab)
                    {
                        var blazorDebuggerSocketUrl = $"{debugServerUrl.Host}:{debugServerUrl.Port}{debugServerUrl.AbsolutePath}?browserSocket={Uri.EscapeDataString(debuggablePage.WebSocketDebuggerUrl)}";
                        return new DebuggablePageInfo
                        {
                            Description = debuggablePage.Description,
                            DevToolsFrontendUrl = $"http://{browserDebuggerHost}/devtools/inspector.html?ws={blazorDebuggerSocketUrl}",
                            Id = debuggablePage.Id,
                            Title = debuggablePage.Title,
                            Type = debuggablePage.Type,
                            Url = debuggablePage.Url,
                            WebSocketDebuggerUrl = $"ws://{blazorDebuggerSocketUrl}"
                        };
                    }
                }
                catch (Exception)
                {
                }

                return null;
            }
        }
    }
}
