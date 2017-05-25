#if !LOCALTEST

namespace System.IO {
	public sealed class FileInfo : FileSystemInfo {

#pragma warning disable 0169
		private bool exists;
#pragma warning restore 0169

		public FileInfo(string path) {
			CheckPath(path);

			base.originalPath = path;
			base.fullPath = Path.GetFullPath(path);
		}

		public override bool Exists {
			get { throw new Exception("The method or operation is not implemented."); }
		}

		public override string Name {
			get {
				return Path.GetFileName(base.fullPath);
			}
		}

	}
}

#endif
