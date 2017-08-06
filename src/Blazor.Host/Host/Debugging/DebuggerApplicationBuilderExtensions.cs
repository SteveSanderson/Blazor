using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using System.Net.WebSockets;
using System.Threading;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging
{
    public static class DebuggerApplicationBuilderExtensions
    {
        public static void UseBlazorDebugServer(
            this IApplicationBuilder applicationBuilder,
            string clientBinDir)
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
                        await orchestrator.ConnectAsync(ideSocket, browserDebugSocketUrl, clientBinDir);
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
