// © Microsoft. All rights reserved.

using System.Collections.Generic;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol.Messages;

namespace SampleDebugAdapter
{
    internal interface ISampleVariableContainer
    {
        string Name { get; }
        int VariableReference { get; }

        IReadOnlyCollection<ISampleVariableContainer> ChildContainers { get; }
        IReadOnlyCollection<SampleVariable> Variables { get; }

        VariablesResponse HandleVariablesRequest(VariablesArguments args);
        SetVariableResponse HandleSetVariableRequest(SetVariableArguments arguments);

        ISampleVariableContainer Container { get; }
    }
}
