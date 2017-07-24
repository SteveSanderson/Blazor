// © Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol.Messages;
using Ookii.CommandLine;

using static System.FormattableString;

namespace SampleDebugAdapter
{
    internal class ThreadManager
    {
        private SampleDebugAdapter adapter;
        private List<SampleThread> threads;

        internal ThreadManager(SampleDebugAdapter adapter)
        {
            this.adapter = adapter;
            this.threads = new List<SampleThread>();

            this.adapter.RegisterDirective<StartThreadArgs>("StartThread", this.DoStartThread);
            this.adapter.RegisterDirective<EndThreadArgs>("EndThread", this.DoEndThread);

            this.adapter.RegisterDirective<PushStackFrameArgs>("PushStackFrame", this.DoPushStackFrame);
            this.adapter.RegisterDirective<PopStackFrameArgs>("PopStackFrame", this.DoPopStackFrame);

            this.adapter.RegisterDirective<DefineScopeArgs>("DefineScope", this.DoDefineScope);

            this.adapter.RegisterDirective<DefineVariableArgs>("DefineVariable", this.DoDefineVariable);
        }

        #region Internal API

        internal SampleThread StartThread(int id, string name)
        {
            SampleThread newThread = new SampleThread(id, name);
            this.threads.Add(newThread);
            this.adapter.Protocol.SendEvent(
                new ThreadEvent(
                    reason: ThreadEvent.ReasonValue.Started,
                    threadId: id));

            return newThread;
        }

        internal void EndThread(SampleThread thread)
        {
            this.threads.Remove(thread);
            this.adapter.Protocol.SendEvent(
                new ThreadEvent(
                    reason: ThreadEvent.ReasonValue.Exited,
                    threadId: thread.Id));
        }

        internal SampleThread GetThread(int threadId)
        {
            return this.threads.FirstOrDefault(t => t.Id == threadId);
        }

        internal SampleStackFrame GetStackFrame(int stackFrameId)
        {
            return this.threads.SelectMany(t => t.StackFrames).FirstOrDefault(f => f.Id == stackFrameId);
        }

        internal ISampleVariableContainer GetVariableContainer(int variablesReference)
        {
            return this.threads
                .SelectMany(t => t.StackFrames)
                .SelectMany(f => f.MergedScopes)
                .Select(s => this.FindVariableReference(s, variablesReference))
                .FirstOrDefault(c => c != null);
        }

        private ISampleVariableContainer FindVariableReference(ISampleVariableContainer container, int variablesReference)
        {
            if (container.VariableReference == variablesReference)
            {
                return container;
            }

            if (container.ChildContainers != null)
            {
                foreach (ISampleVariableContainer childContainer in container.ChildContainers)
                {
                    ISampleVariableContainer found = this.FindVariableReference(childContainer, variablesReference);
                    if (found != null)
                    {
                        return found;
                    }
                }
            }

            return null;
        }

        internal void Invalidate()
        {
            foreach (SampleThread thread in this.threads)
            {
                thread.Invalidate();
            }
        }

        #endregion

        #region Protocol Implementation

        internal ThreadsResponse HandleThreadsRequest(ThreadsArguments args)
        {
            return new ThreadsResponse(threads: this.threads.Select(t => t.GetProtocolThread()).ToList());
        }

        internal ScopesResponse HandleScopesRequest(ScopesArguments args)
        {
            SampleStackFrame frame = this.GetStackFrame(args.FrameId);
            if (frame == null)
            {
                throw new ProtocolException(Invariant($"Invalid frame id '{args.FrameId}'!"));
            }

            return frame.HandleScopesRequest(args);
        }

        internal StackTraceResponse HandleStackTraceRequest(StackTraceArguments args)
        {
            SampleThread thread = this.GetThread(args.ThreadId);
            if (thread == null)
            {
                throw new ProtocolException(Invariant($"Invalid thread id '{args.ThreadId}'!"));
            }

            return thread.HandleStackTraceRequest(args);
        }

        internal VariablesResponse HandleVariablesRequest(VariablesArguments args)
        {
            ISampleVariableContainer container = this.GetVariableContainer(args.VariablesReference);
            if (container == null)
            {
                throw new ProtocolException(Invariant($"Invalid variable reference '{args.VariablesReference}'!"));
            }

            return container.HandleVariablesRequest(args);
        }

