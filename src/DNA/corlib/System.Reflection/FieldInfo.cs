using System.Runtime.CompilerServices;

namespace System.Reflection
{
    public abstract class FieldInfo : MemberInfo
    {
        public abstract object GetValue(object obj);
    }
}