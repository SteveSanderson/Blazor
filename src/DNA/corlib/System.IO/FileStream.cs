#if !LOCALTEST

namespace System.IO {
	public class FileStream : Stream {

		private IntPtr handle = IntPtr.Zero;
		private string filename;
		private bool canRead, canWrite, canSeek;

		public FileStream(string filename, FileMode mode, FileAccess access, FileShare share) {
			int error;
			IntPtr handle = FileInternal.Open(filename, mode, access, share, out error);
			if (error != 0) {
				throw FileInternal.GetException(error, filename);
			}
			this.handle = handle;
			this.filename = filename;

			this.canRead = true;
			this.canWrite = true;
			this.canSeek = true;
		}

		~FileStream() {
			this.Dispose(false);
		}

		protected override void Dispose(bool disposing) {
			if (this.handle != IntPtr.Zero) {
				int error;
				FileInternal.Close(this.handle, out error);
				if (disposing && error != 0) {
					// Throw exception on error, but not if this is being called from destructor
					throw FileInternal.GetException(error, this.filename);
				}
				this.handle = IntPtr.Zero;
				// TODO: GC.UnregisterForFinalize(this);
			}
		}

		public override void Flush() {
			throw new Exception("The method or operation is not implemented.");
		}

		public override int Read(byte[] buffer, int offset, int count) {
			if (this.handle == IntPtr.Zero) {
				throw new ObjectDisposedException("Stream has been closed");
			}
			if (offset < 0 || count < 0 || offset + count > buffer.Length) {
				throw new ArgumentOutOfRangeException();
			}

			int error;
			int ret = FileInternal.Read(this.handle, buffer, offset, count, out error);
			if (error != 0) {
				throw FileInternal.GetException(error, this.filename);
			}
			return ret;
		}

		public override long Seek(long offset, SeekOrigin origin) {
			throw new Exception("The method or operation is not implemented.");
		}

		public override void SetLength(long value) {
			throw new Exception("The method or operation is not implemented.");
		}

		public override void Write(byte[] buffer, int offset, int count) {
			throw new Exception("The method or operation is not implemented.");
		}

		public override bool CanRead {
			get {
				return this.canRead;
			}
		}

		public override bool CanSeek {
			get {
				return this.canSeek;
			}
		}

		public override bool CanWrite {
			get {
				return this.canWrite;
			}
		}

		public override long Length {
			get { throw new Exception("The method or operation is not implemented."); }
		}

		public override long Position {
			get {
				throw new Exception("The method or operation is not implemented.");
			}
			set {
				throw new Exception("The method or operation is not implemented.");
			}
		}
	}
}

#endif