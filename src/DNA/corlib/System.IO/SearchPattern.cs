#if !LOCALTEST

namespace System.IO {
	internal class SearchPattern {

		internal static readonly char[] WildcardChars = { '*', '?' };
		internal static readonly char[] InvalidChars = { Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar };
	
	}
}

#endif