        internal SetVariableResponse HandleSetVariableRequest(SetVariableArguments args)
        {
            ISampleVariableContainer container = this.GetVariableContainer(args.VariablesReference);
            if (container == null)
            {
                throw new ProtocolException(Invariant($"Invalid variable reference '{args.VariablesReference}'!"));
            }

            return container.HandleSetVariableRequest(args);
        }

        internal EvaluateResponse HandleEvaluateRequest(EvaluateArguments args)
        {
            if (!args.FrameId.HasValue)
            {
                throw new ProtocolException("Evaluation without a frame id is not supported!");
            }

            SampleStackFrame frame = this.GetStackFrame(args.FrameId.Value);
            if (frame == null)
            {
                throw new ProtocolException(Invariant($"Invalid frame id '{args.FrameId.Value}'!"));
            }

            return frame.HandleEvaluateRequest(args);
        }

        internal SetExpressionResponse HandleSetExpressionRequest(SetExpressionArguments args)
        {
            if (!args.FrameId.HasValue)
            {
                throw new ProtocolException("Evaluation without a frame id is not supported!");
            }

            SampleStackFrame frame = this.GetStackFrame(args.FrameId.Value);
            if (frame == null)
            {
                throw new ProtocolException(Invariant($"Invalid frame id '{args.FrameId.Value}'!"));
            }

            return frame.HandleSetExpressionRequest(args);
        }

        #endregion

        #region StartThread Directive

        private class StartThreadArgs
        {
            [CommandLineArgument("id", IsRequired = true, ValueDescription = "thread id")]
            public int Id { get; set; }

            [CommandLineArgument("name", ValueDescription = "thread name")]
            public string Name { get; set; }
        }

        private bool DoStartThread(StartThreadArgs args, StringBuilder output)
        {
            if (this.threads.Any(t => t.Id == args.Id))
            {
                output.AppendLine(Invariant($"Error: Thread with id '{args.Id}' already exists!"));
                return false;
            }

            this.StartThread(args.Id, args.Name);

            return true;
        }

        #endregion

        #region EndThread Directive

        private class EndThreadArgs
        {
            [CommandLineArgument("id", IsRequired = true, ValueDescription = "thread id")]
            public int Id { get; set; }
        }

        private bool DoEndThread(EndThreadArgs args, StringBuilder output)
        {
            if (args.Id == 0)
            {
                output.AppendLine("Error: Main thread cannot be ended!");
                return false;
            }

            SampleThread thread = this.threads.FirstOrDefault(t => t.Id == args.Id);
            if (thread == null)
            {
                output.AppendLine(Invariant($"Error: No thread with id '{args.Id}'!"));
                return false;
            }

            this.EndThread(thread);

            return true;
        }

        #endregion

        #region PushStackFrame Directive

        private class PushStackFrameArgs
        {
            [CommandLineArgument("name", IsRequired = true, ValueDescription = "frame name")]
            public string Name { get; set; }

            [CommandLineArgument("moduleid", IsRequired = false, ValueDescription = "module id")]
            public string ModuleId { get; set; }

            [CommandLineArgument("threadid", IsRequired = false, DefaultValue = 0, ValueDescription = "thread id")]
            public int ThreadId { get; set; }

            [CommandLineArgument("argname", IsRequired = false, ValueDescription = "argument name")]
            public string[] ArgName { get; set; }

            [CommandLineArgument("argtype", IsRequired = false, ValueDescription = "argument type")]
            public string[] ArgType { get; set; }

            [CommandLineArgument("argvalue", IsRequired = false, ValueDescription = "argument value")]
            public string[] ArgValue { get; set; }
        }

        private bool DoPushStackFrame(PushStackFrameArgs args, StringBuilder output)
        {
            List<SampleFunctionArgument> stackArgs = null;
            if (args.ArgName != null && args.ArgName.Length > 0)
            {
                if (args.ArgType == null || args.ArgType.Length != args.ArgName.Length ||
                    args.ArgValue == null || args.ArgValue.Length != args.ArgName.Length)
                {
                    output.AppendLine("Error: Must have same number of -argName, -argType, and -argValue arguments!");
                    return false;
                }

                stackArgs = new List<SampleFunctionArgument>();
                for (int i = 0; i < args.ArgName.Length; i++)
                {
                    stackArgs.Add(new SampleFunctionArgument(args.ArgType[i], args.ArgName[i], args.ArgValue[i]));
                }
            }

            SampleModule module = null;
            if (!String.IsNullOrEmpty(args.ModuleId))
            {
                module = this.adapter.ModuleManager.GetModuleById(args.ModuleId);
                if (module == null)
                {
                    output.AppendLine(Invariant($"Error: Unknown module id '{args.ModuleId}'!"));
                    return false;
                }
            }

            SampleThread targetThread = this.GetThread(args.ThreadId);
            if (targetThread == null)
            {
                output.AppendLine(Invariant($"Error: Unknown thread id '{args.ThreadId}'!"));
                return false;
            }

            targetThread.PushStackFrame(new SampleStackFrame(this.adapter, module, args.Name, stackArgs, this.adapter.Source.Path, 0, 0));

            return true;
        }

