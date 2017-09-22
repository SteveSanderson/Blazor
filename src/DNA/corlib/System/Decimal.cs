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
	public struct Decimal {
		// some constants
		private const uint MAX_SCALE = 28;
		private const uint SIGN_FLAG = 0x80000000;
		private const int SCALE_SHIFT = 16;
		private const uint RESERVED_SS32_BITS = 0x7F00FFFF;

		// internal representation of decimal
#pragma warning disable 0169, 0649
		private uint flags;
		private uint hi;
		private uint lo;
		private uint mid;
#pragma warning restore 0169, 0649

		public Decimal(int[] bits) {
			if (bits == null || bits.Length != 4) {
				throw new ArgumentException("bits");
			}
			lo = (uint) bits[0];
			mid = (uint) bits[1];
			hi = (uint) bits[2];
			flags = (uint) bits[3];
			byte scale = (byte)(flags >> SCALE_SHIFT);
			if (scale > MAX_SCALE || (flags & RESERVED_SS32_BITS) != 0) {
				throw new ArgumentException ("Invalid bits[3]");
			}
		}

		public static Decimal op_UnaryNegation(Decimal d) {
			d.flags ^= SIGN_FLAG;
			return d;
		}

		public static int[] GetBits(Decimal d) {
			return new int[] { (int)d.lo, (int)d.mid, (int)d.hi, (int)d.flags };
		}

		public override string ToString() {
			return ToString(null, null);
		}

		public string ToString(IFormatProvider fp) {
			return ToString(null, fp);
		}

		public string ToString(string format) {
			return ToString(format, null);
		}

		public string ToString(string format, IFormatProvider fp) {
			NumberFormatInfo nfi = NumberFormatInfo.GetInstance(fp);
			return NumberFormatter.NumberToString(format, this, nfi);
		}

	}
}

#endif