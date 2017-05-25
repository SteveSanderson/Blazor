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
using System.Collections;
using System.Collections.Generic;

namespace System {

	public abstract class Array : ICloneable, IList, ICollection, IEnumerable {

		private class NonGenericEnumerator : IEnumerator {

			private Array array;
			private int index, length;

			public NonGenericEnumerator(Array array) {
				this.array = array;
				this.index = -1;
				this.length = array.length;
			}

			public object Current {
				get {
					if (index < 0) {
						throw new InvalidOperationException("Enumeration has not started");
					}
					if (index >= length) {
						throw new InvalidOperationException("Enumeration has finished");
					}
					return array.GetValue(index);
				}
			}

			public bool MoveNext() {
				index++;
				return (index < length);
			}

			public void Reset() {
				index = -1;
			}

		}

		private struct GenericEnumerator<T> : IEnumerator<T> {

			private Array array;
			private int index, length;

			public GenericEnumerator(Array array) {
				this.array = array;
				this.index = -1;
				this.length = array.length;
			}

			public T Current {
				get {
					if (index < 0) {
						throw new InvalidOperationException("Enumeration has not started");
					}
					if (index >= length) {
						throw new InvalidOperationException("Enumeration has finished");
					}
					return (T)array.GetValue(index);
				}
			}

			public void Dispose() {
			}

			object IEnumerator.Current {
				get {
					return this.Current;
				}
			}

			public bool MoveNext() {
				index++;
				return (index < length);
			}

			public void Reset() {
				this.index = -1;
			}
		}

		private Array() {
		}

		#region Generic interface methods

		// The name of these methods are important. They are directly referenced in the interpreter.
		private IEnumerator<T> Internal_GetGenericEnumerator<T>() {
			return new GenericEnumerator<T>(this);
		}

		private bool Internal_GenericIsReadOnly() {
			return true;
		}

		private void Internal_GenericAdd<T>(T item) {
			throw new NotSupportedException("Collection is read-only");
		}

		private void Internal_GenericClear() {
			Array.Clear(this, 0, this.length);
		}

		private bool Internal_GenericContains<T>(T item) {
			return Array.IndexOf(this, (object)item) >= 0;
		}

		private void Internal_GenericCopyTo<T>(T[] array, int arrayIndex) {
			Array.Copy(this, 0, (Array)array, arrayIndex, this.length);
		}

		private bool Internal_GenericRemove<T>(T item) {
			throw new NotSupportedException("Collection is read-only");
		}

		private int Internal_GenericIndexOf<T>(T item) {
			return IndexOf(this, (object)item);
		}

		private void Internal_GenericInsert<T>(int index, T item) {
			throw new NotSupportedException("List is read-only");
		}

		private void Internal_GenericRemoveAt(int index) {
			throw new NotSupportedException("List is read-only");
		}

		private T Internal_GenericGetItem<T>(int index) {
			return (T)GetValue(index);
		}

		private void Internal_GenericSetItem<T>(int index, T value) {
			SetValue((object)value, index);
		}

		#endregion

        // This must be the only field, as it ties up with the Array definition in DNA
#pragma warning disable 0169, 0649
        private int length;
#pragma warning restore 0169, 0649

