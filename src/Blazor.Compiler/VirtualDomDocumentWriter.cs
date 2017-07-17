using System;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.AspNetCore.Razor.Language.CodeGeneration;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using AngleSharp.Parser.Html;
using AngleSharp;
using AngleSharp.Html;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Text;

namespace RazorRenderer
{
    class VirtualDomDocumentWriter : DocumentWriter
    {
        private CodeTarget _target;
        private CSharpRenderingContext _context;
        private IDictionary<string, string> _tagNamesToSourceFiles;
        private readonly static Regex _incompleteAttributeRegex = new Regex(@"\s(?<name>[a-z0-9\.\-:_]+)\s*\=\s*$");

        readonly static string[] voidElements = new[]
        {
            "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"
        };

        public VirtualDomDocumentWriter(CodeTarget target, CSharpRenderingContext context, IDictionary<string, string> tagNamesToSourceFiles)
        {
            _target = target;
            _context = context;
            _tagNamesToSourceFiles = tagNamesToSourceFiles;
        }

        public override void WriteDocument(DocumentIRNode node)
        {
            if (node == null)
            {
                throw new ArgumentNullException(nameof(node));
            }

            var visitor = new Visitor(_target, _context, _tagNamesToSourceFiles);

            _context.BasicWriter = new RuntimeBasicWriter();
            _context.TagHelperWriter = new RuntimeTagHelperWriter();

            visitor.VisitDocument(node);
        }

        private class Visitor : RazorIRNodeVisitor
        {
            private readonly CSharpRenderingContext _context;
            private readonly CodeTarget _target;
            private readonly IDictionary<string, string> _tagNamesToSourceFiles;
            private CSharpRenderingContext Context => _context;
            private string _unconsumedHtml;

            private string _nextAttributeName;
            private Dictionary<string, object> _nextElementAttributes = new Dictionary<string, object>();
            private List<CSharpExpressionIRNode> _nextElementAttributeExpressions = new List<CSharpExpressionIRNode>(); // Attributes where the whole name-value pair isn't known until runtime
            private CSharpExpressionIRNode _nextElementBoundExpression;

            private int _sourceSequence;

            public Visitor(CodeTarget target, CSharpRenderingContext context, IDictionary<string, string> tagNamesToSourceFiles)
            {
                _target = target;
                _context = context;
                _tagNamesToSourceFiles = tagNamesToSourceFiles;
            }

            public void RenderChildren(RazorIRNode node)
            {
                for (var i = 0; i < node.Children.Count; i++)
                {
                    var child = node.Children[i];
                    Visit(child);
                }
            }

            public override void VisitDocument(DocumentIRNode node)
            {
                RenderChildren(node);
            }

            public override void VisitNamespaceDeclaration(NamespaceDeclarationIRNode node)
            {
                Context.Writer
                    .Write("namespace ")
                    .WriteLine(node.Content);

                using (Context.Writer.BuildScope())
                {
                    Context.Writer.WriteLineHiddenDirective();
                    RenderChildren(node);
                }
            }

            public override void VisitClassDeclaration(ClassDeclarationIRNode node)
            {
                Context.Writer
                    .Write(node.AccessModifier)
                    .Write(" class ")
                    .Write(node.Name);

                if (node.BaseType != null || node.Interfaces != null)
                {
                    Context.Writer.Write(" : ");
                }

                if (node.BaseType != null)
                {
                    Context.Writer.Write(node.BaseType);

                    if (node.Interfaces != null)
                    {
                        Context.Writer.WriteParameterSeparator();
                    }
                }

                if (node.Interfaces != null)
                {
                    for (var i = 0; i < node.Interfaces.Count; i++)
                    {
                        Context.Writer.Write(node.Interfaces[i]);

                        if (i + 1 < node.Interfaces.Count)
                        {
                            Context.Writer.WriteParameterSeparator();
                        }
                    }
                }

                Context.Writer.WriteLine();

                using (Context.Writer.BuildScope())
                {
                    RenderChildren(node);
                }
            }

