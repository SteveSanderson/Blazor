#if !LOCALTEST

using System.Runtime.CompilerServices;
namespace System.IO {
	internal static class FileInternal {

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static IntPtr Open(string fileName, FileMode mode, FileAccess access, FileShare share, out int error);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static int Read(IntPtr handle, byte[] dst, int dstOfs, int count, out int error);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static void Close(IntPtr handle, out int error);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static string GetCurrentDirectory(out int error);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static FileAttributes GetFileAttributes(string path, out int error);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static string[] GetFileSystemEntries(string path, string pathPattern, FileAttributes attrs, FileAttributes mask, out int error);

		public const int Error_OK = 0;
		public const int Error_UnknownMode = -1;
		public const int ERROR_FILE_NOT_FOUND = 2;
		public const int ERROR_PATH_NOT_FOUND = 3;

		public static Exception GetException(int error, string path) {
			switch (error) {
			case Error_UnknownMode:
				return new IOException("Unknown file mode");
			case ERROR_FILE_NOT_FOUND:
				return new FileNotFoundException(string.Format("Could not find file \"{0}\"", path));
			default:
				return new IOException();
			}
		}

		public static readonly FileAttributes InvalidFileAttributes = (FileAttributes)(-1);

		public static bool ExistsFile(string path, out int error) {
			FileAttributes attrs = GetFileAttributes(path, out error);
			if (attrs == InvalidFileAttributes) {
				return false;
			}
			if ((attrs & FileAttributes.Directory) != 0) {
				return false;
			}
			return true;
		}

		public static bool ExistsDirectory(string path, out int error) {
			FileAttributes attrs = GetFileAttributes(path, out error);
			// Actually, we are looking for a directory, not a file
			if (error == FileInternal.ERROR_FILE_NOT_FOUND) {
				error = FileInternal.ERROR_PATH_NOT_FOUND;
			}
			if (attrs == InvalidFileAttributes) {
				return false;
			}
			if ((attrs & FileAttributes.Directory) == 0) {
				return false;
			}
			return true;
		}
	}
}

#endif
