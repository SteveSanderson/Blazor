#if !LOCALTEST

namespace System {
	public unsafe struct IntPtr {

		public static readonly IntPtr Zero = new IntPtr(0);

		private void* value;

		public IntPtr(int value) {
			this.value = (void*)value;
		}

		public IntPtr(long value) {
			this.value = (void*)value;
		}

		public IntPtr(void* value) {
			this.value = value;
		}

		public static int Size {
			get {
				return sizeof(void*);
			}
		}

		public int ToInt32() {
			return (int)this.value;
		}

		public long ToInt64() {
			return (long)this.value;
		}

		public override bool Equals(object obj) {
			return (obj is IntPtr && ((IntPtr)obj).value == this.value);
		}

		public override int GetHashCode() {
			return (int)this.value;
		}

		public static bool operator ==(IntPtr a, IntPtr b) {
			return a.value == b.value;
		}

		public static bool operator !=(IntPtr a, IntPtr b) {
			return a.value != b.value;
		}

		public override string ToString() {
			if (Size == 4) {
				return string.Format("0x{0:x4}", (int)this.value);
			} else {
				return string.Format("0x{0:x8}", (long)this.value);
			}
		}
	}
}

#endif
