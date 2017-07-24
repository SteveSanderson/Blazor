// © Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static System.FormattableString;

namespace SampleDebugAdapter.Directives
{
    internal class DirectiveProcessor
    {
        #region Private Fields

        private SampleDebugAdapter adapter;
        private List<IDirective> directives = new List<IDirective>();

        #endregion

        #region Constructor

        internal DirectiveProcessor(SampleDebugAdapter adapter)
        {
            this.adapter = adapter;
        }

        #endregion

        #region Directive Registration

        internal void RegisterDirective(IDirective directive)
        {
            this.directives.Add(directive);
        }

        #endregion

        #region Public API

        internal bool IsDirective(string line)
        {
            return line.StartsWith("$");
        }

        internal bool ProcessDirective(string line, StringBuilder output)
        {
            string directiveName;
            string[] arguments;
            if (this.ParseDirective(line, output, out directiveName, out arguments))
            {
                IDirective directive = this.directives.FirstOrDefault(d => String.Equals(d.Name, directiveName, StringComparison.OrdinalIgnoreCase));
                if (directive == null)
                {
                    output.AppendLine(Invariant($"Unknown directive type '{directiveName}'!"));
                    return false;
                }

                return directive.Execute(arguments, output);
            }

            return false;
        }

        internal object GetArguments(string line)
        {
            StringBuilder output = new StringBuilder();
            string directiveName;
            string[] arguments;

            if (this.ParseDirective(line, output, out directiveName, out arguments))
            {
                IDirective directive = this.directives.FirstOrDefault(d => String.Equals(d.Name, directiveName, StringComparison.OrdinalIgnoreCase));
                if (directive == null)
                {
                    return null;
                }

                return directive.ParseArgs(arguments);
            }

            return null;
        }

        #endregion

        #region Argument Parsing

        private enum ParseState
        {
            Initial,
            DirectiveName,
            Arguments,
            QuotedString
        }

        private bool ParseDirective(string line, StringBuilder output, out string directiveName, out string[] arguments)
        {
            directiveName = null;
            arguments = null;

            List<string> args = new List<string>();
            ParseState state = ParseState.Initial;
            bool isEscape = false;

            StringBuilder builder = new StringBuilder();
            foreach (char c in line)
            {
                if (state == ParseState.Initial)
                {
                    if (c == '$')
                    {
                        state = ParseState.DirectiveName;
                        continue;
                    }
                    else
                    {
                        output.AppendLine("Expected directive to begin with '$'!");
                        return false;
                    }
                }

                if (isEscape)
                {
                    switch (c)
                    {
                        case 'n':
                            builder.Append("\n");
                            break;

                        case 'r':
                            builder.Append("\r");
                            break;

                        case '\\':
                            builder.Append("\\");
                            break;

                        case '"':
                            builder.Append("\"");
                            break;

                        case ' ':
                            builder.Append(" ");
                            break;

                        default:
                            output.AppendLine(Invariant($"Unknown character escape '\\{c}'!"));
                            return false;
                    }

                    isEscape = false;
                    continue;
                }

                if (c == '\\')
                {
                    isEscape = true;
                    continue;
                }

                if (state == ParseState.DirectiveName && c == ' ')
                {
                    state = ParseState.Arguments;
                    directiveName = builder.ToString();
                    builder.Clear();
                    continue;
                }

                if (state == ParseState.Arguments && c == '"')
                {
                    state = ParseState.QuotedString;
                    continue;
                }

                if (state == ParseState.QuotedString && c == '"')
                {
                    state = ParseState.Arguments;
                    continue;
                }

                if (state == ParseState.Arguments && c == ' ')
                {
                    if (builder.Length > 0)
                    {
                        args.Add(builder.ToString());
                        builder.Clear();
                    }

                    continue;
                }

                builder.Append(c);
            }

            if (state == ParseState.QuotedString)
            {
                output.AppendLine("Mismatched quotes!");
                return false;
            }

            if (builder.Length > 0)
            {
                if (state == ParseState.Arguments)
                {
                    args.Add(builder.ToString());
                }
                else if (state == ParseState.DirectiveName)
                {
                    directiveName = builder.ToString();
                }
            }

            arguments = args.ToArray();
            return true;
        }

        #endregion
    }
}
