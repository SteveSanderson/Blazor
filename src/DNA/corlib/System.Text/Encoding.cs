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

namespace System.Text {

	public abstract class Encoding : ICloneable {

		private static object lockObj = new object();

		#region Static common Encoding properties

		private static Encoding unicodeEncoding = null;
		private static Encoding utf8Encoding = null;
		private static Encoding utf8UnmarkedEncoding = null;

		public static Encoding Unicode {
			get {
				if (unicodeEncoding == null) {
					lock (lockObj) {
						if (unicodeEncoding == null) {
							unicodeEncoding = new UnicodeEncoding(true, false);
						}
					}
				}
				return unicodeEncoding;
			}
		}

		public static Encoding UTF8 {
			get {
				if (utf8Encoding == null) {
					lock (lockObj) {
						if (utf8Encoding == null) {
							utf8Encoding = new UTF8Encoding(true);
						}
					}
				}
				return utf8Encoding;
			}
		}

		public static Encoding UTF8Unmarked {
			get {
				if (utf8UnmarkedEncoding == null) {
					lock (lockObj) {
						if (utf8UnmarkedEncoding == null) {
							utf8UnmarkedEncoding = new UTF8Encoding(false);
						}
					}
				}
				return utf8UnmarkedEncoding;
			}
		}

		#endregion

		public virtual byte[] GetPreamble() {
			return new byte[0];
		}

		public abstract int GetMaxCharCount(int byteCount);

		public abstract Decoder GetDecoder();


		#region ICloneable Members

		public object Clone() {
			return (Encoding)object.Clone(this);
		}

		#endregion
	}

}

#endif
