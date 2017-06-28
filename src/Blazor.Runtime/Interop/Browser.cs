using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace Blazor.Interop
{
    public static class Browser
    {
        [DllImport(@"browser.js", CharSet = CharSet.Ansi)]
        public static extern int JSEval(string code);

        [DllImport(@"browser.js", CharSet = CharSet.Ansi)]
        public static extern void Alert(string message);

        [DllImport(@"browser.js", CharSet = CharSet.Ansi)]
        public static extern string ResolveRelativeUrl(string url);
    }
}
