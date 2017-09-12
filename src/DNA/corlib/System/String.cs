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
		extern private string InternalReplace(string oldValue, string newValue);

		// trimType: bit 0 = start; bit 1 = end
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private string InternalTrim(char[] trimChars, int trimType);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private int InternalIndexOf(char value, int startIndex, int count, bool forwards);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private int InternalIndexOfAny(char[] anyOf, int startIndex, int count, bool forward);

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
			char[] tmp = new char [this.Length];
			for (int i = 0; i < tmp.Length; i++) {
				tmp[i] = this[i];
			}
			return tmp;
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

		public string[] Split(char[] separator, int count) {
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
					ret.Add(new string(this, pos, this.Length - pos));
					break;
				}
				ret.Add(new string(this, pos, sepPos - pos));
				pos = sepPos + 1;
			}

			return ret.ToArray();
		}

		public bool StartsWith(string str) {
			return this.Substring(0, str.Length) == str;
		}

		public bool EndsWith(string str) {
			return this.Substring(this.Length - str.Length, str.Length) == str;
		}

		public bool StartsWith(string str, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.InvariantCulture:
				case StringComparison.Ordinal:
					return StartsWith(str);
				case StringComparison.CurrentCultureIgnoreCase:
				case StringComparison.InvariantCultureIgnoreCase:
				case StringComparison.OrdinalIgnoreCase:
					return this.ToUpperInvariant().StartsWith(str.ToUpperInvariant()); //TODO: without alloc
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
				case StringComparison.InvariantCultureIgnoreCase:
				case StringComparison.OrdinalIgnoreCase:
					return this.ToUpperInvariant().EndsWith(str.ToUpperInvariant()); //TODO: without alloc
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
				throw new ArgumentNullException("args");
			}
			StringBuilder sb = new StringBuilder();
			foreach (var s in values) {
				sb.Append(s);
			}
			return sb.ToString();
		}

		public static string Concat(object obj0) {
			return obj0.ToString();
		}

		public static string Concat(object obj0, object obj1) {
			string str0 = (obj0 == null) ? null : obj0.ToString();
			string str1 = (obj1 == null) ? null : obj1.ToString();
			if (str0 == null) {
				return str1 ?? string.Empty;
			}
			if (str1 == null) {
				return str0;
			}
			return InternalConcat(str0, str1);
		}

		public static string Concat(object obj0, object obj1, object obj2) {
			return Concat(new object[] { obj0, obj1, obj2 });
		}

		public static string Concat(object obj0, object obj1, object obj2, object obj3) {
			return Concat(new object[] { obj0, obj1, obj2, obj3 });
		}

		public static string Concat(params object[] objs) {
			if (objs == null) {
				throw new ArgumentNullException("args");
			}
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < objs.Length; i++) {
				sb.Append(objs[i]);
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
			if (startIndex < 0 || startIndex > this.Length) {
				throw new ArgumentOutOfRangeException();
			}

			return new string(this, startIndex, this.Length - startIndex);
		}

		public string Substring(int startIndex, int length) {
			if (startIndex < 0 || length < 0 || startIndex + length > this.Length) {
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
			if (this.Length == 0) {
				return this;
			}
			if (newValue == null) {
				newValue = string.Empty;
			}
			return InternalReplace(oldValue, newValue);
		}

		public string Remove(int startIndex) {
			if (startIndex < 0 || startIndex >= this.Length) {
				throw new ArgumentOutOfRangeException("startIndex");
			}
			return new string(this, 0, startIndex);
		}

		public string Remove(int startIndex, int count) {
			if (startIndex < 0 || count < 0 || startIndex + count >= this.Length) {
				throw new ArgumentOutOfRangeException();
			}
			int pos2 = startIndex+count;
			return (new string(this, 0, startIndex)) + (new string(this, pos2, this.Length - pos2));
		}

		public void CopyTo(
			int sourceIndex,
			char[] destination,
			int destinationIndex,
			int count
		)
		{
			for (var i = 0; i < count; i++)
			{
				destination[destinationIndex + i] = this[sourceIndex + i];
			}
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
				case StringComparison.InvariantCulture:
				case StringComparison.InvariantCultureIgnoreCase:
					throw new Exception("The method or operation is not implemented.");
				case StringComparison.Ordinal:
					return CompareOrdinal(strA, strB);
				case StringComparison.OrdinalIgnoreCase:
					return CompareOrdinal(strA.ToUpperInvariant(), strB.ToUpperInvariant()); //TODO: without alloc
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		public static int CompareOrdinal(string strA, string strB) {
			if (strA == null) {
				if (strB == null) {
					return 0;
				}
				return -1;
			}
			if (strB == null) {
				return 1;
			}
			int top = Math.Min(strA.Length, strB.Length);
			for (int i = 0; i < top; i++) {
				if (strA[i] != strB[i]) {
					return (strA[i] - strB[i]);
				}
			}
			return strA.Length - strB.Length;
		}

		#endregion

		#region IndexOf... Methods

		public int IndexOf(string value) {
			return IndexOfOrdinal(value, 0, this.Length);
		}

		public int IndexOf(string value, int startIndex) {
			return IndexOfOrdinal(value, startIndex, this.Length - startIndex);
		}

		public int IndexOf(string value, int startIndex, int count) {
			return IndexOfOrdinal(value, startIndex, count);
		}

		public int IndexOf(string value, StringComparison comparisonType) {
			return IndexOf(value, 0, this.Length, comparisonType);
		}

		public int IndexOf(string value, int startIndex, StringComparison comparisonType) {
			return IndexOf(value, startIndex, this.Length - startIndex, comparisonType);
		}

		public int IndexOf(string value, int startIndex, int count, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.CurrentCultureIgnoreCase:
				case StringComparison.InvariantCulture:
				case StringComparison.InvariantCultureIgnoreCase:
					throw new Exception("The method or operation is not implemented.");
				case StringComparison.Ordinal:
					return IndexOfOrdinal(value, startIndex, count);
				case StringComparison.OrdinalIgnoreCase:
					return this.ToUpperInvariant().IndexOfOrdinal(value.ToUpperInvariant(), startIndex, count); //TODO: without alloc
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		internal int IndexOfOrdinal(string value, int startIndex, int count) {
			if (value == null) {
				throw new ArgumentNullException("value");
			}
			if (value.Length == 0) {
				return startIndex;
			}
			if (startIndex < 0 || startIndex > this.Length) {
				throw new ArgumentOutOfRangeException ("startIndex");
			}
			if (count < 0 || count > this.Length - startIndex) {
				throw new ArgumentOutOfRangeException ("count");
			}

			int valueLen = value.Length;
			int finalIndex = startIndex + count - valueLen + 1;
			char char0 = value[0];
			for (int i = startIndex; i < finalIndex; i++) {
				if (this[i] == char0) {
					bool ok = true;
					for (int j = 1; j < valueLen; j++) {
						if (this[i + j] != value[j]) {
							ok = false;
							break;
						}
					}
					if (ok) {
						return i;
					}
				}
			}
			return -1;
		}

		public int LastIndexOf(string value) {
			return LastIndexOfOrdinal(value, this.Length - 1, this.Length);
		}

		public int LastIndexOf(string value, int startIndex) {
			return LastIndexOfOrdinal(value, startIndex, startIndex + 1);
		}

		public int LastIndexOf(string value, int startIndex, int count) {
			return LastIndexOfOrdinal(value, startIndex, count);
		}

		public int LastIndexOf(string value, StringComparison comparisonType) {
			return LastIndexOf(value, this.Length - 1, this.Length, comparisonType);
		}

		public int LastIndexOf(string value, int startIndex, StringComparison comparisonType) {
			return LastIndexOf(value, startIndex, startIndex + 1, comparisonType);
		}

		public int LastIndexOf(string value, int startIndex, int count, StringComparison comparisonType) {
			switch (comparisonType) {
				case StringComparison.CurrentCulture:
				case StringComparison.CurrentCultureIgnoreCase:
				case StringComparison.InvariantCulture:
				case StringComparison.InvariantCultureIgnoreCase:
					throw new Exception("The method or operation is not implemented.");
				case StringComparison.Ordinal:
					return LastIndexOfOrdinal(value, startIndex, count);
				case StringComparison.OrdinalIgnoreCase:
					return this.ToUpperInvariant().LastIndexOfOrdinal(value.ToUpperInvariant(), startIndex, count); //TODO: without alloc
				default:
					throw new ArgumentException ("comparisonType");
			}
		}

		internal int LastIndexOfOrdinal(string value, int startIndex, int count) {
			if (value == null) {
				throw new ArgumentNullException("value");
			}
			if (this.Length == 0) {
				return value.Length == 0 ? 0 : -1;
			}
			if (value.Length == 0) {
				return Math.Min (this.Length - 1, startIndex);
			}
			if (startIndex < 0 || startIndex > this.Length) {
				throw new ArgumentOutOfRangeException ("startIndex");
			}
			if (count < 0 || count > startIndex + 1) {
				throw new ArgumentOutOfRangeException ("count");
			}

			if (startIndex == this.Length) {
				startIndex--;
				if (count > 0) { count--; }
			}
			
			int valueLen = value.Length;
			int finalIndex = startIndex - count;
			char char0 = value[0];
			for (int i = startIndex - valueLen + 1; i > finalIndex; i--) {
				if (this[i] == char0) {
					bool ok = true;
					for (int j = 1; j < valueLen; j++) {
						if (this[i + j] != value[j]) {
							ok = false;
							break;
						}
					}
					if (ok) {
						return i;
					}
				}
			}
			return -1;
		}

		public int IndexOf(char value) {
			return this.IndexOf(value, 0, this.Length, true);
		}

		public int IndexOf(char value, int startIndex) {
			return this.IndexOf(value, startIndex, this.Length - startIndex, true);
		}

		public int IndexOf(char value, int startIndex, int count) {
			return this.IndexOf(value, startIndex, count, true);
		}

		public int LastIndexOf(char value) {
			return this.IndexOf(value, 0, this.Length, false);
		}

		public int LastIndexOf(char value, int startIndex) {
			return this.IndexOf(value, startIndex, this.Length - startIndex, false);
		}

		public int LastIndexOf(char value, int startIndex, int count) {
			return this.IndexOf(value, startIndex, count, false);
		}

		private int IndexOf(char value, int startIndex, int count, bool forwards) {
			if (startIndex < 0 || count < 0 || startIndex + count > this.Length) {
				throw new ArgumentOutOfRangeException();
			}
			return this.InternalIndexOf(value, startIndex, count, forwards);
		}

		public int IndexOfAny(char[] anyOf) {
			return this.IndexOfAny(anyOf, 0, this.Length, true);
		}

		public int IndexOfAny(char[] anyOf, int startIndex) {
			return this.IndexOfAny(anyOf, startIndex, this.Length - startIndex, true);
		}

		public int IndexOfAny(char[] anyOf, int startIndex, int count) {
			return this.IndexOfAny(anyOf, startIndex, count, true);
		}

		public int LastIndexOfAny(char[] anyOf) {
			return this.IndexOfAny(anyOf, 0, this.Length, false);
		}

		public int LastIndexOfAny(char[] anyOf, int startIndex) {
			return this.IndexOfAny(anyOf, startIndex, this.Length - startIndex, false);
		}

		public int LastIndexOfAny(char[] anyOf, int startIndex, int count) {
			return this.IndexOfAny(anyOf, startIndex, count, false);
		}

		private int IndexOfAny(char[] anyOf, int startIndex, int count, bool forward) {
			if (startIndex < 0 || count < 0 || startIndex + count > this.Length) {
				throw new ArgumentOutOfRangeException();
			}
			return this.InternalIndexOfAny(anyOf, startIndex, count, forward);
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

		public string ToLowerInvariant() {
			int len = this.Length;
			StringBuilder sb = new StringBuilder(len);
			for (int i = 0; i < len; i++) {
				sb.Append(char.ToLowerInvariant(this[i]));
			}
			return sb.ToString();
		}

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

		public string ToUpperInvariant() {
			int len = this.Length;
			StringBuilder sb = new StringBuilder(len);
			for (int i = 0; i < len; i++) {
				sb.Append(char.ToUpperInvariant(this[i]));
			}
			return sb.ToString();
		}

		#endregion

		#region Overrides and Operators

		public override string ToString() {
			return this;
		}

		public override bool Equals(object obj) {
			return Equals(this, obj as string);
		}

		public static bool operator ==(string a, string b) {
			return Equals(a, b);
		}

		public static bool operator !=(string a, string b) {
			return !Equals(a, b);
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

		#region IEquatable<string> Members

		public bool Equals(string other) {
			return Equals(this, other);
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
		extern internal int InternalToInt32(out int error);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal long InternalToInt64(out int error);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal uint InternalToUInt32(out int error);
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern internal ulong InternalToUInt64(out int error);
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
