using Blazor.VirtualDom;
using System.Runtime.InteropServices;

namespace Blazor.Interop
{
    public class DOMElement
    {
        [DllImport(@"browser.js", CharSet = CharSet.Ansi)]
        private static extern string SetElemHtml(string descriptor);

        [DllImport(@"browser.js", CharSet = CharSet.Ansi)]
        private static extern string SetElemFromVNode(string descriptor);

        private readonly string _elementRef;

        public DOMElement(string elementRef)
        {
            _elementRef = elementRef;
        }
        
        internal void UpdateContents(int componentRef, VDomItem[] oldVDom, VDomItem[] newVDom, bool replace)
        {
            using (var gcHandleOld = ManagedGCHandle.FromObject(oldVDom))
            using (var gcHandleNew = ManagedGCHandle.FromObject(newVDom))
            {
                var replaceValue = replace ? "true" : "false";
                SetElemFromVNode($@"{{ ""elementRef"": ""{ _elementRef }"", ""componentRef"": { componentRef }, ""oldVDom"":{ gcHandleOld.Address }, ""newVDom"":{ gcHandleNew.Address }, ""replaceContainer"":{ replaceValue } }}");
            }
        }
    }
}
