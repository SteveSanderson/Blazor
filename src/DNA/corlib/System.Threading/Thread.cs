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
using System.Globalization;

namespace System.Threading {
	public sealed class Thread {

        // These member vars MUST be synced with C code.
#pragma warning disable 0169, 0649
        private int managedThreadID = 0;
		private MulticastDelegate threadStart = null;
#pragma warning restore 0169, 0649
		private object param = null;
		private ThreadState threadState = ThreadState.Unstarted;

		private CultureInfo currentCulture;
		
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static void Sleep(int millisecondsTimeout);

		extern public static Thread CurrentThread {
			[MethodImpl(MethodImplOptions.InternalCall)]
			get;
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public Thread(ThreadStart threadStart);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public Thread(ParameterizedThreadStart threadStart);

		public int ManagedThreadId {
			get {
				return this.managedThreadID;
			}
		}

		public ThreadState ThreadState {
			get {
				return this.threadState;
			}
		}

		public bool IsBackground {
			get {
				return ((this.threadState & ThreadState.Background) != 0);
			}
			set {
				if (value) {
					this.threadState |= ThreadState.Background;
				} else {
					this.threadState &= ~ThreadState.Background;
				}
			}
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public void Start();

		public void Start(object param) {
			this.param = param;
			this.Start();
		}

		public CultureInfo CurrentCulture {
			get {
				if (this.currentCulture == null) {
					this.currentCulture = CultureInfo.InvariantCulture;
				}
				return this.currentCulture;
			}
			set {
				if (value == null) {
					throw new ArgumentNullException();
				}
				this.currentCulture = value;
			}
		}
	}
}

#endif
