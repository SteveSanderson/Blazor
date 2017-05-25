#if !LOCALTEST

namespace System {
	public class IndexOutOfRangeException : SystemException {

		public IndexOutOfRangeException() : base("Array index is out of range.") { }

		public IndexOutOfRangeException(string message) : base(message) { }

		public IndexOutOfRangeException(string message, Exception innerException)
			: base(message, innerException) {
		}

	}
}

#endif
