using Blazor.Host.Debugging.Protocol;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging
{
    public class V8DebugServer : DebuggerConnection
    {
        public delegate Task<JObject> InvocationHandler(string method, JObject parameters);
        public event InvocationHandler HandleInvocation;

        public V8DebugServer(WebSocket webSocket)
        {
            AttachToOpenedSocket(webSocket);
            OnMessageReceived += HandleMessageReceived;
        }

        private async Task HandleMessageReceived(MessageBase message)
        {
            if (message.Id.HasValue)
            {
                var result = await HandleInvocation?.Invoke(message.Method, message.Params);
                await SendMessageAsync(new MessageBase
                {
                    Id = message.Id,
                    Result = result
                });
            }
            else
            {
                Console.WriteLine("\n***UNEXPECTED MESSAGE RECEIVED BY SERVER**\n" + message.ToDebugString() + "\n");
            }
        }

        public new Task SendMessageAsync(MessageBase message)
        {
            return base.SendMessageAsync(message);
        }
    }
}
