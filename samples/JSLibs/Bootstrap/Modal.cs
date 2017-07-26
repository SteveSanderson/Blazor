using Blazor.Runtime.Interop;
using static Blazor.Runtime.Interop.Document2;

namespace JSLibs.Bootstrap
{
    public class Modal : JSObject
    {
        public Modal(Node node)
            : base((JSObjectHandle)JSObjectHandle.Global.CallNew("Modal", node))
        {
        }

        public void Show() => Call("show");
    }
}
