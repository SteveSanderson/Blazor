using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Blazor.Components;
using Blazor.Routing;
using Blazor.VirtualDom;
using System.Collections.Generic;
using System;
using System.Runtime.Loader;
using System.Linq;
using Blazor.Sdk.Host;
using Blazor.Runtime.Components;
using Microsoft.AspNetCore.Http;

namespace Blazor.Host
{
    // The code here is incomplete and uses (uncached) reflection to access internals on Blazor.Runtime
    // just as a shortcut to avoid refactoring properly. To clean this up, consider exposing
    // the relevant APIs from Blazor.Runtime properly or even using InternalsVisibleTo.

    internal static class Prerendering
    {
        private static string[] viewReferenceAssemblies;

        internal static void EnablePrerendering(string clientBinDir, string assemblyName)
        {
            var clientAppAssemblyPath = Path.Combine(clientBinDir, assemblyName);
            var entrypointAssembly = LoadAssemblyFromPath(clientAppAssemblyPath);
            var entrypoint = entrypointAssembly.EntryPoint;
            entrypoint.Invoke(null, new[] { new string[0] });
            var envField = typeof(Blazor.Runtime.Env)
                .GetField("_isServer", BindingFlags.Static | BindingFlags.NonPublic);
            envField.SetValue(null, true);
            viewReferenceAssemblies = Directory.EnumerateFiles(clientBinDir, "*.dll")
                .Where(binDirEntry => !string.Equals(binDirEntry, assemblyName, StringComparison.OrdinalIgnoreCase))
                .ToArray();
        }

        private static async Task<string> PrerenderUrl(string rootDir, HttpContext httpContext, IEnumerable<Assembly> viewAssemblies)
        {
            var mountPageFromUrlMethod = typeof(Router).GetMethod("MountPageFromUrl", BindingFlags.Static | BindingFlags.NonPublic);

            Router.ViewAssemblies = viewAssemblies;
            var component = (Component)mountPageFromUrlMethod.Invoke(null, new object[] {
                httpContext.Request.Path.Value,
                new BlazorContext(GetAbsoluteUrl(httpContext.Request))
            });
            return await RenderComponentHtml(component);
        }

        private static string GetAbsoluteUrl(HttpRequest request)
        {
            return string.Concat(
                request.Scheme,
                "://",
                request.Host.ToUriComponent(),
                request.PathBase.ToUriComponent(),
                request.Path.ToUriComponent(),
                request.QueryString.ToUriComponent());
        }

        private static async Task<string> RenderComponentHtml(Component component)
        {
            var sb = new StringBuilder();
            await AppendComponentHtml(sb, component);
            return sb.ToString();
        }

        private static async Task AppendComponentHtml(StringBuilder sb, Component component)
        {
            var builder = (VDomBuilder)typeof(Component).GetField("builder", BindingFlags.Instance | BindingFlags.NonPublic).GetValue(component);
            if (builder == null)
            {
                throw new NullReferenceException("BAD2");
            }
            var vdomItems = (VDomItem[])typeof(VDomBuilder).GetProperty("Items", BindingFlags.Instance | BindingFlags.NonPublic).GetValue(builder);
            await AppendVDom(sb, component, vdomItems, 0);
        }

