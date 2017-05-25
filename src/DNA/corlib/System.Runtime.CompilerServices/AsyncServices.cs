// From https://github.com/Microsoft/referencesource
// See copyright and license details in that repo

using System.Threading;

namespace System.Runtime.CompilerServices
{
    internal static class AsyncServices
    {
        internal static void ThrowAsync(Exception exception, object targetContext)
        {
            new Thread(() =>
            {
                throw exception;
            }).Start();
        }
    }
}
