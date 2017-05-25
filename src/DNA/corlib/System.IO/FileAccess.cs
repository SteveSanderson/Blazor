#if !LOCALTEST

namespace System.IO {
	public enum FileAccess : int {
		Read = 1,
		Write = 2,
		ReadWrite = Read | Write,
	}
}

#endif
