using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;

namespace Blazor.TypeScriptProxy.TypeScriptIR
{
    public class Module
    {
        private IEnumerable<ISyntaxToken> _statements;

        public IEnumerable<ISyntaxToken> Statements
        {
            get => _statements;
            set
            {
                _statements = value.Where(val => val != null);
            }
        }

        public IEnumerable<JObject> ParseDiagnostics { get; set; }
    }
}
