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

using System;
using System.Collections;

namespace System.Collections.Generic {
	public abstract class Comparer<T> : IComparer<T>,IComparer {

		private sealed class DefaultComparer : Comparer<T> {

			public override int Compare(T x, T y) {
				if (x == null) {
					return y == null ? 0 : -1;
				}
				if (y == null) {
					return 1;
				}
				IComparable<T> iComp = x as IComparable<T>;
				if (iComp != null) {
					return iComp.CompareTo(y);
				}
				IComparable iComp2 = x as IComparable;
				if (iComp2 != null) {
					return iComp2.CompareTo(y);
				}
				throw new ArgumentException("Does not implement IComparable");
			}

		}

		private sealed class DefaultComparerValueType : Comparer<T> {

			public override int Compare(T x, T y) {
				IComparable<T> iComp = x as IComparable<T>;
				if (iComp != null) {
					return iComp.CompareTo(y);
				}
				IComparable iComp2 = x as IComparable;
				if (iComp2 != null) {
					return iComp2.CompareTo(y);
				}
				throw new ArgumentException("Does not implement IComparable");
			}

		}

		static Comparer() {
			if (typeof(T).IsValueType) {
				Default = new DefaultComparerValueType();
			} else {
				Default = new DefaultComparer();
			}
		}

		public static Comparer<T> Default { get; private set; }

		public abstract int Compare(T x, T y);

		public int Compare(object x, object y) {
			if (x == null) {
				return y == null ? 0 : -1;
			}
			if (y == null) {
				return 1;
			}
			if (x is T && y is T) {
				return this.Compare((T)x, (T)y);
			}
			throw new ArgumentException();
		}

	}
}

#endif
