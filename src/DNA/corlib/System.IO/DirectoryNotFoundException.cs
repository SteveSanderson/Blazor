#if !LOCALTEST

namespace System.IO {
	public class DirectoryNotFoundException : SystemException {

		public DirectoryNotFoundException() : base("Directory not found.") { }
		public DirectoryNotFoundException(string msg) : base(msg) { }

	}
}

#endif
