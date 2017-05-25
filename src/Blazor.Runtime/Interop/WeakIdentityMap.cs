using System;

namespace Blazor.Interop
{
    // http://stackoverflow.com/questions/2047591/compacting-a-weakreference-dictionary/16768589#16768589
    internal class WeakIdentityMap<TKey, TValue>
        where TKey : IEquatable<TKey>
        where TValue : class
    {
        internal delegate TKey KeySelector(TValue value);
        internal delegate TValue ValueFactory();

        KeySelector key_selector;
        WeakReference[] references; // Note that WeakReference<T> isn't implemented in the corlib here
        int[] buckets;
        int[] bucket_indexes;
        int tail_index;
        int entries_count;
        int capacity;

        public WeakIdentityMap(KeySelector key_selector, int capacity = 10)
        {
            this.key_selector = key_selector;
            Init(capacity);
        }
        void Init(int capacity)
        {
            this.bucket_indexes = new int[capacity];
            this.buckets = new int[capacity];
            this.references = new WeakReference[capacity];
            for (int i = 0; i < capacity; i++)
            {
                bucket_indexes[i] = -1;
                buckets[i] = i - 1;
            }
            this.tail_index = capacity - 1;
            this.entries_count = 0;
            this.capacity = capacity;
        }

        public TValue Get(TKey key, ValueFactory value = null)
        {
            int bucket_index = Math.Abs(key.GetHashCode() % this.capacity);
            var ret = WalkBucket(bucket_index, true, key);
            if (ret == null && value != null) Add(bucket_index, ret = value());
            return ret;
        }

        void Add(int bucket_index, TValue value)
        {
            if (this.entries_count == this.capacity)
            {
                for (int i = 0; i < capacity; i++) WalkBucket(i, false, default(TKey));
                if (this.entries_count * 2 > this.capacity)
                {
                    var old_references = references;
                    Init(this.capacity * 2);
                    foreach (var old_reference in old_references)
                    {
                        TValue old_value = (TValue)old_reference.Target;
                        if (old_value != null)
                        {
                            int hash = key_selector(value).GetHashCode();
                            Add(Math.Abs(hash % this.capacity), old_value);
                        }
                    }
                }
            }
            int new_index = this.tail_index;
            this.tail_index = buckets[this.tail_index];
            this.entries_count += 1;
            buckets[new_index] = bucket_indexes[bucket_index];
            if (references[new_index] != null) { references[new_index].Target = value; }
            else references[new_index] = new WeakReference(value);
            bucket_indexes[bucket_index] = new_index;
        }

        TValue WalkBucket(int bucket_index, bool is_searching, TKey key)
        {
            int curr_index = bucket_indexes[bucket_index];
            int prev_index = -1;
            while (curr_index != -1)
            {
                
                int next_index = buckets[curr_index];
                TValue value = (TValue)references[curr_index].Target;
                if (value != null)
                {
                    if (is_searching && key_selector(value).Equals(key)) return value;
                    prev_index = curr_index;
                }
                else
                {
                    if (prev_index != -1) buckets[prev_index] = next_index;
                    else bucket_indexes[bucket_index] = next_index;

                    buckets[curr_index] = this.tail_index;
                    this.tail_index = curr_index;
                    this.entries_count -= 1;
                }
                curr_index = next_index;
            }
            return null;
        }
    }
}
