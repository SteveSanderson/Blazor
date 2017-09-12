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

namespace System {
	public delegate TOutput Converter<TInput, TOutput>(TInput input);

    public class Convert {
        public static int ToInt32(Byte b) => (int)b;
        public static int ToInt32(Single f) => (int)f;
        public static int ToInt32(Double d) => (int)d;

        public static int ToInt32(string str, int fromBase) {
            int res = 0;
            if (fromBase == 2) {
                for(int i = 0; i < str.Length; ++i) {
                    var s = str[i];
                    if ((char)s == '0') {
                        res <<= 1;
                    } else {
                        res <<= 1;
                        res += 1;
                    }
                }
                return res;
            }
            return res;
        }

        public static uint ToUInt32(UInt64 i) => (uint)i;
        public static decimal ToDecimal(Int32 i) => throw new NotImplementedException();
        public static decimal ToDecimal(string str) => throw new NotImplementedException();

    }
}

#endif
