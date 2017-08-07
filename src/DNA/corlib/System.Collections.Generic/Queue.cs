using System;
using System.Collections.Generic;
using System.Text;

namespace System.Collections.Generic {
	public class Queue<T> : IEnumerable<T>, ICollection, IEnumerable {
		T[] _array;
		int _head;
		int _tail;
		int _size;
		int _version;

		private const int INITIAL_SIZE = 16;

		public Queue() {
		}

		public Queue(int count) {
			if (count < 0)
				throw new ArgumentOutOfRangeException("count");

			_array = new T[count];
		}

		public Queue(IEnumerable<T> collection) {
			if (collection == null)
				throw new ArgumentNullException("collection");

			foreach (T t in collection)
				Enqueue(t);
		}

		public void Clear() {
			if (_array != null)
				Array.Clear(_array, 0, _array.Length);

			_head = _tail = _size = 0;
			_version++;
		}

		public bool Contains(T item) {
			if (item == null) {
				foreach (T t in this)
					if (t == null)
						return true;
			} else {
				foreach (T t in this)
					if (item.Equals(t))
						return true;
			}

			return false;
		}

		public void CopyTo(T[] array, int idx) {
			if (array == null)
				throw new ArgumentNullException();

			if ((uint)idx > (uint)array.Length)
				throw new ArgumentOutOfRangeException();

			if (array.Length - idx < _size)
				throw new ArgumentOutOfRangeException();

			if (_size == 0)
				return;

			int contents_length = _array.Length;
			int length_from_head = contents_length - _head;

			Array.Copy(_array, _head, array, idx, Math.Min(_size, length_from_head));
			if (_size > length_from_head)
				Array.Copy(_array, 0, array,
						idx + length_from_head,
						_size - length_from_head);

		}

		void ICollection.CopyTo(Array array, int idx) {
			if (array == null)
				throw new ArgumentNullException();

			if ((uint)idx < (uint)array.Length)
				throw new ArgumentOutOfRangeException();

			if (array.Length - idx < _size)
				throw new ArgumentOutOfRangeException();

			if (_size == 0)
				return;

			try {
				int contents_length = _array.Length;
				int length_from_head = contents_length - _head;

				Array.Copy(_array, _head, array, idx, Math.Min(_size, length_from_head));
				if (_size > length_from_head)
					Array.Copy(_array, 0, array,
							idx + length_from_head,
							_size - length_from_head);
			} catch (ArrayTypeMismatchException) {
				throw new ArgumentException();
			}
		}

		public T Dequeue() {
			T ret = Peek();

			// clear stuff out to make the GC happy
			_array[_head] = default(T);

			if (++_head == _array.Length)
				_head = 0;
			_size--;
			_version++;

			return ret;
		}

		public T Peek() {
			if (_size == 0)
				throw new InvalidOperationException();

			return _array[_head];
		}

		public void Enqueue(T item) {
			if (_array == null || _size == _array.Length)
				SetCapacity(Math.Max(_size * 2, 4));

			_array[_tail] = item;

			if (++_tail == _array.Length)
				_tail = 0;

			_size++;
			_version++;
		}

		public T[] ToArray() {
			T[] t = new T[_size];
			CopyTo(t, 0);
			return t;
		}

		public void TrimExcess() {
			if (_array != null && (_size < _array.Length * 0.9))
				SetCapacity(_size);
		}

		void SetCapacity(int new_size) {
			if (_array != null && new_size == _array.Length)
				return;

			if (new_size < _size)
				throw new InvalidOperationException("shouldnt happen");

			T[] new_data = new T[new_size];
			if (_size > 0)
				CopyTo(new_data, 0);

			_array = new_data;
			_tail = _size;
			_head = 0;
			_version++;
		}

		public int Count {
			get { return _size; }
		}

		bool ICollection.IsSynchronized {
			get { return false; }
		}

		object ICollection.SyncRoot {
			get { return this; }
		}

		public Enumerator GetEnumerator() {
			return new Enumerator(this);
		}

		IEnumerator<T> IEnumerable<T>.GetEnumerator() {
			return GetEnumerator();
		}

		IEnumerator IEnumerable.GetEnumerator() {
			return GetEnumerator();
		}

		public struct Enumerator : IEnumerator<T>, IEnumerator, IDisposable {
			const int NOT_STARTED = -2;

			// this MUST be -1, because we depend on it in move next.
			// we just decr the _size, so, 0 - 1 == FINISHED
			const int FINISHED = -1;

			Queue<T> q;
			int idx;
			int ver;

			internal Enumerator(Queue<T> q) {
				this.q = q;
				idx = NOT_STARTED;
				ver = q._version;
			}

			public void Dispose() {
				idx = NOT_STARTED;
			}

			public bool MoveNext() {
				if (ver != q._version)
					throw new InvalidOperationException();

				if (idx == NOT_STARTED)
					idx = q._size;

				return idx != FINISHED && --idx != FINISHED;
			}

			public T Current {
				get {
					if (idx < 0)
						throw new InvalidOperationException();

					return q._array[(q._size - 1 - idx + q._head) % q._array.Length];
				}
			}

			void IEnumerator.Reset() {
				if (ver != q._version)
					throw new InvalidOperationException();

				idx = NOT_STARTED;
			}

			object IEnumerator.Current {
				get { return Current; }
			}

		}
	}
}