            public override void VisitMethodDeclaration(MethodDeclarationIRNode node)
            {
                Context.Writer.WriteLine("#pragma warning disable 1998");

                Context.Writer
                    .Write(node.AccessModifier)
                    .Write(" ");

                if (node.Modifiers != null)
                {
                    for (var i = 0; i < node.Modifiers.Count; i++)
                    {
                        Context.Writer.Write(node.Modifiers[i]);

                        if (i + 1 < node.Modifiers.Count)
                        {
                            Context.Writer.Write(" ");
                        }
                    }
                }

                Context.Writer
                    .Write(" ")
                    .Write(node.ReturnType)
                    .Write(" ")
                    .Write(node.Name)
                    .WriteLine("()");

                using (Context.Writer.BuildScope())
                {
                    // We always wrap the componet's output in a <component> element. This is just to guarantee that there's always
                    // a single top-level element (because otherwise, tracking where components start and end gets very difficult).
                    // Later on, it would be good to enhance the compiler so that if it can statically determine that you were only
                    // emitting a single top-level element anyway (after ignoring any leading/trailing whitespace textnodes), then
                    // it doesn't need to add this extra wrapper. That would be needed to support having components that represented
                    // table rows or list items.
                    WriteOpenElement("component");
                    RenderChildren(node);
                    WriteCloseElement();
                }

                Context.Writer.WriteLine("#pragma warning restore 1998");
            }

            public override void VisitExtension(ExtensionIRNode node)
            {
                node.WriteNode(_target, Context);
            }

            public override void VisitDeclareTagHelperFields(DeclareTagHelperFieldsIRNode node)
            {
                throw new NotImplementedException();
            }

            public override void VisitTagHelper(TagHelperIRNode node)
            {
                throw new NotImplementedException(nameof(VirtualDomDocumentWriter) + " doesn't support tag helpers.");
            }

            public override void VisitCreateTagHelper(CreateTagHelperIRNode node)
            {
                throw new NotImplementedException();
            }

            private CSharpExpressionIRNode MakeCSharpExpressionIRNode(RazorIRNode parent, string csharpExpressionContent)
            {
                var content = new CSharpExpressionIRNode { Parent = parent, Source = parent.Source };
                content.Children.Add(new RazorIRToken {
                    Kind = RazorIRToken.TokenKind.CSharp,
                    Parent = content,
                    Source = parent.Source,
                    Content = csharpExpressionContent
                });
                return content;
            }

            private void WriteOpenComponent(string componentName)
            {
                Context.Writer
                    .WriteStartMethodInvocation("builder.OpenComponent")
                    .Write((++_sourceSequence).ToString())
                    .WriteParameterSeparator()
                    .WriteStringLiteral(componentName)
                    .WriteEndMethodInvocation();
            }

            private void WriteOpenElement(string tagName)
            {
                Context.Writer
                    .WriteStartMethodInvocation("builder.OpenElement")
                    .Write((++_sourceSequence).ToString())
                    .WriteParameterSeparator()
                    .WriteStringLiteral(tagName)
                    .WriteEndMethodInvocation();
            }

            private void WriteCloseElement()
            {
                Context.Writer
                    .WriteStartMethodInvocation("builder.CloseElement")
                    .WriteEndMethodInvocation();
            }

            public override void VisitCSharpExpression(CSharpExpressionIRNode node)
            {
                // Is this a "bind(expr)" expression?
                if (node.Children.Count == 1)
                {
                    var child = node.Children[0] as RazorIRToken;
                    if (child != null && child.IsCSharp)
                    {
                        if (TryAddBindExpression(child))
                        {
                            return;
                        }
                    }
                }

                if (!string.IsNullOrEmpty(_unconsumedHtml))
                {
                    // We're in the middle of writing out an element tag. This C# expression might represent an entire
                    // attribute (e.g., @onclick(...)), or it might represent the value of an attribute (e.g., something=@value).
                    // Differentiate based on whether the unconsumed HTML ends with " attribute=".
                    var incompleteAttributeMatch = _incompleteAttributeRegex.Match(_unconsumedHtml);
                    if (incompleteAttributeMatch.Success)
                    {
                        var wholeMatchText = incompleteAttributeMatch.Groups[0];
                        var attributeName = incompleteAttributeMatch.Groups["name"].Value;
                        _unconsumedHtml = _unconsumedHtml.Substring(0, _unconsumedHtml.Length - wholeMatchText.Length + 1);
                        _nextElementAttributes[attributeName] = node;
                    }
                    else
                    {
                        // There's no incomplete attribute, so the C# expression must represent an entire attribute
                        _nextElementAttributeExpressions.Add(node);
                    }
                }
                else
                {
                    // We're between tags, so treat it as an @someVar expression to be rendered as a text node
                    WriteCSharpExpressionAsTextNode(++_sourceSequence, _context, node);
                }
            }

