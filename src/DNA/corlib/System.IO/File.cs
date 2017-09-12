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

		public static byte [] ReadAllBytes (string path)
		{
			using (FileStream s = OpenRead (path)) {
				long size = s.Length;
				// limited to 2GB according to http://msdn.microsoft.com/en-us/library/system.io.file.readallbytes.aspx
				if (size > Int32.MaxValue)
					throw new IOException ("Reading more than 2GB with this call is not supported");

				int pos = 0;
				int count = (int) size;
				byte [] result = new byte [size];
				while (count > 0) {
					int n = s.Read (result, pos, count);
					if (n == 0)
						throw new IOException ("Unexpected end of stream");
					pos += n;
					count -= n;
				}
				return result;
			}
		}

		public static string ReadAllText (string path, System.Text.Encoding encoding)
		{
			using (StreamReader sr = new StreamReader (path, encoding)) {
				return sr.ReadToEnd ();
			}
		}
	}
}

#endif
