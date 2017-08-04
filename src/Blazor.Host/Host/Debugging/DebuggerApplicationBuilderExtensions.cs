using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using System.Net.WebSockets;
using System.Threading;
using Microsoft.AspNetCore.Http;

namespace Blazor.Host.Debugging
{
    public static class DebuggerApplicationBuilderExtensions
    {
        public static void UseBlazorDebugServer(
            this IApplicationBuilder applicationBuilder,
            string clientBinDir,
            string browserDebugEndpointHost)
        {
            applicationBuilder.UseRouter(router =>
            {
                router.MapGet("__v8debugger", async context =>
                {
                    if (!context.WebSockets.IsWebSocketRequest)
                    {
                        context.Response.StatusCode = 400;
                        return;
                    }

                    using (var ideSocket = await context.WebSockets.AcceptWebSocketAsync())
                    using (var orchestrator = new V8DebugOrchestrator())
                    {
                        var applicationPortNumber = GetPortNumber(context.Request);
                        await orchestrator.ConnectAsync(ideSocket, browserDebugEndpointHost, applicationPortNumber, clientBinDir);
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
