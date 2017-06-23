using System.Collections.Generic;
using System.Threading.Tasks;

namespace System.Net.Http
{
    public class HttpContent
    {
        private IDictionary<string, object> dictionary;

        public HttpContent(IDictionary<string, object> dictionary)
        {
            this.dictionary = dictionary;
        }

        public Task<string> ReadAsStringAsync()
        {
            var tcs = new TaskCompletionSource<string>();
            tcs.TrySetResult((string)dictionary["bodyText"]);
            return tcs.Task;
        }
    }
}