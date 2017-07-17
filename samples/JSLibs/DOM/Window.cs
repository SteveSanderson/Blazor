using Blazor.Runtime.Interop;

namespace JSLibs.DOM
{
    public static class Window
    {
        public static Document Document
            = new Document((JSObjectHandle)JSObjectHandle.Global.GetProperty("document"));
    }
}
