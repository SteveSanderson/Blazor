using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using Microsoft.AspNetCore.Razor.Language.Legacy;
using Microsoft.AspNetCore.Razor.Language;

namespace RazorRenderer
{
    internal class MyDirectiveIRPass : RazorIRPassBase, IRazorDirectiveClassifierPass
    {
        protected override void ExecuteCore(RazorCodeDocument codeDocument, DocumentIRNode irDocument)
        {
            var parserOptions = irDocument.Options;

            var designTime = parserOptions.DesignTime;
            var walker = new DirectiveWalker();
            walker.VisitDocument(irDocument);

            var classNode = walker.ClassNode;
            foreach (var node in walker.FunctionsDirectiveNodes)
            {
                node.Parent.Children.Remove(node);

                foreach (var child in node.Children.Except(node.Tokens))
                {
                    child.Parent = classNode;
                    classNode.Children.Add(child);
                }
            }

            foreach (var node in walker.InheritsDirectiveNodes.Reverse())
            {
                node.Parent.Children.Remove(node);

                var token = node.Tokens.FirstOrDefault();
                if (token != null)
                {
                    classNode.BaseType = token.Content;
                    break;
                }
            }

            var sectionsMethodNode = new CSharpStatementIRNode();
            RazorIRBuilder.Create(sectionsMethodNode)
                .Add(new RazorIRToken()
                {
                    Kind = RazorIRToken.TokenKind.CSharp,
                    Content = "public override void DefineSections() {"
                });
            classNode.Children.Add(sectionsMethodNode);

            foreach (var node in walker.SectionDirectiveNodes)
            {
                //var sectionIndex = node.Parent.Children.IndexOf(node);
                node.Parent.Children.Remove(node);

                var lambdaContent = designTime ? "__razor_section_writer" : "builder";
                var sectionName = node.Tokens.FirstOrDefault()?.Content;
                var defineSectionStartStatement = new CSharpStatementIRNode();
                RazorIRBuilder.Create(defineSectionStartStatement)
                    .Add(new RazorIRToken()
                    {
                        Kind = RazorIRToken.TokenKind.CSharp,
                        Content = $"DefineSection(\"{sectionName}\", async ({lambdaContent}) => {{"
                    });

                classNode.Children.Add(defineSectionStartStatement);

                foreach (var child in node.Children.Except(node.Tokens))
                {
                    classNode.Children.Add(child);
                }

                var defineSectionEndStatement = new CSharpStatementIRNode();
                RazorIRBuilder.Create(defineSectionEndStatement)
                    .Add(new RazorIRToken()
                    {
                        Kind = RazorIRToken.TokenKind.CSharp,
                        Content = "});"
                    });

                classNode.Children.Add(defineSectionEndStatement);
            }

            var sectionsMethodNodeEnd = new CSharpStatementIRNode();
            RazorIRBuilder.Create(sectionsMethodNodeEnd)
                .Add(new RazorIRToken()
                {
                    Kind = RazorIRToken.TokenKind.CSharp,
                    Content = "}"
                });

            classNode.Children.Add(sectionsMethodNodeEnd);
        }

        private class DirectiveWalker : RazorIRNodeWalker
        {
            public ClassDeclarationIRNode ClassNode { get; private set; }

            public IList<DirectiveIRNode> FunctionsDirectiveNodes { get; } = new List<DirectiveIRNode>();

            public IList<DirectiveIRNode> InheritsDirectiveNodes { get; } = new List<DirectiveIRNode>();

            public IList<DirectiveIRNode> SectionDirectiveNodes { get; } = new List<DirectiveIRNode>();

            public override void VisitClassDeclaration(ClassDeclarationIRNode node)
            {
                if (ClassNode == null)
                {
                    ClassNode = node;
                }

                VisitDefault(node);
            }

            public override void VisitDirective(DirectiveIRNode node)
            {
                if (string.Equals(node.Name, "functions", StringComparison.Ordinal))
                {
                    FunctionsDirectiveNodes.Add(node);
                }
                else if (string.Equals(node.Name, "inherits", StringComparison.Ordinal))
                {
                    InheritsDirectiveNodes.Add(node);
                }
                else if (string.Equals(node.Name, "section", StringComparison.Ordinal))
                {
                    SectionDirectiveNodes.Add(node);
                }
            }
        }
    }
}