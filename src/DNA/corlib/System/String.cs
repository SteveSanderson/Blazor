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
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;

namespace System {
	public class String : ICloneable, IEnumerable, IEnumerable<char>,
		IComparable, IComparable<string>, IEquatable<string> {

		public static readonly string Empty = "";

		public static bool IsNullOrEmpty(string value) {
			return (value == null) || (value.Length == 0);
		}

		public static bool IsNullOrWhiteSpace(string value) {
			return (value == null) || IsNullOrEmpty(value.Trim());
		}

		// This field must be the only field, to tie up with C code
		private int length;

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public String(char c, int count);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public String(char[] chars);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public String(char[] chars, int startIndex, int length);
		
		#region Private Internal Calls

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private String(string str, int startIndex, int length);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private static string InternalConcat(string str0, string str1);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private void InternalCopyTo(int sourceIndex, char[] destination, int destinationIndex, int count);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private string InternalReplace(string oldValue, string newValue);

		// trimType: bit 0 = start; bit 1 = end
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private string InternalTrim(char[] trimChars, int trimType);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private int InternalIndexOf(char value, int startIndex, int count, bool forward);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private int InternalIndexOfAny(char[] anyOf, int startIndex, int count, bool forward);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private int InternalIndexOfStr(string value, int startIndex, int count, bool forward);

		#endregion

		public virtual int Length {
			get {
				return this.length;
			}
		}

		[IndexerName("Chars")]
		extern virtual public char this[int index] {
			[MethodImpl(MethodImplOptions.InternalCall)]
			get;
		}

		#region Misc Methods

		public char[] ToCharArray () {
			char[] chars = new char [this.length];
			InternalCopyTo(0, chars, 0, this.length);
			return chars;
		}

		public static string Join(string separator, string[] values) {
			return Join(separator, values, 0, values.Length);
		}

		public static string Join(string separator, IEnumerable<string> values) {
			return Join<string>(separator, values);
		}

		public static string Join(string separator, string[] values, int startIndex, int count) {
			StringBuilder sb = new StringBuilder();
			for (int i = startIndex; i < count; i++) {
				sb.Append(values[i]);
				sb.Append(separator);
			}
			return sb.ToString(0, sb.Length - separator.Length);
		}

		public static string Join<T>(string separator, IEnumerable<T> values) {
			StringBuilder sb = new StringBuilder();
			foreach(var v in values) {
				sb.Append(v);
				sb.Append(separator);
			}
			return sb.ToString(0, sb.Length - separator.Length);
		}

		public string[] Split(params char[] separator) {
			return this.Split(separator, int.MaxValue);
		}

		public string[] Split(char separator, StringSplitOptions options) {
			return this.Split(new char[] { separator }, int.MaxValue, options);
		}

		public string[] Split(char[] separator, StringSplitOptions options) {
			return this.Split(separator, int.MaxValue, options);
		}

		public string[] Split(char[] separator, int count) {
			return this.Split(separator, count, StringSplitOptions.None);
		}

		public string[] Split(char[] separator, int count, StringSplitOptions options) {
			if (count < 0) {
				throw new ArgumentException("count");
			}
			if (count == 0) {
				return new string[0];
			}
			if (separator == null || separator.Length == 0) {
				separator = char.WhiteChars;
			}

			List<string> ret = new List<string>();

			int pos = 0;
			for (; count > 0; count--) {
				int sepPos = this.IndexOfAny(separator, pos);
				if (sepPos < 0) {
					ret.Add(new string(this, pos, this.length - pos));
					break;
				}
				if (options != StringSplitOptions.RemoveEmptyEntries || sepPos > pos) {
					ret.Add(new string(this, pos, sepPos - pos));
				}
				pos = sepPos + 1;
			}

			return ret.ToArray();
		}

		public bool StartsWith(string str) {
			return this.length < str.Length ? false : this.Substring(0, str.Length) == str;
		}

		public bool EndsWith(string str) {
			return this.length < str.Length ? false : this.Substring(this.length - str.Length, str.Length) == str;
		}

		public bool StartsWith(string str, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.InvariantCulture:
				case StringComparison.Ordinal:
					return StartsWith(str);
				case StringComparison.CurrentCultureIgnoreCase:
					throw new Exception("String.StartsWith(s,StringComparison.CurrentCultureIgnoreCase) is not implemented.");
				case StringComparison.InvariantCultureIgnoreCase:
				case StringComparison.OrdinalIgnoreCase:
					return this.ToUpperInvariant().StartsWith(str.ToUpperInvariant());
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		public bool EndsWith(string str, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.InvariantCulture:
				case StringComparison.Ordinal:
					return EndsWith(str);
				case StringComparison.CurrentCultureIgnoreCase:
					throw new Exception("String.EndsWith(s,StringComparison.CurrentCultureIgnoreCase) is not implemented.");
				case StringComparison.InvariantCultureIgnoreCase:
				case StringComparison.OrdinalIgnoreCase:
					return this.ToUpperInvariant().EndsWith(str.ToUpperInvariant());
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		#endregion

		#region Concat Methods

		public static string Concat(string str0, string str1) {
			if (str0 == null) {
				return str1 ?? string.Empty;
			}
			if (str1 == null) {
				return str0;
			}
			return InternalConcat(str0, str1);
		}

		public static string Concat(string str0, string str1, string str2) {
			return Concat(Concat(str0, str1), str2);
		}

		public static string Concat(string str0, string str1, string str2, string str3) {
			return Concat(Concat(str0, str1), Concat(str2, str3));
		}

		public static string Concat(params string[] values) {
			return Concat((IEnumerable<string>)values);
		}
		
		public static string Concat(IEnumerable<string> values) {
			if (values == null) {
				throw new ArgumentNullException("values");
			}
			int capacity = 0;
			foreach (var s in values) { if (s != null) { capacity += s.Length; } }
			StringBuilder sb = new StringBuilder(capacity);
			foreach (var s in values) { if (s != null) { sb.Append(s); } }
			return sb.ToString();
		}

		public static string Concat(object obj0) {
			return (obj0 == null) ? null : obj0.ToString();
		}

		public static string Concat(object obj0, object obj1) {
			string str0 = (obj0 == null) ? null : obj0.ToString();
			string str1 = (obj1 == null) ? null : obj1.ToString();
			return Concat(str0, str1);
		}

		public static string Concat(object obj0, object obj1, object obj2) {
			return Concat(new object[] { obj0, obj1, obj2 });
		}

		public static string Concat(object obj0, object obj1, object obj2, object obj3) {
			return Concat(new object[] { obj0, obj1, obj2, obj3 });
		}

		public static string Concat(params object[] values) {
			if (values == null) {
				throw new ArgumentNullException("values");
			}
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < values.Length; i++) {
				sb.Append(values[i]);
			}
			return sb.ToString();
		}

		#endregion

		#region Trim Methods

		public string Trim(params char[] trimChars) {
			if (trimChars == null || trimChars.Length == 0) {
				trimChars = char.WhiteChars;
			}
			return InternalTrim(trimChars, 3);
		}

		public string Trim() {
			return InternalTrim(char.WhiteChars, 3);
		}

		public string TrimStart(params char[] trimChars) {
			if (trimChars == null || trimChars.Length == 0) {
				trimChars = char.WhiteChars;
			}
			return InternalTrim(trimChars, 1);
		}

		public string TrimEnd(params char[] trimChars) {
			if (trimChars == null || trimChars.Length == 0) {
				trimChars = char.WhiteChars;
			}
			return InternalTrim(trimChars, 2);
		}

		#endregion

		#region Substring Methods

		public string Substring(int startIndex) {
			if (startIndex < 0 || startIndex > this.length) {
				throw new ArgumentOutOfRangeException();
			}

			return new string(this, startIndex, this.length - startIndex);
		}

		public string Substring(int startIndex, int length) {
			if (startIndex < 0 || length < 0 || startIndex + length > this.length) {
				throw new ArgumentOutOfRangeException();
			}

			return new string(this, startIndex, length);
		}

		#endregion

		#region Format Methods

		public static string Format(string format, object obj0) {
			return Format(null, format, new object[] { obj0 });
		}

		public static string Format(string format, object obj0, object obj1) {
			return Format(null, format, new object[] { obj0, obj1 });
		}

		public static string Format(string format, object obj0, object obj1, object obj2) {
			return Format(null, format, new object[] { obj0, obj1, obj2 });
		}

		public static string Format(string format, params object[] args) {
			return Format(null, format, args);
		}

		public static string Format(IFormatProvider provider, string format, params object[] args) {
			StringBuilder sb = new StringBuilder();
			StringHelper.FormatHelper(sb, provider, format, args);
			return sb.ToString();
		}

		#endregion

		#region Replace & Remove Methods

		public string Replace(char oldChar, char newChar) {
			StringBuilder sb = new StringBuilder(this);
			return sb.Replace(oldChar, newChar).ToString();
		}

		public string Replace(string oldValue, string newValue) {
			if (oldValue == null) {
				throw new ArgumentNullException("oldValue");
			}
			if (oldValue.Length == 0) {
				throw new ArgumentException("oldValue is an empty string.");
			}
			if (this.length == 0) {
				return this;
			}
			if (newValue == null) {
				newValue = string.Empty;
			}
			return InternalReplace(oldValue, newValue);
		}

		public string Remove(int startIndex) {
			if (startIndex < 0 || startIndex >= this.length) {
				throw new ArgumentOutOfRangeException("startIndex");
			}
			return new string(this, 0, startIndex);
		}

		public string Remove(int startIndex, int count) {
			if (startIndex < 0 || count < 0 || startIndex + count >= this.length) {
				throw new ArgumentOutOfRangeException();
			}
			int pos2 = startIndex+count;
			return (new string(this, 0, startIndex)) + (new string(this, pos2, this.length - pos2));
		}

		public void CopyTo(int sourceIndex, char[] destination, int destinationIndex, int count) {
			if (destination == null) {
				throw new ArgumentNullException("destination");
			}
			if (sourceIndex < 0 || sourceIndex > this.length) {
				throw new ArgumentOutOfRangeException ("sourceIndex");
			}
			if (destinationIndex < 0 || destinationIndex > destination.Length) {
				throw new ArgumentOutOfRangeException ("destinationIndex");
			}
			if (count < 0 || count > this.length - sourceIndex || count > destination.Length - destinationIndex) {
				throw new ArgumentOutOfRangeException ("count");
			}
			InternalCopyTo(sourceIndex, destination, destinationIndex, count);
		}

		#endregion

		#region Compare and CompareOrdinal Methods

		public static int Compare(string strA, string strB) {
			return CompareOrdinal(strA, strB);
		}

		public static int Compare(string strA, int indexA, string strB, int indexB, int length) {
			return CompareOrdinal(strA.Substring(indexA, length), strB.Substring(indexB, length));
		}

		public static int Compare(string strA, int indexA, string strB, int indexB, int length, StringComparison comparisonType) {
			return Compare(strA.Substring(indexA, length), strB.Substring(indexB, length), comparisonType);
		}

		public static int Compare(string strA, string strB, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.CurrentCultureIgnoreCase:
					throw new Exception("String.Compare(a,b,StringComparison.CurrentCulture) is not implemented.");
				case StringComparison.InvariantCulture:
				case StringComparison.Ordinal:
					return CompareOrdinal(strA, strB);
				case StringComparison.InvariantCultureIgnoreCase:
				case StringComparison.OrdinalIgnoreCase:
					return CompareOrdinal(strA.ToUpperInvariant(), strB.ToUpperInvariant());
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static int CompareOrdinal(string strA, string strB);

		#endregion

		#region IndexOf... Methods

		public int IndexOf(string value) {
			return IndexOfOrdinal(value, 0, this.length, forward: true);
		}

		public int IndexOf(string value, int startIndex) {
			return IndexOfOrdinal(value, startIndex, this.length - startIndex, forward: true);
		}

		public int IndexOf(string value, int startIndex, int count) {
			return IndexOfOrdinal(value, startIndex, count, forward: true);
		}

		public int IndexOf(string value, StringComparison comparisonType) {
			return IndexOf(value, 0, this.length, comparisonType);
		}

		public int IndexOf(string value, int startIndex, StringComparison comparisonType) {
			return IndexOf(value, startIndex, this.length - startIndex, comparisonType);
		}

		public int IndexOf(string value, int startIndex, int count, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.InvariantCulture:
				case StringComparison.Ordinal:
					return IndexOfOrdinal(value, startIndex, count, forward: true);
				case StringComparison.CurrentCultureIgnoreCase:
					throw new Exception("String.IndexOf(s,i,c,StringComparison.CurrentCultureIgnoreCase) is not implemented.");
				case StringComparison.InvariantCultureIgnoreCase:
				case StringComparison.OrdinalIgnoreCase:
					return ToUpperInvariant().IndexOfOrdinal(value.ToUpperInvariant(), startIndex, count, forward: true);
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		public int LastIndexOf(string value) {
			return IndexOfOrdinal(value, this.length - 1, this.length, forward: false);
		}

		public int LastIndexOf(string value, int startIndex) {
			return IndexOfOrdinal(value, startIndex, startIndex + 1, forward: false);
		}

		public int LastIndexOf(string value, int startIndex, int count) {
			return IndexOfOrdinal(value, startIndex, count, forward: false);
		}

		public int LastIndexOf(string value, StringComparison comparisonType) {
			return LastIndexOf(value, this.length - 1, this.length, comparisonType);
		}

		public int LastIndexOf(string value, int startIndex, StringComparison comparisonType) {
			return LastIndexOf(value, startIndex, startIndex + 1, comparisonType);
		}

		public int LastIndexOf(string value, int startIndex, int count, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.InvariantCulture:
				case StringComparison.Ordinal:
					return IndexOfOrdinal(value, startIndex, count, forward: false);
				case StringComparison.CurrentCultureIgnoreCase:
					throw new Exception("String.LastIndexOf(s,i,c,StringComparison.CurrentCultureIgnoreCase) is not implemented.");
				case StringComparison.InvariantCultureIgnoreCase:
				case StringComparison.OrdinalIgnoreCase:
					return ToUpperInvariant().IndexOfOrdinal(value.ToUpperInvariant(), startIndex, count, forward: false);
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		private int IndexOfOrdinal(string value, int startIndex, int count, bool forward) {
			if (value == null) {
				throw new ArgumentNullException("value");
			}
			if (this.length == 0) {
				return value.Length == 0 ? 0 : -1;
			}
			if (startIndex < 0 || startIndex > this.length) {
				throw new ArgumentOutOfRangeException ("startIndex");
			}
			if (count < 0 || count > (forward ? this.length - startIndex : startIndex + 1)) {
				throw new ArgumentOutOfRangeException ("count");
			}
			return InternalIndexOfStr(value, startIndex, count, forward);
		}

		public int IndexOf(char value) {
			return IndexOfOrdinal(value, 0, this.length, forward: true);
		}

		public int IndexOf(char value, int startIndex) {
			return IndexOfOrdinal(value, startIndex, this.length - startIndex, forward: true);
		}

		public int IndexOf(char value, int startIndex, int count) {
			return IndexOfOrdinal(value, startIndex, count, forward: true);
		}

		public int LastIndexOf(char value) {
			return IndexOfOrdinal(value, this.length - 1, this.length, forward: false);
		}

		public int LastIndexOf(char value, int startIndex) {
			return IndexOfOrdinal(value, startIndex, startIndex + 1, forward: false);
		}

		public int LastIndexOf(char value, int startIndex, int count) {
			return IndexOfOrdinal(value, startIndex, count, forward: false);
		}

		private int IndexOfOrdinal(char value, int startIndex, int count, bool forward) {
			if (this.length == 0) {
				return -1;
			}
			if (startIndex < 0 || startIndex > this.length) {
				throw new ArgumentOutOfRangeException ("startIndex");
			}
			if (count < 0 || count > (forward ? this.length - startIndex: startIndex + 1)) {
				throw new ArgumentOutOfRangeException ("count");
			}
			return InternalIndexOf(value, startIndex, count, forward);
		}

		public int IndexOfAny(char[] anyOf) {
			return IndexOfOrdinal(anyOf, 0, this.length, forward: true);
		}

		public int IndexOfAny(char[] anyOf, int startIndex) {
			return IndexOfOrdinal(anyOf, startIndex, this.length - startIndex, forward: true);
		}

		public int IndexOfAny(char[] anyOf, int startIndex, int count) {
			return IndexOfOrdinal(anyOf, startIndex, count, forward: true);
		}

		public int LastIndexOfAny(char[] anyOf) {
			return IndexOfOrdinal(anyOf, this.length - 1, this.length, forward: false);
		}

		public int LastIndexOfAny(char[] anyOf, int startIndex) {
			return IndexOfOrdinal(anyOf, startIndex, startIndex + 1, forward: false);
		}

		public int LastIndexOfAny(char[] anyOf, int startIndex, int count) {
			return IndexOfOrdinal(anyOf, startIndex, count, forward: false);
		}

		private int IndexOfOrdinal(char[] anyOf, int startIndex, int count, bool forward) {
			if (this.length == 0) {
				return -1;
			}
			if (startIndex < 0 || startIndex > this.length) {
				throw new ArgumentOutOfRangeException ("startIndex");
			}
			if (count < 0 || count > (forward ? this.length - startIndex: startIndex + 1)) {
				throw new ArgumentOutOfRangeException ("count");
			}
			return InternalIndexOfAny(anyOf, startIndex, count, forward);
		}

		#endregion

		#region Case methods

		public string ToLower() {
			return ToLower(CultureInfo.CurrentCulture);
		}

		public string ToLower(CultureInfo culture) {
			if (culture == null) {
				throw new ArgumentNullException("culture");
			}
			if (culture.LCID == 0x007f) {
				return ToLowerInvariant();
			}
			return culture.TextInfo.ToLower(this);
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public string ToLowerInvariant();

		public string ToUpper() {
			return ToUpper(CultureInfo.CurrentCulture);
		}

		public string ToUpper(CultureInfo culture) {
			if (culture == null) {
				throw new ArgumentNullException("culture");
			}
			if (culture.LCID == 0x007f) {
				return ToUpperInvariant();
			}
			return culture.TextInfo.ToUpper(this);
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public string ToUpperInvariant();

		#endregion

		#region Overrides and Operators

		public override string ToString() {
			return this;
		}

		public override bool Equals(object obj) {
			return Equals(this, obj as string);
		}

		public bool Equals(string value) {
			return Equals(this, value);
		}

		public bool Equals(string value, StringComparison comparisonType) {
			return Equals(this, value, comparisonType);
		}

		public static bool operator ==(string a, string b) {
			return Equals(a, b);
		}

		public static bool operator !=(string a, string b) {
			return !Equals(a, b);
		}

		public static bool Equals(string a, string b, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.InvariantCulture:
				case StringComparison.Ordinal:
					return Equals(a, b);
				case StringComparison.CurrentCultureIgnoreCase:
					throw new Exception("String.Equals(a,b,StringComparison.CurrentCultureIgnoreCase) is not implemented.");
				case StringComparison.InvariantCultureIgnoreCase:
				case StringComparison.OrdinalIgnoreCase:
					return Equals(a.ToUpperInvariant(), b.ToUpperInvariant());
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static bool Equals(string a, string b);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public override int GetHashCode();

		#endregion

		#region IClonable Members

		public object Clone() {
			return this;
		}

		#endregion

		#region IComparable Members

		public int CompareTo(object value) {
			if (value == null) {
				return 1;
			}
			if (!(value is string)) {
				throw new ArgumentException();
			}
			return string.Compare(this, (string)value);
		}

		public int CompareTo(string value) {
			if (value == null)
				return 1;

			return string.Compare(this, value);
		}

		#endregion

		#region IEnumerable Members

		public IEnumerator GetEnumerator() {
			return new CharEnumerator(this);
		}

		IEnumerator<char> IEnumerable<char>.GetEnumerator() {
			return new CharEnumerator(this);
		}

		#endregion

		#region Parsing

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal static string InternalFromInt32(int value);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal static string InternalFromInt64(long value);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal static string InternalFromUInt32(uint value);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal static string InternalFromUInt64(ulong value);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal static string InternalFromSingle(float value);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal static string InternalFromDouble(double value);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal int InternalToInt32(out int error, int radix);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal long InternalToInt64(out int error, int radix);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal uint InternalToUInt32(out int error, int radix);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal ulong InternalToUInt64(out int error, int radix);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal float InternalToSingle(out int error);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal double InternalToDouble(out int error);

		internal static Exception GetFormatException(int error) {
			//TODO: exception based on error
			return new FormatException("Input string was not in the correct format");
		}

		#endregion
	}
}
#endif
