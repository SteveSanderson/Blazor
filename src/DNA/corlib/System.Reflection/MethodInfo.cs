using System.Runtime.CompilerServices;

namespace System.Reflection {

    public abstract class MethodInfo : MethodBase {

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern public virtual MethodInfo MakeGenericMethod(params Type[] typeArguments);
    }
}