#if !LOCALTEST

namespace System.IO {
	public enum FileShare : int {
		None = 0,
		Read = 1,
		Write = 2,
		ReadWrite = 3,
		Delete = 4,
		Inheritable = 16,
	}
}

#endif
