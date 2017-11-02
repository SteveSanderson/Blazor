using Blazor.Util;
using System;
using System.Runtime.CompilerServices;

namespace WebAssembly
{
    public sealed class Runtime
    {
        [MethodImplAttribute(/* InternalCall */ (MethodImplOptions)4096)]
        static extern string InvokeJS(string str, out int exceptional_result);

        public static string InvokeJS(string str)
        {
            int exception = 0;
            var res = InvokeJS(str, out exception);
            if (exception != 0)
                throw new JSException(res);
            return res;
        }

        public static TResult CallJS<TResult>(string method, params object[] args)
        {
            var resultJson = InvokeJS($"Module.receiveInvocationFromDotNet({ JsonUtil.Serialize(new { method, args }) })");
            return JsonUtil.Deserialize<TResult>(resultJson);
        }
    }

    public class JSException : Exception
    {
        public JSException(string msg) : base(msg) { }
    }
}
