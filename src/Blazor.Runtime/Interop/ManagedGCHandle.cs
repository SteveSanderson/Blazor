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
            _gcHandle = GCHandle.Alloc(this, GCHandleType.Pinned);
        }

        public static ManagedGCHandle<T> FromAddress(int address)
        {
            var handle = GCHandle.FromIntPtr(new IntPtr(address));
            return (ManagedGCHandle<T>)handle.Target;
        }

        public T Value => _value;

        public int Address => _gcHandle.AddrOfPinnedObject().ToInt32();

        public void Dispose()
        {
            _gcHandle.Free();
        }
    }
}
