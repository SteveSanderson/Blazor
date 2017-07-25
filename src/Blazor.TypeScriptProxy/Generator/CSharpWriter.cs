using System;
using System.Collections.Generic;
using System.Text;

namespace Blazor.TypeScriptProxy.Generator
{
    public class CSharpWriter
    {
        public CSharpWriter()
        {
            Builder = new StringBuilder();
        }

        private StringBuilder Builder { get; }

        public int CurrentIndent { get; set; }

        public CSharpWriter WriteLine(string content)
        {
            TryWriteIndent();
            Builder.AppendLine(content);

            return this;
        }

        public CSharpWriter Write(string content)
        {
            TryWriteIndent();
            Builder.Append(content);

            return this;
        }

        public string GenerateCode()
        {
            return Builder.ToString();
        }

        private void TryWriteIndent()
        {
            if (CurrentIndent > 0 && Builder[Builder.Length - 1] == '\n')
            {
                Builder.Append(new string(' ', CurrentIndent));
            }
        }
    }
}
