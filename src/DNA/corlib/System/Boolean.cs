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
	public struct Boolean : IComparable, IComparable<bool>, IEquatable<bool> {

		public static readonly string TrueString = "True";
		public static readonly string FalseString = "False";

		internal bool m_value;

		public override string ToString() {
			return this.m_value ? TrueString : FalseString;
		}

		public override bool Equals(object obj) {
			return (obj is bool) && ((bool)obj).m_value == this.m_value;
		}

		public override int GetHashCode() {
			return (this.m_value) ? 1 : 0;
		}

		public static bool Parse(string value) {
			if (value == null) {
				throw new ArgumentNullException("value");
			}
			value = value.Trim();
			if (value == TrueString) {
				return true;
			}
			if (value == FalseString) {
				return false;
			}
			throw new FormatException("Value is not a valid boolean");
		}

		#region IComparable Members

		public int CompareTo(object obj) {
			if (obj == null) {
				return 1;
			}
			if (!(obj is int)) {
				throw new ArgumentException();
			}
			return this.CompareTo((bool)obj);
		}

		#endregion

		#region IComparable<bool> Members

		public int CompareTo(bool x) {
			return (this.m_value == x) ? 0 : ((this.m_value) ? 1 : -1);
		}

		#endregion

		#region IEquatable<bool> Members

		public bool Equals(bool x) {
			return this.m_value == x;
		}

		#endregion
	
	}
}

#endif