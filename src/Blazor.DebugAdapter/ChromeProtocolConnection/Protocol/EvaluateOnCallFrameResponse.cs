namespace Blazor.DebugAdapter.ChromeProtocolConnection.Protocol
{
    class EvaluateOnCallFrameResponse : ChromeIncomingMessage
    {
        public EvaluateOnCallFrameResponseResult Result { get; set; }

        public class EvaluateOnCallFrameResponseResult
        {
            public RemoteObject Result { get; set; }
            public ExceptionDetails ExceptionDetails { get; set; }
        }
    }
}
