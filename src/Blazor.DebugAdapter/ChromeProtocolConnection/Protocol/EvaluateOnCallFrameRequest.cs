using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Blazor.DebugAdapter.ChromeProtocolConnection.Protocol
{
    class EvaluateOnCallFrameRequest : ChromeRequest
    {
        public new const string Method = "Debugger.evaluateOnCallFrame";
        public EvaluateOnCallFrameRequestParams Params { get; }

        public EvaluateOnCallFrameRequest(CallFrame callFrame, string expression) : base(Method)
        {
            Params = new EvaluateOnCallFrameRequestParams(
                callFrame.CallFrameId,
                expression);
        }

        public class EvaluateOnCallFrameRequestParams
        {
            public string CallFrameId { get; }
            public string Expression { get; }

            public EvaluateOnCallFrameRequestParams(string callFrameId, string expression)
            {
                CallFrameId = callFrameId;
                Expression = expression;
            }
        }
    }
}
