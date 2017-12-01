using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

namespace Server
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<GzipCompressionProviderOptions>(config =>
            {
                config.Level = CompressionLevel.Optimal;
            });

            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.MimeTypes = new List<string>
                {
                    "text/html",
                    "text/css",
                    "application/octet-stream",
                    "application/javascript",
                    "font/woff2"
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            var fileProvider = new PhysicalFileProvider(Program.StaticFilesPath);
            var contentTypeProvider = new FileExtensionContentTypeProvider();
            contentTypeProvider.Mappings[".dll"] = "application/octet-stream";
            contentTypeProvider.Mappings[".mem"] = "application/octet-stream";
            contentTypeProvider.Mappings[".wasm"] = "application/octet-stream";

            app.UsePrecompressedStaticFiles(fileProvider, contentTypeProvider);
            app.MapWhen(ctx => !ctx.Items.ContainsKey("IsPrecompressed"), childBuilder =>
            {
                childBuilder.UseResponseCompression();

                childBuilder.UseDefaultFiles(new DefaultFilesOptions
                {
                    FileProvider = fileProvider
                });

                childBuilder.UseStaticFiles(new StaticFileOptions
                {
                    FileProvider = fileProvider,
                    ContentTypeProvider = contentTypeProvider
                });
            });
        }
    }
}
