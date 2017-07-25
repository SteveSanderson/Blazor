/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
using System;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace VSCodeDebug
{
    public class ProtocolMessage
    {
        public int seq;
        public string type;

        public ProtocolMessage()
        {
        }
        public ProtocolMessage(string typ)
        {
            type = typ;
        }
        public ProtocolMessage(string typ, int sq)
        {
            type = typ;
            seq = sq;
        }
    }

    public class Request : ProtocolMessage
    {
        public string command;
        public dynamic arguments;

        public Request()
        {
        }
        public Request(string cmd, dynamic arg) : base("request")
        {
            command = cmd;
            arguments = arg;
        }
        public Request(int id, string cmd, dynamic arg) : base("request", id)
        {
            command = cmd;
            arguments = arg;
        }
    }

    /*
	 * subclasses of ResponseBody are serialized as the body of a response.
	 * Don't change their instance variables since that will break the debug protocol.
	 */
    public class ResponseBody
    {
        // empty
    }

    public class Response : ProtocolMessage
    {
        public bool success;
        public string message;
        public int request_seq;
        public string command;
        public ResponseBody body;

        public Response()
        {
        }
        public Response(Request req) : base("response")
        {
            success = true;
            request_seq = req.seq;
            command = req.command;
        }

        public void SetBody(ResponseBody bdy)
        {
            success = true;
            body = bdy;
        }

        public void SetErrorBody(string msg, ResponseBody bdy = null)
        {
            success = false;
            message = msg;
            body = bdy;
        }
    }

    public class Event : ProtocolMessage
    {
        [JsonProperty(PropertyName = "event")]
        public string eventType { get; }
        public dynamic body { get; }

        public Event(string type, dynamic bdy = null) : base("event")
        {
            eventType = type;
            body = bdy;
        }
    }

    /*
	 * The ProtocolServer can be used to implement a server that uses the VSCode debug protocol.
	 */
    public abstract class ProtocolServer
    {
        public bool TRACE;
        public bool TRACE_RESPONSE;

        protected const int BUFFER_SIZE = 4096;
        protected const string TWO_CRLF = "\r\n\r\n";
        protected static readonly Regex CONTENT_LENGTH_MATCHER = new Regex(@"Content-Length: (\d+)");

        protected static readonly Encoding Encoding = System.Text.Encoding.UTF8;

        private int _sequenceNumber;
        private Dictionary<int, TaskCompletionSource<Response>> _pendingRequests;

        private Stream _outputStream;

        private ByteBuffer _rawData;
        private int _bodyLength;

        private bool _stopRequested;


        public ProtocolServer()
        {
            _sequenceNumber = 1;
            _bodyLength = -1;
            _rawData = new ByteBuffer();
            _pendingRequests = new Dictionary<int, TaskCompletionSource<Response>>();
        }

        public async Task Start(Stream inputStream, Stream outputStream)
        {
            _outputStream = outputStream;

            byte[] buffer = new byte[BUFFER_SIZE];

            _stopRequested = false;
            while (!_stopRequested)
            {
                var read = await inputStream.ReadAsync(buffer, 0, buffer.Length);

                if (read == 0)
                {
                    // end of stream
                    break;
                }

                if (read > 0)
                {
                    _rawData.Append(buffer, read);
                    ProcessData();
                }
            }
        }

        public void Stop()
        {
            _stopRequested = true;
        }

        public void SendEvent(Event e)
        {
            SendMessage(e);
        }

        public Task<Response> SendRequest(string command, dynamic args)
        {
            var tcs = new TaskCompletionSource<Response>();

            Request request = null;
            lock (_pendingRequests)
            {
                request = new Request(_sequenceNumber++, command, args);
                // wait for response
                _pendingRequests.Add(request.seq, tcs);
            }

            SendMessage(request);

            return tcs.Task;
        }

        protected abstract void DispatchRequest(string command, dynamic args, Response response);

        // ---- private ------------------------------------------------------------------------

        private void ProcessData()
        {
            while (true)
            {
                if (_bodyLength >= 0)
                {
                    if (_rawData.Length >= _bodyLength)
                    {
                        var buf = _rawData.RemoveFirst(_bodyLength);

                        _bodyLength = -1;

                        Dispatch(Encoding.GetString(buf));

                        continue;   // there may be more complete messages to process
                    }
                }
                else
                {
                    string s = _rawData.GetString(Encoding);
                    var idx = s.IndexOf(TWO_CRLF);
                    if (idx != -1)
                    {
                        Match m = CONTENT_LENGTH_MATCHER.Match(s);
                        if (m.Success && m.Groups.Count == 2)
                        {
                            _bodyLength = Convert.ToInt32(m.Groups[1].ToString());

                            _rawData.RemoveFirst(idx + TWO_CRLF.Length);

                            continue;   // try to handle a complete message
                        }
                    }
                }
                break;
            }
        }

        private void Dispatch(string req)
        {
            var message = JsonConvert.DeserializeObject<ProtocolMessage>(req);
            if (message != null)
            {
                switch (message.type)
                {

                    case "request":
                        {
                            var request = JsonConvert.DeserializeObject<Request>(req);

                            Program.Log(TRACE, "C {0}: {1}", request.command, JsonConvert.SerializeObject(request.arguments, Formatting.Indented));

                            var response = new Response(request);
                            DispatchRequest(request.command, request.arguments, response);
                            SendMessage(response);
                        }
                        break;

                    case "response":
                        {
                            var response = JsonConvert.DeserializeObject<Response>(req);
                            int seq = response.request_seq;
                            lock (_pendingRequests)
                            {
                                if (_pendingRequests.ContainsKey(seq))
                                {
                                    var tcs = _pendingRequests[seq];
                                    _pendingRequests.Remove(seq);
                                    tcs.SetResult(response);
                                }
                            }
                        }
                        break;
                }
            }
        }

        protected void SendMessage(ProtocolMessage message)
        {
            if (message.seq == 0)
            {
                message.seq = _sequenceNumber++;
            }

            Program.Log(TRACE_RESPONSE && message.type == "response", " R: {0}", JsonConvert.SerializeObject(message, Formatting.Indented));

            if (message.type == "event" && message is Event)
            {
                var e = message as Event;
                Program.Log(TRACE, "E {0}: {1}", ((Event)message).eventType, JsonConvert.SerializeObject(e.body, Formatting.Indented));
            }

            var data = ConvertToBytes(message);
            try
            {
                _outputStream.Write(data, 0, data.Length);
                _outputStream.Flush();
            }
            catch (Exception)
            {
                // ignore
            }
        }

        private static byte[] ConvertToBytes(ProtocolMessage request)
        {
            var asJson = JsonConvert.SerializeObject(request);
            byte[] jsonBytes = Encoding.GetBytes(asJson);

            string header = string.Format("Content-Length: {0}{1}", jsonBytes.Length, TWO_CRLF);
            byte[] headerBytes = Encoding.GetBytes(header);

            byte[] data = new byte[headerBytes.Length + jsonBytes.Length];
            System.Buffer.BlockCopy(headerBytes, 0, data, 0, headerBytes.Length);
            System.Buffer.BlockCopy(jsonBytes, 0, data, headerBytes.Length, jsonBytes.Length);

            return data;
        }
    }

    //--------------------------------------------------------------------------------------

    class ByteBuffer
    {
        private byte[] _buffer;

        public ByteBuffer()
        {
            _buffer = new byte[0];
        }

        public int Length
        {
            get { return _buffer.Length; }
        }

        public string GetString(Encoding enc)
        {
            return enc.GetString(_buffer);
        }

        public void Append(byte[] b, int length)
        {
            byte[] newBuffer = new byte[_buffer.Length + length];
            System.Buffer.BlockCopy(_buffer, 0, newBuffer, 0, _buffer.Length);
            System.Buffer.BlockCopy(b, 0, newBuffer, _buffer.Length, length);
            _buffer = newBuffer;
        }

        public byte[] RemoveFirst(int n)
        {
            byte[] b = new byte[n];
            System.Buffer.BlockCopy(_buffer, 0, b, 0, n);
            byte[] newBuffer = new byte[_buffer.Length - n];
            System.Buffer.BlockCopy(_buffer, n, newBuffer, 0, _buffer.Length - n);
            _buffer = newBuffer;
            return b;
        }
    }
}
