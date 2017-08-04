using Blazor.Host.Debugging.Protocol;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging
{
    public class DebuggerConnection : IDisposable
    {
        private readonly static JsonSerializerSettings jsonSerializerSettingsIncludingDefaultValues = new JsonSerializerSettings {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

        private readonly static JsonSerializerSettings jsonSerializerSettingsExcludingDefaultValues = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            DefaultValueHandling = DefaultValueHandling.Ignore
        };

        private readonly static JsonSerializer jsonSerializerIncludingDefaultValues = JsonSerializer.Create(jsonSerializerSettingsIncludingDefaultValues);

        private WebSocket _webSocket;
        private SemaphoreSlim _websocketAccessSemaphore = new SemaphoreSlim(1);

        public delegate Task MessageReceivedHandler(MessageBase message);
        protected event MessageReceivedHandler OnMessageReceived;

        protected void AttachToOpenedSocket(WebSocket webSocket)
        {
            if (_webSocket != null)
            {
                throw new InvalidOperationException($"Only call {nameof(AttachToOpenedSocket)} once.");
            }

            _webSocket = webSocket;
        }

        public async Task HandleIncomingMessages(CancellationToken cancellationToken)
        {
            var cumulative = new List<ArraySegment<byte>>();
            var cumulativeBytesCount = 0;
            while (true)
            {
                var data = new byte[4096];
                var result = await _webSocket.ReceiveAsync(new ArraySegment<byte>(data), cancellationToken);

                if (cancellationToken.IsCancellationRequested || result.MessageType == WebSocketMessageType.Close)
                {
                    await _webSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
                    break;
                }

                cumulative.Add(new ArraySegment<byte>(data, 0, result.Count));
                cumulativeBytesCount += result.Count;

                if (result.EndOfMessage)
                {
                    var allBytes = new byte[cumulativeBytesCount];
                    int offset = 0;
                    foreach (var chunk in cumulative)
                    {
                        Buffer.BlockCopy(chunk.Array, chunk.Offset, allBytes, offset, chunk.Count);
                        offset += chunk.Count;
                    }

                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        // TODO: Could it be any other encoding?
                        var messageString = Encoding.UTF8.GetString(allBytes);
                        RaiseMessageEvent(messageString);
                    }

                    cumulative.Clear();
                    cumulativeBytesCount = 0;
                }
            }
        }

        protected Task SendMessageAsync(MessageBase message)
        {
            var json = JsonConvert.SerializeObject(message, jsonSerializerSettingsExcludingDefaultValues);
            return SendMessageStringAsync(json);
        }

        private async Task SendMessageStringAsync(string message)
        {
            await _websocketAccessSemaphore.WaitAsync();
            try
            {
                await _webSocket.SendAsync(
                    Encoding.UTF8.GetBytes(message),
                    WebSocketMessageType.Text,
                    true,
                    CancellationToken.None);
            }
            finally
            {
                _websocketAccessSemaphore.Release();
            }
        }

        private void RaiseMessageEvent(string messageString)
        {
            MessageBase parsedMessage;
            try
            {
                parsedMessage = JsonConvert.DeserializeObject<MessageBase>(messageString, jsonSerializerSettingsIncludingDefaultValues);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unable to parse message from client.\nMessage: {messageString}\nException: {ex}");
                return;
            }

            if (parsedMessage.Method != "Runtime.consoleAPICalled" && parsedMessage.Method != "Network.dataReceived")
            {
                const int maxLogLineLength = 400;
                Console.WriteLine(GetType().Name + ": " + (messageString.Length < maxLogLineLength ? messageString : messageString.Substring(0, maxLogLineLength)));
            }

            var messageHandlingTask = OnMessageReceived?.Invoke(parsedMessage);
            if (messageHandlingTask != null)
            {
                // We don't want to await the task, because that would block the receive loop.
                // The logic for handling the message might involve waiting until some future
                // message is also received, so we can't block the receive loop.
                messageHandlingTask.ContinueWith(task =>
                {
                    if (task.Exception != null)
                    {
                        OnMessageProcessingException(task.Exception);
                    }
                });
            }
        }

        private void OnMessageProcessingException(AggregateException exception)
        {
            Console.WriteLine($"Exception during message processing: {exception}");
        }

        public static JObject ToJObject(object value)
        {
            return JObject.FromObject(value, jsonSerializerIncludingDefaultValues);
        }

        public virtual void Dispose()
        {
            if (_webSocket != null)
            {
                _webSocket.Dispose();
                _webSocket = null;
            }
        }
    }
}
