using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace System.Runtime.InteropServices
{
    internal static class GCRootedObjects
    {
        private static Dictionary<object, bool> _entries = new Dictionary<object, bool>();

        public static void Track(object obj)
        {
            _entries[obj] = true;
        }

        public static void Untrack(object obj)
        {
            _entries.Remove(obj);
        }
    }

    public struct GCHandle
    {
        public object Target {
            get { return FromHeapRef(_handle.ToInt32()); }
            set { throw new NotImplementedException(); }
        }

        public bool IsAllocated
        {
            get { return _handle != default(IntPtr); }
        }

        private IntPtr _handle;

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern private static int ToHeapRef(object obj);

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern private static object FromHeapRef(int heapRef);

        private GCHandle(object value, GCHandleType type)
        {
            if (type != GCHandleType.Pinned)
            {
                throw new NotImplementedException("Not implemented: GCHandle with type " + type.ToString());
            }

            _handle = new IntPtr(ToHeapRef(value));
        }

        private GCHandle(IntPtr ptr)
        {
            _handle = ptr;
        }

        public static GCHandle Alloc(object value)
        {
            return Alloc(value, GCHandleType.Normal);
        }

        public static GCHandle Alloc(object value, GCHandleType type)
        {
            GCRootedObjects.Track(value);
            return new GCHandle(value, type);
        }

        public static IntPtr ToIntPtr(GCHandle handle)
        {
            return handle.AddrOfPinnedObject();
        }

        public static GCHandle FromIntPtr(IntPtr ptr)
        {
            return new GCHandle(ptr);
        }

        public IntPtr AddrOfPinnedObject()
        {
            return _handle;
        }

        public void Free()
        {
            if (IsAllocated)
            {
                GCRootedObjects.Untrack(Target);
            }
        }
    }

    public enum GCHandleType
    {
        Weak = 0,
        WeakTrackResurrection = 1,
        Normal = 2,
        Pinned = 3
    }
}
