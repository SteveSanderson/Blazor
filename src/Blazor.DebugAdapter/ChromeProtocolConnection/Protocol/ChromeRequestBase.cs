using System.Threading;

namespace Blazor.DebugAdapter.ChromeProtocolConnection.Protocol
{
    class ChromeRequestBase
    {
        static int PrevRequestId = 0;

        public int Id { get; }

        public ChromeRequestBase()
        {
            Id = Interlocked.Increment(ref PrevRequestId);
        }
    }
}
