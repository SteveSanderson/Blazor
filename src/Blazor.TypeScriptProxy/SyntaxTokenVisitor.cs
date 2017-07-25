using System;
using System.Collections.Generic;
using Blazor.TypeScriptProxy.TypeScriptIR;

namespace Blazor.TypeScriptProxy
{
    public class SyntaxTokenVisitor
    {
        public virtual void Visit(ISyntaxToken token)
        {
            token.Accept(this);
        }

        public virtual void Visit(IEnumerable<ISyntaxToken> tokens)
        {
            foreach (var token in tokens)
            {
                Visit(token);
            }
        }

        public virtual void VisitMethodSignature(MethodSignature signature)
        {
        }

        public virtual void VisitPropertySignature(PropertySignature propertySignature)
        {
        }

        public virtual void VisitInterfaceDeclaration(InterfaceDeclaration interfaceDeclaration)
        {
        }

        public virtual void VisitParameter(Parameter parameter)
        {
        }

        public virtual void VisitTypeToken(TypeToken typeToken)
        {
        }

        public virtual void VisitReferenceTypeToken(ReferenceTypeToken referenceTypeToken)
        {
        }

        public virtual void VisitArrayTypeToken(ArrayTypeToken arrayTypeToken)
        {
        }

        public virtual void VisitGenericTypeToken(GenericTypeToken genericTypeToken)
        {
        }

        public virtual void VisitFunctionTypeToken(FunctionTypeToken functionTypeToken)
        {
        }
    }
}