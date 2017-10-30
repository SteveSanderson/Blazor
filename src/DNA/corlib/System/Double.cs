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

using System.Globalization;
namespace System {
	public struct Double : IFormattable, IComparable, IComparable<double>, IEquatable<double> {

		public const double Epsilon = 4.9406564584124650e-324;
		public const double MaxValue = 1.7976931348623157e308;
		public const double MinValue = -1.7976931348623157e308;
		public const double NaN = 0.0d / 0.0d;
		public const double NegativeInfinity = -1.0d / 0.0d;
		public const double PositiveInfinity = 1.0d / 0.0d;

#pragma warning disable 0169, 0649
		internal double m_value;
#pragma warning restore 0169, 0649

		public static bool IsNaN(double d) {
#pragma warning disable 1718
			return d != d;
#pragma warning restore
		}

		public static bool IsNegativeInfinity(double d) {
			return (d < 0.0d && (d == NegativeInfinity || d == PositiveInfinity));
		}

		public static bool IsPositiveInfinity(double d) {
			return (d > 0.0d && (d == NegativeInfinity || d == PositiveInfinity));
		}

		public static bool IsInfinity(double d) {
			return (d == PositiveInfinity || d == NegativeInfinity);
		}

		public override bool Equals(object o) {
			if (!(o is System.Double)) {
				return false;
			}
			if (IsNaN((double)o)) {
				return IsNaN(this.m_value);
			}
			return ((double)o) == this.m_value;
		}

		public override int GetHashCode() {
			double d = m_value;
			return BitConverter.DoubleToInt64Bits(d).GetHashCode();
		}

		#region Parsing

		public static double Parse(string s) {
			return Parse(s, NumberStyles.Float, null);
		}

		public static double Parse(string s, NumberStyles style) {
			return Parse(s, style, null);
		}

		public static double Parse(string s, IFormatProvider formatProvider) {
			return Parse(s, NumberStyles.Float, formatProvider);
		}

		public static double Parse(string s, NumberStyles style, IFormatProvider formatProvider) {
			if (s == null) {
				throw new ArgumentNullException();
			}
			//TODO: use style and provider
			int error = 0;
			double result = s.InternalToDouble(out error);
			if (error != 0) {
				throw String.GetFormatException(error);
			}
			return result;
		}

		public static bool TryParse(string s, out double result) {
			return TryParse(s, NumberStyles.Float, null, out result);
		}

		public static bool TryParse(string s, NumberStyles style, IFormatProvider provider, out double result) {
			if (s == null) {
				result = 0;
				return false;
			}
			//TODO: use style and provider
			int error;
			result = s.InternalToDouble(out error);
			return error == 0;
		}

		#endregion

		#region ToString methods

		public override string ToString() {
			// return ToString(null, null);
			return String.InternalFromDouble(this.m_value);
		}

		public string ToString(IFormatProvider formatProvider) {
			return ToString(null, formatProvider);
		}

		public string ToString(string format) {
			return ToString(format, null);
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
			if (!(obj is double)) {
				throw new ArgumentException();
			}
			return this.CompareTo((double)obj);
		}

		#endregion

		#region IComparable<double> Members

		public int CompareTo(double x) {
			if (double.IsNaN(this.m_value)) {
				return double.IsNaN(x) ? 0 : -1;
			}
			if (double.IsNaN(x)) {
				return 1;
			}
			return (this.m_value > x) ? 1 : ((this.m_value < x) ? -1 : 0);
		}

		#endregion

		#region IEquatable<double> Members

		public bool Equals(double x) {
			if (double.IsNaN(this.m_value)) {
				return double.IsNaN(x);
			}
			return this.m_value == x;
		}

		#endregion

	}
}

#endif
