using Blazor.Interop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Blazor.Http
{
    public class HttpClient
    {
        [DllImport(@"browser.js", CharSet = CharSet.Ansi)]
        public static extern int BeginFetch(string descriptor);

        private static int OnFetchCompleted(string descriptor)
        {
            var parsed = (IDictionary<string, object>)MiniJSON.Json.Deserialize(descriptor);
            var asyncResultAddress = (int)parsed["asyncResultAddress"];

            using (var asyncResultHandle = ManagedGCHandle.FromAddress<IMarkCompleted>(asyncResultAddress))
            {
                var asyncResult = asyncResultHandle.Value;
                asyncResult.MarkAsCompleted((IDictionary<string, object>)parsed["response"]);
                return 0;
            }
        }

        public static Task<HttpResponse<TBody>> FetchAsync<TBody>(string url)
        {
            var httpClient = new HttpClient();
            var tcs = new TaskCompletionSource<HttpResponse<TBody>>();

            httpClient.BeginGetResponse<TBody>(url, ar =>
            {
                try
                {
                    var response = httpClient.EndGetResponse<TBody>(ar);
                    if (response.StatusCode < 200 || response.StatusCode >= 300)
                    {
                        throw new HttpClientException($"Response status code was {response.StatusCode}");
                    }

                    tcs.SetResult(response);
                }
                catch(Exception ex)
                {
                    tcs.SetException(ex);
                }
            }, null);

            return tcs.Task;
        }

        public IAsyncResult BeginGetResponse<TBody>(string url, AsyncCallback asyncCallback, object state)
        {
            var asyncResult = new HttpClientAsyncResult<TBody>(asyncCallback, state);
            var descriptorDict = new Dictionary<string, object>()
            {
                { "url", url },
                { "asyncResultAddress", ManagedGCHandle.FromObject((IMarkCompleted)asyncResult).Address }
            };
            BeginFetch(MiniJSON.Json.Serialize(descriptorDict));
            return asyncResult;
        }

        public HttpResponse<TBody> EndGetResponse<TBody>(IAsyncResult asyncResult)
        {
            return ((HttpClientAsyncResult<TBody>)asyncResult).Result;
        }

        public class HttpClientException : Exception
        {
            public HttpClientException(string message) : base(message)
            {
            }
        }

        private class HttpClientAsyncResult<TBody> : IMarkCompleted, IAsyncResult
        {
            private AsyncCallback _callback;
            private object _state;
            private HttpResponse<TBody> _result;

            public HttpClientAsyncResult(AsyncCallback callback, object state)
            {
                _callback = callback;
                _state = state;
            }

            public bool IsCompleted => _result != null;

            public WaitHandle AsyncWaitHandle => null;

            public object AsyncState => _state;

            public bool CompletedSynchronously => false;

            void IMarkCompleted.MarkAsCompleted(IDictionary<string, object> dictionary)
            {
                _result = new HttpResponse<TBody>(dictionary);
                _callback(this);
            }

            internal HttpResponse<TBody> Result => _result;
        }

        private interface IMarkCompleted
        {
            void MarkAsCompleted(IDictionary<string, object> dictionary);
        }
    }
}
