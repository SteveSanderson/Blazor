#if !LOCALTEST

namespace System.IO {
	public class DirectoryInfo : FileSystemInfo {

		private string current;
		private string parent;
		
		public DirectoryInfo(string path) {
			base.CheckPath(path);

			base.fullPath = Path.GetFullPath(path);
			base.originalPath = path;

			int len = base.fullPath.Length - 1;
			if ((len > 1) && (base.fullPath[len] == Path.DirectorySeparatorChar)) {
				len--;
			}
			int last = base.fullPath.LastIndexOf(Path.DirectorySeparatorChar, len);
			if ((last == -1) || ((last == 0) && (len == 0))) {
				current = base.fullPath;
				parent = null;
			} else {
				current = base.fullPath.Substring(last + 1, len - last);
				if (last == 0 && !Environment.IsRunningOnWindows) {
					parent = Path.DirectorySeparatorStr;
				} else {
					parent = base.fullPath.Substring(0, last);
				}
				// adjust for drives, i.e. a special case for windows
				if (Environment.IsRunningOnWindows) {
					if ((parent.Length == 2) && (parent[1] == ':') && Char.IsLetter(parent[0])) {
						parent += Path.DirectorySeparatorChar;
					}
				}
			}
		}

		public override bool Exists {
			get { throw new Exception("The method or operation is not implemented."); }
		}

		public override string Name {
			get {
				return this.current;
			}
		}

		public FileInfo[] GetFiles() {
			return GetFiles("*");
		}

		public FileInfo[] GetFiles(string pattern) {
			string[] names = Directory.GetFiles(base.fullPath, pattern);

			FileInfo[] infos = new FileInfo[names.Length];
			int i = 0;
			foreach (string name in names) {
				infos[i++] = new FileInfo(name);
			}
			return infos;
		}

	}
}

#endif
