using System;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Blazor.Host.Debugging.Protocol
{
    public class MessageBase
    {
        public int? Id { get; set; }
        public string Method { get; set; }
        public JObject Params { get; set; }
        public JObject Result { get; set; }
        public JObject Error { get; set; }

        internal string ToDebugString()
        {
            return JsonConvert.SerializeObject(this, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }
    }
}