        #endregion

        #region PopStackFrame Directive

        private class PopStackFrameArgs
        {
            [CommandLineArgument("threadid", IsRequired = false, DefaultValue = 0, ValueDescription = "thread id")]
            public int ThreadId { get; set; }
        }

        private bool DoPopStackFrame(PopStackFrameArgs args, StringBuilder output)
        {
            SampleThread targetThread = this.GetThread(args.ThreadId);
            if (targetThread == null)
            {
                output.AppendLine(Invariant($"Error: Unknown thread id '{args.ThreadId}'!"));
                return false;
            }

            targetThread.PopStackFrame();
            return true;
        }

        #endregion

        #region DefineScope Directive

        private class DefineScopeArgs
        {
            [CommandLineArgument("name", IsRequired = true, Position = 0)]
            public string Name { get; set; }

            [CommandLineArgument("thread", IsRequired = false, DefaultValue = 0)]
            public int ThreadId { get; set; }

            [CommandLineArgument("expensive", IsRequired = false, DefaultValue = false)]
            public bool Expensive { get; set; }
        }

        private bool DoDefineScope(DefineScopeArgs args, StringBuilder output)
        {
            SampleThread thread = this.GetThread(args.ThreadId);
            if (thread == null)
            {
                output.AppendLine(Invariant($"Error: Invalid thread id '{args.ThreadId}'!"));
                return false;
            }

            SampleStackFrame frame = thread.GetTopStackFrame();
            if (frame == null)
            {
                output.AppendLine(Invariant($"Error: Thread '{args.ThreadId}' has no stack frames!"));
                return false;
            }

            if (frame.AllScopes.Any(s => String.Equals(s.Name, args.Name, StringComparison.OrdinalIgnoreCase)))
            {
                output.AppendLine(Invariant($"Error: Selected stack frame already has a scope called '{args.Name}'!"));
                return false;
            }

            SampleScope scope = new SampleScope(this.adapter, args.Name, args.Expensive);
            frame.AddScope(scope);

            return true;
        }

        #endregion

        #region DefineVariable Directive

        private class DefineVariableArgs
        {
            [CommandLineArgument("name", IsRequired = true, Position = 0)]
            public string Name { get; set; }

            [CommandLineArgument("type", IsRequired = true, Position = 1)]
            public string Type { get; set; }

            [CommandLineArgument("value", IsRequired = true, Position = 2)]
            public string Value { get; set; }

            [CommandLineArgument("scope", IsRequired = false)]
            public string Scope { get; set; }
        }

        private bool DoDefineVariable(DefineVariableArgs args, StringBuilder output)
        {
            SampleScope scope;
            if (String.IsNullOrEmpty(args.Scope))
            {
                // Use the "Locals" scope for the top stack frame on the main thread
                scope = this.GetThread(0)?.GetTopStackFrame()?.ModifiableScopes?.FirstOrDefault(s => String.Equals(s.Name, "Locals", StringComparison.OrdinalIgnoreCase));
            }
            else
            {
                // Find the requested scope
                scope = this.threads.SelectMany(t => t.StackFrames).SelectMany(f => f.ModifiableScopes).FirstOrDefault(s => String.Equals(s.Name, args.Scope, StringComparison.OrdinalIgnoreCase));
            }

            if (scope == null)
            {
                output.AppendLine("Error: Unable to locate target scope!");
                return false;
            }

            if (scope.Variables != null && scope.Variables.Any(v => String.Equals(v.Name, args.Name, StringComparison.Ordinal)))
            {
                output.AppendLine(Invariant($"Error: Scope '{scope.Name}' already contains a variable named '{args.Name}'!"));
                return false;
            }

            scope.AddVariable(new SimpleVariable(this.adapter, args.Name, args.Type, args.Value));
            return true;
        }

        #endregion
    }
}
