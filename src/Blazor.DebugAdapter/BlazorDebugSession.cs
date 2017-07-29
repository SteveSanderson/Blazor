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

namespace VSCodeDebug
{
    internal class BlazorDebugSession : DebugSession
    {
        // we don't support multiple threads, so we can use a hardcoded ID for the default thread
        private static int _threadId = 1;

        private string _sourceFile;
        private string _method;
        private int _currentLine;

        private Dictionary<string, DebugFileInfo[]> _debugInfo = new Dictionary<string, DebugFileInfo[]>();
        private Dictionary<string, BreakPointInfo[]> _breakPoints = new Dictionary<string, BreakPointInfo[]>(StringComparer.OrdinalIgnoreCase);
        private TaskCompletionSource<object> _configurationComplete = new TaskCompletionSource<object>();

        private ClientWebSocket _clientWebSocket = new ClientWebSocket();
        bool _webSocketConnected;

        public BlazorDebugSession() : base(debuggerLinesStartAt1: true)
        {
        }

        public override async void Attach(Response response, dynamic arguments)
        {
            Log("Attach");

            string address = arguments.address;

            _clientWebSocket.ConnectAsync(new Uri(address), CancellationToken.None).Wait();
            _webSocketConnected = true;

            _ = HandleMessages();

            SendResponse(response);

            await _configurationComplete.Task;

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

                    await OnMessage(all);

                    cumulative.Clear();
                }
            }
        }

        private async Task OnMessage(byte[] all)
        {
            var obj = JObject.Parse(Encoding.GetString(all));
            Log("Received Message from Debugee: " + obj);

            switch (obj.Value<string>("command"))
            {
                case "configuration":
                    foreach (var pathVal in obj.Value<JArray>("paths"))
                    {
                        string path = pathVal.Value<string>();

                        InitializeDebugInformation(path);
                    }

                    await SendJson(new
                    {
                        command = "breakpoints",
                        value = _breakPoints.SelectMany(b => b.Value.Select(bb => new { id = bb.Id, offset = bb.SequencePointOffset }))
                    });

                    _configurationComplete.TrySetResult(null);
                    break;
                case "breakpoint":
                    var id = obj.Value<string>("ID");
                    var offset = obj.Value<int>("sequencePoint");

                    var info = _debugInfo[id];
                    if (offset < info.Length)
                    {
                        _sourceFile = info[offset].SourceFile;
                        _currentLine = info[offset].Line;
                        _method = info[offset].Method;

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
                var peReader = new PEReader(peStream);
                var pdbProvider = MetadataReaderProvider.FromPortablePdbStream(pdbStream);
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

                            if (_breakPoints.TryGetValue(sourceFile, out var breakpoints))
                            {
                                foreach (var b in breakpoints)
                                {
                                    if (b.Breakpoint.line == sequencePoint.StartLine)
                                    {
                                        b.Id = id;
                                        b.SequencePointOffset = offset;
                                        // Verify the break point
                                        b.Breakpoint = new Breakpoint(verified: true, line: b.Breakpoint.line);
                                        SendEvent(new BreakpointEvent("update", b.Breakpoint));
                                        break;
                                    }
                                }
                            }

                            debugInfos.Add(new DebugFileInfo
                            {
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

            await SendJson(new { command = "continue" });
        }

        public override void Disconnect(Response response, dynamic arguments)
        {
            Log("Disconnect");

            if (_webSocketConnected)
            {
                _webSocketConnected = false;

                // TODO: Don't block
                _clientWebSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None).Wait();
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

            await SendJson(new { command = "step" });

            //for (int i = _currentLine + 1; i < _sourceLines.Length; i++)
            //{
            //    if (FireStepEvent(response, i))
            //    {
            //        return;
            //    }
            //}

            //SendResponse(response);

            //// no more lines: run to end
            //SendEvent(new TerminatedEvent());
        }

        public override void Pause(Response response, dynamic arguments)
        {
            Log("Pause");
        }

        public override void Scopes(Response response, dynamic arguments)
        {
            Log("Scopes");
        }

        public override void SetBreakpoints(Response response, dynamic arguments)
        {
            Log("SetBreakpoints");

            string path = (string)arguments.source.path;
            // path = path.Replace('\\', '/');

            Log($"Breakpoint file path: {path}");

            JArray clientLineNumberJArray = arguments.lines ?? new JArray();
            var clientLineNumbers = clientLineNumberJArray.Select(jtoken => jtoken.Value<int>());

            var lines = File.ReadLines(path).ToArray();
            var breakpoints = new List<Breakpoint>();

            foreach (var clientLineNumber in clientLineNumbers)
            {
                var debuggerLineNumber = ConvertClientLineToDebugger(clientLineNumber);
                breakpoints.Add(new Breakpoint(verified: false, line: clientLineNumber));
                Log($"Added breakpoint to line #{clientLineNumber} containing {lines[debuggerLineNumber - 1]}");
            }

            _breakPoints[path] = breakpoints.Select(s => new BreakPointInfo { Breakpoint = s }).ToArray();

            // In theory, the breakpoint positions could have changed, but we don't do this yet at least.
            response.body = new SetBreakpointsResponseBody(breakpoints);

            SendResponse(response);
        }

        // Returns a fake 'stacktrace' where every 'stackframe' is a word from the current line.
        public override void StackTrace(Response response, dynamic arguments)
        {
            Log("StackTrace");

            var clientPath = ConvertDebuggerPathToClient(_sourceFile);
            var clientLine = ConvertDebuggerLineToClient(_currentLine);
            var fileName = Path.GetFileName(_sourceFile);

            response.body = new StackTraceResponseBody(new List<StackFrame>
            {
                new StackFrame(_threadId, _method, VSCodeDebug.Source.Create(fileName, clientPath), clientLine, 0)
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
            //response.body = new VariablesResponseBody(new List<Variable>
            //{
            //    new Variable("foo", "bar", "TotallyARealType"),
            //});

            SendResponse(response);
        }

        public override void ConfigurationDone(Response response, dynamic arguments)
        {
            Log("ConfigurationDone");
        }

        // Fire StoppedEvent if line is not empty.
        //private bool FireStepEvent(Response response, int lineNumber)
        //{
        //    if (!string.IsNullOrWhiteSpace(_sourceLines[lineNumber - 1]))
        //    {
        //        _currentLine = lineNumber;
        //        SendResponse(response);
        //        SendEvent(new StoppedEvent(_threadId, "step"));
        //        return true;
        //    }

        //    return false;
        //}

        //// Fire StoppedEvent if line has a breakpoint or the word 'exception' is found.
        //private bool FireEventsForLine(Response response, int lineNumber)
        //{
        //    // find the breakpoints for the current source file
        //    var breakpoints = _breakpoints.GetValueOrDefault(_sourceFile);

        //    // Log($"FireEventsForLine for line {lineNumber} sees breakpoints on lines {string.Join(", ", breakpoints.Select(bp => bp.line))}");

        //    if (breakpoints != null)
        //    {
        //        var filteredBps = breakpoints.Where(bp => bp.line == ConvertDebuggerLineToClient(lineNumber)).ToArray();

        //        if (filteredBps.Length > 0)
        //        {
        //            Log($"Breakpoint at line #{lineNumber}");

        //            _currentLine = lineNumber;

        //            // 'continue' request finished
        //            SendResponse(response);

        //            // send 'stopped' event
        //            SendEvent(new StoppedEvent(_threadId, "breakpoint"));

        //            // the following shows the use of 'breakpoint' events to update properties of a breakpoint in the UI
        //            // if breakpoint is not yet verified, verify it now and send a 'breakpoint' update event
        //            if (!filteredBps[0].verified)
        //            {
        //                filteredBps[0] = new Breakpoint(true, filteredBps[0].line);
        //                SendEvent(new BreakpointEvent("update", filteredBps[0]));
        //            }
        //            return true;
        //        }
        //        else
        //        {
        //            Log($"No breakpoint at line #{lineNumber}");
        //        }
        //    }

        //    // if word 'throw' found in source -> throw exception
        //    if (_sourceLines[lineNumber - 1].Contains("throw"))
        //    {
        //        _currentLine = ConvertDebuggerLineToClient(lineNumber);
        //        SendResponse(response);
        //        SendEvent(new StoppedEvent(_threadId, "exception"));
        //        Log($"exception in line {lineNumber}");
        //        return true;
        //    }

        //    return false;
        //}

        protected override void Log(string message)
        {
            base.Log(message);
        }

        private Task SendJson(object value)
        {
            if (_webSocketConnected)
            {
                var json = JsonConvert.SerializeObject(value);
                return _clientWebSocket.SendAsync(new ArraySegment<byte>(Encoding.GetBytes(json)), WebSocketMessageType.Text, true, CancellationToken.None);
            }
            return Task.CompletedTask;
        }

        private class DebugFileInfo
        {
            public string Method { get; set; }
            public int ILOffset { get; set; }
            public int SequncePointOffset { get; set; }
            public string SourceFile { get; set; }
            public int Line { get; set; }
        }

        private class BreakPointInfo
        {
            public Breakpoint Breakpoint { get; set; }
            public string Id { get; set; }
            public int SequencePointOffset { get; set; }
        }
    }
}