/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace VSCodeDebug
{
    internal class BlazorDebugSession : DebugSession
    {
        // we don't support multiple threads, so we can use a hardcoded ID for the default thread
        private static int _threadId = 1;

        private string _sourceFile;
        private IEnumerable<string> _sourceLines;
        private int _currentLine;

        public BlazorDebugSession() : base(debuggerLinesStartAt1: true)
        {
        }

        public override void Attach(Response response, dynamic arguments)
        {
            Log("Attach");
        }

        public override void Continue(Response response, dynamic arguments)
        {
            Log("Continue");
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
            _sourceLines = File.ReadLines(_sourceFile);

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
            IEnumerable<JToken> clientLineNumbers = arguments.lines ?? Enumerable.Empty<JToken>();

            var lines = File.ReadLines(path).ToArray();
            var breakpoints = new List<Breakpoint>();

            foreach (var clientLineNumber in clientLineNumbers)
            {
                var debuggerLineNumber = ConvertClientLineToDebugger(clientLineNumber.Value<int>());
                breakpoints.Add(new Breakpoint(debuggerLineNumber < lines.Length, clientLineNumber.Value<int>()));
            }

            response.body = new SetBreakpointsResponseBody(breakpoints);

            SendResponse(response);
        }

        public override void StackTrace(Response response, dynamic arguments)
        {
            Log("StackTrace");

            response.body = new StackTraceResponseBody(new List<StackFrame>
            {
                new StackFrame(1, "Look", VSCodeDebug.Source.Create("name", "path"), 1, 1),
                new StackFrame(1, "at", VSCodeDebug.Source.Create("name", "path"), 1, 1),
                new StackFrame(1, "my", VSCodeDebug.Source.Create("name", "path"), 1, 1),
                new StackFrame(1, "stack", VSCodeDebug.Source.Create("name", "path"), 1, 1),
                new StackFrame(1, "frames!", VSCodeDebug.Source.Create("name", "path"), 1, 1),
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
    }
}