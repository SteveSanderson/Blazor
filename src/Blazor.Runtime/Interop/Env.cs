using System;
using System.Collections.Generic;
using System.Text;

namespace Blazor.Runtime
{
    public static class Env
    {
        private static bool _isServer = false;

        public static bool IsServer => _isServer;
        public static bool IsClient => !_isServer;
    }
}
