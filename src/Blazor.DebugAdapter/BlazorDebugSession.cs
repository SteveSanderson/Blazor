/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace VSCodeDebug
{
    internal class BlazorDebugSession : DebugSession
    {
        // we don't support multiple threads, so we can use a hardcoded ID for the default thread
        private static int _threadId = 1;

        private string _sourceFile;
        private string[] _sourceLines;
        private int _currentLine;
        private TaskCompletionSource<WebSocket> _debugTargetTcs;

        // maps from sourceFile to array of Breakpoints
        private Dictionary<string, Breakpoint[]> _breakpoints = new Dictionary<string, Breakpoint[]>();

        public BlazorDebugSession(TaskCompletionSource<WebSocket> debugTargetTcs) : base(debuggerLinesStartAt1: true)
        {
            _debugTargetTcs = debugTargetTcs;
        }

        public override void Attach(Response response, dynamic arguments)
        {
            Log("Attach");
        }

        public override void Continue(Response response, dynamic arguments)
        {
            Log("Continue");

            for (int i = _currentLine + 1; i < _sourceLines.Length; i++)
            {
                if (FireEventsForLine(response, i))
                {
                    return;
                }
            }

            SendResponse(response);
            // no more lines: run to end
            SendEvent(new TerminatedEvent());
        }

        public override void Disconnect(Response response, dynamic arguments)
        {
            Log("Disconnect");
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
                supportsStepBack = true,
            };

            SendResponse(response);
        }

        public override void Launch(Response response, dynamic arguments)
        {
            Log("Launch");

            _sourceFile = arguments.program;
            _sourceFile = _sourceFile.Replace('\\', '/');
            _sourceLines = File.ReadLines(_sourceFile).ToArray();

            Log($"_sourceFile: {_sourceFile}");

            if (arguments.stopOnEntry ?? false)
            {
                _currentLine = 1;
                SendEvent(new StoppedEvent(_threadId, "entry"));
            }
            else
            {
                Continue(response, new { threadId = _threadId });
            }
        }

        public override void Next(Response response, dynamic arguments)
        {
            Log("Next");

            for (int i = _currentLine + 1; i < _sourceLines.Length; i++)
            {
                if (FireStepEvent(response, i))
                {
                    return;
                }
            }

            SendResponse(response);

            // no more lines: run to end
            SendEvent(new TerminatedEvent());
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

            string path = arguments.source.path;
            path = path.Replace('\\', '/');

            Log($"Breakpoint file path: {path}");

            JArray clientLineNumberJArray = arguments.lines ?? new JArray();
            var clientLineNumbers = clientLineNumberJArray.Select(jtoken => jtoken.Value<int>());

            var lines = File.ReadLines(path).ToArray();
            var breakpoints = new List<Breakpoint>();

            foreach (var clientLineNumber in clientLineNumbers)
            {
                var debuggerLineNumber = ConvertClientLineToDebugger(clientLineNumber);
                breakpoints.Add(new Breakpoint(debuggerLineNumber < lines.Length, clientLineNumber));
                Log($"Added breakpoint to line #{clientLineNumber} containing {lines[debuggerLineNumber]}");
            }

            _breakpoints[path] = breakpoints.ToArray();

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
                new StackFrame(_threadId, "Look", VSCodeDebug.Source.Create(fileName, clientPath), clientLine, 0),
                new StackFrame(_threadId, "at", VSCodeDebug.Source.Create(fileName, clientPath), clientLine, 0),
                new StackFrame(_threadId, "my", VSCodeDebug.Source.Create(fileName, clientPath), clientLine, 0),
                new StackFrame(_threadId, "stack", VSCodeDebug.Source.Create(fileName, clientPath), clientLine, 0),
                new StackFrame(_threadId, "frames!", VSCodeDebug.Source.Create(fileName, clientPath), clientLine, 0),
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
                new Thread(_threadId, "thread 1")
            });

            SendResponse(response);
        }

        public override void Variables(Response response, dynamic arguments)
        {
            response.body = new VariablesResponseBody(new List<Variable>
            {
                new Variable("foo", "bar", "TotallyARealType"),
            });

            SendResponse(response);
        }

        public override void ConfigurationDone(Response response, dynamic arguments)
        {
            Log("ConfigurationDone");
        }

         // Fire StoppedEvent if line is not empty.
        private bool FireStepEvent(Response response, int lineNumber)
        {
            if (string.IsNullOrWhiteSpace(_sourceLines[lineNumber - 1]))
            {
                _currentLine = lineNumber;
                SendResponse(response);
                SendEvent(new StoppedEvent(_threadId, "step"));
                return true;
            }

            return false;
        }

        // Fire StoppedEvent if line has a breakpoint or the word 'exception' is found.
        private bool FireEventsForLine(Response response, int lineNumber)
        {
            // find the breakpoints for the current source file
            var breakpoints = _breakpoints.GetValueOrDefault(_sourceFile);

            Log($"FireEventsForLine for line {lineNumber} sees breakpoints on lines {string.Join(", ", breakpoints.Select(bp => bp.line))}");

            if (breakpoints != null)
            {
                var filteredBps = breakpoints.Where(bp => bp.line == ConvertDebuggerLineToClient(lineNumber)).ToArray();

                if (filteredBps.Length > 0)
                {
                    Log($"Breakpoint at line #{lineNumber}");

                    _currentLine = lineNumber;

                    // 'continue' request finished
                    SendResponse(response);

                    // send 'stopped' event
                    SendEvent(new StoppedEvent(_threadId, "breakpoint"));

                    // the following shows the use of 'breakpoint' events to update properties of a breakpoint in the UI
                    // if breakpoint is not yet verified, verify it now and send a 'breakpoint' update event
                    if (!filteredBps[0].verified)
                    {
                        filteredBps[0] = new Breakpoint(true, filteredBps[0].line);
                        SendEvent(new BreakpointEvent("update", filteredBps[0]));
                    }
                    return true;
                }
                else
                {
                    Log($"No breakpoint at line #{lineNumber}");
                }
            }

            // if word 'throw' found in source -> throw exception
            if (_sourceLines[lineNumber - 1].Contains("throw"))
            {
                _currentLine = ConvertDebuggerLineToClient(lineNumber);
                SendResponse(response);
                SendEvent(new StoppedEvent(_threadId, "exception"));
                Log($"exception in line {lineNumber}");
                return true;
            }

            return false;
        }
    }
}