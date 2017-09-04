namespace Blazor.Runtime.Interop
{
    public class Window : JavaScriptInvocation
    {
        public static Document Document => JavaScript.Document;

        internal Window(JSObjectHandle currentHandle) : base(currentHandle)
        {
        }
    }
}
