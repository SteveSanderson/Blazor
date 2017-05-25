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

using System.Runtime.CompilerServices;

namespace System {
	public abstract class ValueType {

		protected ValueType() {
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private static object[] GetFields(object o1, object o2);

		public override bool Equals(object obj) {
			if (obj == null || this.GetType() != obj.GetType()) {
				return false;
			}
			object[] fields = GetFields(this, obj);
			int len = fields.Length;
			for (int i = 0; i < len; i += 2) {
				object meVal = fields[i];
				object youVal = fields[i + 1];
				if (!object.Equals(meVal, youVal)) {
					return false;
				}
			}
			return true;
		}

		public override int GetHashCode() {
			object[] fields = GetFields(this, null);

			int hash = 0;
			int len = fields.Length;
			for (int i = 0; i < len; i++) {
				hash ^= fields[i].GetHashCode();
			}
			return hash;
		}
	}
}
#endif
