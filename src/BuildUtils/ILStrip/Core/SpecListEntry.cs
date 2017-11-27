using System;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Core
{
    internal class SpecListEntry
    {
        public SpecListEntry(string parseSpecLine)
        {
            parseSpecLine = parseSpecLine.Trim();

            if (parseSpecLine.StartsWith('-'))
            {
                Negated = true;
                parseSpecLine = parseSpecLine.Substring(1);
            }

            var colonsPos = parseSpecLine.IndexOf("::");
            if (colonsPos < 0)
            {
                TypeName = parseSpecLine;
            }
            else
            {
                TypeName = parseSpecLine.Substring(0, colonsPos);
                parseSpecLine = parseSpecLine.Substring(colonsPos + 2);

                var bracketPos = parseSpecLine.IndexOf('(');
                if (bracketPos < 0)
                {
                    MethodName = parseSpecLine;
                }
                else
                {
                    MethodName = parseSpecLine.Substring(0, bracketPos);
                    Args = parseSpecLine.Substring(bracketPos + 1, parseSpecLine.Length - bracketPos - 2);
                }
            }
        }

        public bool IsMatch(AssemblyItem item)
        {
            return MatchesType(item)
                && MatchesMethod(item)
                && MatchesArgs(item);
        }

        private bool MatchesArgs(AssemblyItem item)
        {
            if (Args == null)
            {
                return true;
            }
            else
            {
                var methodString = item.Method.ToString();
                var bracketPos = methodString.IndexOf('(');
                var argsString = methodString.Substring(bracketPos + 1, methodString.Length - bracketPos - 2);
                return string.Equals(argsString, Args, StringComparison.Ordinal);
            }
        }

        private bool MatchesMethod(AssemblyItem item)
        {
            return MethodName == null ? true : MethodName.EndsWith('*')
                            ? item.Method.Name.StartsWith(MethodName.Substring(0, MethodName.Length - 1), StringComparison.Ordinal)
                            : string.Equals(item.Method.Name, MethodName, StringComparison.Ordinal);
        }

        private bool MatchesType(AssemblyItem item)
        {
            return TypeName.EndsWith('*')
                ? item.Method.DeclaringType.FullName.StartsWith(TypeName.Substring(0, TypeName.Length - 1), StringComparison.Ordinal)
                : string.Equals(item.Method.DeclaringType.FullName, TypeName, StringComparison.Ordinal);
        }

        public bool Negated { get; }
        public string TypeName { get; }
        public string MethodName { get; }
        public string Args { get; }
    }
}
