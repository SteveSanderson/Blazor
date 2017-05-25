#if !LOCALTEST

namespace System.Text {
	public class UTF8Encoding : Encoding {

		private class UTF8Decoder : Decoder {

			private byte b0, b1, b2, b3;
			private int bufOfs = 0;

			protected override int GetCharsSafe(byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex, bool flush) {
				int charIndexOrg = charIndex;
				int charsLen = chars.Length;
				char ch = '\u0000';
				bool chSet = false;
				for (int i = 0; i < byteCount; i++) {
					byte b = bytes[byteIndex + i];
					switch (bufOfs) {
					case 0:
						if (b < 0x80) {
							ch = (char)b;
							chSet = true;
						} else {
							b0 = b;
							bufOfs = 1;
						}
						break;
					case 1:
						if ((b0 & 0xe0) == 0xc0) {
							ch = (char)(((b0 & 0x1f) << 6) | (b & 0x3f));
							chSet = true;
						} else {
							b1 = b;
							bufOfs = 2;
						}
						break;
					case 2:
						if ((b0 & 0xf0) == 0xe0) {
							ch = (char)(((b0 & 0x0f) << 12) | ((b1 & 0x3f) << 6) | (b & 0x3f));
							chSet = true;
						} else {
							b2 = b;
							bufOfs = 3;
						}
						break;
					case 3:
						if ((b0 & 0xf8) == 0xf0) {
							ch = (char)(((b0 & 0x07) << 18) | ((b1 & 0x3f) << 12) | ((b2 & 0x3f) << 6) | (b & 0x3f));
							chSet = true;
						} else {
							b3 = b;
							bufOfs = 4;
						}
						break;
					default:
						throw new NotSupportedException("Cannot handle UTF8 characters more than 4 bytes");
					}
					if (chSet) {
						if (charIndex >= charsLen) {
							throw new ArgumentException();
						}
						chars[charIndex++] = ch;
						bufOfs = 0;
						chSet = false;
					}
				}
				if (flush) {
					bufOfs = 0;
				}
				return charIndex - charIndexOrg;
			}

		}

		private bool emitIdentifier;
		private bool throwOnInvalidBytes;

		public UTF8Encoding() : this(false, false) { }

		public UTF8Encoding(bool encoderShouldEmitUTF8Identifier) : this(encoderShouldEmitUTF8Identifier, false) { }

		public UTF8Encoding(bool encoderShouldEmitUTF8Identifier, bool throwOnInvalidBytes) {
			this.emitIdentifier = encoderShouldEmitUTF8Identifier;
			this.throwOnInvalidBytes = throwOnInvalidBytes;
		}

		public override byte[] GetPreamble() {
			if (emitIdentifier) {
				return new byte[3] { 0xef, 0xbb, 0xbf };
			} else {
				return new byte[0];
			}
		}

		public override int GetMaxCharCount(int byteCount) {
			if (byteCount < 0) {
				throw new ArgumentOutOfRangeException("byteCount");
			}
			return byteCount;
		}

		public override Decoder GetDecoder() {
			return new UTF8Decoder();
		}

	}
}

#endif
