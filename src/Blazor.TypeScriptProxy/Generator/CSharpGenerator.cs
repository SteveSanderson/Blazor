using System;
using System.Collections.Generic;
using System.Linq;
using Blazor.TypeScriptProxy.TypeScriptIR;

namespace Blazor.TypeScriptProxy.Generator
{
    public class CSharpGenerator
    {
        public string Render(Module module)
        {
            var entryPointLocator = new EntryPointLocator();
            entryPointLocator.Visit(module);

            var visitor = new RenderingVisitor(entryPointLocator.EntryPointDeclarations, new CSharpWriter());
            visitor.Visit(module);

            var code = visitor.Writer.GenerateCode();
            return code;
        }

        private class EntryPointLocator : SyntaxTokenVisitor
        {
            public EntryPointLocator()
            {
                EntryPointDeclarations = new List<VariableDeclaration>();
            }

            public List<VariableDeclaration> EntryPointDeclarations { get; }

            public override void VisitVariableStatement(VariableStatement variableDeclaration)
            {
                Visit(variableDeclaration.Declarations);
            }

            public override void VisitVariableDeclaration(VariableDeclaration variableDeclaration)
            {
                EntryPointDeclarations.Add(variableDeclaration);
            }
        }

        // Inheritance hack, this is an awful use of inheritance :D
        private class ImplementationRenderingVisitor : RenderingVisitor
        {
            private readonly string _entryPointName;

            public ImplementationRenderingVisitor(string entryPointName, List<VariableDeclaration> entryPointTypes, CSharpWriter writer) : base(entryPointTypes, writer)
            {
                _entryPointName = entryPointName;
            }

            public override void VisitInterfaceDeclaration(InterfaceDeclaration interfaceSignature)
            {
                Writer.Write($"public class {interfaceSignature.Name}");

                RenderGenericTypeParameters(interfaceSignature.GenericTypeParameters);

                var inherits = interfaceSignature.Inherits?.ToList();
                if (inherits?.Any() == true)
                {
                    Writer.Write(" : ");
                    for (var i = 0; i < inherits.Count; i++)
                    {
                        Visit(inherits[i]);

                        if (i + 1 < inherits.Count)
                        {
                            Writer.Write(", ");
                        }
                    }
                }

                Writer.WriteLine("{");

                Writer.CurrentIndent += 4;

                Visit(interfaceSignature.Members);

                Writer.CurrentIndent -= 4;
                Writer.WriteLine("}");
            }

            public override void VisitMethodSignature(MethodSignature signature)
            {
                Writer.Write("public ");
                Visit(signature.ReturnTypeToken);

                Writer.Write($" @{signature.Name}");

                RenderGenericTypeParameters(signature.GenericTypeParameters);

                Writer.Write("(");
                var parameterList = signature.Parameters.ToList();

                for (var i = 0; i < parameterList.Count; i++)
                {
                    var parameter = parameterList[i];
                    Visit(parameter);

                    if (i + 1 < parameterList.Count)
                    {
                        Writer.Write(", ");
                    }
                }
                Writer
                    .Write($") => Blazor.Runtime.Interop.JavaScript.Window[\"{_entryPointName}\"][\"{signature.Name}\"].Invoke");

                if (signature.ReturnTypeToken.Kind != SyntaxKind.VoidKeyword)
                {
                    Writer.Write("<");
                    Visit(signature.ReturnTypeToken);
                    Writer.Write(">");
                }

                Writer.Write("(");
                for (var i = 0; i < parameterList.Count; i++)
                {
                    if (parameterList[i] is Parameter parameter)
                    {
                        Writer.Write(parameter.Name);
                    }

                    if (i + 1 < parameterList.Count)
                    {
                        Writer.Write(", ");
                    }
                }
                Writer.WriteLine(");");
            }
        }

        private class RenderingVisitor : SyntaxTokenVisitor
        {
            private readonly List<VariableDeclaration> _entryPointDeclarations;

            public RenderingVisitor(List<VariableDeclaration> entryPointDeclarations, CSharpWriter writer)
            {
                _entryPointDeclarations = entryPointDeclarations;
                Writer = writer;
            }

            public CSharpWriter Writer { get; }

            public override void Visit(Module module)
            {
                Writer.WriteLine("using System;");
                Writer.WriteLine("using Blazor.Interop;");

                base.Visit(module);
            }

            public override void VisitInterfaceDeclaration(InterfaceDeclaration interfaceSignature)
            {
                var entryPoint = _entryPointDeclarations.FirstOrDefault(declaration => string.Equals(((ReferenceTypeToken)declaration.TypeToken).TypeName, interfaceSignature.Name));
                if (entryPoint != null)
                {
                    // Entry point, render implementation
                    var implementationVisitor = new ImplementationRenderingVisitor(entryPoint.Name, _entryPointDeclarations, Writer);
                    implementationVisitor.Visit(interfaceSignature);
                    return;
                }

                Writer.Write($"public interface {interfaceSignature.Name}");
                RenderGenericTypeParameters(interfaceSignature.GenericTypeParameters);

                var inherits = interfaceSignature.Inherits?.ToList();
                if (inherits?.Any() == true)
                {
                    Writer.Write(" : ");
                    for (var i = 0; i < inherits.Count; i++)
                    {
                        Visit(inherits[i]);

                        if (i + 1 < inherits.Count)
                        {
                            Writer.Write(", ");
                        }
                    }
                }

                Writer.WriteLine("{");

                Writer.CurrentIndent += 4;

                Visit(interfaceSignature.Members);

                Writer.CurrentIndent -= 4;
                Writer.WriteLine("}");
            }

