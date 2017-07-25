using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Blazor.TypeScriptProxy.TypeScriptIR
{
    [JsonConverter(typeof(SyntaxTokenConverter))]
    public interface ISyntaxToken
    {
        SyntaxKind Kind { get; }

        void Accept(SyntaxTokenVisitor visitor);
    }
}
