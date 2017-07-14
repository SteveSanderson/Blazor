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
using System.Collections.Generic;
using System.Text;
using System.Runtime.CompilerServices;
using System.Globalization;

namespace System {
	public struct Char : IComparable, IComparable<char>, IEquatable<char> {

		// Note that this array must be ordered, because binary searching is used on it.
		internal static readonly char[] WhiteChars = {
			(char) 0x9, (char) 0xA, (char) 0xB, (char) 0xC, (char) 0xD,
			(char) 0x85, (char) 0x1680, (char) 0x2028, (char) 0x2029,
			(char) 0x20, (char) 0xA0, (char) 0x2000, (char) 0x2001,
			(char) 0x2002, (char) 0x2003, (char) 0x2004, (char) 0x2005,
			(char) 0x2006, (char) 0x2007, (char) 0x2008, (char) 0x2009,
			(char) 0x200A, (char) 0x200B, (char) 0x3000, (char) 0xFEFF };

#pragma warning disable 0649
        internal char m_value;
#pragma warning restore 0649

        public override string ToString() {
			return new string(m_value, 1);
		}

		public override bool Equals(object obj) {
			return (obj is char && ((char)obj).m_value == this.m_value);
		}

		public override int GetHashCode() {
			return (int)this.m_value;
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern static public UnicodeCategory GetUnicodeCategory(char c);

		public static UnicodeCategory GetUnicodeCategory(string str, int index) {
			if (str == null) {
				throw new ArgumentNullException("str");
			}
			if (index < 0 || index >= str.Length) {
				throw new ArgumentOutOfRangeException("index");
			}
			return GetUnicodeCategory(str[index]);
		}

		public static bool IsWhiteSpace(char c) {
			// TODO: Make this use Array.BinarySearch() when implemented
			for (int i = 0; i < WhiteChars.Length; i++) {
				if (WhiteChars[i] == c) {
					return true;
				}
			}
			return false;
		}

		public static bool IsWhiteSpace(string str, int index) {
			if (str == null) {
				throw new ArgumentNullException("str");
			}
			if (index < 0 || index >= str.Length) {
				throw new ArgumentOutOfRangeException("index");
			}
			return IsWhiteSpace(str[index]);
		}

		public static bool IsLetter(char c) {
			return GetUnicodeCategory(c) <= UnicodeCategory.OtherLetter;
		}

		public static bool IsLetter(string str, int index) {
			if (str == null) {
				throw new ArgumentNullException("str");
			}
			if (index < 0 || index >= str.Length) {
				throw new ArgumentOutOfRangeException("index");
			}
			return IsLetter(str[index]);
		}

		public static bool IsDigit(char c) {
			return GetUnicodeCategory(c) == UnicodeCategory.DecimalDigitNumber;
		}

		public static bool IsDigit(string str, int index) {
			if (str == null) {
				throw new ArgumentNullException("str");
			}
			if (index < 0 || index >= str.Length) {
				throw new ArgumentOutOfRangeException("index");
			}
			return IsDigit(str[index]);
		}

		public static bool IsLower(char c) {
			return GetUnicodeCategory(c) == UnicodeCategory.LowercaseLetter;
		}

		public static bool IsLower(string str, int index) {
			if (str == null) {
				throw new ArgumentNullException("str");
			}
			if (index < 0 || index >= str.Length) {
				throw new ArgumentOutOfRangeException("index");
			}
			return IsLower(str[index]);
		}

		public static bool IsUpper(char c) {
			return GetUnicodeCategory(c) == UnicodeCategory.UppercaseLetter;
		}

		public static bool IsUpper(string str, int index) {
			if (str == null) {
				throw new ArgumentNullException("str");
			}
			if (index < 0 || index >= str.Length) {
				throw new ArgumentOutOfRangeException("index");
			}
			return IsUpper(str[index]);
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static char ToLowerInvariant(char c);

		public static char ToLower(char c) {
			return ToLower(c, CultureInfo.CurrentCulture);
		}

		public static char ToLower(char c, CultureInfo culture) {
			if (culture == null) {
				throw new ArgumentNullException("culture");
			}
			if (culture.LCID == 0x7f) {
				// Invariant culture
				return ToLowerInvariant(c);
			}
			return '?';
			//return culture.TextInfo.ToUpper(c);
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static char ToUpperInvariant(char c);

		public static char ToUpper(char c) {
			return ToUpper(c, CultureInfo.CurrentCulture);
		}

		public static char ToUpper(char c, CultureInfo culture) {
			if (culture == null) {
				throw new ArgumentNullException("culture");
			}
			if (culture.LCID == 0x7f) {
				// Invariant culture
				return ToUpperInvariant(c);
			}
			return '?';
			//return culture.TextInfo.ToUpper(c);
		}

		#region IComparable Members

		public int CompareTo(object obj) {
			if (obj == null) {
				return 1;
			}
			if (!(obj is char)) {
				throw new ArgumentException();
			}
			return this.CompareTo((char)obj);
		}

		#endregion

		#region IComparable<char> Members

		public int CompareTo(char x) {
			return (this.m_value > x) ? 1 : ((this.m_value < x) ? -1 : 0);
		}

		#endregion

		#region IEquatable<char> Members

		public bool Equals(char x) {
			return this.m_value == x;
		}

		#endregion

	}
}

#endif
