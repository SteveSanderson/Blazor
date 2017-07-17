using Blazor.Runtime.Interop;

namespace JSLibs.DOM
{
    public class Document : JSObject
    {
        public Document(JSObjectHandle handle) : base(handle) { }

        public DocumentNode GetElementById(string id)
        {
            var elem = (JSObjectHandle)Call("getElementById", id);
            return elem == null ? null : new DocumentNode(elem);
        }
    }
}
