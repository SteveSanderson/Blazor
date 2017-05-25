#if !LOCALTEST

namespace System.IO {
	public abstract class FileSystemInfo : MarshalByRefObject {

		protected string fullPath = null;
		protected string originalPath = null;

		internal void CheckPath(string path) {
			if (path == null)
				throw new ArgumentNullException("path");

			if (path.Length == 0)
				throw new ArgumentException("path", "Empty path.");

			if (path.IndexOfAny(Path.InvalidPathChars) != -1)
				throw new ArgumentException("path", "Invalid characters in path.");
		}

		public abstract bool Exists { get; }

		public abstract string Name { get; }

		public virtual string FullName {
			get {
				return this.fullPath;
			}
		}

		public string Extension {
			get {
				return Path.GetExtension(Name);
			}
		}

	}
}

#endif
