using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging.Protocol
{
    public class DebuggablePageInfo
    {
        public string Url { get; set; }
        public string WebSocketDebuggerUrl { get; set; }
    }
}
