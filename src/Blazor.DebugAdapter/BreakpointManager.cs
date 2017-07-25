// © Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol.Messages;

namespace SampleDebugAdapter
{
    internal class BreakpointManager
    {
        private SampleDebugAdapter adapter;
        private HashSet<int> breakpoints;

        internal BreakpointManager(SampleDebugAdapter adapter)
        {
            this.adapter = adapter;

            this.breakpoints = new HashSet<int>();
        }

        internal bool HasLineBreakpoint(int line)
        {
            return this.breakpoints.Contains(line);
        }

        internal SetBreakpointsResponse HandleSetBreakpointsRequest(SetBreakpointsArguments arguments)
        {
            if (arguments.Breakpoints == null)
                throw new ProtocolException("No breakpoints set");

            List<Breakpoint> responseBreakpoints;

            if (String.Equals(arguments.Source.Path, this.adapter.Source.Path, StringComparison.OrdinalIgnoreCase))
            {
                this.breakpoints.Clear();

                responseBreakpoints = new List<Breakpoint>(arguments.Breakpoints.Count);
                foreach (var sourceBreakpoint in arguments.Breakpoints)
                {
                    int? resolveLineNumber = this.ResolveBreakpoint(this.adapter.LineFromClient(sourceBreakpoint.Line));
                    if (resolveLineNumber.HasValue)
                    {
                        this.breakpoints.Add(resolveLineNumber.Value);
                    }

                    Breakpoint bp = (!resolveLineNumber.HasValue) ?
                        new Breakpoint(verified: false, id: Int32.MaxValue) :
                        new Breakpoint(
                            verified: true,
                            id: resolveLineNumber,
                            line: this.adapter.LineToClient(resolveLineNumber.Value),
                            source: this.adapter.Source
                        );
                    responseBreakpoints.Add(bp);
                }
            }
            else
            {
                // Breakpoints are not in this file - mark them all as failed
                responseBreakpoints = arguments.Breakpoints.Select(b => new Breakpoint(verified: false, id: Int32.MaxValue)).ToList();
            }

            return new SetBreakpointsResponse(breakpoints: responseBreakpoints);
        }

        private int? ResolveBreakpoint(int lineNumber)
        {
            if (lineNumber < 0)
                return null;

            // Breakpoint can only bind on a non-comment line that has text.
            for (int i = lineNumber; i < this.adapter.Lines.Count; i++)
            {
                if (!String.IsNullOrEmpty(this.adapter.Lines[i]) &&
                    !this.adapter.Lines[i].Trim().StartsWith("#"))
                    return i;
            }
            return null;
        }
    }
}
