using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace RazorRenderer
{
    public class AttributesHack
    {
        public static CSharpCompilation AddGetAttributesExtensionMethod(CSharpCompilation compilation)
        {
            var csharp = new StringBuilder();

            csharp.Append(
@"namespace System.Reflection 
{
    using System.Collections.Generic;

    public static class MyCustomAttributeExtensions
    {
"
            );

            AddTypeAttributes(csharp, compilation);
            AddTypeMemberAttributes(csharp, compilation);

            csharp.Append(
@"      public static IEnumerable<Attribute> GetMyCustomAttributes(this MemberInfo element)
        {
            if (element.MemberType == MemberTypes.TypeInfo)
            {
                return _typeAttributes.TryGetValue(element.DeclaringType, out var attributes) ? attributes : new Attribute[0];
            }
            else
            {
                return _typeMemberAttributes.TryGetValue(element.DeclaringType, out var memberAttributes) &&
                    memberAttributes.TryGetValue(element.Name, out var attributes) ? 
                    attributes :
                    new Attribute[0];
            }
        }
    }
}
"
            );

            var csharpString = csharp.ToString();
            var syntaxTree = CSharpSyntaxTree.ParseText(csharpString);
            return compilation.AddSyntaxTrees(syntaxTree);
        }

        private static void AddTypeAttributes(StringBuilder csharp, CSharpCompilation compilation)
        {
            csharp.Append(
@"      private static IDictionary<Type, IEnumerable<Attribute>> _typeAttributes = 
            new Dictionary<Type, IEnumerable<Attribute>>()
        {
"
            );


            csharp.Append(
@"      };
"
            );
        }

        private static void AddTypeMemberAttributes(StringBuilder csharp, CSharpCompilation compilation)
        {
            csharp.Append(
@"      private static IDictionary<Type, IDictionary<string, IEnumerable<Attribute>>> _typeMemberAttributes = 
            new Dictionary<Type, IDictionary<string, IEnumerable<Attribute>>>()
        {
"
            );

            new TypeVisitor()
            {
                VisitNamedTypeAction = typeSymbol =>
                {
                    if (typeSymbol.DeclaredAccessibility != Accessibility.Public ||
                        typeSymbol.IsGenericType ||
                        typeSymbol.GetAttributes().Any(a => a.AttributeClass.Name.Contains(nameof(CompilerGeneratedAttribute))))
                    {
                        return;
                    }

                    var members = typeSymbol.GetMembers()
                        .Where(m => m.DeclaredAccessibility == Accessibility.Public)
                        .Where(m => !m.GetAttributes().Any(a => a.AttributeClass.Name.Contains(nameof(CompilerGeneratedAttribute))))
                        .Where(m => m.GetAttributes().Any(a => IsUsefulAttribute(a)));

                    if (!members.Any()) return;

                    csharp.Append(
$@"         [typeof({typeSymbol.ToString()})] = new Dictionary<string, IEnumerable<Attribute>>()
            {{
"
                    );

                    foreach (var member in members)
                    {
                        csharp.Append(
$@"             [""{member.Name}""] = new Attribute[] 
                {{
"
                        );

                        foreach (var attribute in member.GetAttributes().Where(a => IsUsefulAttribute(a)))
                        {
                            AddNewAttributeString(csharp, attribute);
                        }

                        csharp.Append(
@"              },
"
                        );
                    }

                    csharp.Append(
@"          },        
"
                    );
                }
            }
            .Visit(compilation.GlobalNamespace);

            csharp.Append(
@"      };
"
            );
        }

        private static void AddNewAttributeString(StringBuilder csharp, AttributeData attribute)
        {
            csharp.Append($"                    ");
            csharp.Append($"new {attribute.AttributeClass.ToString()}(");
            for (int i = 0; i < attribute.ConstructorArguments.Length; i++)
            {
                csharp.Append(attribute.ConstructorArguments[i].ToCSharpString());
                if (i < attribute.ConstructorArguments.Length - 1)
                {
                    csharp.Append(", ");
                }
            }
            csharp.Append(")");

            if (attribute.NamedArguments.Length > 0)
            {
                csharp.Append(" { ");
                for (int i = 0; i < attribute.NamedArguments.Length; i++)
                {
                    var name = attribute.NamedArguments[i].Key;
                    var value = attribute.NamedArguments[i].Value.ToCSharpString();
                    csharp.Append($"{name} = {value}");
                    if (i < attribute.NamedArguments.Length - 1)
                    {
                        csharp.Append(", ");
                    }
                }
                csharp.AppendLine("},");
            }
            else
            {
                csharp.AppendLine(",");
            }
        }

        private static bool IsUsefulAttribute(AttributeData attribute)
        {
            return
                !attribute.AttributeClass.Name.Contains(nameof(CLSCompliantAttribute))
                && !attribute.AttributeClass.Name.Contains("NonVersionableAttribute")
                && !attribute.AttributeClass.ContainingNamespace.ToString().StartsWith("System.Runtime.CompilerServices")
                && !attribute.AttributeClass.ContainingNamespace.ToString().StartsWith("System.Runtime.InteropServices")
                && !attribute.AttributeClass.ContainingNamespace.ToString().StartsWith("System.Diagnostics");
        }
    }

    public class TypeVisitor : SymbolVisitor
    {
        public Action<INamedTypeSymbol> VisitNamedTypeAction { get; set; }

        public override void VisitNamedType(INamedTypeSymbol symbol)
        {
            VisitNamedTypeAction(symbol);
        }

        public override void VisitNamespace(INamespaceSymbol symbol)
        {
            Console.WriteLine(symbol);

            foreach (var childSymbol in symbol.GetMembers())
            {
                //We must implement the visitor pattern ourselves and 
                //accept the child symbols in order to visit their children
                childSymbol.Accept(this);
            }
        }
    }
}
