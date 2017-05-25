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
using System.Collections;

#if LOCALTEST
namespace System_.Linq {
#else
namespace System.Linq {
#endif
	class OrderedEnumerable<TElement, TKey> : IOrderedEnumerable<TElement> {

		private class QuickSort {

			public QuickSort(IEnumerable<TElement> source,
				Func<TElement, TKey> selector, IComparer<TKey> comparer, bool ascending) {
				this.comparer = comparer;
				this.ascending = ascending;
				this.elements = source.ToArray();
				int len = this.elements.Length;
				this.keys = new TKey[len];
				this.order = new int[len];
				for (int i = 0; i < len; i++) {
					this.keys[i] = selector(this.elements[i]);
					this.order[i] = i;
				}
			}

			private IComparer<TKey> comparer;
			private bool ascending;
			private TElement[] elements;
			private TKey[] keys;
			private int[] order;
			private const int INSERTION_SORT_SIZE = 6;

			private void Swap(int idx0, int idx1) {
				if (idx0 != idx1) {
					int temp = this.order[idx0];
					this.order[idx0] = this.order[idx1];
					this.order[idx1] = temp;
				}
			}

			private void PerformSort(int startIdx, int endIdx) {
				// Special cases if lenth is 0, 1 or less than or equal to INSERTION_SORT_SIZE
				int length = endIdx - startIdx + 1;
				if (length <= 1) {
					return;
				}
				if (length <= INSERTION_SORT_SIZE) {
				    // Perform insertion sort
					for (int idx = startIdx + 1; idx <= endIdx; idx++) {
						int i, orderIdx = this.order[idx];
						TKey key = this.keys[orderIdx];
						for (i = idx; i > startIdx && this.comparer.Compare(key, this.keys[this.order[i - 1]]) < 0; i--) {
							this.order[i] = this.order[i - 1];
						}
						this.order[i] = orderIdx;
					}
					return;
				}
				// Perform quick-sort
				// Find the pivot value
				int pivotIdx;
				int midIdx = (startIdx + endIdx) / 2;
				TKey pivot0 = this.keys[this.order[startIdx]];
				TKey pivot1 = this.keys[this.order[midIdx]];
				TKey pivot2 = this.keys[this.order[endIdx]];
				bool _0lessthan1 = this.comparer.Compare(pivot0, pivot1) < 0;
				bool _1lessthan2 = this.comparer.Compare(pivot1, pivot2) < 0;
				if (_0lessthan1 == _1lessthan2) {
					pivotIdx = midIdx;
				} else {
					bool _0lessthan2 = this.comparer.Compare(pivot0, pivot2) < 0;
					pivotIdx = (_1lessthan2 == _0lessthan2) ? startIdx : endIdx;
				}
				TKey pivot = this.keys[this.order[pivotIdx]];
				//Console.WriteLine("S={4},M={5},E={6}  p0={1},p1={2},p2={3}  Pivot = {0}", pivot, pivot0, pivot1, pivot2, startIdx, midIdx, endIdx);
				// Perform sort
				this.Swap(pivotIdx, endIdx);
				int storeIndex = startIdx;
				for (int i = startIdx; i < endIdx; i++) {
					TKey value = this.keys[this.order[i]];
					// if value <= pivot
					if (this.comparer.Compare(value, pivot) <= 0) {
						this.Swap(storeIndex, i);
						storeIndex++;
					}
				}
				this.Swap(storeIndex, endIdx);
				this.PerformSort(startIdx, storeIndex - 1);
				this.PerformSort(storeIndex + 1, endIdx);
			}

			public IEnumerable<TElement> Sort() {
				int len = this.elements.Length;
				this.PerformSort(0, len - 1);
				if (this.ascending) {
					for (int i = 0; i < len; i++) {
						yield return this.elements[this.order[i]];
					}
				} else {
					for (int i = len - 1; i >= 0; i--) {
						yield return this.elements[this.order[i]];
					}
				}
			}

		}

		public OrderedEnumerable(IEnumerable<TElement> source,
			Func<TElement, TKey> selector, IComparer<TKey> comparer, bool ascending) {
			this.source = source;
			this.selector = selector;
			this.comparer = comparer ?? Comparer<TKey>.Default;
			this.ascending = ascending;
		}

		public IOrderedEnumerable<TElement> CreateOrderedEnumerable<TKey2>(
			Func<TElement, TKey2> selector, IComparer<TKey2> comparer, bool descending) {
			throw new NotImplementedException();
		}

		private IEnumerable<TElement> source;
		private Func<TElement, TKey> selector;
		private IComparer<TKey> comparer;
		private bool ascending;

		public IEnumerator<TElement> GetEnumerator() {
			QuickSort sort = new QuickSort(this.source, this.selector, this.comparer, this.ascending);
			return sort.Sort().GetEnumerator();
		}

		IEnumerator IEnumerable.GetEnumerator() {
			return this.GetEnumerator();
		}

	}
}
