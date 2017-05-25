#if !LOCALTEST

using System.Runtime.CompilerServices;
using System.Globalization;
using System.Threading;

namespace System {
	public struct Int32 : IFormattable, IComparable, IComparable<int>,IEquatable<int> {
		public const int MaxValue = 0x7fffffff;
		public const int MinValue = -2147483648;

		internal int m_value;

		public override bool Equals(object obj) {
			return (obj is int && ((int)obj).m_value == this.m_value);
		}

		public override int GetHashCode() {
			return this.m_value;
		}

		#region Parse methods

		public static int Parse(string s) {
			return Parse(s, NumberStyles.Integer, null);
		}

		public static int Parse(string s, NumberStyles style) {
			return Parse(s, style, null);
		}

		public static int Parse(string s, IFormatProvider formatProvider) {
			return Parse(s, NumberStyles.Integer, formatProvider);
		}

		public static int Parse(string s, NumberStyles style, IFormatProvider formatProvider) {
			Exception e;
			int res;
			if (!ParseHelper.Parse(s, style, formatProvider, false, out res, out e)) {
				throw e;
			}
			return res;
		}

		public static bool TryParse(string s, out int result) {
			return TryParse(s, NumberStyles.Integer, null, out result);
		}

		public static bool TryParse(string s, NumberStyles style,IFormatProvider format, out int result) {
			Exception e;
			return ParseHelper.Parse(s, style, format, true, out result, out e);
		}

		#endregion

		#region ToString methods

		public override string ToString() {
			return NumberFormatter.FormatGeneral(new NumberFormatter.NumberStore(this.m_value));
		}

		public string ToString(IFormatProvider formatProvider) {
			return NumberFormatter.FormatGeneral(new NumberFormatter.NumberStore(this.m_value), formatProvider);
		}

		public string ToString(string format) {
			return this.ToString(format, null);
		}

		public string ToString(string format, IFormatProvider formatProvider) {
			NumberFormatInfo nfi = NumberFormatInfo.GetInstance(formatProvider);
			return NumberFormatter.NumberToString(format, this.m_value, nfi);
		}

		#endregion

		#region IComparable Members

		public int CompareTo(object obj) {
			if (obj == null) {
				return 1;
			}
			if (!(obj is int)){
				throw new ArgumentException();
			}
			return this.CompareTo((int)obj);
		}

		#endregion

		#region IComparable<int> Members

		public int CompareTo(int x) {
			return (this.m_value > x) ? 1 : ((this.m_value < x) ? -1 : 0);
		}

		#endregion

		#region IEquatable<int> Members

		public bool Equals(int x) {
			return this.m_value == x;
		}

		#endregion

	}
}

#endif
