using Microsoft.AspNetCore.Razor.Language.CodeGeneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RazorRenderer
{
    class VirtualDomTarget : CodeTarget
    {
        private CodeTarget _defaultTarget;
        private IDictionary<string, string> _tagNamesToSourceFiles;

        public VirtualDomTarget(CodeTarget defaultTarget, IDictionary<string, string> tagNamesToSourceFiles)
        {
            _defaultTarget = defaultTarget;
            _tagNamesToSourceFiles = tagNamesToSourceFiles;
        }

        public override DocumentWriter CreateWriter(CSharpRenderingContext context)
        {
            var defaultWriter = _defaultTarget.CreateWriter(context);
            return new VirtualDomDocumentWriter(this, context, _tagNamesToSourceFiles);
        }

        public override TExtension GetExtension<TExtension>()
        {
            return _defaultTarget.GetExtension<TExtension>();
        }

        public override bool HasExtension<TExtension>()
        {
            return _defaultTarget.HasExtension<TExtension>();
        }
    }
}
