using System;
using System.Collections.Generic;
using System.Text;

namespace System.Net.Http
{
    public class HttpRequestMessage
    {
        private IDictionary<string, object> dictionary;

        public HttpRequestMessage(HttpMethod method, string requestUri)
        {
            Method = method;
            Url = requestUri;
        }

        public HttpRequestMessage(IDictionary<string, object> dictionary)
        {
            this.dictionary = dictionary;
            Content = new HttpContent(dictionary);
            StatusCode = (HttpStatusCode)((int)dictionary["statusCode"]);
        }

        public HttpContent Content { get; set; }

        public HttpStatusCode StatusCode { get; }

        public HttpMethod Method { get; set; }

        public string Url { get; set; }


        //public HttpResponseMessage EnsureSuccessStatusCode()
        //{
        //    if ((int)StatusCode >= 300)
        //    {
        //        throw new Exception($"Status Code {StatusCode}");
        //    }

        //    return this;
        //}
    }
}
