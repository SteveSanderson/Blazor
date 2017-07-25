using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.ResponseCompression;
using Blazor.Host;

namespace ConferencePlanner.FrontEnd.Server
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
                {
                    "application/octet-stream"
                });
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // All other requests handled by serving the SPA
            app.UseBlazorUI(Path.Combine("..", "ConferencePlanner.FrontEnd"), opts =>
            {
                opts.EnableServerSidePrerendering = true;
                opts.ClientAssemblyName = "ConferencePlanner.FrontEnd.dll";
            });
        }
    }
}
