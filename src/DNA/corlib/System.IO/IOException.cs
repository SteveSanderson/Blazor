#if !LOCALTEST

namespace System.IO {
	public class IOException : SystemException {

		public IOException() : base("I/O Error") { }
		public IOException(string message) : base(message) { }

	}
}

#endif
