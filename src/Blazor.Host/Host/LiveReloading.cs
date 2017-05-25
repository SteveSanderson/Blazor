using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Blazor.Sdk.Host
{
    internal static class LiveReloading
    {
        const string url = "/_reload";
        readonly static string heartbeatMessage = $"data: alive\n\n";
        readonly static string reloadMessage = $"data: reload\n\n";
        static CancellationTokenSource reloadCts = new CancellationTokenSource();

        internal static void RequestReload()
        {
            reloadCts.Cancel();
            reloadCts = new CancellationTokenSource();
        }

        public static void UseLiveReloading(this IApplicationBuilder builder)
        {
            builder.Use(async (context, next) =>
            {
                if (context.Request.Path != url)
                {
                    await next();
                }
                else
                {
                    // Note: listening for IApplicationLifetime events (e.g., ApplicationStopping) doesn't work,
                    // because when rebuilding an app running on IISExpress, the process is killed before it can
                    // handle any such events. Instead, will have client-side logic to watch for the EventStream
                    // being disconnected.
                    context.Response.ContentType = "text/event-stream";
                    while (!context.RequestAborted.IsCancellationRequested)
                    {
                        await context.Response.WriteAsync(heartbeatMessage);
                        await context.Response.WriteAsync(Environment.NewLine);
                        await Task.Delay(5000, reloadCts.Token);

                        if (reloadCts.IsCancellationRequested)
                        {
                            await context.Response.WriteAsync(reloadMessage);
                            await context.Response.WriteAsync(Environment.NewLine);
                        }
                    }
                }
            });
        }
    }
}
