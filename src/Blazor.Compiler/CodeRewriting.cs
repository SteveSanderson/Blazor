using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RazorRenderer
{
    /*
     * The code in this file is not presently used. It's just a reminder of how it would be possible to modify the
     * syntax trees and recompile, e.g., to insert extra properties based on custom attributes.
     */
    class CodeRewriting
    {
        public static IList<SyntaxTree> RewriteSyntaxTrees(IEnumerable<SyntaxTree> syntaxTrees, Compilation compilation)
        {
            return syntaxTrees.Select(st =>
            {
                var model = compilation.GetSemanticModel(st, true);
                return SyntaxFactory.SyntaxTree(new MyRewriter(model).Visit(st.GetRoot()));
            }).ToList();
        }


        [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
        public class FromParentAttribute : Attribute
        {
        }

        class MyRewriter : CSharpSyntaxRewriter
        {
            private SemanticModel _model;

            public MyRewriter(SemanticModel model)
            {
                _model = model;
            }

            public override SyntaxNode VisitClassDeclaration(ClassDeclarationSyntax node)
            {
                var foundVariables = new List<VariableDeclaratorSyntax>();
                foreach (var fieldSyntax in node.DescendantNodes().OfType<FieldDeclarationSyntax>())
                {
                    foreach (var variable in fieldSyntax.Declaration.Variables)
                    {
                        var fieldSymbol = _model.GetDeclaredSymbol(variable);
                        var attributes = fieldSymbol.GetAttributes();
                        foreach (var attribute in attributes)
                        {
                            var attributeTypeName = attribute.AttributeClass.ConstructedFrom.ToDisplayString();
                            if (attributeTypeName == typeof(FromParentAttribute).FullName)
                            {
                                foundVariables.Add(variable);
                            }
                        }
                    }
                }

                if (foundVariables.Any())
                {
                    foreach (var variable in foundVariables)
                    {
                        var variableType = variable.Parent.DescendantNodes().OfType<TypeSyntax>().First();
                        var extraProperty = SyntaxFactory.FieldDeclaration(
                            new SyntaxList<AttributeListSyntax>(),
                            SyntaxFactory.TokenList().Add(
                                SyntaxFactory.Token(SyntaxKind.StaticKeyword).WithTrailingTrivia(SyntaxFactory.Space)),
                            SyntaxFactory.VariableDeclaration(variableType.WithTrailingTrivia(SyntaxFactory.Space),
                                SyntaxFactory.SeparatedList<VariableDeclaratorSyntax>().Add(
                                    SyntaxFactory.VariableDeclarator("MyDynamicThing"))))
                            .WithLeadingTrivia(node.GetLeadingTrivia())
                            .WithTrailingTrivia(node.GetTrailingTrivia());

                        node = node.AddMembers(extraProperty);
                    }
                }

                return node;
            }
        }
    }
}
