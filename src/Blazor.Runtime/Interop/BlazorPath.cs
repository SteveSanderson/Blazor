using System;
using System.Collections.Generic;
using System.Text;

namespace Blazor.Runtime.Interop
{
    internal static class BlazorPath
    {
        // Todo: Replace usages of this with Path.DirectorySeparatorChar once
        // the Mono runtime stops crashing whenever that is referenced.
        // Until then, prerendering isn't going to work as this needs to be
        // '\\' when run server-side on Windows.
        public readonly static char DirectorySeparatorChar = '/';
    }
}