        public int Length {
			get {
				return this.length;
			}
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private object Internal_GetValue(int index);

		/// <summary>
		/// Returns true if the value set ok, returns false if the Type was wrong
		/// </summary>
		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public bool Internal_SetValue(object value, int index);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static void Clear(Array array, int index, int length);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private static bool Internal_Copy(Array src, int srcIndex, Array dst, int dstIndex, int length);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static void Resize<T>(ref T[] array, int newSize);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static void Reverse(Array array, int index, int length);

		public static void Reverse(Array array) {
			Reverse(array, 0, array.length);
		}

		public static int IndexOf(Array array, object value) {
			return IndexOf(array, value, 0, array.length);
		}

		public static int IndexOf(Array array, object value, int startIndex) {
			return IndexOf(array, value, startIndex, array.length - startIndex);
		}

		public static int IndexOf(Array array, object value, int startIndex, int count) {
			if (array == null) {
				throw new ArgumentNullException("array");
			}
			int max = startIndex + count;
			if (startIndex < 0 || max > array.length) {
				throw new ArgumentOutOfRangeException();
			}
			for (int i = startIndex; i < max; i++) {
				if (object.Equals(value, array.GetValue(i))) {
					return i;
				}
			}
			return -1;
		}

		public static void Copy(Array srcArray, int srcIndex, Array dstArray, int dstIndex, int length) {
			if (srcArray == null || dstArray == null) {
				throw new ArgumentNullException((srcArray == null) ? "sourceArray" : "destinationArray");
			}
			if (srcIndex < 0 || dstIndex < 0 || length < 0) {
				throw new ArgumentOutOfRangeException();
			}
			if (srcIndex + length > srcArray.length || dstIndex + length > dstArray.length) {
				throw new ArgumentException();
			}
			if (Internal_Copy(srcArray, srcIndex, dstArray, dstIndex, length)) {
				// When src element type can always be cast to dst element type, then can do a really fast copy.
				return;
			}

			int start, inc, end;
			// Need to make sure it works even if both arrays are the same
			if (dstIndex > srcIndex) {
				start = 0;
				inc = 1;
				end = length;
			} else {
				start = length - 1;
				inc = -1;
				end = -1;
			}
			for (int i = start; i != end; i += inc) {
				object item = srcArray.GetValue(srcIndex + i);
				dstArray.SetValue(item, dstIndex + i);
			}
		}

		public static void Copy(Array srcArray, Array dstArray, int length) {
			Copy(srcArray, 0, dstArray, 0, length);
		}

		public static int IndexOf<T>(T[] array, T value) {
			return IndexOf((Array)array, (object)value);
		}

		public static int IndexOf<T>(T[] array, T value, int startIndex) {
			return IndexOf((Array)array, (object)value, startIndex);
		}

		public static int IndexOf<T>(T[] array, T value, int startIndex, int count) {
			return IndexOf((Array)array, (object)value, startIndex, count);
		}

		public object GetValue(int index) {
			if (index < 0 || index >= this.length) {
				throw new IndexOutOfRangeException();
			}
			return Internal_GetValue(index);
		}

		public void SetValue(object value, int index) {
			if (index < 0 || index >= this.length) {
				throw new IndexOutOfRangeException();
			}
			if (!Internal_SetValue(value, index)) {
				throw new InvalidCastException();
			}
		}

		public int Rank {
			get {
				return 1;
			}
		}

		public int GetLength(int dimension) {
			if (dimension != 0) {
				throw new IndexOutOfRangeException();
			}
			return this.length;
		}

		public int GetLowerBound(int dimension) {
			if (dimension != 0) {
				throw new IndexOutOfRangeException();
			}
			return 0;
		}

		public int GetUpperBound(int dimension) {
			if (dimension != 0) {
				throw new IndexOutOfRangeException();
			}
			return this.length - 1;
		}

		public static TOutput[] ConvertAll<TInput, TOutput>(TInput[] array, Converter<TInput, TOutput> converter) {
			if (array == null) {
				throw new ArgumentNullException("array");
			}
			if (converter == null) {
				throw new ArgumentNullException("converter");
			}

			TOutput[] output = new TOutput[array.Length];
			int arrayLen = array.Length;
			for (int i = 0; i < arrayLen; i++) {
				output[i] = converter(array[i]);
			}

			return output;
		}


		#region Interface Members

		public object Clone() {
			return object.Clone(this);
		}

		public bool IsFixedSize {
			get {
				return true;
			}
		}

		public bool IsReadOnly {
			get {
				return false;
			}
		}

		object IList.this[int index] {
			get {
				if (index < 0 || index >= this.length) {
					throw new ArgumentOutOfRangeException("index");
				}
				return GetValue(index);
			}
			set {
				if (index < 0 || index >= this.length) {
					throw new ArgumentOutOfRangeException("index");
				}
				SetValue(value, index);
			}
		}

		int IList.Add(object value) {
			throw new NotSupportedException("Collection is read-only");
		}

		void IList.Clear() {
			Array.Clear(this, 0, this.length);
		}

		bool IList.Contains(object value) {
			return (IndexOf(this, value) >= 0);
		}

		int IList.IndexOf(object value) {
			return IndexOf(this, value);
		}

		void IList.Insert(int index, object value) {
			throw new NotSupportedException("Collection is read-only");
		}

		void IList.Remove(object value) {
			throw new NotSupportedException("Collection is read-only");
		}

		void IList.RemoveAt(int index) {
			throw new NotSupportedException("Collection is read-only");
		}

		int ICollection.Count {
			get {
				return this.length;
			}
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
			Copy(this, 0, array, index, this.length);
		}

		public IEnumerator GetEnumerator() {
			return new NonGenericEnumerator(this);
		}

		IEnumerator IEnumerable.GetEnumerator() {
			return GetEnumerator();
		}

		#endregion
	}

}
#endif
