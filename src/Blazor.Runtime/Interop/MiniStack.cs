using System;
using System.Collections.Generic;
using System.Text;
using Blazor.VirtualDom;

namespace Blazor.Interop
{
    internal class MiniStack<T>
    {
        private IList<T> underlyingStore = new List<T>();

        public int Count => underlyingStore.Count;

        public void Push(T item) => underlyingStore.Add(item);

        public T Peek()
        {
            var pos = underlyingStore.Count - 1;
            return pos >= 0 ? underlyingStore[pos] : default(T);
        }

        public T Pop()
        {
            var lastPos = underlyingStore.Count - 1;
            if (lastPos < 0)
            {
                throw new InvalidOperationException("MiniStack is already empty; can't pop.");
            }

            var result = underlyingStore[lastPos];
            underlyingStore.RemoveAt(lastPos);
            return result;
        }

        internal void Clear()
        {
            underlyingStore.Clear();
        }
    }
}
