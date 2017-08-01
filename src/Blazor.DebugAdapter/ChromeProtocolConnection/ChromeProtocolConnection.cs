using Blazor.DebugAdapter.ChromeProtocolConnection.Protocol;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Blazor.DebugAdapter.ChromeProtocolConnection
{
    public class ChromeProtocolConnection : IDisposable
    {
        ClientWebSocket _browserConnection;
        readonly Action<string> _log;
        readonly Action<string> _onBreakpointHit;
        readonly CancellationTokenSource _disposalCancellationTokenSource;
        readonly JsonSerializerSettings _jsonSettings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
        readonly Dictionary<int, TaskCompletionSource<string>> _pendingResponseAwaiters = new Dictionary<int, TaskCompletionSource<string>>();
        readonly object _pendingResponseAwaitersLock = new object();
        private TaskCompletionSource<string> _connectionTcs = new TaskCompletionSource<string>(TaskCreationOptions.RunContinuationsAsynchronously);
        private int _applicationPort;
        private string _debuggerHost;

        public ChromeProtocolConnection(int applicationPort, string debuggerHost, Action<string> log, Action<string> onBreakpointHit)
        {
            _log = log;
            _onBreakpointHit = onBreakpointHit;
            _browserConnection = new ClientWebSocket();
            _disposalCancellationTokenSource = new CancellationTokenSource();
            _applicationPort = applicationPort;
            _debuggerHost = debuggerHost;
        }

        public Task<string> ConnectAsync()
        {
            return ConnectAsync(_applicationPort, _debuggerHost);
        }

        public void Dispose()
        {
            if (_browserConnection != null)
            {
                _browserConnection.Dispose();
                _disposalCancellationTokenSource.Cancel();
                _browserConnection = null;
            }
        }

        public async Task ResumeAsync()
        {
            await SendRequestAsync(new ChromeRequest("Debugger.resume"));
        }

        private async Task<string> ConnectAsync(int applicationPort, string debuggerHost)
        {
            // First get the list of debuggable endpoints (tabs)
            _log($"Finding debugger endpoint for app running on port {applicationPort}...");
            var debuggerWebsocketUrl = await GetWebSocketDebuggerUrlForPage(applicationPort, debuggerHost);
            if (debuggerWebsocketUrl == null)
            {
                _log($"Could not find any debuggable page for app running on port {applicationPort}. Make sure it is running in a tab in Chrome, and that you do *NOT* have the browser's DevTools opened in that tab.");
                return null;
            }
            _log($"Found endpoint at {debuggerWebsocketUrl}");

            // Now actually connect to the right one
            await _browserConnection.ConnectAsync(
                new Uri(debuggerWebsocketUrl),
                CancellationToken.None);
            _log($"Connected to {debuggerWebsocketUrl}");

            // Enable the protocol features we want
            await SendRequestAsync(new ChromeRequest("Debugger.enable"));
            await SendRequestAsync(new ChromeRequest("Overlay.enable"));

            // Pause so that we can retrieve the session id from the browser
            await SendRequestAsync(new ChromeRequest("Debugger.pause"));

            ReceiveLoop();

            return await _connectionTcs.Task;
        }

        private async Task SendRequestAsync(ChromeRequestBase request)
        {
            var json = JsonConvert.SerializeObject(request, _jsonSettings);
            _log("SENDING: " + json);
            await _browserConnection.SendAsync(
                Encoding.UTF8.GetBytes(json),
                WebSocketMessageType.Text,
                true,
                CancellationToken.None);
        }

        private async Task<T> SendRequestAndAwaitResponseAsync<T>(ChromeRequestBase request)
        {
            var tcs = new TaskCompletionSource<string>(TaskCreationOptions.RunContinuationsAsynchronously);
            lock (_pendingResponseAwaitersLock)
            {
                _pendingResponseAwaiters.Add(request.Id, tcs);
            }
            await SendRequestAsync(request);
            var resultJson = await tcs.Task;
            return JsonConvert.DeserializeObject<T>(resultJson);
        }

        private async void ReceiveLoop()
        {
            // TODO: Handle "close" messages (i.e., when browser disconnects)
            try
            {
                var ms = new MemoryStream();
                byte[] buffer = new byte[1024 * 1024];
                while (!_disposalCancellationTokenSource.Token.IsCancellationRequested)
                {
                    var msg = await _browserConnection.ReceiveAsync(new ArraySegment<byte>(buffer), _disposalCancellationTokenSource.Token);
                    if (msg.MessageType == WebSocketMessageType.Text)
                    {
                        ms.Write(buffer, 0, msg.Count);
                        if (msg.EndOfMessage)
                        {
                            var str = Encoding.UTF8.GetString(ms.GetBuffer(), 0, (int)ms.Length);
                            ms.SetLength(0);
                            OnReceivedMessage(str);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _log(ex.ToString());
            }
        }

        private async Task OnReceivedMessage(string str)
        {
            _log("RECEIVED: " + str);

            ChromeIncomingMessage message = null;
            try
            {
                message = JsonConvert.DeserializeObject<ChromeIncomingMessage>(str);
            }
            catch (Exception ex)
            {
                _log("Message was not ChromeIncomingMessage JSON: " + ex.ToString());
                return;
            }

            if (message.Id.HasValue)
            {
                TaskCompletionSource<string> result = null;
                lock (_pendingResponseAwaitersLock)
                {
                    if (_pendingResponseAwaiters.TryGetValue(message.Id.Value, out result))
                    {
                        _pendingResponseAwaiters.Remove(message.Id.Value);
                    }
                }

                if (result != null)
                {
                    result.TrySetResult(str);
                }
                else
                {
                    _log($"Received response with ID {message.Id.Value}, but nothing was listening for a response.");
                }
            }
            else if (!string.IsNullOrEmpty(message.Method))
            {
                switch (message.Method)
                {
                    case "Debugger.paused":
                        await OnReceivedDebuggerPausedMessage(JsonConvert.DeserializeObject<DebuggerPausedMessage>(str));
                        break;
                    case "Debugger.resumed":
                        await SendRequestAndAwaitResponseAsync<object>(new ChromeRequest("Overlay.setPausedInDebuggerMessage"));
                        break;
                    default:
                        _log("Ignoring unknown method: " + message.Method);
                        break;
                }
            }
        }

        private async Task OnReceivedDebuggerPausedMessage(DebuggerPausedMessage message)
        {
            var topCallFrame = message.Params.CallFrames.FirstOrDefault();
            if (topCallFrame == null)
            {
                _log("Paused, but received no call frames. Ignoring.");
                return;
            }

            // Initial pause
            if (!_connectionTcs.Task.IsCompleted)
            {
                var sessionIdValue = await SendRequestAndAwaitResponseAsync<EvaluateOnCallFrameResponse>(
                    new EvaluateOnCallFrameRequest(topCallFrame, "window.debuggerSessionId"));

                _connectionTcs.TrySetResult(sessionIdValue.Result.Result.Value.ToString());
                // Resume the debugger
                await ResumeAsync();
                return;
            }

            if (topCallFrame.FunctionName != "SendDebuggerMessage")
            {
                _log("Paused, but not in SendDebuggerMessage(), so ignoring.");
                return;
            }

            await SendRequestAsync(new SetPausedInDebuggerMessageRequest("Paused in Blazor debugger. Check your VS Code window."));
            var messageParam = await SendRequestAndAwaitResponseAsync<EvaluateOnCallFrameResponse>(
                new EvaluateOnCallFrameRequest(topCallFrame, "message"));
            var messageParamValue = messageParam.Result.Result.Value.ToString();
            _log("Found breakpoint description: " + messageParamValue);
            _onBreakpointHit(messageParamValue);
        }

        private static async Task<string> GetWebSocketDebuggerUrlForPage(int applicationPort, string debuggerHost)
        {
            using (var httpClient = new HttpClient())
            using (var req = new HttpRequestMessage(HttpMethod.Get, $"http://{debuggerHost}/json/list"))
            {
                req.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var response = await httpClient.SendAsync(req);
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                var pages = JsonConvert.DeserializeObject<DebuggablePageInfo[]>(json);
                return pages.FirstOrDefault(page => new Uri(page.Url).Port == applicationPort)?.WebSocketDebuggerUrl;
            }
        }
    }
}
