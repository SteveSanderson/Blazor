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
	public abstract class Decoder {
		public virtual int GetChars(byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex) {
			return GetChars(bytes, byteIndex, byteCount, chars, charIndex, false);
		}

		public virtual int GetChars(byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex, bool flush) {
			if (bytes == null || chars == null) {
				throw new ArgumentNullException();
			}
			if (byteIndex < 0 || byteCount < 0 || charIndex < 0 ||
				byteIndex + byteCount > bytes.Length || charIndex >= chars.Length) {
				throw new ArgumentOutOfRangeException();
			}
			return GetCharsSafe(bytes, byteIndex, byteCount, chars, charIndex, flush);
		}

		protected abstract int GetCharsSafe(byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex, bool flush);
	}
}

#endif
