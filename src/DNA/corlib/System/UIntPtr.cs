// Copyright (c) 2012 DotNetAnywhere
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#if !LOCALTEST

namespace System {
	public unsafe struct UIntPtr {

		private void* value;

		public UIntPtr(uint value) {
			this.value = (void*)value;
		}

		public UIntPtr(ulong value) {
			this.value = (void*)value;
		}

		public UIntPtr(void* value) {
			this.value = value;
		}

		public static int Size {
			get {
				return sizeof(void*);
			}
		}

		public uint ToUInt32() {
			return (uint)this.value;
		}

		public ulong ToUInt64() {
			return (ulong)this.value;
		}

		public override bool Equals(object obj) {
			return (obj is UIntPtr && ((UIntPtr)obj).value == this.value);
		}

		public override int GetHashCode() {
			return (int)this.value;
		}

		public static bool operator ==(UIntPtr a, UIntPtr b) {
			return a.value == b.value;
		}

		public static bool operator !=(UIntPtr a, UIntPtr b) {
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