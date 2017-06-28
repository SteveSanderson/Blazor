using Blazor.Runtime;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace Blazor.Interop
{
    // ManagedGCHandle is just a class wrapper around the GCHandle struct. Reason:
    // [1] Provides a nicer API
    // [2] It actually creates a GCHandle to *itself* rather than the object you pass to it.
    //     This may seem like pointless indirection, but in fact it's currently necessary,
    //     because the DotNetAnywhere runtime crashes if you try to put a *delegate* instance
    //     as a key into a Dictionary and then check whether dict.ContainsKey(thatDelegate).
    //     I haven't tracked down the underlying bug, but this is an adequate workaround for POC.

    public static class ManagedGCHandle
    {
        public static ManagedGCHandle<T> FromObject<T>(T value)
        {
            return new ManagedGCHandle<T>(value);
        }

        public static ManagedGCHandle<T> FromAddress<T>(int address)
        {
            return ManagedGCHandle<T>.FromAddress(address);
        }
    }

    public class ManagedGCHandle<T> : IDisposable
    {
        private GCHandle _gcHandle;
        private T _value;

        public ManagedGCHandle(T value)
        {
            _value = value;

            // Note that on the real .NET (non-DNA) runtimes we can't really pin some of the things we
            // want to pin for JS interop, because they they are "non-primitive" types (i.e., hold references
            // to things that themselves would still be unpinned). During server-side execution we don't
            // actually need to pin anything, because there's no interop outside .NET. During client-side
            // execution, everything is (in effect) pinned regardless, because DNA's GC only does mark-sweep
            // - it doesn't have any compaction phase.
            _gcHandle = GCHandle.Alloc(this, Env.IsServer ? GCHandleType.Normal : GCHandleType.Pinned);
        }

        public static ManagedGCHandle<T> FromAddress(int address)
        {
            var handle = GCHandle.FromIntPtr(new IntPtr(address));
            return (ManagedGCHandle<T>)handle.Target;
        }

        public T Value => _value;

        // As per comment above, we don't really need real pointers when executing on the server.
        // Nor can we even obtain one safely.
        public int Address => Env.IsServer ? 0 : _gcHandle.AddrOfPinnedObject().ToInt32();

        public void Dispose()
        {
            _gcHandle.Free();
        }
    }
}
