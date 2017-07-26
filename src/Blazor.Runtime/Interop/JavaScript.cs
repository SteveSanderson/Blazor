namespace Blazor.Runtime.Interop
{
    public class JavaScript
    {
        private static readonly JSObjectHandle _windowHandle = (JSObjectHandle)JSObjectHandle.Global.GetProperty("window");
        private static readonly JSObjectHandle _documentHandle = (JSObjectHandle)_windowHandle.GetProperty("document");

        public static Window Window => new Window(_windowHandle);

        public static Document2 Document => new Document2(_documentHandle);

        public static JavaScriptInvocation Global => new JavaScriptInvocation(JSObjectHandle.Global);
    }
}
