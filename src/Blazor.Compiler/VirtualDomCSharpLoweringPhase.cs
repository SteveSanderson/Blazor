using Microsoft.AspNetCore.Razor.Language;
using System.Collections.Generic;

namespace RazorRenderer
{
    class VirtualDomCSharpLoweringPhase : IRazorCSharpLoweringPhase
    {
        private IRazorCSharpLoweringPhase _defaultCSharpLoweringPhase;

        public VirtualDomCSharpLoweringPhase(IRazorCSharpLoweringPhase defaultCSharpLoweringPhase)
        {
            _defaultCSharpLoweringPhase = defaultCSharpLoweringPhase;
        }

        public RazorEngine Engine {
            get => _defaultCSharpLoweringPhase.Engine;
            set { _defaultCSharpLoweringPhase.Engine = value; }
        }

        public void Execute(RazorCodeDocument codeDocument)
        {
            var irDoc = codeDocument.GetIRDocument();
            irDoc.Target = new VirtualDomTarget(
                irDoc.Target,
                codeDocument.Items["tagNamesToSourceFiles"] as IDictionary<string, string>);
            _defaultCSharpLoweringPhase.Execute(codeDocument);
        }
    }
}
