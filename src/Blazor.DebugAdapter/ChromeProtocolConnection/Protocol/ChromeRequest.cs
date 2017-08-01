namespace Blazor.DebugAdapter.ChromeProtocolConnection.Protocol
{
    class ChromeRequest : ChromeRequestBase
    {
        public string Method { get; }

        public ChromeRequest(string method)
        {
            Method = method;
        }
    }
}
