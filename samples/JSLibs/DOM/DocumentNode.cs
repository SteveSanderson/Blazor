using Blazor.Runtime.Interop;

namespace JSLibs.DOM
{
    public class DocumentNode : JSObject
    {
        public DocumentNode(JSObjectHandle handle) : base(handle) { }

        public string TagName => (string)GetProperty("tagName");
    }
}
