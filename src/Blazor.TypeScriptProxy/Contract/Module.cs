using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;

namespace Blazor.TypeScriptProxy.Contract
{
    public class Module
    {
        public IEnumerable<ISyntaxToken> Statements { get; set; }

        public IEnumerable<JObject> ParseDiagnostics { get; set; }
    }
}
