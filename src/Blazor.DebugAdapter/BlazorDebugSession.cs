/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.WebSockets;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;
using System.Reflection.PortableExecutable;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Blazor.DebugAdapter.ChromeProtocolConnection;

namespace VSCodeDebug
{
    internal class BlazorDebugSession : DebugSession
    {
        // we don't support multiple threads, so we can use a hardcoded ID for the default thread
        private static int _threadId = 1;


        private DebuggerState _state = new DebuggerState();
        private Dictionary<string, DebugFileInfo[]> _debugInfo;
        private Dictionary<string, DebugFileInfo[]> _sourceFileMapping;
        private TaskCompletionSource<object> _configurationComplete = new TaskCompletionSource<object>();

        private ClientWebSocket _clientWebSocket = new ClientWebSocket();
        bool _webSocketConnected;
        private Task _sendQueue = Task.CompletedTask;

        private ChromeProtocolConnection _chromeProtoConnection;

        public BlazorDebugSession() : base(debuggerLinesStartAt1: true)
        {

        }

        public override void Attach(Response response, dynamic arguments)
        {
            Log("Attach");

            string address = arguments.address;

            _chromeProtoConnection = new ChromeProtocolConnection(
                new Uri(address).Port,
                "localhost:9222",
                Log,
                OnMessage);

            var sessionId = _chromeProtoConnection.ConnectAsync().Result;

            var builder = new UriBuilder(address);
            builder.Query = "?id=" + sessionId;

            _clientWebSocket.ConnectAsync(builder.Uri, CancellationToken.None).Wait();

            _webSocketConnected = true;

            _ = HandleMessages();

            SendResponse(response);

            // Launch(response, arguments);
        }

        private async Task HandleMessages()
        {
            var cumulative = new List<ArraySegment<byte>>();
            while (true)
            {
                byte[] data = new byte[4096];
                WebSocketReceiveResult result;

                try
                {
                    result = await _clientWebSocket.ReceiveAsync(new ArraySegment<byte>(data), CancellationToken.None);
                }
                catch (WebSocketException)
                {
                    _webSocketConnected = false;

                    // This is supposed to be the exited event but it doesn't seem to do anything
                    // SendEvent(new ExitedEvent(1));
                    SendEvent(new TerminatedEvent());
                    break;
                }

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    _webSocketConnected = false;
                    // This is supposed to be the exited event but it doesn't seem to do anything
                    // SendEvent(new ExitedEvent(0));
                    SendEvent(new TerminatedEvent());
                    await _clientWebSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                    break;
                }

                cumulative.Add(new ArraySegment<byte>(data, 0, result.Count));

                if (result.EndOfMessage)
                {
                    var size = 0;
                    foreach (var chunk in cumulative)
                    {
                        size += chunk.Count;
                    }
                    var all = new byte[size];
                    int offset = 0;
                    foreach (var chunk in cumulative)
                    {
                        Buffer.BlockCopy(chunk.Array, chunk.Offset, all, offset, chunk.Count);
                        offset += chunk.Count;
                    }

                    try
                    {
                        OnMessage(all);
                    }
                    catch (Exception ex)
                    {
                        Log(ex.ToString());
                    }

                    cumulative.Clear();
                }
            }
        }

        private void OnMessage(byte[] all)
        {
            OnMessage(Encoding.GetString(all));
        }

        private void OnMessage(string messageJson)
        {
            Log("Received Message from Debugee: " + messageJson);
            JObject obj = null;

            try
            {
                obj = JObject.Parse(messageJson);
            }
            catch (Exception ex)
            {
                Log("Unable to parse message from debugee: " + ex.ToString());
            }

            switch (obj.Value<string>("command"))
            {
                case "configuration":
                    _debugInfo = new Dictionary<string, DebugFileInfo[]>();

                    foreach (var pathVal in obj.Value<JArray>("paths"))
                    {
                        string path = pathVal.Value<string>();

                        InitializeDebugInformation(path);
                    }

                    _sourceFileMapping = _debugInfo.Values.SelectMany(i => i)
                                            .GroupBy(g => g.SourceFile, StringComparer.OrdinalIgnoreCase)
                                            .ToDictionary(g => g.Key, g => g.ToArray(), StringComparer.OrdinalIgnoreCase);

                    _configurationComplete.TrySetResult(null);

                    break;
                case "breakpoint":
                    var id = obj.Value<string>("ID");
                    var offset = obj.Value<int>("sequencePoint");

                    var info = _debugInfo[id];
                    if (offset < info.Length)
                    {
                        _state = new DebuggerState();
                        _state.DebugInfo = info[offset];

                        SendEvent(new StoppedEvent(_threadId, "breakpoint"));
                    }
                    else
                    {
                        // Not a thing
                    }

                    break;
                default:
                    break;
            }
        }

