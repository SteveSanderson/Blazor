using Blazor.Util;
using System.Collections.Generic;

namespace Blazor.Interop
{
    public class HttpResponse<TBody>
    {
        private IDictionary<string, object> _data;
        private TBody _parsedBodyJson;

        internal HttpResponse(IDictionary<string, object> data)
        {
            _data = data;
        }

        public int StatusCode => (int)_data["statusCode"];
        public string BodyText => (string)_data["bodyText"];

        public TBody BodyJson
        {
            get
            {
                if (_parsedBodyJson == null)
                {
                    _parsedBodyJson = Json.Deserialize<TBody>(BodyText);
                }

                return _parsedBodyJson;
            }
        }
    }
}
