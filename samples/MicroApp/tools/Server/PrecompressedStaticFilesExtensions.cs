using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using System;
using System.IO;

namespace Server
{
    public static class PrecompressedStaticFilesExtensions
    {
        public static void UsePrecompressedStaticFiles(this IApplicationBuilder applicationBuilder,
            IFileProvider fileProvider, IContentTypeProvider contentTypeProvider)
        {
            applicationBuilder.Use(async (context, next) => {
                var reqPath = context.Request.Path;
                var fileOnDisk = fileProvider.GetFileInfo(reqPath + ".gz");
                if (fileOnDisk.Exists)
                {
                    Console.WriteLine($"Serving {fileOnDisk.PhysicalPath}");
                    if (contentTypeProvider.TryGetContentType(reqPath, out var contentType))
                    {
                        context.Response.ContentType = contentType;
                    }

                    context.Items["IsPrecompressed"] = true;
                    context.Response.ContentLength = fileOnDisk.Length;
                    context.Response.Headers["Content-Encoding"] = "gzip";
                    using (var fs = fileOnDisk.CreateReadStream())
                    {
                        await fs.CopyToAsync(context.Response.Body);
                    }
                }
                else
                {
                    await next();
                }
            });
        }
    }
}