        private static async Task AppendVDom(StringBuilder sb, Component ownerComponent, VDomItem[] vdom, int rootIndex)
        {
            var rootItem = vdom[rootIndex];
            switch (rootItem.ItemType)
            {
                case VDomItemType.Element:
                    sb.AppendFormat("<{0}", rootItem.ElementTagName);
                    var hasClosedTag = false;
                    for (var childIndex = rootIndex + 1; childIndex <= rootItem.DescendantsEndIndex; childIndex++)
                    {
                        // Need to close the tag when we see the first non-attribute child
                        var childItem = vdom[childIndex];
                        if (!hasClosedTag)
                        {

                            if (childItem.ItemType != VDomItemType.Attribute)
                            {
                                sb.Append(">");
                                hasClosedTag = true;
                            }
                        }

                        await AppendVDom(sb, ownerComponent, vdom, childIndex);

                        // Skip descendants of children
                        if (childItem.ItemType == VDomItemType.Element || childItem.ItemType == VDomItemType.Component)
                        {
                            childIndex = childItem.DescendantsEndIndex;
                        }
                    }
                    if (!hasClosedTag)
                    {
                        sb.Append(">");
                    }
                    sb.AppendFormat("</{0}>", rootItem.ElementTagName);
                    break;
                case VDomItemType.Attribute:
                    var attributeValue = GetAttributeStringValue(rootItem);
                    if (rootItem.AttributeName.Equals("href", StringComparison.OrdinalIgnoreCase) && attributeValue.StartsWith("~/"))
                    {
                        // When rendering on server, convert virtual paths to regular URLs
                        attributeValue = attributeValue.Substring(1);
                    }
                    sb.AppendFormat(" {0}=\"{1}\"",
                                   rootItem.AttributeName,
                                   HtmlAttributeEncode(attributeValue));
                    break;
                case VDomItemType.TextNode:
                    sb.Append(HtmlTextEncode(rootItem.TextNodeContents));
                    break;
                case VDomItemType.Component:
                    var componentInstance = rootItem.ComponentInstance;
                    if (componentInstance == null)
                    {
                        var childComponent = Interop.Components.InstantiateAndMountComponent(
                            "ignored", // elementRef
                            ownerComponent,
                            rootIndex);
                        if (childComponent == null)
                        {
                            throw new InvalidOperationException("Could not find child component immediately after instantiation.");
                        }
                        await AppendComponentHtml(sb, childComponent);
                    }
                    else
                    {
                        componentInstance.MountAsComponent("ignoredElemRef");
                        var firstRenderCompletedTask = (Task)typeof(Component).GetProperty("FirstRenderCompletedTask", BindingFlags.Instance | BindingFlags.NonPublic).GetValue(componentInstance);
                        if (firstRenderCompletedTask != null)
                        {
                            await firstRenderCompletedTask;
                        }
                        await AppendComponentHtml(sb, componentInstance);
                    }
                    break;
            }
        }

        internal static async Task<string> PrerenderPage(string clientRootDir, string clientAppAssemblyName, HttpContext httpContext)
        {
            // TODO: Obviously there's no need to be reading this on every request
            var pageTemplate = File.ReadAllText(Path.Combine(clientRootDir, "wwwroot", "index.html"));

            // TODO: Don't reload view assembly on every request. Only do so when changed.
            // It's crazily inefficient to keep loading new copies of the same assembly like this.
            var viewsAssembly = GetCompiledViewsAssembly(clientRootDir, clientAppAssemblyName, viewReferenceAssemblies);

            return pageTemplate.Replace(
                "<div id=\"app\">Loading...</div>",
                "<div id=\"app\">" + await PrerenderUrl(clientRootDir, httpContext, new[] { viewsAssembly })) + "</div>";
        }

        private static string GetAttributeStringValue(VDomItem attributeItem)
        {
            return attributeItem.AttributeStringValue
                ?? attributeItem.AttributeObjectValue?.ToString()
                ?? string.Empty; // No need to serialise references to delegates, etc, since we can't call them in prerendering anyway
        }

        private static string HtmlTextEncode(string textNodeContents)
        {
            // TODO: Actually encode
            return textNodeContents;
        }

        private static string HtmlAttributeEncode(string attributeValue)
        {
            // TODO: Actually encode
            return attributeValue;
        }

        private static Component FindComponentById(int id)
        {
            return (Component)typeof(Component)
                .GetMethod("FindById", BindingFlags.Static | BindingFlags.NonPublic)
                .Invoke(null, new object[] { id });
        }

        private static int viewAssemblyCount = 0;
        private static Assembly GetCompiledViewsAssembly(string rootPath, string appAssemblyName, string[] referenceAssemblies)
        {
            var viewsAssemblyName = appAssemblyName.Replace(".dll", $".{ ++viewAssemblyCount }.Views.dll");
            var viewAssemblyBytes = RazorCompilation.GetCompiledViewsAssembly(
                rootPath,
                viewsAssemblyName,
                referenceAssemblies);
            using (var ms = new MemoryStream(viewAssemblyBytes))
            {
                return AssemblyLoadContext.Default.LoadFromStream(ms);
            }
        }

        private static Assembly LoadAssemblyFromPath(string path)
        {
            // Load from stream to avoid locking the file on disk
            // Unfortunately that also prevents debugging into this assembly
            using (var fs = File.OpenRead(path))
            {
                return AssemblyLoadContext.Default.LoadFromStream(fs);
            }
        }
    }
}
