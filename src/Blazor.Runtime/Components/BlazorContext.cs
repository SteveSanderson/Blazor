using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using Blazor.Interop;

namespace Blazor.Runtime.Components
{
    public class BlazorContext
    {
        public BlazorContext(string absoluteUrl)
        {
            Url = absoluteUrl;
        }

        public string Url { get; set; }

        public string AbsoluteUrl(string relativeUrl)
        {
            if (Env.IsServer)
            {
                return ServerAbsoluteUrl(relativeUrl);
            }
            else
            {
                return Browser.ResolveRelativeUrl(relativeUrl);
            }
        }

        private string ServerAbsoluteUrl(string relativeUrl)
        {
            return new Uri(new Uri(Url), relativeUrl).ToString();
        }

        public IDictionary<string, object> Items { get; } = new ItemDictionary();

        private class ItemDictionary : IDictionary<string, object>
        {
            private IDictionary<string, object> _inner = new Dictionary<string, object>();
            
            public object this[string key]
            {
                get
                {
                    object value;
                    if (_inner.TryGetValue(key, out value))
                    {
                        return value;
                    }

                    return string.Empty;
                }
                set
                {
                    _inner[key] = value;
                }
            }

            public ICollection<string> Keys => _inner.Keys;

            public ICollection<object> Values => _inner.Values;

            public int Count => _inner.Count;

            public bool IsReadOnly => false;

            public void Add(string key, object value)
            {
                _inner.Add(key, value);
            }

            public void Add(KeyValuePair<string, object> item)
            {
                _inner.Add(item);
            }

            public void Clear()
            {
                _inner.Clear();
            }

            public bool Contains(KeyValuePair<string, object> item)
            {
                return _inner.Contains(item);
            }

            public bool ContainsKey(string key)
            {
                return _inner.ContainsKey(key);
            }

            public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
            {
                _inner.CopyTo(array, arrayIndex);
            }

            public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
            {
                return _inner.GetEnumerator();
            }

            public bool Remove(string key)
            {
                return _inner.Remove(key);
            }

            public bool Remove(KeyValuePair<string, object> item)
            {
                return _inner.Remove(item);
            }

            public bool TryGetValue(string key, out object value)
            {
                return _inner.TryGetValue(key, out value);
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                return _inner.GetEnumerator();
            }
        }
    }
}
