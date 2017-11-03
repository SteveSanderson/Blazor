using Blazor.Host.Debugging.Models;
using Blazor.Host.Debugging.Protocol;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging
{
    public class V8DebugClient : DebuggerConnection
    {
        private int _methodCallCount = 0;
        private Dictionary<int, TaskCompletionSource<MessageBase>> _pendingInvocations = new Dictionary<int, TaskCompletionSource<MessageBase>>();
        private object _pendingInvocationsLock = new object();

        public delegate Task ClientNotificationHandler(MessageBase message);
        public event ClientNotificationHandler OnNotificationReceived;

        public V8DebugClient()
        {
            base.OnMessageReceived += HandleMessageReceived;
        }

        public async Task ConnectAsync(string debuggerWebsocketUrl)
        {
            var clientSocket = new ClientWebSocket();
            await clientSocket.ConnectAsync(
                new Uri(debuggerWebsocketUrl),
                CancellationToken.None);
            AttachToOpenedSocket(clientSocket);
            Console.WriteLine($"Connected to {debuggerWebsocketUrl}");
        }

        public async Task<JObject> CallMethodAsync(string method, JObject parameters)
        {
            var callId = Interlocked.Increment(ref _methodCallCount);
            var callTaskCompletionSource = new TaskCompletionSource<MessageBase>();
            lock (_pendingInvocationsLock)
            {
                _pendingInvocations.Add(callId, callTaskCompletionSource);
            }

            await SendMessageAsync(new MessageBase
            {
                Id = callId,
                Method = method,
                Params = parameters
            });

            var responseMessage = await callTaskCompletionSource.Task;

            if (responseMessage.Error != null)
            {
                throw new DebuggerInvocationException(responseMessage.Error);
            }

            return responseMessage.Result;
        }

        private async Task HandleMessageReceived(MessageBase message)
        {
            if (message.Id.HasValue)
            {
                var id = message.Id.Value;
                TaskCompletionSource<MessageBase> pendingInvocationTcs;
                lock (_pendingInvocationsLock)
                {
                    _pendingInvocations.TryGetValue(id, out pendingInvocationTcs);
                }

                if (pendingInvocationTcs != null)
                {
                    lock (_pendingInvocationsLock)
                    {
                        _pendingInvocations.Remove(id);
                    }

                    pendingInvocationTcs.SetResult(message);
                }
                else
                {
                    Console.WriteLine("WARNING: V8DebugClient received message with no corresponding pending invocation. ID: " + id);
                }
            }
            else
            {
                // Since this message doesn't correspond to any invocation, just pass it
                // upstream to the consumer of the client
                await OnNotificationReceived?.Invoke(message);
            }
        }
    }
}
