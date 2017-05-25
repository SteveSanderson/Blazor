#if !LOCALTEST

using System.Runtime.CompilerServices;
namespace System {
	public static class BitConverter {

		public static readonly bool IsLittleEndian = AmILittleEndian();

		private unsafe static bool AmILittleEndian() {
			int i = 1;
			byte b = *((byte*)&i);
			return (b == 1);
		}

		public unsafe static long DoubleToInt64Bits(double value) {
			return *((long*)&value);
		}

	}
}

#endif