            // Implements the @bind(...) syntax
            private bool TryAddBindExpression(RazorIRToken token)
            {
                const string bindExpressionStart = "bind(";
                const string bindExpressionEnd = ")";
                if (token.Content.StartsWith(bindExpressionStart) && token.Content.EndsWith(bindExpressionEnd))
                {
                    // Extract "expr" from "bind(expr)"
                    var boundExpression = token.Content.Substring(
                        bindExpressionStart.Length,
                        token.Content.Length - bindExpressionStart.Length - bindExpressionEnd.Length);

                    // We can't work out the final binding expression code yet, because we don't yet know what
                    // type of element this is going onto (there might be a "type='checkbox'" or similar that
                    // appears *after* the @bind(...)). So just store the expression for later use.
                    _nextElementBoundExpression = MakeCSharpExpressionIRNode(token, boundExpression);
                    return true;
                }

                return false;
            }

            public override void VisitCSharpStatement(CSharpStatementIRNode node)
            {
                Context.BasicWriter.WriteCSharpStatement(Context, node);
            }
            
            public override void VisitHtmlAttribute(HtmlAttributeIRNode node)
            {
                _nextAttributeName = node.Name;
                RenderChildren(node);
            }

            private void WriteAttribute(string name, object value)
            {
                Context.Writer.WriteStartInstanceMethodInvocation("builder", "AddAttribute");
                Context.Writer.WriteStringLiteral(name);
                Context.Writer.WriteParameterSeparator();

                if (value is HtmlContentIRNode)
                {
                    Context.Writer.WriteStringLiteral(GetContent((HtmlContentIRNode)value));
                }
                else if (value is CSharpExpressionIRNode)
                {
                    WriteCSharpExpression((CSharpExpressionIRNode)value);
                }
                else if ((value is RazorIRToken razorIRToken) && razorIRToken.IsCSharp)
                {
                    Context.Writer.Write(razorIRToken.Content);
                }
                else
                {
                    throw new ArgumentException("value parameter is of unexpected type " + value.GetType().FullName);
                }

                Context.Writer.WriteEndMethodInvocation();
            }

            private void WriteCSharpExpression(CSharpExpressionIRNode node)
            {
                for (var i = 0; i < node.Children.Count; i++)
                {
                    if (node.Children[i] is RazorIRToken token && token.IsCSharp)
                    {
                        Context.Writer.Write(token.Content);
                    }
                    else
                    {
                        // There may be something else inside the expression like a Template or another extension node.
                        Visit(node.Children[i]);
                    }
                }
            }
            
            public override void VisitHtmlAttributeValue(HtmlAttributeValueIRNode node)
            {
                _nextElementAttributes[_nextAttributeName] = CreateHtmlContentIRNode(GetContent(node), node.Source, node.Parent);
                _nextAttributeName = null;
            }

            public override void VisitCSharpExpressionAttributeValue(CSharpExpressionAttributeValueIRNode node)
            {
                if (node.Children.Count > 1)
                {
                    throw new ArgumentException("Attribute values can't contain more than one code element");
                }

                var value = node.Children.Single();
                _nextElementAttributes[_nextAttributeName] = value;
                _nextAttributeName = null;
            }

