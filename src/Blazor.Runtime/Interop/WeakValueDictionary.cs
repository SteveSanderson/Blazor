using System;
using System.Collections.Generic;
using System.Linq;

namespace Blazor.Runtime.Interop
{
    internal class WeakValueDictionary<TKey, TValue> where TValue: class
    {
        private KeySelector _keySelector;
        private IDictionary<TKey, WeakReference<TValue>> _store
            = new Dictionary<TKey, WeakReference<TValue>>();
        private int _cullThreshold = 10;

        public delegate TKey KeySelector(TValue value);
        public delegate TValue ValueFactory();

        public WeakValueDictionary(KeySelector keySelector)
        {
            _keySelector = keySelector;
        }

        public TValue Get(TKey key, ValueFactory valueFactory = null)
        {
            // If there's an existing dictionary entry, use it (repopulating if needed)
            if (_store.TryGetValue(key, out var existingWeakRef))
            {
                if (existingWeakRef.TryGetTarget(out var existingValue))
                {
                    return existingValue;
                }
                else if (valueFactory != null)
                {
                    var newValue = valueFactory();
                    existingWeakRef.SetTarget(newValue);
                    return newValue;
                }
                else
                {
                    return null;
                }
            }
            else if (valueFactory != null)
            {
                // Create new dictionary entry
                var newValue = valueFactory();
                _store[key] = new WeakReference<TValue>(newValue);
                CullIfApplicable();
                return newValue;
            }
            else
            {
                return null;
            }
        }

        private void CullIfApplicable()
        {
            if (_store.Count > _cullThreshold)
            {
                var itemsToRemove = _store.Where(x => x.Value == null || !x.Value.TryGetTarget(out _)).ToList();
                foreach (var itemToRemove in itemsToRemove)
                {
                    _store.Remove(itemToRemove.Key);
                }

                if (_store.Count > (_cullThreshold / 2))
                {
                    _cullThreshold *= 2;
                }
            }
        }
    }
}
