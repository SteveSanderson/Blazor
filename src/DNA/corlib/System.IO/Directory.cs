#if !LOCALTEST

namespace System.IO {
	public static class Directory {

		public static string GetCurrentDirectory() {
			int error;
			string dir = FileInternal.GetCurrentDirectory(out error);
			if (error != 0) {
				throw FileInternal.GetException(error, string.Empty);
			}
			return dir;
		}

		public static string[] GetFiles(string path) {
			return GetFiles(path, "*");
		}

		public static string[] GetFiles(string path, string pattern) {
			return GetFileSystemEntries(path, pattern, FileAttributes.Directory, 0);
		}

		private static string[] GetFileSystemEntries(string path, string pattern, FileAttributes mask, FileAttributes attrs) {
			if (path == null || pattern == null)
				throw new ArgumentNullException();

			if (pattern == String.Empty)
				return new string[] { };

			if (path.Trim() == "")
				throw new ArgumentException("The Path does not have a valid format");

			string wild = Path.Combine(path, pattern);
			string wildpath = Path.GetDirectoryName(wild);
			if (wildpath.IndexOfAny(Path.InvalidPathChars) != -1)
				throw new ArgumentException("Path contains invalid characters");

			if (wildpath.IndexOfAny(Path.InvalidPathChars) != -1) {
				if (path.IndexOfAny(SearchPattern.InvalidChars) == -1)
					throw new ArgumentException("Path contains invalid characters", "path");

				throw new ArgumentException("Pattern contains invalid characters", "pattern");
			}

			int error;
			if (!FileInternal.ExistsDirectory(wildpath, out error)) {
				if (error == FileInternal.Error_OK) {
					int file_error;
					if (FileInternal.ExistsFile(wildpath, out file_error)) {
						return new string[] { wildpath };
					}
				}

				if (error != FileInternal.ERROR_PATH_NOT_FOUND)
					throw FileInternal.GetException(error, wildpath);

				if (wildpath.IndexOfAny(SearchPattern.WildcardChars) == -1)
					throw new DirectoryNotFoundException("Directory '" + wildpath + "' not found.");

				if (path.IndexOfAny(SearchPattern.WildcardChars) == -1)
					throw new ArgumentException("Pattern is invalid", "pattern");

				throw new ArgumentException("Path is invalid", "path");
			}

			string path_with_pattern = Path.Combine(wildpath, pattern);
			string[] result = FileInternal.GetFileSystemEntries(path, path_with_pattern, attrs, mask, out error);
			if (error != 0)
				throw FileInternal.GetException(error, wildpath);

			return result;
		}

	}
}

#endif