        private void InitializeDebugInformation(string path)
        {
            var pdbPath = Path.ChangeExtension(path, "pdb");

            if (!File.Exists(pdbPath))
            {
                return;
            }

            using (var peStream = File.OpenRead(path))
            using (var pdbStream = File.OpenRead(pdbPath))
            {
                // TODO: Dispose these..
                var peReader = new PEReader(peStream, PEStreamOptions.PrefetchMetadata);
                var pdbProvider = MetadataReaderProvider.FromPortablePdbStream(pdbStream, MetadataStreamOptions.PrefetchMetadata);
                var peMetadataReader = peReader.GetMetadataReader();
                var pdbMetadataReader = pdbProvider.GetMetadataReader();
                var moduleName = peMetadataReader.GetString(peMetadataReader.GetModuleDefinition().Name);

                foreach (var methodDebugInfoHandle in pdbMetadataReader.MethodDebugInformation)
                {
                    try
                    {
                        var methodDebugInfo = pdbMetadataReader.GetMethodDebugInformation(methodDebugInfoHandle);
                        var methodDefHandle = methodDebugInfoHandle.ToDefinitionHandle();
                        var methodDef = peMetadataReader.GetMethodDefinition(methodDefHandle);
                        var document = pdbMetadataReader.GetDocument(methodDebugInfo.Document);
                        var methodDefToken = MetadataTokens.GetToken(methodDefHandle);
                        var methodDebugInfoToken = MetadataTokens.GetToken(methodDefHandle);
                        var declaringType = peMetadataReader.GetTypeDefinition(methodDef.GetDeclaringType());

                        var namespaceName = peMetadataReader.GetString(declaringType.Namespace);
                        var className = peMetadataReader.GetString(declaringType.Name);
                        var methodName = peMetadataReader.GetString(methodDef.Name);

                        var sequencePoints = methodDebugInfo.GetSequencePoints().ToArray();
                        var id = moduleName + namespaceName + className + methodName;

                        var debugInfos = new List<DebugFileInfo>();
                        int offset = 0;
                        foreach (var sequencePoint in sequencePoints)
                        {
                            var sourceFile = pdbMetadataReader.GetString(document.Name);

                            debugInfos.Add(new DebugFileInfo
                            {
                                Id = id,
                                PEReader = peMetadataReader,
                                MethodDebugInformation = methodDebugInfo,
                                MethodDefinition = methodDef,
                                Method = methodName,
                                SequncePointOffset = offset++,
                                ILOffset = sequencePoint.Offset,
                                SourceFile = sourceFile,
                                Line = sequencePoint.StartLine
                            });
                        }

                        _debugInfo[id] = debugInfos.ToArray();
                    }
                    catch (Exception ex)
                    {
                        Log(ex.ToString());
                    }
                }
            }
        }

        public override async void Continue(Response response, dynamic arguments)
        {
            Log("Continue");

            await _chromeProtoConnection.ResumeAsync();
        }