            public override void VisitCSharpStatementAttributeValue(CSharpStatementAttributeValueIRNode node)
            {
                if (node.Children.Count > 1)
                {
                    throw new ArgumentException("Attribute values can't contain more than one code element");
                }

                var value = node.Children.Single();

                // For syntax like <button onclick="@{ some C# statement }">...</button>,
                // we convert the statement into a lambda, as if you wrote onclick="@(() => { some C# statement })"
                // since that does what you'd want and is generally a good syntax for callbacks
                var innerCSharp = (RazorIRToken)value;
                var attributeValue = MakeCSharpExpressionIRNode(node.Parent, $"_ => {{ {innerCSharp.Content} }}");
                _nextElementAttributes[_nextAttributeName] = attributeValue;
                _nextAttributeName = null;
            }

            public override void VisitHtml(HtmlContentIRNode node)
            {
                var htmlToTokenize = GetContent(node);
                if (!string.IsNullOrEmpty(_unconsumedHtml))
                {
                    htmlToTokenize = _unconsumedHtml + htmlToTokenize;
                    _unconsumedHtml = null;
                }
                var tokenizer = new HtmlTokenizer(
                    new TextSource(htmlToTokenize),
                    HtmlEntityService.Resolver);
                HtmlToken nextToken;
                while ((nextToken = tokenizer.Get()).Type != HtmlTokenType.EndOfFile) {
                    switch (nextToken.Type)
                    {
                        case HtmlTokenType.StartTag:
                        case HtmlTokenType.EndTag:
                            var nextTag = nextToken.AsTag();
                            var tagNameLower = nextToken.Data.ToLowerInvariant();
                            var isChildComponent = _tagNamesToSourceFiles.ContainsKey(nextTag.Data);
                            var isVoidElement = Array.IndexOf(voidElements, tagNameLower) >= 0;
                            var shouldEmitEndTag = (isVoidElement && nextToken.Type == HtmlTokenType.StartTag)
                                || (!isVoidElement && nextToken.Type == HtmlTokenType.EndTag)
                                || (isChildComponent && nextToken.AsTag().IsSelfClosing);
                            if (nextToken.Type == HtmlTokenType.StartTag)
                            {
                                if (isChildComponent)
                                {
                                    WriteOpenComponent(_tagNamesToSourceFiles[nextTag.Data]);
                                }
                                else
                                {
                                    WriteOpenElement(nextTag.Data);
                                }

                                foreach (var attribute in nextTag.Attributes)
                                {
                                    WriteAttribute(attribute.Key, CreateHtmlContentIRNode(attribute.Value));
                                }
                            }

                            ApplyPendingBindExpression(nextTag.Attributes);

                            if (_nextElementAttributes.Count > 0)
                            {
                                foreach (var attributeKvp in _nextElementAttributes)
                                {
                                    WriteAttribute(attributeKvp.Key, attributeKvp.Value);
                                }
                                _nextElementAttributes.Clear();
                            }

                            if (_nextElementAttributeExpressions.Count > 0)
                            {
                                ((RuntimeBasicWriter)_context.BasicWriter).WriteCSharpExpressionMethod = "builder.AddAttribute";
                                foreach (var attributeExpression in _nextElementAttributeExpressions)
                                {
                                    Context.BasicWriter.WriteCSharpExpression(Context, attributeExpression);

                                }
                                _nextElementAttributeExpressions.Clear();
                            }

                            if (shouldEmitEndTag)
                            {
                                // TODO: Check tags balance
                                WriteCloseElement();
                            }
                            break;

                        case HtmlTokenType.Character:
                            WriteHtmlContent(++_sourceSequence, Context, CreateHtmlContentIRNode(nextToken.Data, node.Source, node.Parent));
                            break;
                    }
                }

                // If we got an EOF in the middle of an HTML element, it's probably because we're
                // about to receive some attribute name/value pairs. Store the unused HTML content
                // so we can prepend it to the part that comes after the attributes to make
                // complete valid markup.
                if (htmlToTokenize.Length > nextToken.Position.Position)
                {
                    _unconsumedHtml = htmlToTokenize.Substring(nextToken.Position.Position - 1);
                }
            }

