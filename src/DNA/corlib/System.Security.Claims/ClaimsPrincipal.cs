using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Principal;

namespace System.Security.Claims
{
    public class ClaimsPrincipal : IPrincipal
    {
        private IIdentity _identity;

        public IIdentity Identity
        {
            get => _identity;
            set => _identity = value;
        }
    }
}