        public override void Disconnect(Response response, dynamic arguments)
        {
            Log("Disconnect");

            if (_webSocketConnected)
            {
                _webSocketConnected = false;

                // TODO: Don't block
                _clientWebSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None).Wait();
                _chromeProtoConnection.Dispose();
            }
        }

        public override void Evaluate(Response response, dynamic arguments)
        {
            Log("Evaluate");
        }

        public override void Initialize(Response response, dynamic args)
        {
            // TODO: Verify that the client connected before

            Log("Initialize");

            SendEvent(new InitializedEvent());

            response.body = new Capabilities
            {
                supportsConfigurationDoneRequest = true,
                supportsEvaluateForHovers = true,
            };

            SendResponse(response);
        }

        public override void Launch(Response response, dynamic arguments)
        {
            Log("Launch");

            //_sourceFile = arguments.program;
            //_sourceFile = _sourceFile.Replace('\\', '/');
            //_sourceLines = File.ReadLines(_sourceFile).ToArray();

            //Log($"_sourceFile: {_sourceFile}");

            //if (arguments.stopOnEntry ?? false)
            //{
            //    _currentLine = 1;
            //    SendEvent(new StoppedEvent(_threadId, "entry"));
            //}
            //else
            //{
            //    Continue(response, new { threadId = _threadId });
            //}
        }

        public override async void Next(Response response, dynamic arguments)
        {
            Log("Next");

            await _chromeProtoConnection.StepAsync();
        }

        public override void Pause(Response response, dynamic arguments)
        {
            Log("Pause");
        }

        public override void Scopes(Response response, dynamic arguments)
        {
            Log("Scopes");
        }

        public override async void SetBreakpoints(Response response, dynamic arguments)
        {
            Log("SetBreakpoints");

            string path = (string)arguments.source.path;

            JArray linesVal = arguments.lines ?? new JArray();
            var lines = linesVal.Select(line => ConvertClientLineToDebugger(line.Value<int>()));

            var breakpoints = new List<Breakpoint>();

            foreach (var line in lines)
            {
                breakpoints.Add(new Breakpoint(verified: false, line: line)
                {
                    source = VSCodeDebug.Source.Create(path)
                });
            }

            response.body = new SetBreakpointsResponseBody(breakpoints);

            SendResponse(response);

            await _configurationComplete.Task;

            var bpMap = breakpoints.ToDictionary(b => b.line, b => new BreakPointInfo { Breakpoint = b });

            if (_sourceFileMapping.TryGetValue(path, out var infos))
            {
                foreach (var info in infos)
                {
                    if (bpMap.TryGetValue(info.Line, out var bpInfo))
                    {
                        bpInfo.DebugInfo = info;
                        bpInfo.Breakpoint = new Breakpoint(verified: true, line: bpInfo.Breakpoint.line)
                        {
                            source = VSCodeDebug.Source.Create(path)
                        };
                        SendEvent(new BreakpointEvent("update", bpInfo.Breakpoint));
                    }
                }

                await SendJson(new
                {
                    command = "breakpoints",
                    value = bpMap.Values.Where(b => b.Breakpoint.verified)
                                .Select(b => new { id = b.DebugInfo.Id, offset = b.DebugInfo.SequncePointOffset })
                });
            }
        }

        // Returns a fake 'stacktrace' where every 'stackframe' is a word from the current line.
        public override void StackTrace(Response response, dynamic arguments)
        {
            Log("StackTrace");

            var clientPath = ConvertDebuggerPathToClient(_state.DebugInfo.SourceFile);
            var clientLine = ConvertDebuggerLineToClient(_state.DebugInfo.Line);
            var fileName = Path.GetFileName(_state.DebugInfo.SourceFile);

            response.body = new StackTraceResponseBody(new List<StackFrame>
            {
                new StackFrame(_threadId, _state.DebugInfo.Method, VSCodeDebug.Source.Create(fileName, clientPath), clientLine, 0)
            });

            SendResponse(response);
        }

        public override void StepIn(Response response, dynamic arguments)
        {
            Log("StepIn");
        }

        public override void StepOut(Response response, dynamic arguments)
        {
            Log("StepOut");
        }

        public override void Threads(Response response, dynamic arguments)
        {
            Log("Threads");

            response.body = new ThreadsResponseBody(new List<Thread>
            {
                new Thread(_threadId, "Main Thread")
            });

            SendResponse(response);
        }

        public override void Variables(Response response, dynamic arguments)
        {
            Log("Variables");

            var mdReader = _state.DebugInfo.PEReader;

            var vars = new List<Variable>();
            foreach (var paramterHandle in _state.DebugInfo.MethodDefinition.GetParameters())
            {
                var parameter = mdReader.GetParameter(paramterHandle);
                // TODO: Parse the type information
                vars.Add(new Variable(mdReader.GetString(parameter.Name), "", ""));
            }

            response.body = new VariablesResponseBody(vars);

            SendResponse(response);
        }

        public override void ConfigurationDone(Response response, dynamic arguments)
        {
            Log("ConfigurationDone");
        }

        private Task SendJson(object value)
        {
            return QueueSend(() =>
            {
                if (_webSocketConnected)
                {
                    var json = JsonConvert.SerializeObject(value);
                    return _clientWebSocket.SendAsync(new ArraySegment<byte>(Encoding.GetBytes(json)), WebSocketMessageType.Text, true, CancellationToken.None);
                }
                return Task.CompletedTask;
            });
        }

        private Task QueueSend(Func<Task> func)
        {
            lock (this)
            {
                if (_sendQueue.IsFaulted)
                {
                    return _sendQueue;
                }

                return _sendQueue = _sendQueue.ContinueWith(t => func()).Unwrap();
            }
        }

        private class DebugFileInfo
        {
            public string Id { get; set; }
            public string Method { get; set; }
            public int ILOffset { get; set; }
            public int SequncePointOffset { get; set; }
            public string SourceFile { get; set; }
            public int Line { get; set; }
            public MethodDefinition MethodDefinition { get; set; }
            public MethodDebugInformation MethodDebugInformation { get; set; }
            public MetadataReader PEReader { get; set; }
        }

        private class BreakPointInfo
        {
            public Breakpoint Breakpoint { get; set; }
            public DebugFileInfo DebugInfo { get; set; }
        }

        private class DebuggerState
        {
            public DebugFileInfo DebugInfo { get; set; }
            public string[] Locals { get; set; } = Array.Empty<string>();
            public string[] Parameters { get; set; } = Array.Empty<string>();
        }
    }
}