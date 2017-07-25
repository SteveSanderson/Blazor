using System;
using System.Collections.Generic;
using System.Text;

namespace System.Net.Http
{
    public class StringContent : HttpContent
    {
        public StringContent(string content)
            : base(new Dictionary<string, object>())
        {
            dictionary["bodyText"] = content;
            dictionary["mediaType"] = "application/json";
        }

        public string Content { get { return (string)dictionary["bodyText"]; } }

        public string MediaType { get { return (string)dictionary["mediaType"]; } }
    }
}