            public override void VisitMethodSignature(MethodSignature signature)
            {
                Visit(signature.ReturnTypeToken);

                Writer.Write($" @{signature.Name}");

                RenderGenericTypeParameters(signature.GenericTypeParameters);

                Writer.Write("(");
                var parameterList = signature.Parameters.ToList();

                for (var i = 0; i < parameterList.Count; i++)
                {
                    var parameter = parameterList[i];
                    Visit(parameter);

                    if (i + 1 < parameterList.Count)
                    {
                        Writer.Write(", ");
                    }
                }
                Writer
                    .WriteLine(");");
            }

            public override void VisitParameter(Parameter parameter)
            {
                Visit(parameter.TypeToken);

                Writer
                    .Write(" @")
                    .Write(parameter.Name);
            }

            public override void VisitTypeToken(TypeToken typeToken)
            {
                switch (typeToken.Kind)
                {
                    case SyntaxKind.FirstTypeNode:
                        Writer.Write("object /* Generic Type */");
                        break;
                    case SyntaxKind.TypeLiteral:
                        Writer.Write("object /* Type Literal */");
                        break;
                    case SyntaxKind.UnionType:
                        Writer.Write("object /* Union Type */");
                        break;
                    case SyntaxKind.AnyKeyword:
                        Writer.Write("object");
                        break;
                    case SyntaxKind.BooleanKeyword:
                        Writer.Write("bool");
                        break;
                    case SyntaxKind.StringKeyword:
                        Writer.Write("string");
                        break;
                    case SyntaxKind.NumberKeyword:
                        Writer.Write("double");
                        break;
                    case SyntaxKind.VoidKeyword:
                        Writer.Write("void");
                        break;
                    default:
                        throw new InvalidOperationException("Unsupported syntax kind: " + typeToken.Kind.ToString());
                }
            }

            public override void VisitGenericTypeToken(GenericTypeToken genericTypeToken)
            {
                Writer.Write(genericTypeToken.TypeName);
            }

            public override void VisitReferenceTypeToken(ReferenceTypeToken referenceTypeToken)
            {
                Writer.Write(referenceTypeToken.TypeName);

                RenderGenericTypeParameters(referenceTypeToken.GenericTypeParameters);
            }

            public override void VisitArrayTypeToken(ArrayTypeToken arrayTypeToken)
            {
                Visit(arrayTypeToken.ElementTypeToken);
                Writer.Write("[]");
            }

            public override void VisitVariableStatement(VariableStatement variableDeclaration)
            {
                if (variableDeclaration.Modifiers?.Contains(SyntaxKind.DeclareKeyword) == true)
                {
                    Visit(variableDeclaration.Declarations);
                }
            }

            public override void VisitVariableDeclaration(VariableDeclaration variableDeclaration)
            {
                if (variableDeclaration.Name[0] == '$')
                {
                    // Hack for jquery until we get proper name verification.
                    return;
                }

                Writer
                    .WriteLine("public partial class Browser")
                    .WriteLine("{");
                Writer.CurrentIndent += 4;

                Writer.Write("public static ");
                Visit(variableDeclaration.TypeToken);
                Writer.Write($" {variableDeclaration.Name} = new ");
                Visit(variableDeclaration.TypeToken);
                Writer.WriteLine("();");

                Writer.CurrentIndent -= 4;
                Writer.WriteLine("}");
            }

            public override void VisitFunctionTypeToken(FunctionTypeToken functionTypeToken)
            {
                if (functionTypeToken.ReturnTypeToken.Kind != SyntaxKind.VoidKeyword)
                {
                    Writer.Write("Func<");
                }
                else
                {
                    Writer.Write("Action<");
                }

                var parameters = functionTypeToken.Parameters.ToList();
                for (var i = 0; i < parameters.Count; i++)
                {
                    switch (parameters[i])
                    {
                        case Parameter parameter:
                            Visit(parameter.TypeToken);
                            break;
                        default:
                            throw new InvalidOperationException("Unsupported function parameter kind: " + parameters[i].Kind.ToString());
                    }

                    if (i + 1 < parameters.Count)
                    {
                        Writer.Write(", ");
                    }
                }

                if (functionTypeToken.ReturnTypeToken.Kind != SyntaxKind.VoidKeyword)
                {
                    if (parameters.Count > 0)
                    {
                        Writer.Write(", ");
                    }

                    Visit(functionTypeToken.ReturnTypeToken);
                }

                Writer.Write(">");
            }

            public override void VisitExpressionTypeArgumentToken(ExpressionTypeArgumentToken expressionTypeArgumentToken)
            {
                Writer.Write(expressionTypeArgumentToken.Expression);
                RenderGenericTypeParameters(expressionTypeArgumentToken.GenericTypeParameters);
            }

            public override void VisitPropertySignature(PropertySignature propertySignature)
            {
                Visit(propertySignature.TypeToken);
                Writer.Write($" @{propertySignature.Name}");

                Writer.WriteLine(" { get; set; }");
            }

            protected void RenderGenericTypeParameters(IEnumerable<ISyntaxToken> parameters)
            {
                if (parameters?.Any() == true)
                {
                    Writer.Write("<");
                    var generics = parameters.ToList();
                    for (var i = 0; i < generics.Count; i++)
                    {
                        if (generics[i].Kind == SyntaxKind.VoidKeyword)
                        {
                            // C# does not support void generics
                            Writer.Write("object /* void */");
                        }
                        else
                        {
                            Visit(generics[i]);
                        }

                        if (i + 1 < generics.Count)
                        {
                            Writer.Write(", ");
                        }
                    }
                    Writer.Write(">");
                }
            }
        }
    }
}
