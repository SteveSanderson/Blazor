using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Blazor.TypeScriptProxy.TypeScriptIR
{
    public class InterfaceDeclaration : ISyntaxToken
    {
        public SyntaxKind Kind => SyntaxKind.InterfaceDeclaration;

        public string Name { get; set; }

        public IEnumerable<ISyntaxToken> GenericTypeParameters { get; set; }

        public IEnumerable<ISyntaxToken> Members { get; set; }

        public void Accept(SyntaxTokenVisitor visitor) => visitor.VisitInterfaceDeclaration(this);
    }

    public class PropertySignature : ISyntaxToken
    {
        public SyntaxKind Kind => SyntaxKind.PropertySignature;

        public string Name { get; set; }

        public ISyntaxToken TypeToken { get; set; }

        public bool Optional { get; set; }

        public void Accept(SyntaxTokenVisitor visitor) => visitor.VisitPropertySignature(this);
    }

    public class MethodSignature : ISyntaxToken
    {
        public SyntaxKind Kind => SyntaxKind.MethodSignature;

        public string Name { get; set; }

        public ISyntaxToken ReturnTypeToken { get; set; }

        public bool Optional { get; set; }

        public IEnumerable<ISyntaxToken> GenericTypeParameters { get; set; }

        public IEnumerable<ISyntaxToken> Parameters { get; set; }

        public void Accept(SyntaxTokenVisitor visitor) => visitor.VisitMethodSignature(this);
    }

    public class Parameter : ISyntaxToken
    {
        public SyntaxKind Kind => SyntaxKind.Parameter;

        public string Name { get; set; }

        public ISyntaxToken TypeToken { get; set; }

        public void Accept(SyntaxTokenVisitor visitor) => visitor.VisitParameter(this);
    }

    public class TypeToken : ISyntaxToken
    {
        public TypeToken(SyntaxKind typeKind)
        {
            Kind = typeKind;
        }

        public SyntaxKind Kind { get; }

        public virtual void Accept(SyntaxTokenVisitor visitor) => visitor.VisitTypeToken(this);
    }

    public class ReferenceTypeToken : TypeToken
    {
        public ReferenceTypeToken() : base(SyntaxKind.TypeReference)
        {
        }

        public string TypeName { get; set; }

        public IEnumerable<ISyntaxToken> GenericTypeParameters { get; set; }

        public override void Accept(SyntaxTokenVisitor visitor) => visitor.VisitReferenceTypeToken(this);
    }

    public class GenericTypeToken : TypeToken
    {
        public GenericTypeToken() : base(SyntaxKind.TypeParameter)
        {
        }

        public string TypeName { get; set; }

        public override void Accept(SyntaxTokenVisitor visitor) => visitor.VisitGenericTypeToken(this);
    }

    public class ArrayTypeToken : TypeToken
    {
        public ArrayTypeToken() : base(SyntaxKind.ArrayType)
        {
        }

        public ISyntaxToken ElementTypeToken { get; set; }

        public override void Accept(SyntaxTokenVisitor visitor) => visitor.VisitArrayTypeToken(this);
    }

    public class FunctionTypeToken : TypeToken
    {
        public FunctionTypeToken() : base(SyntaxKind.FunctionType)
        {
        }

        public IEnumerable<ISyntaxToken> Parameters { get; set; }

        public ISyntaxToken ReturnTypeToken { get; set; }

        public override void Accept(SyntaxTokenVisitor visitor) => visitor.VisitFunctionTypeToken(this);
    }
}
