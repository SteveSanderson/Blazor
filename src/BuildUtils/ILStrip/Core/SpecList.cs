using System.Collections.Generic;
using System.Linq;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Core
{
    internal class SpecList
    {
        private List<SpecListEntry> _itemSpecs;

        public SpecList(string[] fromSpecLines)
        {
            var nonCommentLines = fromSpecLines.Where(line => !line.StartsWith('#'));
            _itemSpecs = new List<SpecListEntry>(
                nonCommentLines.Select(line => new SpecListEntry(line)));
        }

        public bool Match(AssemblyItem item)
        {
            // If this needs to be faster, consider implementing some kind of matching tree.
            var lastMatchingSpec = _itemSpecs.LastOrDefault(spec => spec.IsMatch(item));
            return lastMatchingSpec == null ? false : !lastMatchingSpec.Negated;
        }
    }
}
