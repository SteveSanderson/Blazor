using Blazor.VirtualDom;
using System;

namespace Blazor.Interop
{
    public class DOMElement
    {
        private static string SetElemHtml(string descriptor)
        {
            throw new NotImplementedException("TODO: Wire up SetElemHtml to the client-side code");
        }

        private readonly string _elementRef;

        public DOMElement(string elementRef)
        {
            _elementRef = elementRef;
        }

        internal void UpdateContents(int componentRef, VDomItem[] oldVDom, VDomItem[] newVDom, bool replace)
        {
            WebAssembly.Runtime.SetElemFromVNode(
                _elementRef,
                componentRef,
                oldVDom,
                newVDom,
                replace);
        }
    }
}
