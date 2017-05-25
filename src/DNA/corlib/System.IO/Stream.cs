#if !LOCALTEST

using System.Runtime.InteropServices;
namespace System.IO {
	public abstract class Stream : MarshalByRefObject, IDisposable {

		public static readonly Stream Null = new NullStream();

		private class NullStream : Stream {
			public override bool CanRead { get { return true; } }
			public override bool CanSeek { get { return true; } }
			public override bool CanWrite { get { return true; } }
			public override long Length { get { return 0; } }
			public override long Position { get { return 0; } set { } }
			public override void Flush() { }
			public override int Read(byte[] buffer, int offset, int count) { return 0; }
			public override int ReadByte() { return -1; }
			public override long Seek(long offset, SeekOrigin origin) { return 0; }
			public override void Write(byte[] buffer, int offset, int count) { }
			public override void WriteByte(byte value) { }
			public override void SetLength(long value) { }
		}

		protected Stream() {
		}

		public abstract bool CanRead { get; }
		public abstract bool CanSeek { get; }
		public abstract bool CanWrite { get; }
		public abstract long Length { get; }
		public abstract long Position { get; set; }

		public virtual bool CanTimeout {
			get {
				return false;
			}
		}

		public void Dispose() {
			Close();
		}

		void IDisposable.Dispose() {
			Close();
		}

		public virtual void Close() {
			Dispose(true);
		}

		protected virtual void Dispose(bool disposing) {
			// nothing.
		}

		public abstract void Flush();

		public abstract int Read([In, Out] byte[] buffer, int offset, int count);

		public virtual int ReadByte() {
			byte[] buffer = new byte[1];

			if (Read(buffer, 0, 1) == 1)
				return buffer[0];

			return -1;
		}

		public abstract long Seek(long offset, SeekOrigin origin);

		public abstract void SetLength(long value);

		public abstract void Write(byte[] buffer, int offset, int count);

		public virtual void WriteByte(byte value) {
			byte[] buffer = new byte[1];

			buffer[0] = value;

			Write(buffer, 0, 1);
		}

	}
}

#endif
