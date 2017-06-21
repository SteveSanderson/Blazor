// From https://github.com/Microsoft/referencesource
// See copyright and license details in that repo

namespace System.Runtime.Versioning
{
    public sealed class TargetFrameworkAttribute : Attribute
    {
        public TargetFrameworkAttribute(string frameworkName)
        {
            FrameworkName = frameworkName;
        }
        public string FrameworkDisplayName { get; set; }
        public string FrameworkName { get; }
    }
}