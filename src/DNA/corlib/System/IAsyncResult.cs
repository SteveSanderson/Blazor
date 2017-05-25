#if !LOCALTEST

using System.Threading;

namespace System {
	public interface IAsyncResult {

		object AsyncState { get;}
		WaitHandle AsyncWaitHandle { get;		}
		bool CompletedSynchronously { get;		}
		bool IsCompleted { get;		}

	}
}

#endif
