#if !LOCALTEST

namespace System.IO {
	public enum FileMode : int {
		CreateNew = 1,
		Create = 2,
		Open = 3,
		OpenOrCreate = 4,
		Truncate = 5,
		Append = 6,
	}
}

#endif
