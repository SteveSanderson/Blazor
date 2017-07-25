/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
namespace VSCodeDebug
{
    internal class BlazorDebugSession : DebugSession
    {
        public BlazorDebugSession() : base(debuggerLinesStartAt1: true)
        {
        }

        public override void Attach(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Continue(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Disconnect(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Evaluate(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Initialize(Response response, dynamic args)
        {
            throw new System.NotImplementedException();
        }

        public override void Launch(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Next(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Pause(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Scopes(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void SetBreakpoints(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void StackTrace(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void StepIn(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void StepOut(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Threads(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }

        public override void Variables(Response response, dynamic arguments)
        {
            throw new System.NotImplementedException();
        }
    }
}