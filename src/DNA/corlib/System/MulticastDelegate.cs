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
	public abstract class MulticastDelegate : Delegate {

		protected override Delegate CombineImpl(Delegate follow) {

			MulticastDelegate ret = (MulticastDelegate)object.Clone(this);
			MulticastDelegate cur = ret;

			// Clone and add all the current delegate(s)
			for (MulticastDelegate del = (MulticastDelegate)this.pNext; del != null; del = (MulticastDelegate)del.pNext) {
				cur.pNext = (MulticastDelegate)object.Clone(del);
				cur = (MulticastDelegate)cur.pNext;
			}

			// Add all the following delegate(s)
			cur.pNext = (MulticastDelegate)object.Clone(follow);
			cur = (MulticastDelegate)cur.pNext;
			for (MulticastDelegate del = (MulticastDelegate)((MulticastDelegate)follow).pNext; del != null; del = (MulticastDelegate)del.pNext) {
				cur.pNext = (MulticastDelegate)object.Clone(del);
				cur = (MulticastDelegate)cur.pNext;
			}
			cur.pNext = null;

			return ret;
		}

		protected override Delegate RemoveImpl(Delegate d) {

			MulticastDelegate ret = null, cur = null;

			for (MulticastDelegate del = this; del != null; del = (MulticastDelegate)del.pNext) {
				// Miss out the one we're removing
				if (!del.Equals(d)) {
					if (ret == null) {
						ret = (MulticastDelegate)object.Clone(del);
						cur = ret;
					} else {
						cur.pNext = (MulticastDelegate)object.Clone(del);
						cur = (MulticastDelegate)cur.pNext;
					}
				}
			}
			if (cur != null) {
				cur.pNext = null;
			}

			return ret;
		}

	}
}

#endif