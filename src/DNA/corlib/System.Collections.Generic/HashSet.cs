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
using System.Linq;
using System.Text;

namespace System.Collections.Generic {

	public class HashSet<T> : ICollection<T>, IEnumerable<T>, IEnumerable {

		public struct Enumerator : IEnumerator<T>, IEnumerator, IDisposable {

			internal Enumerator(HashSet<T> hashSet) {
				this.en = hashSet.dict.Keys.GetEnumerator();
			}

			private IEnumerator<T> en;

			public T Current {
				get {
					return this.en.Current;
				}
			}

			public void Dispose() {
			}

			object IEnumerator.Current {
				get {
					return this.en.Current;
				}
			}

			public bool MoveNext() {
				return this.en.MoveNext();
			}

			public void Reset() {
				this.en.Reset();
			}

		}

		private Dictionary<T, object> dict;

		public HashSet() {
			this.dict = new Dictionary<T, object>();
		}

		public HashSet(IEnumerable<T> collection) : this(collection, null) { }

		public HashSet(IEqualityComparer<T> comparer) {
			this.dict = new Dictionary<T, object>(comparer);
		}

		public HashSet(IEnumerable<T> collection, IEqualityComparer<T> comparer) {
			if (collection == null) {
				throw new ArgumentNullException();
			}
			this.dict = new Dictionary<T, object>(comparer);
			foreach (T item in collection) {
				this.dict[item] = null;
			}
		}

		public bool Add(T item) {
			bool ret = !this.dict.ContainsKey(item);
			this.dict[item] = null;
			return ret;
		}

		public void Clear() {
			this.dict.Clear();
		}

		public bool Contains(T item) {
			return this.dict.ContainsKey(item);
		}

		public void CopyTo(T[] array) {
			throw new NotImplementedException();
		}

		public void CopyTo(T[] array, int arrayIndex) {
			throw new NotImplementedException();
		}

		public void CopyTo(T[] array, int arrayIndex, int count) {
			throw new NotImplementedException();
		}

		public Enumerator GetEnumerator() {
			return new Enumerator(this);
		}

		public bool Remove(T item) {
			return this.dict.Remove(item);
		}

		public IEqualityComparer<T> Comparer {
			get {
				return this.dict.Comparer;
			}
		}

		public int Count {
			get {
				return this.dict.Count;
			}
		}


		#region Interface Members

		void ICollection<T>.Add(T item) {
			this.Add(item);
		}

		bool ICollection<T>.IsReadOnly {
			get {
				return false;
			}
		}

		IEnumerator<T> IEnumerable<T>.GetEnumerator() {
			return new Enumerator(this);
		}

		IEnumerator IEnumerable.GetEnumerator() {
			return new Enumerator(this);
		}

		#endregion
	}

}
