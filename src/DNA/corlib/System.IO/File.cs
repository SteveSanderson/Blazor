#if !LOCALTEST

namespace System.IO {
	public static class File {

		public static FileStream OpenRead(string path) {
			return new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
		}

		public static StreamReader OpenText(string path) {
			return new StreamReader(path);
		}

		public static bool Exists(string path) {
			if (string.IsNullOrEmpty(path)) {
				return false;
			}
			int error;
			return FileInternal.ExistsFile(path, out error);
		}

	}
}

#endif
