using Blazor.Runtime.Interop;
using JSLibs.DOM;

namespace JSLibs.Bootstrap
{
    public class Modal : JSObject
    {
        public Modal(DocumentNode node)
            : base((JSObjectHandle)JSObjectHandle.Global.CallNew("Modal", node))
        {
        }

        public void Show() => Call("show");
    }
}
