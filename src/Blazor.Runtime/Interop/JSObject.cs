namespace Blazor.Runtime.Interop
{
    /// <summary>
    /// Just a wrapper around JSObjectHandle that gives you something to use as a base
    /// class for JS proxy objects.
    /// </summary>
    public class JSObject
    {
        internal readonly JSObjectHandle _handle;

        public JSObject(JSObjectHandle handle)
        {
            _handle = handle;
        }

        public object GetProperty(string propertyName) => _handle.GetProperty(propertyName);
        public void SetProperty(string propertyName, object value) => _handle.SetProperty(propertyName, value);
        public object Call(string methodName, params object[] args) => _handle.Call(methodName, args);
        public object CallNew(string methodName, params object[] args) => _handle.CallNew(methodName, args);
    }
}
