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
	public struct Single : IFormattable, IComparable, IComparable<float>, IEquatable<float> {

		public const float Epsilon = 1.4e-45f;
		public const float MaxValue = 3.40282346638528859e38f;
		public const float MinValue = -3.40282346638528859e38f;
		public const float NaN = 0.0f / 0.0f;
		public const float PositiveInfinity = 1.0f / 0.0f;
		public const float NegativeInfinity = -1.0f / 0.0f;

#pragma warning disable 0169, 0649
		private float m_value;
#pragma warning restore 0169, 0649

		public static bool IsNaN(float f) {
#pragma warning disable 1718
			return (f != f);
#pragma warning restore
		}

		public static bool IsNegativeInfinity(float f) {
			return (f < 0.0f && (f == NegativeInfinity || f == PositiveInfinity));
		}

		public static bool IsPositiveInfinity(float f) {
			return (f > 0.0f && (f == NegativeInfinity || f == PositiveInfinity));
		}

		public static bool IsInfinity(float f) {
			return (f == PositiveInfinity || f == NegativeInfinity);
		}

		public override bool Equals(object o) {
			if (!(o is Single)) {
				return false;
			}
			if (IsNaN((float)o)) {
				return IsNaN(this);
			}
			return ((float)o).m_value == this.m_value;
		}

		public override int GetHashCode() {
			float f = this.m_value;
			return BitConverter.DoubleToInt64Bits(f).GetHashCode();
		}

		#region Parsing

		public static float Parse(string s) {
			return Parse(s, NumberStyles.Float, null);
		}

		public static float Parse(string s, NumberStyles style) {
			return Parse(s, style, null);
		}

		public static float Parse(string s, IFormatProvider formatProvider) {
			return Parse(s, NumberStyles.Float, formatProvider);
		}

		public static float Parse(string s, NumberStyles style, IFormatProvider formatProvider) {
			if (s == null) {
				throw new ArgumentNullException();
			}
			//TODO: use style and provider
			int error = 0;
			float result = s.InternalToSingle(out error);
			if (error != 0) {
				throw String.GetFormatException(error);
			}
			return result;
		}

		public static bool TryParse(string s, out float result) {
			return TryParse(s, NumberStyles.Float, null, out result);
		}

		public static bool TryParse(string s, NumberStyles style, IFormatProvider provider, out float result) {
			if (s == null) {
				result = 0;
				return false;
			}
			//TODO: use style and provider
			int error;
			result = s.InternalToSingle(out error);
			return error == 0;
		}

		#endregion

		#region ToString methods

		public override string ToString() {
			// return ToString(null, null);
			return String.InternalFromSingle(this.m_value);
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
			if (!(obj is float)) {
				throw new ArgumentException();
			}
			return this.CompareTo((float)obj);
		}

		#endregion

		#region IComparable<float> Members

		public int CompareTo(float x) {
			if (float.IsNaN(this.m_value)) {
				return float.IsNaN(x) ? 0 : -1;
			}
			if (float.IsNaN(x)) {
				return 1;
			}
			return (this.m_value > x) ? 1 : ((this.m_value < x) ? -1 : 0);
		}

		#endregion

		#region IEquatable<float> Members

		public bool Equals(float x) {
			if (float.IsNaN(this.m_value)) {
				return float.IsNaN(x);
			}
			return this.m_value == x;
		}

		#endregion

	}
}

#endif
