using System.Collections.Generic;

namespace Blazor.Host.Debugging.Models
{
    public class SourceFileInfo
    {
        public string Id { get; set; }
        public string AssemblyName { get; set; }
        public string FileName { get; set; }
        public string Url { get; set; }
        public IDictionary<int, List<PossibleBreakpointLocation>> PossibleBreakpointLocationsByLine { get; set; }
    }
}
