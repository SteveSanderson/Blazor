using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;

namespace Blazor.Runtime.Components
{
    public class BlazorContext
    {
        public BlazorContext(string absoluteUrl)
        {
            AbsoluteUrl = absoluteUrl;
        }

        public string AbsoluteUrl { get; set; }

        public IDictionary<string, object> Items { get; } = new Dictionary<string, object>();
    }
}
