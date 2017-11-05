// From https://github.com/Microsoft/referencesource
// See copyright and license details in that repo

using System;
using System.Threading;

namespace Blazor.Runtime.FakeBcl
{
    internal static class AsyncServices
    {
        internal static void ThrowAsync(Exception exception, object targetContext)
        {
            throw new NotImplementedException("ThrowAsync not implemented because it requires threading");
            /*
            new Thread(() =>
            {
                throw exception;
            }).Start();
            */
        }
    }
}
