using System;
using Newtonsoft.Json.Linq;

namespace Blazor.Host.Debugging.Models
{
    public class DebuggerInvocationException : Exception
    {
        public JObject ErrorInfo { get; }

        public DebuggerInvocationException(JObject error)
            : base($"The invocation returned an error. See {nameof(ErrorInfo)} property for details.")
        {
            ErrorInfo = error;
        }
    }
}
