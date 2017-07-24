using Blazor.Sdk.Host;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;

namespace Blazor.Host
{
    public class BlazorUIOptions
    {
        public bool EnableServerSidePrerendering { get; set; }
        public string ClientAssemblyName { get; set; }
    }

    public static class BlazorApplicationBuilderExtensions
    {
        private readonly static Assembly _hostAssembly = typeof(BlazorApplicationBuilderExtensions).GetTypeInfo().Assembly;
        private readonly static string _embeddedResourceProjectName = "Blazor.Host"; // Note: Not the same as _hostAssembly.Name

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
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(clientBinDir),
                RequestPath = new PathString("/_bin"),
                ContentTypeProvider = contentTypeProvider
            });

            app.UseLiveReloading();

            if (options.EnableServerSidePrerendering)
            {
                if (string.IsNullOrEmpty(options.ClientAssemblyName))
                {
                    throw new ArgumentException($"If {nameof(options.EnableServerSidePrerendering)} is true, then you must specify a value for {nameof(options.ClientAssemblyName)}.");
                }
                Prerendering.EnablePrerendering(clientBinDir, options.ClientAssemblyName);
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
    }
}
