#if !LOCALTEST

using System.Globalization;
namespace System {
	public struct Byte : IFormattable, IComparable, IComparable<byte>, IEquatable<byte> {
		public const byte MinValue = 0;
		public const byte MaxValue = 255;

#pragma warning disable 0169, 0649
        internal byte m_value;
#pragma warning restore 0169, 0649

        public override bool Equals(object obj) {
			return (obj is byte) && ((byte)obj).m_value == this.m_value;
		}

		public override int GetHashCode() {
			return (int)this.m_value;
		}

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
			if (!(obj is byte)) {
				throw new ArgumentException();
			}
			return this.CompareTo((byte)obj);
		}

		#endregion

		#region IComparable<byte> Members

		public int CompareTo(byte x) {
			return (this.m_value > x) ? 1 : ((this.m_value < x) ? -1 : 0);
		}

		#endregion

		#region IEquatable<byte> Members

		public bool Equals(byte x) {
			return this.m_value == x;
		}

		#endregion

	}
}

#endif
