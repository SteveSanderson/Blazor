using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;

namespace Blazor.Runtime.Interop
{
    /// <summary>
    /// A handle to an object in the JavaScript runtime, providing the ability for .NET
    /// code to access its properties, invoke functions, etc.
    /// 
    /// This is to support interop between application code and 3rd-party JS libraries.
    /// The implementation at present is very inefficient (many avoidable heap allocations
    /// on all accesses and invocations) but it's just to try to understand what the
    /// developer experience might be like.
    /// </summary>
    public class JSObjectHandle
    {
        [DllImport(@"jsobject.js", CharSet = CharSet.Ansi)]
        private static extern string _GetProperty(string descriptor);
        [DllImport(@"jsobject.js", CharSet = CharSet.Ansi)]
        private static extern string _SetProperty(string descriptor);

        [DllImport(@"jsobject.js", CharSet = CharSet.Ansi)]
        private static extern string _ReleaseJSObject(string descriptor);

        [DllImport(@"jsobject.js", CharSet = CharSet.Ansi)]
        private static extern string _InvokeFunction(string descriptor);


        internal readonly int _jsObjectId;
        internal JSObjectHandle(int objectId)
        {
            _jsObjectId = objectId;
        }

        ~JSObjectHandle()
        {
            // Once the .NET side stops referring to this proxy object, the JS side
            // can remove it from the lookup too, so it can be GCed on that side
            _ReleaseJSObject(_jsObjectId.ToString());
        }

        public readonly static JSObjectHandle Global = new JSObjectHandle(0);

        public object GetProperty(string propertyName)
        {
            var json = _GetProperty(_jsObjectId + ":" + propertyName);
            return InterpretResult(json);
        }

        public void SetProperty(string propertyName, object value)
        {
            _SetProperty(MiniJSON.Json.Serialize(new Dictionary<string, object>
            {
                { "jsObjectId", _jsObjectId },
                { "name", propertyName },
                { "value", ArgDict(value) }
            }));
        }

        public object Call(string methodName, params object[] args)
        {
            return InvokeImpl(null, methodName, this, false, args);
        }

        public object CallNew(string methodName, params object[] args)
        {
            return InvokeImpl(null, methodName, this, true, args);
        }

        protected static object InterpretResult(string json)
        {
            var parsed = MiniJSON.Json.Deserialize(json) as Dictionary<string, object>;
            var type = parsed["type"] as string;
            var value = parsed["value"];
            if (value == null)
            {
                return null;
            }

            switch (type)
            {
                case "object": return new JSObjectHandle((int)value);
                case "function": return new JSFunction((int)value);
                default: return value;
            }
        }

        protected static object InvokeImpl(JSFunction functionInstance, string functionPropertyName, object thisValue, bool withNew, params object[] args)
        {
            if ((functionInstance != null) == (functionPropertyName != null))
            {
                throw new ArgumentException("Supply functionInstance or functionPropertyName, not both");
            }

            int? thisValueId = null;
            if (thisValue is JSObjectHandle thisObject)
            {
                thisValueId = thisObject._jsObjectId;
            }

            var json = _InvokeFunction(MiniJSON.Json.Serialize(new Dictionary<string, object>
            {
                { "thisValueId", thisValueId },
                { "functionId", functionInstance?._jsObjectId },
                { "functionPropertyName", functionPropertyName },
                { "args", args.Select(ArgDict).ToArray() },
                { "withNew", withNew }
            }));
            return InterpretResult(json);
        }

        private static Dictionary<string, object> ArgDict(object arg)
        {
            var argEntry = new Dictionary<string, object>();
            if (arg is JSObjectHandle argJsObjectHandle)
            {
                argEntry["type"] = "object";
                argEntry["value"] = argJsObjectHandle._jsObjectId;
            }
            else if (arg is JSObject argJsObject)
            {
                argEntry["type"] = "object";
                argEntry["value"] = argJsObject._handle._jsObjectId;
            }
            else
            {
                argEntry["type"] = "json";
                argEntry["value"] = arg;
            }
            return argEntry;
        }
    }

    public class JSFunction : JSObjectHandle
    {
        internal JSFunction(int objectId) : base(objectId)
        {
        }

        public object Invoke(object thisValue, params object[] args)
        {
            return InvokeImpl(this, null, thisValue, false, args);
        }

        public object InvokeNew(params object[] args)
        {
            return InvokeImpl(this, null, null, true, args);
        }
    }
}
