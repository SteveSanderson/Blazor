using System;
using System.Collections.Generic;
using System.Text;

namespace Blazor.DebugAdapter.ChromeProtocolConnection.Protocol
{
    class SetPausedInDebuggerMessageRequest : ChromeRequest
    {
        public SetPausedInDebuggerMessageRequestParams Params { get; }

        public SetPausedInDebuggerMessageRequest(string message)
            : base("Overlay.setPausedInDebuggerMessage")
        {
            Params = new SetPausedInDebuggerMessageRequestParams(message);
        }

        public class SetPausedInDebuggerMessageRequestParams
        {
            public string Message { get; }

            public SetPausedInDebuggerMessageRequestParams(string message)
            {
                Message = message;
            }
        }
    }
}
