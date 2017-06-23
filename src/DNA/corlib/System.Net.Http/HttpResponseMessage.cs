using System;
using System.Collections.Generic;
using System.Text;

namespace System.Net.Http
{
    public class HttpResponseMessage
    {
        private IDictionary<string, object> dictionary;

        public HttpResponseMessage(IDictionary<string, object> dictionary)
        {
            this.dictionary = dictionary;
            Content = new HttpContent(dictionary);
            StatusCode = (HttpStatusCode)((int)dictionary["statusCode"]);
        }

        public HttpContent Content { get; }

        public HttpStatusCode StatusCode { get; }
    }
}
