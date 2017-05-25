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

using System.Runtime.CompilerServices;
namespace System {
	public static class GC {

		public static int MaxGeneration {
			get {
				return 2;
			}
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private static int Internal_CollectionCount();

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static void Collect();

		public static void Collect(int generation) {
			if (generation < 0) {
				throw new ArgumentOutOfRangeException("generation");
			}
			Collect();
		}

		public static int CollectionCount(int generation) {
			if (generation < 0) {
				throw new ArgumentOutOfRangeException("generation");
			}
			if (generation != 0) {
				return 0;
			}
			return Internal_CollectionCount();
		}

		public static int GetGeneration(object obj) {
			if (obj == null) {
				throw new NullReferenceException();
			}
			return 0;
		}

		public static int GetGeneration(WeakReference wr) {
			if (wr == null || !wr.IsAlive) {
				throw new NullReferenceException();
			}
			return 0;
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static long GetTotalMemory(bool forceFullCollection);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static void SuppressFinalize(object obj);

	}
}

#endif
