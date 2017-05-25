using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Reflection;
using Microsoft.AspNetCore.StaticFiles;
using System.Net;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.ResponseCompression;
using System.Linq;

namespace Blazor.Sdk.Host
{
    internal class Startup
    {
        private readonly static Assembly _hostAssembly = typeof(Startup).GetTypeInfo().Assembly;
        private readonly static string _embeddedResourceProjectName = "Blazor.Host"; // Note: Not the same as _hostAssembly.Name
        private readonly static string _binDir = Path.Combine(Directory.GetCurrentDirectory(), "bin", "Debug", "netcoreapp1.0");

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[] {
                    "application/octet-stream"
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            app.UseDeveloperExceptionPage();
            app.UseResponseCompression();
            app.UseDefaultFiles();

            app.UseRazorCompilation();

            // For requests under /_framework, serve embedded resources
            var contentTypeProvider = new FileExtensionContentTypeProvider();
            contentTypeProvider.Mappings.Add(".dll", "application/octet-stream");
            contentTypeProvider.Mappings.Add(".exe", "application/octet-stream");
            contentTypeProvider.Mappings.Add(".wasm", "application/octet-stream");
            app.Map("/_framework", builder =>
            {
                builder.Run(async context =>
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
                        context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    }
                });
            });

            // For requests under /_bin, serve assemblies
            // Obviously there are significant security implications to making your bin dir world-readable
            // so this should be filtered to assemblies intended for client-side use
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(_binDir),
                RequestPath = new PathString("/_bin"),
                ContentTypeProvider = contentTypeProvider
            });

            app.UseLiveReloading();

            // SPA fallback routing - for requests that don't match physical files, and don't appear
            // to be attempts to fetch static files, map them all to /index.html
            app.Use((context, next) =>
            {
                var requestPath = context.Request.Path;
                var physicalFileExists = env.WebRootFileProvider.GetFileInfo(requestPath).Exists;
                if (!physicalFileExists && !IsStaticFileRequest(requestPath.Value))
                {
                    context.Request.Path = "/index.html";
                }
                return next();
            });

            app.UseStaticFiles();
        }

        private static bool IsStaticFileRequest(string path)
        {
            var lastSlash = path.LastIndexOf('/');
            var lastDot = path.LastIndexOf('.');
            return lastDot > 0 && lastDot < path.Length - 1 && lastDot > lastSlash;
        }
    }
}
