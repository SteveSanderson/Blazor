// From https://github.com/Microsoft/referencesource
// See copyright and license details in that repo

namespace System.Runtime.CompilerServices {

    [Serializable]
    [AttributeUsage(AttributeTargets.All, Inherited = true)]
    public sealed class CompilerGeneratedAttribute : Attribute
    {
        public CompilerGeneratedAttribute () {}
    }
}

