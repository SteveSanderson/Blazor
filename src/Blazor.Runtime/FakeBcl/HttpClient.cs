using System;
using System.Collections.Generic;

namespace Blazor.Runtime.FakeBcl
{
    public class HttpClient : IDisposable
    {
        private static Dictionary<long, TaskCompletionSource<string>> _pendingResults
            = new Dictionary<long, TaskCompletionSource<string>>();
        private static long _nextPendingResultId = 0;

        public Task<string> GetStringAsync(string url)
        {
            var tcs = new TaskCompletionSource<string>();
            var resultId = _nextPendingResultId++;
            _pendingResults[resultId] = tcs;

            var request = new Dictionary<string, object>
            {
                { "completionHandle", resultId.ToString() },
                { "url", url }
            };

            WebAssembly.Runtime.InvokeRegisteredMethod("HttpClient_IssueRequest", request);

            return tcs.Task;
        }

        private static void NotifyRequestCompletion(string resultDescriptorJson)
        {
            var result = MiniJSON.Json.Deserialize(resultDescriptorJson) as Dictionary<string, object>;

            var resultId = long.Parse((string)result["handle"]);
            if (_pendingResults.TryGetValue(resultId, out var tcs))
            {
                _pendingResults.Remove(resultId);

                if (result.ContainsKey("error"))
                {
                    tcs.TrySetException(new InvalidOperationException((string)result["error"]));
                }
                else
                {
                    tcs.TrySetResult((string)result["text"]);
                }
            }
            else
            {
                throw new ArgumentException("Couldn't find entry for pending result " + resultId);
            }
        }

        public void Dispose()
        {
        }
    }
}
