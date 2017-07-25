using System.Collections.Generic;

namespace Blazor.TypeScriptProxy.Contract
{
    public class InterfaceDeclaration : ISyntaxToken
    {
        public SyntaxKind Kind => SyntaxKind.InterfaceDeclaration;

        public string Name { get; set; }

        public IEnumerable<ISyntaxToken> Members { get; set; }
    }

    public class PropertySignature : ISyntaxToken
    {
        public SyntaxKind Kind => SyntaxKind.PropertySignature;

        public string Name { get; set; }

        public string TypeName { get; set; }

        public bool Optional { get; set; }
    }

    public class MethodSignature : ISyntaxToken
    {
        public SyntaxKind Kind => SyntaxKind.MethodSignature;

        public string Name { get; set; }

        public string ReturnTypeName { get; set; }

        public bool Optional { get; set; }

        public IEnumerable<ISyntaxToken> Parameters { get; set; }
    }

    public class Parameter : ISyntaxToken
    {
        public SyntaxKind Kind => SyntaxKind.Parameter;

        public string Name { get; set; }

        public string TypeName { get; set; }
    }
}
