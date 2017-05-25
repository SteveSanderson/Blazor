// Copyright (c) 2009 DotNetAnywhere
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

using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Text;

namespace System.Linq {
	public class Lookup<TKey, TElement> : ILookup<TKey, TElement> {

		private Dictionary<TKey, IGrouping<TKey, TElement>> lookup;

		internal Lookup(Dictionary<TKey, List<TElement>> data) {
			this.lookup = new Dictionary<TKey, IGrouping<TKey, TElement>>(data.Comparer);
			foreach (var item in data) {
				this.lookup.Add(item.Key, new Grouping<TKey, TElement>(item.Key, item.Value));
			}
		}

		public bool Contains(TKey key) {
			return this.lookup.ContainsKey(key);
		}

		public int Count {
			get {
				return this.lookup.Count;
			}
		}

		public IEnumerable<TElement> this[TKey key] {
			get {
				return this.lookup[key];
			}
		}

		public IEnumerator<IGrouping<TKey, TElement>> GetEnumerator() {
			return this.lookup.Values.GetEnumerator();
		}

		IEnumerator IEnumerable.GetEnumerator() {
			return this.lookup.Values.GetEnumerator();
		}

	}
}
