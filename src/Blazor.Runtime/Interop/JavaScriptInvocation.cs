using System.Collections.Generic;

namespace Blazor.Runtime.Interop
{
    public class JavaScriptInvocation
    {
        private readonly List<string> _names;
        private readonly JSObjectHandle _currentHandle;

        internal JavaScriptInvocation(JSObjectHandle currentHandle)
        {
            _names = new List<string>();
            _currentHandle = currentHandle;
        }

        public JavaScriptInvocation this[string name]
        {
            get
            {
                _names.Add(name);
                return this;
            }
        }

        public TResult Invoke<TResult>(params object[] values)
        {
            var currentHandle = _currentHandle;
            for (var i = 0; i < _names.Count - 1; i++)
            {
                currentHandle = (JSObjectHandle)currentHandle.GetProperty(_names[i]);
            }

            var result = (TResult)currentHandle.Call(_names[_names.Count - 1], values);
            return result;
        }
    }
}
