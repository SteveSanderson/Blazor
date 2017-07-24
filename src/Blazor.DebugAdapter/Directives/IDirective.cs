// © Microsoft. All rights reserved.

using System.Text;

namespace SampleDebugAdapter.Directives
{
    internal interface IDirective
    {
        string Name { get; }
        bool Execute(string[] args, StringBuilder output);
        object ParseArgs(string[] args);
    }
}
