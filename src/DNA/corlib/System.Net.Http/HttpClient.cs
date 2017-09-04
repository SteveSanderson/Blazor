using Blazor.System.Runtime.InteropServices.Json;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;

namespace System.Net.Http
{
    public class HttpClient : IDisposable
    {
        [DllImport(@"browser.js", CharSet = CharSet.Ansi)]
        private static extern int BeginFetch(string descriptor);

        private static int OnFetchCompleted(string descriptor)
        {
            var parsed = (IDictionary<string, object>)Json.Deserialize(descriptor);
            var asyncResultAddress = (int)parsed["asyncResultAddress"];
            var gcHandle = GCHandle.FromIntPtr(new IntPtr(asyncResultAddress));

            try
            {
                var asyncResult = (IMarkCompleted)gcHandle.Target;
                asyncResult.MarkAsCompleted((IDictionary<string, object>)parsed["response"]);
                return 0;
            }
            finally
            {
                gcHandle.Free();
            }
        }

        private int _sendAsyncCount = 0;

        public Task<HttpResponseMessage> SendAsync(HttpRequestMessage request)
        {
            var count = Interlocked.Increment(ref _sendAsyncCount);

            var tcs = new TaskCompletionSource<HttpResponseMessage>();

            var body = request.Content as StringContent;

            BeginResponse(request.Method?.Method ?? HttpMethod.Get.Method, request.Url, body?.Content, body?.MediaType, ar =>
            {
                try
                {
                    var response = EndResponse(ar);

                    if ((int)response.StatusCode < 200 || (int)response.StatusCode >= 300)
                    {
                        throw new HttpClientException($"Response status code was {response.StatusCode}");
                    }

                    tcs.TrySetResult(response);
                }
                catch (Exception ex)
                {
                    tcs.TrySetException(ex);
                }
            }, null);

            return tcs.Task;
        }

        public Task<HttpResponseMessage> GetAsync(string url) =>
            SendAsync(new HttpRequestMessage(HttpMethod.Get, url));

        public async Task<string> GetStringAsync(string url)
        {
            var response = await GetAsync(url);
            return await response.Content.ReadAsStringAsync();
        }

        private IAsyncResult BeginResponse(string method, string url, string body, string mediaType, AsyncCallback asyncCallback, object state)
        {
            var asyncResult = new HttpClientAsyncResult(asyncCallback, state);
            var gcHandle = GCHandle.Alloc(asyncResult, GCHandleType.Pinned);
            var descriptorDict = new Dictionary<string, object>()
            {
                { "method", method },
                { "body", body },
                { "mediaType", mediaType },
                { "url", url },
                { "asyncResultAddress", gcHandle.AddrOfPinnedObject().ToInt32() }
            };
            BeginFetch(Json.Serialize(descriptorDict));
            return asyncResult;
        }

        private HttpResponseMessage EndResponse(IAsyncResult asyncResult)
        {
            return ((HttpClientAsyncResult)asyncResult).Result;
        }

        public void Dispose()
        {
            // Nothing to dispose
        }

        public class HttpClientException : Exception
        {
            public HttpClientException(string message) : base(message)
            {
            }
        }

        private class HttpClientAsyncResult : IMarkCompleted, IAsyncResult
        {
            private AsyncCallback _callback;
            private object _state;
            private HttpResponseMessage _result;

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
                _result = new HttpResponseMessage(dictionary);
                _callback(this);
            }

            internal HttpResponseMessage Result => _result;
        }

        private interface IMarkCompleted
        {
            void MarkAsCompleted(IDictionary<string, object> dictionary);
        }
    }
}
