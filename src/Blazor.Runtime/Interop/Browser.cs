using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace Blazor.Interop
{
    public static class Browser
    {
        public static string ResolveRelativeUrl(string url)
        {
            return WebAssembly.Runtime.InvokeRegisteredMethod<string>(
                "Routing_ResolveRelativeUrl", url);
        }
    }
}
