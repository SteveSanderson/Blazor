#if !LOCALTEST

namespace System.IO {
	public class FileNotFoundException : IOException {

		public FileNotFoundException(string msg) : base(msg) { }

	}
}

#endif
