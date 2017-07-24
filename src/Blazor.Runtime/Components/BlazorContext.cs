using System.Security.Claims;
using System.Security.Principal;

namespace Blazor.Runtime.Components
{
    public class BlazorContext
    {
        public string AbsoluteUrl { get; private set; }

        public ClaimsPrincipal User { get; set; } = new AnonymousUser();

        public BlazorContext(string absoluteUrl)
        {
            AbsoluteUrl = absoluteUrl;
        }

        private class AnonymousUser : ClaimsPrincipal
        {
            public AnonymousUser()
                : base(new AnonymousIdentity())
            {
                
            }

            private class AnonymousIdentity : IIdentity
            {
                public string AuthenticationType => "None";

                public bool IsAuthenticated => false;

                public string Name => string.Empty;
            }
        }
    }
}
