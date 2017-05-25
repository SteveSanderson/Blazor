namespace AngleSharp.Network.Default
{
    using AngleSharp.Extensions;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Reflection;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// The default (ready-to-use) HTTP requester.
    /// </summary>
    public sealed class HttpRequester : IRequester
    {
        public Task<IResponse> RequestAsync(IRequest request, CancellationToken cancel)
        {
            throw new NotImplementedException();
        }

        public bool SupportsProtocol(string protocol)
        {
            throw new NotImplementedException();
        }
    }
}
