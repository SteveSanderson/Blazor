namespace Blazor.DebugAdapter.ChromeProtocolConnection.Protocol
{
    class DebuggerPausedMessage : ChromeIncomingMessage
    {
        public DebuggerPausedParams Params { get; set; }

        public class DebuggerPausedParams
        {
            public string Reason { get; set; }
            public CallFrame[] CallFrames { get; set; }
        }
    }
}
