using Blazor.Host.Debugging.Models;
using Blazor.Host.Debugging.Protocol;
using Blazor.Sdk.Host;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging
{
    public class V8DebugOrchestrator : IDisposable
    {
        readonly static JObject EmptyJObject = DebuggerConnection.ToJObject(new { });

        private V8DebugServer _ideConnection;
        private V8DebugClient _browserConnection;
        private string _clientBinDir;
        private string _clientViewsAssemblyName;
        private DebugInfoStore _debugInfoStore = new DebugInfoStore();
        private Dictionary<string, PossibleBreakpointLocation> _currentBreakpointsById = new Dictionary<string, PossibleBreakpointLocation>();
        private PossibleBreakpointLocation _currentlyPausedInDotNetBreakpoint;

        public async Task ConnectAsync(WebSocket ideSocket, string browserDebugSocketUrl, string clientBinDir, string clientViewsAssemblyName)
        {
            _clientBinDir = clientBinDir;
            _clientViewsAssemblyName = clientViewsAssemblyName;
            _ideConnection = new V8DebugServer(ideSocket);
            _ideConnection.HandleInvocation += HandleCallFromIde;

            _browserConnection = new V8DebugClient();
            _browserConnection.OnNotificationReceived += HandleMessageFromBrowser;
            await _browserConnection.ConnectAsync(browserDebugSocketUrl);
        }

        public void Dispose()
        {
            _ideConnection?.Dispose();
            _browserConnection?.Dispose();
        }

        internal Task Run(CancellationToken cancellationToken)
        {
            var ideMessageLoopTask = _ideConnection.HandleIncomingMessages(cancellationToken);
            var browserMessageLoopTask = _browserConnection.HandleIncomingMessages(cancellationToken);
            return Task.WhenAny(ideMessageLoopTask, browserMessageLoopTask);
        }

        private async Task HandleMessageFromBrowser(MessageBase message)
        {
            switch (message.Method)
            {
                case "Debugger.paused":
                    {
                        var callFrames = message.Params.GetValue("callFrames").Value<JArray>();
                        var topCallFrame = callFrames.FirstOrDefault()?.Value<JObject>();
                        var functionName = topCallFrame?.GetValue("functionName").Value<string>();
                        if (functionName == "SendDebuggerMessage")
                        {
                            await NotifyIdeAboutDotnetBreakpointHit(message, topCallFrame);
                            return;
                        }
                        break;
                    }
                case "Debugger.resumed":
                    {
                        _currentlyPausedInDotNetBreakpoint = null;
                        break;
                    }
                case "Runtime.executionContextCreated":
                    {
                        var context = message.Params.GetValue("context").Value<JObject>();
                        var auxData = context.GetValue("auxData").Value<JObject>();
                        var isDefaultExecutionContext = auxData.GetValue("isDefault").Value<bool>();
                        if (isDefaultExecutionContext)
                        {
                            var contextId = context.GetValue("id").Value<int>();
                            await OnDefaultExecutionContextCreated(contextId, auxData);
                        }
                        break;
                    }
            }

            // Temporarily, just proxy everything to the IDE
            await _ideConnection.SendMessageAsync(message);
        }

        private async Task OnDefaultExecutionContextCreated(int contextId, JObject auxData)
        {
            await NotifyIdeAboutDotNetSources(contextId, auxData);

            // If the application tab is reloaded (but the debugger tab is not), then
            // DNA will be reset but Chrome won't notify us to re-apply breakpoints.
            // So re-apply them manually here.
            await ReapplyAllBreakpoints();
        }

        private async Task ReapplyAllBreakpoints()
        {
            foreach (var location in _currentBreakpointsById.Values)
            {
                await SetBreakpointInDNA(location);
            }
        }

        private async Task NotifyIdeAboutDotnetBreakpointHit(MessageBase message, JObject nativeTopCallFrame)
        {
            var nativeCallFrameId = nativeTopCallFrame.GetValue("callFrameId").Value<string>();
            var debuggerMessage = await EvaluateJsInBrowser("message", nativeCallFrameId);
            var debuggerMessageJson = debuggerMessage.GetValue("value").Value<string>();
            var debuggerMessageParsed = JsonConvert.DeserializeObject<JObject>(debuggerMessageJson);
            var dnaLocationId = debuggerMessageParsed.GetValue("ID").Value<string>();
            var ilOffset = debuggerMessageParsed.GetValue("ilOffset").Value<int>();
            var breakpointId = CreateBreakpointId(dnaLocationId, ilOffset);

            // Modify the message to indicate we hit the .NET breakpoint, then pass it through to
            // the IDE. TODO: Also fix up the call stack, etc.
            var breakpoint = _debugInfoStore.FindBreakpointUsingDnaData(dnaLocationId, ilOffset, out var sourceFile);
            if (breakpoint == null)
            {
                Console.WriteLine($"Could not find .NET breakpoint corresponding to IL offset {ilOffset} in ID {dnaLocationId}");
                await _ideConnection.SendMessageAsync(message);
                return;
            }
            _currentlyPausedInDotNetBreakpoint = breakpoint;

            var lineNumber = breakpoint.SequencePointInfo.StartLine;
            var colNumber = breakpoint.SequencePointInfo.StartColumn;
            Console.WriteLine($"Hit .NET breakpoint at {sourceFile.FileName} line {lineNumber} col {colNumber}\n");

            var nativeCallFrames = message.Params.GetValue("callFrames").Values<JObject>();
            var dotNetCallFrames = new[]
            {
                // TODO: Include all .NET call frames, not just the top one
                DebuggerConnection.ToJObject(new
                {
                    CallFrameId = "dotnetcallframe:0",
                    FunctionName = breakpoint.MethodName,
                    FunctionLocation = new {
                        ScriptId = sourceFile.Id,
                        LineNumber = lineNumber - 1, // TODO: Get actual line/col where the function starts, not the breakpoint hit
                        ColumnNumber = colNumber - 1
                    },
                    Location = new {
                        ScriptId = sourceFile.Id,
                        LineNumber = lineNumber - 1,
                        ColumnNumber = colNumber - 1
                    },
                    ScopeChain = EmptyJObject, // TODO: Populate, so it can show locals
                    This = EmptyJObject
                })
            };
            await _ideConnection.SendMessageAsync(new MessageBase
            {
                Method = "Debugger.paused",
                Params = DebuggerConnection.ToJObject(new
                {
                    CallFrames = dotNetCallFrames.Concat(nativeCallFrames),
                    Reason = "other",
                    HitBreakpoints = new[] { breakpointId }
                })
            });
        }

        private async Task<JObject> HandleCallFromIde(string method, JObject parameters)
        {
            switch (method)
            {
                case "Debugger.getScriptSource":
                    {
                        var scriptId = parameters.GetValue("scriptId").Value<string>();
                        if (_debugInfoStore.ContainsScript(scriptId))
                        {
                            return GetScriptSource(scriptId);
                        }
                        break;
                    }
                case "Debugger.getPossibleBreakpoints":
                    {
                        var start = parameters.GetValue("start").Value<JObject>();
                        var scriptId = start.GetValue("scriptId").Value<string>();
                        if (_debugInfoStore.ContainsScript(scriptId))
                        {
                            var lineNumber = start.GetValue("lineNumber").Value<int>() + 1;
                            var columnNumber = start.GetValue("columnNumber").Value<int>() + 1;
                            return GetPossibleBreakpoints(scriptId, lineNumber, columnNumber);
                        }
                        break;
                    }
                case "Debugger.setBreakpointByUrl":
                    {
                        // It's strange that they give us a URL rather than the script ID.
                        // There might also be a setBreakpointByScriptId or similar method
                        // that also gets called in some cases.
                        var url = parameters.GetValue("url").Value<string>();
                        var script = _debugInfoStore.GetSourceFileByUrl(url);
                        if (script != null)
                        {
                            var lineNumber = parameters.GetValue("lineNumber").Value<int>() + 1;
                            var columnNumber = parameters.GetValue("columnNumber").Value<int>() + 1;
                            return await SetBreakpoint(script, lineNumber, columnNumber);
                        }
                        break;
                    }
                case "Debugger.removeBreakpoint":
                    {
                        var breakpointId = parameters.GetValue("breakpointId").Value<string>();
                        if (_currentBreakpointsById.ContainsKey(breakpointId))
                        {
                            return await RemoveBreakpoint(breakpointId);
                        }
                        break;
                    }
                case "Debugger.stepOver":
                    {
                        if (_currentlyPausedInDotNetBreakpoint != null)
                        {
                            await EvaluateJsInBrowser("Module.ccall('Debugger_Step', 'number', [], [])");
                            await _browserConnection.CallMethodAsync("Debugger.resume", EmptyJObject);
                            return EmptyJObject;
                        }
                        break;
                    }
            }

            // Temporarily, just proxy everything to the browser
            var proxiedResult = await _browserConnection.CallMethodAsync(method, parameters);
            return proxiedResult;
        }

        private async Task<JObject> RemoveBreakpoint(string breakpointId)
        {
            if (_currentBreakpointsById.TryGetValue(breakpointId, out var location))
            {
                _currentBreakpointsById.Remove(breakpointId);

                // DNA doesn't yet have a proper 'remove' breakpoint implementation, so as a shortcut
                // we clear the list and reassign the remaining ones
                await EvaluateJsInBrowser("Module.ccall('Debugger_Clear_BreakPoints', 'number', [], [])");
                await ReapplyAllBreakpoints();
            }

            return EmptyJObject;
        }

        private async Task<JObject> SetBreakpoint(SourceFileInfo script, int lineNumber, int columnNumber)
        {
            var closestLocation = _debugInfoStore.GetClosestBreakpointLocation(script, lineNumber, columnNumber);
            if (closestLocation == null)
            {
                Console.WriteLine($"\n*** No location found when trying to set breakpoint at line {lineNumber}, col {columnNumber} in {script.FileName}");
                return EmptyJObject;
            }
            else
            {
                // The breakpoint needs to be tracked:
                // [1] In the debug orchestrator, so it can recreate the list of breakpoints
                // later if it needs to
                var breakpointId = CreateBreakpointId(closestLocation.DnaMethodIdentifier, closestLocation.SequencePointInfo.Offset);
                _currentBreakpointsById[breakpointId] = closestLocation;

                // [2] In DNA, so it knows when to stop
                Console.WriteLine($"\n*** Found location at seq point {closestLocation.SequencePointIndex} in {closestLocation.DnaMethodIdentifier}");
                await SetBreakpointInDNA(closestLocation);

                // [3] In the IDE, so it can be shown to the developer
                return DebuggerConnection.ToJObject(new
                {
                    breakpointId = breakpointId,
                    locations = new[]
                    {
                        new {
                            scriptId = closestLocation.SourceFile.Id,
                            lineNumber = closestLocation.SequencePointInfo.StartLine - 1,
                            columnNumber = closestLocation.SequencePointInfo.StartColumn - 1
                        }
                    }
                });
            }
        }

        private Task SetBreakpointInDNA(PossibleBreakpointLocation breakpointLocation)
        {
            var jsExpression = $@"(function() {{
                if (window._dnaRuntimeHasStarted) {{
                    setBreakpointInDna('{breakpointLocation.DnaMethodIdentifier}', {breakpointLocation.SequencePointIndex});
                }} else {{
                    // Can't rely on any script files being loaded yet, so just write to global state
                    window._pendingBreakpoints = window._pendingBreakpoints || [];
                    window._pendingBreakpoints.push({{ dnaMethodId: '{breakpointLocation.DnaMethodIdentifier}', ilOffset: {breakpointLocation.SequencePointIndex} }});
                }}
            }})()";

            return EvaluateJsInBrowser(jsExpression);
        }

        private static string CreateBreakpointId(string dnaMethodIdentifier, int ilOffset)
        {
            return $"{dnaMethodIdentifier}:{ilOffset}";
        }

        private JObject GetPossibleBreakpoints(string scriptId, int lineNumber, int columnNumber)
        {
            var closestLocations = _debugInfoStore.GetBreakpointLocations(scriptId, lineNumber);
            return DebuggerConnection.ToJObject(new
            {
                locations = closestLocations.Select(location => new
                {
                    ScriptId = scriptId,
                    LineNumber = location.SequencePointInfo.StartLine - 1,
                    ColumnNumber = location.SequencePointInfo.StartColumn - 1
                })
            });
        }

        private JObject GetScriptSource(string scriptId)
        {
            var sourceFile = _debugInfoStore.GetSourceFileById(scriptId);
            return DebuggerConnection.ToJObject(new
            {
                // TODO: Stop reading the file from disk. Get the document's
                // contents from the .pdb file, assuming that info exists there.
                scriptSource = File.ReadAllText(sourceFile.FileName)
            });
        }

        private async Task NotifyIdeAboutDotNetSources(int executionContextId, JObject auxData)
        {
            // Add all the .pdb files from the client bin dir
            // TODO: Don't do it based on files on disk. Instead, somehow know what assemblies
            // have been referenced in client-side code, and use that as the list.
            _debugInfoStore.AddPdbFiles(_clientBinDir);

            // Also add .pdb files corresponding to the compiled Razor views
            // It's a bit lame to rely on the compiled assembly already being cached like this,
            // but we don't have all the info needed to compile it freshly here (e.g., list of
            // assembly references).
            var compiledViewsAssemblyData = RazorCompilation.GetCachedCompiledAssembly(_clientViewsAssemblyName);
            if (compiledViewsAssemblyData.Item1 != null)
            {
                using (var peStream = new MemoryStream(compiledViewsAssemblyData.Item1))
                using (var pdbStream = new MemoryStream(compiledViewsAssemblyData.Item2))
                {
                    _debugInfoStore.AddPdb(peStream, pdbStream);
                }
            }

            foreach (var sourceFile in _debugInfoStore.SourceFiles)
            {
                await NotifyBrowserAboutScript(executionContextId, auxData, sourceFile);
            }
        }

        private async Task NotifyBrowserAboutScript(int executionContextId, JObject auxData, SourceFileInfo sourceFile)
        {
            await _ideConnection.SendMessageAsync(new MessageBase
            {
                Method = "Debugger.scriptParsed",
                Params = DebuggerConnection.ToJObject(new
                {
                    ScriptId = sourceFile.Id,
                    Url = sourceFile.Url,
                    ExecutionContextId = executionContextId,
                    ExecutionContextAuxData = auxData,
                    Hash = "fakehash",
                    //IsLiveEdit = false,
                    //SourceMapURL = string.Empty,
                    //HasSourceURL = false,
                    //IsModule = false,
                    //StartLine = 0,
                    //StartColumn = 0,
                    //EndLine = 3,
                    //EndColumn = 0,
                    //Length = 123
                })
            });
        }

        private async Task<JObject> EvaluateJsInBrowser(string expression, string callFrameId = null)
        {
            JObject resultWrapper;
            if (string.IsNullOrEmpty(callFrameId))
            {
                resultWrapper = await _browserConnection.CallMethodAsync("Runtime.evaluate", DebuggerConnection.ToJObject(new
                {
                    Expression = expression
                }));
            }
            else
            {
                resultWrapper = await _browserConnection.CallMethodAsync("Debugger.evaluateOnCallFrame", DebuggerConnection.ToJObject(new
                {
                    Expression = expression,
                    CallFrameId = callFrameId
                }));
            }

            return resultWrapper.GetValue("result").Value<JObject>();
        }
    }
}
