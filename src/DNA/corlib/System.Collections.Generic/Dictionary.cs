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

using System;

#if LOCALTEST
using System.Collections;
using System.Collections.Generic;
namespace System_.Collections.Generic {
#else
namespace System.Collections.Generic {
#endif
	public class Dictionary<TKey, TValue> : IDictionary<TKey, TValue>, ICollection<KeyValuePair<TKey, TValue>>,
		IEnumerable<KeyValuePair<TKey, TValue>>, IDictionary, ICollection, IEnumerable {

		public struct Enumerator : IEnumerator<KeyValuePair<TKey, TValue>>,
			IDisposable, IDictionaryEnumerator, IEnumerator {

			Dictionary<TKey, TValue> dict;
			private int curSlot, curItem;

			internal Enumerator(Dictionary<TKey, TValue> dictionary) {
				this.dict = dictionary;
				this.curSlot = -1;
				this.curItem = 0;
			}

			public bool MoveNext() {
				do {
					if (this.curSlot >= this.dict.capacity) {
						return false;
					}
					if (this.curSlot < 0 || this.dict.keys[this.curSlot] == null ||
						this.curItem > this.dict.keys[this.curSlot].Count) {
						this.curSlot++;
						this.curItem = 0;
					} else {
						this.curItem++;
					}
					if (this.curSlot >= this.dict.capacity) {
						return false;
					}
				} while (this.dict.keys[this.curSlot] == null || this.curItem >= dict.keys[this.curSlot].Count);
				return true;
			}

			public KeyValuePair<TKey, TValue> Current {
				get {
					return new KeyValuePair<TKey, TValue>(
						this.dict.keys[this.curSlot][this.curItem],
						this.dict.values[this.curSlot][this.curItem]
						);
				}
			}

			object IEnumerator.Current {
				get { return this.Current; }
			}

			void IEnumerator.Reset() {
				this.curSlot = -1;
				this.curItem = 0;
			}

			DictionaryEntry IDictionaryEnumerator.Entry {
				get {
					return new DictionaryEntry(
						this.dict.keys[this.curSlot][this.curItem],
						this.dict.values[this.curSlot][this.curItem]
					);
				}
			}

			object IDictionaryEnumerator.Key {
				get {
					return dict.keys[this.curSlot][this.curItem];
				}
			}

			object IDictionaryEnumerator.Value {
				get {
					return this.dict.values[this.curSlot][this.curItem];
				}
			}

			public void Dispose() {
				this.dict = null;
			}
		}

		public sealed class KeyCollection : ICollection<TKey>, IEnumerable<TKey>, ICollection, IEnumerable {

			public struct Enumerator : IEnumerator<TKey>, IDisposable, IEnumerator {

				private Dictionary<TKey, TValue>.Enumerator hostEnumerator;

				internal Enumerator(Dictionary<TKey, TValue> host) {
					this.hostEnumerator = host.GetEnumerator();
				}

				public void Dispose() {
					this.hostEnumerator.Dispose();
				}

				public bool MoveNext() {
					return this.hostEnumerator.MoveNext();
				}

				public TKey Current {
					get { return this.hostEnumerator.Current.Key; }
				}

				object IEnumerator.Current {
					get { return this.hostEnumerator.Current.Key; }
				}

				void IEnumerator.Reset() {
					((IEnumerator)this.hostEnumerator).Reset();
				}
			}

			private Dictionary<TKey, TValue> dictionary;

			public KeyCollection(Dictionary<TKey, TValue> dictionary) {
				if (dictionary == null) {
					throw new ArgumentException("dictionary");
				}
				this.dictionary = dictionary;
			}

			public void CopyTo(TKey[] array, int index) {
				throw new NotImplementedException();
			}

			public Enumerator GetEnumerator() {
				return new Enumerator(this.dictionary);
			}

			void ICollection<TKey>.Add(TKey item) {
				throw new NotSupportedException("this is a read-only collection");
			}

			void ICollection<TKey>.Clear() {
				throw new NotSupportedException("this is a read-only collection");
			}

			bool ICollection<TKey>.Contains(TKey item) {
				return this.dictionary.ContainsKey(item);
			}

			bool ICollection<TKey>.Remove(TKey item) {
				throw new NotSupportedException("this is a read-only collection");
			}

			IEnumerator<TKey> IEnumerable<TKey>.GetEnumerator() {
				return this.GetEnumerator();
			}

			void ICollection.CopyTo(Array array, int index) {
				this.CopyTo((TKey[])array, index);
			}

			IEnumerator IEnumerable.GetEnumerator() {
				return this.GetEnumerator();
			}

			public int Count {
				get {
					return this.dictionary.Count;
				}
			}

			bool ICollection<TKey>.IsReadOnly {
				get {
					return true;
				}
			}

			bool ICollection.IsSynchronized {
				get {
					return false;
				}
			}

			object ICollection.SyncRoot {
				get {
					return ((ICollection)this.dictionary).SyncRoot;
				}
			}

		}

		public sealed class ValueCollection : ICollection<TValue>, IEnumerable<TValue>, ICollection, IEnumerable {

			public struct Enumerator : IEnumerator<TValue>, IDisposable, IEnumerator {

				private Dictionary<TKey, TValue>.Enumerator hostEnumerator;

				internal Enumerator(Dictionary<TKey, TValue> host) {
					this.hostEnumerator = host.GetEnumerator();
				}

				public void Dispose() {
					this.hostEnumerator.Dispose();
				}

				public bool MoveNext() {
					return this.hostEnumerator.MoveNext();
				}

				public TValue Current {
					get { return this.hostEnumerator.Current.Value; }
				}

				object IEnumerator.Current {
					get { return this.hostEnumerator.Current.Value; }
				}

				void IEnumerator.Reset() {
					((IEnumerator)this.hostEnumerator).Reset();
				}
			}

			private Dictionary<TKey, TValue> dictionary;

			public ValueCollection(Dictionary<TKey, TValue> dictionary) {
				if (dictionary == null) {
					throw new ArgumentException("dictionary");
				}
				this.dictionary = dictionary;
			}

			public void CopyTo(TValue[] array, int index) {
				throw new NotImplementedException();
			}

			public Enumerator GetEnumerator() {
				return new Enumerator(this.dictionary);
			}

			void ICollection<TValue>.Add(TValue item) {
				throw new NotSupportedException("this is a read-only collection");
			}

			void ICollection<TValue>.Clear() {
				throw new NotSupportedException("this is a read-only collection");
			}

			bool ICollection<TValue>.Contains(TValue item) {
				return this.dictionary.ContainsValue(item);
			}

			bool ICollection<TValue>.Remove(TValue item) {
				throw new NotSupportedException("this is a read-only collection");
			}

			IEnumerator<TValue> IEnumerable<TValue>.GetEnumerator() {
				return this.GetEnumerator();
			}

			void ICollection.CopyTo(Array array, int index) {
				this.CopyTo((TValue[])array, index);
			}

			IEnumerator IEnumerable.GetEnumerator() {
				return this.GetEnumerator();
			}

			public int Count {
				get {
					return this.dictionary.Count;
				}
			}

			bool ICollection<TValue>.IsReadOnly {
				get {
					return true;
				}
			}

			bool ICollection.IsSynchronized {
				get {
					return false;
				}
			}

			object ICollection.SyncRoot {
				get {
					return ((ICollection)this.dictionary).SyncRoot;
				}
			}

		}

		private static int[] capacities = {
			11, 23, 47, 97, 191, 379, 757, 1511, 3023, 6047, 12097, 24179, 48353, 96731
		};

		private List<TKey>[] keys;
		private List<TValue>[] values;
		private int capacity, capacityIndex, count;
		private IEqualityComparer<TKey> comparer;

		public Dictionary() {
			this.Init(0, null);
		}

		public Dictionary(IDictionary<TKey, TValue> dictionary) : this(dictionary, null) { }

		public Dictionary(IEqualityComparer<TKey> comparer) {
			this.Init(0, comparer);
		}

		public Dictionary(int capacity) {
			this.Init(capacity, null);
		}

		public Dictionary(IDictionary<TKey, TValue> dictionary, IEqualityComparer<TKey> comparer) {
			this.Init(dictionary.Count, comparer);
			foreach (var item in dictionary) {
				this.Add(item.Key, item.Value);
			}
		}

		public Dictionary(int capacity, IEqualityComparer<TKey> comparer) {
			this.Init(capacity, comparer);
		}

		private void Init(int initialCapacity, IEqualityComparer<TKey> comparer) {
			// Initialise the comparer
			this.comparer = comparer ?? EqualityComparer<TKey>.Default;
			// Initialise the capacity of the dictionary
			this.capacityIndex = -1;
			for (int i = 0; i < capacities.Length; i++) {
				if (initialCapacity <= capacities[i]) {
					this.capacityIndex = i;
					this.capacity = capacities[i];
					break;
				}
			}
			if (this.capacityIndex == -1){
				// If the capacity is off the end of the scale, then just use the capacity given
				this.capacity = initialCapacity;
				this.capacityIndex = capacities.Length;
			}
			this.Clear();
		}

		private int GetSlot(TKey key) {
			uint hash = (uint)key.GetHashCode();
			return (int)(hash % (uint)this.capacity);
		}

		public void Add(TKey key, TValue value) {
			Add(key, value, false);
		}

		private void Add(TKey key, TValue value, bool replace) {
			if (key == null) {
				throw new ArgumentNullException();
			}
			int slot = this.GetSlot(key);
			List<TKey> keySlot = this.keys[slot];
			if (keySlot != null) {
				// There are element(s) at this index, so see if this key is already in this dictionary
				// Can't use keySlot.IndexOf() because it doesn't honour the comparer
				for (int i = keySlot.Count - 1; i >= 0; i--) {
					if (this.comparer.Equals(keySlot[i], key)) {
						// The key is already in this dictionary
						if (replace) {
							this.values[slot][i] = value;
							return;
						} else {
							throw new ArgumentException("Key already exists in dictionary");
						}
					}
				}
				// Key not already in dictionary, so carry on
			}
			this.count++;
			if (this.count > this.capacity) {
				// Increase capacity
				List<TKey>[] currentKeys = this.keys;
				List<TValue>[] currentValues = this.values;
				this.capacityIndex++;
				this.capacity = (this.capacityIndex >= capacities.Length) ?
					this.capacity * 2 + 1 : capacities[this.capacityIndex];
				this.Clear();
				// Add all the items in this dictionary to the enlarged dictionary lists.
				for (int slotIdx = currentKeys.Length - 1; slotIdx >= 0; slotIdx--) {
					List<TKey> currentKeySlot = currentKeys[slotIdx];
					if (currentKeySlot != null) {
						List<TValue> currentValueSlot = currentValues[slotIdx];
						for (int listIdx = currentKeySlot.Count - 1; listIdx >= 0; listIdx--) {
							this.Add(currentKeySlot[listIdx], currentValueSlot[listIdx], false);
						}
					}
				}
                // Reload these values, as they will have changed due to dictionary capacity resizing
                slot = GetSlot(key);
				keySlot = this.keys[slot];
			}
			List<TValue> valueSlot;
			if (keySlot == null) {
				// There are no elements at this index, so create a new list for the element being added
				this.keys[slot] = keySlot = new List<TKey>(1);
				this.values[slot] = valueSlot = new List<TValue>(1);
			} else {
				valueSlot = this.values[slot];
			}
			keySlot.Add(key);
			valueSlot.Add(value);
		}

		public TValue this[TKey key] {
			get {
				TValue value;
				if (this.TryGetValue(key, out value)) {
					return value;
				}
				throw new KeyNotFoundException(key.ToString());
			}
			set {
				Add(key, value, true);
			}
		}

		public bool TryGetValue(TKey key, out TValue value) {
			if (key == null) {
				throw new ArgumentNullException();
			}
			int slot = this.GetSlot(key);
			List<TKey> keySlot = this.keys[slot];
			if (keySlot != null) {
				// Can't use keySlot.IndexOf() because it doesn't honour the comparer
				for (int i = keySlot.Count - 1; i >= 0; i--) {
					if (this.comparer.Equals(keySlot[i], key)) {
						value = this.values[slot][i];
						return true;
					}
				}
			}
			value = default(TValue);
			return false;
		}

		public bool ContainsKey(TKey key) {
			TValue dummy;
			return (TryGetValue(key, out dummy));
		}

		public bool ContainsValue(TValue value) {
			Enumerator e = new Enumerator(this);
			while (e.MoveNext()) {
				if (e.Current.Value.Equals(value)) {
					return true;
				}
			}
			return false;
		}

		public bool Remove(TKey key) {
			int slot = this.GetSlot(key);
			List<TKey> keySlot = this.keys[slot];
			if (keySlot != null) {
				// Can't use keySlot.IndexOf() because it doesn't honour the comparer
				for (int i = keySlot.Count - 1; i >= 0; i--) {
					if (this.comparer.Equals(keySlot[i], key)) {
						keySlot.RemoveAt(i);
						this.values[slot].RemoveAt(i);
						this.count--;
						return true;
					}
				}
			}
			return false;
		}

		public IEqualityComparer<TKey> Comparer {
			get {
				return this.comparer;
			}
		}

		public int Count {
			get {
				return this.count;
			}
		}

		public KeyCollection Keys {
			get {
				return new KeyCollection(this);
			}
		}

		public ValueCollection Values {
			get {
				return new ValueCollection(this);
			}
		}

		public bool IsReadOnly {
			get {
				return false;
			}
		}

		public void Clear() {
			this.keys = new List<TKey>[this.capacity];
			this.values = new List<TValue>[this.capacity];
			this.count = 0;
		}

		public Enumerator GetEnumerator() {
			return new Enumerator(this);
		}

		ICollection<TKey> IDictionary<TKey, TValue>.Keys {
			get {
				return new KeyCollection(this);
			}
		}

		ICollection<TValue> IDictionary<TKey, TValue>.Values {
			get {
				return new ValueCollection(this);
			}
		}

		void ICollection<KeyValuePair<TKey, TValue>>.Add(KeyValuePair<TKey, TValue> item) {
			this.Add(item.Key, item.Value);
		}

		bool ICollection<KeyValuePair<TKey, TValue>>.Contains(KeyValuePair<TKey, TValue> item) {
			return this.ContainsKey(item.Key);
		}

		void ICollection<KeyValuePair<TKey, TValue>>.CopyTo(KeyValuePair<TKey, TValue>[] array, int arrayIndex) {
			throw new Exception("The method or operation is not implemented.");
		}

		bool ICollection<KeyValuePair<TKey, TValue>>.Remove(KeyValuePair<TKey, TValue> item) {
			return this.Remove(item.Key);
		}

		IEnumerator<KeyValuePair<TKey, TValue>> IEnumerable<KeyValuePair<TKey, TValue>>.GetEnumerator() {
			return new Enumerator(this);
		}

		IEnumerator IEnumerable.GetEnumerator() {
			return new Enumerator(this);
		}

		public bool IsFixedSize {
			get {
				return false;
			}
		}

		object IDictionary.this[object key] {
			get {
				return this[(TKey)key];
			}
			set {
				this[(TKey)key] = (TValue)value;
			}
		}

		ICollection IDictionary.Keys {
			get {
				return Keys;
			}
		}

		ICollection IDictionary.Values {
			get {
				return Values;
			}
		}

		void IDictionary.Add(object key, object value) {
			Add((TKey)key, (TValue)value);
		}
		
		bool IDictionary.Contains(object key) {
			return ContainsKey((TKey)key);
		}

		IDictionaryEnumerator IDictionary.GetEnumerator() {
			return new Enumerator(this);
		}

		void IDictionary.Remove(object key) {
			Remove((TKey)key);
		}

		public bool IsSynchronized {
			get {
				return false;
			}
		}

		public object SyncRoot {
			get {
				return this;
			}
		}

		public void CopyTo(Array array, int index) {
			throw new Exception("The method or operation is not implemented.");
		}

	}
}
