using System.Reflection.Metadata;

namespace Blazor.Host.Debugging.Models
{
    public class PossibleBreakpointLocation
    {
        public SourceFileInfo SourceFile { get; set; }
        public string DnaMethodIdentifier { get; set; }
        public int SequencePointIndex { get; set; }
        public SequencePoint SequencePointInfo { get; set; }
        public string MethodName { get; internal set; }
    }
}
