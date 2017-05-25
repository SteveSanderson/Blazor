using System.Runtime.CompilerServices;

namespace System.Reflection
{
    public abstract class MethodInfo : MethodBase
    {
    }

    public abstract class MethodBase : MemberInfo
    {
        private readonly Type _ownerType;
        private readonly string _name;
        private readonly IntPtr _methodDef;

        public override string Name => _name;
        
        public object Invoke(object target, object[] parameters)
        {
            // This is not invoked at runtime, because the JITter specifically replaces calls
            // to MethodBase.Invoke with its own special opcode
            throw new NotImplementedException();
        }
    }
}