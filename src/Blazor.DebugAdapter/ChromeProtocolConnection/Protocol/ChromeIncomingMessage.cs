using System;
using System.Collections.Generic;
using System.Text;

namespace Blazor.DebugAdapter.ChromeProtocolConnection.Protocol
{
    class ChromeIncomingMessage
    {
        public int? Id { get; set; }
        public string Method { get; set; }
    }
}