            private void ApplyPendingBindExpression(List<KeyValuePair<string, string>> nextTagStaticAttributes)
            {
                // By now, we definitely have all the statically-assigned attributes (e.g., "type='checkbox'"),
                // so we can determine the actual binding expression code, which varies according to target
                // element type.
                if (_nextElementBoundExpression != null)
                {
                    var isCheckbox = nextTagStaticAttributes.Any(a => a.Key == "type" && a.Value == "checkbox");

                    // Attach the attribute 'value="expr"' or 'checked="expr"'
                    _nextElementAttributes[isCheckbox ? "checked" : "value"] = _nextElementBoundExpression;

                    // Attach the attribute 'onchange=@(evt => { expr = (sometype)evt.TargetValue; })'
                    var boundExpressionSourceText = _nextElementBoundExpression.Children.Cast<RazorIRToken>().Single().Content;
                    var targetValueType = isCheckbox ? "bool" : "string";
                    var onChangeExpr = $"evt => {{ {boundExpressionSourceText} = ({targetValueType})evt.TargetValue; }}";
                    _nextElementAttributes["onchange"] = MakeCSharpExpressionIRNode(_nextElementBoundExpression, onChangeExpr);

                    _nextElementBoundExpression = null;
                }
            }

            public static void WriteHtmlContent(int sourceSequence, CSharpRenderingContext context, HtmlContentIRNode node)
            {
                const int MaxStringLiteralLength = 1024;

                var charactersConsumed = 0;

                // Render the string in pieces to avoid Roslyn OOM exceptions at compile time: https://github.com/aspnet/External/issues/54
                var nodeContent = GetContent(node);
                while (charactersConsumed < nodeContent.Length)
                {
                    string textToRender;
                    if (nodeContent.Length <= MaxStringLiteralLength)
                    {
                        textToRender = nodeContent;
                    }
                    else
                    {
                        var charactersToSubstring = Math.Min(MaxStringLiteralLength, nodeContent.Length - charactersConsumed);
                        textToRender = nodeContent.Substring(charactersConsumed, charactersToSubstring);
                    }

                    context.Writer
                        .WriteStartMethodInvocation("builder.AddTextNode")
                        .Write(sourceSequence.ToString())
                        .WriteParameterSeparator()
                        .WriteStringLiteral(textToRender)
                        .WriteEndMethodInvocation();

                    charactersConsumed += textToRender.Length;
                }
            }

            public static void WriteCSharpExpressionAsTextNode(int sourceSequence, CSharpRenderingContext context, CSharpExpressionIRNode node)
            {
                if (context == null)
                {
                    throw new ArgumentNullException(nameof(context));
                }

                if (node == null)
                {
                    throw new ArgumentNullException(nameof(node));
                }

                context.Writer.WriteStartMethodInvocation("builder.AddFromExpression")
                    .Write(sourceSequence.ToString())
                    .WriteParameterSeparator();

                for (var i = 0; i < node.Children.Count; i++)
                {
                    if (node.Children[i] is RazorIRToken token && token.IsCSharp)
                    {
                        context.Writer.Write(token.Content);
                    }
                    else
                    {
                        // There may be something else inside the expression like a Template or another extension node.
                        throw new NotImplementedException("There may be something else inside the expression like a Template or another extension node.");
                    }
                }

                context.Writer.WriteEndMethodInvocation();
            }

            private static HtmlContentIRNode CreateHtmlContentIRNode(string content, SourceSpan? source = null, RazorIRNode parent = null)
            {
                var result = new HtmlContentIRNode
                {
                    Source = source,
                    Parent = parent
                };

                result.Children.Add(new RazorIRToken
                {
                    Kind = RazorIRToken.TokenKind.Html,
                    Content = content
                });

                return result;
            }

            private static string GetContent(HtmlContentIRNode node)
            {
                var builder = new StringBuilder();
                for (var i = 0; i < node.Children.Count; i++)
                {
                    if (node.Children[i] is RazorIRToken token && token.IsHtml)
                    {
                        builder.Append(token.Content);
                    }
                }

                return builder.ToString();
            }

            private static string GetContent(HtmlAttributeValueIRNode node)
            {
                var builder = new StringBuilder();
                for (var i = 0; i < node.Children.Count; i++)
                {
                    if (node.Children[i] is RazorIRToken token && token.IsHtml)
                    {
                        builder.Append(token.Content);
                    }
                }

                return builder.ToString();
            }
        }
    }
}
