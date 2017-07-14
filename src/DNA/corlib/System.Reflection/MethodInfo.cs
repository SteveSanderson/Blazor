using System.Runtime.CompilerServices;

namespace System.Reflection
{
    public abstract class MethodInfo : MethodBase
    {
    }

    public abstract class MethodBase : MemberInfo
    {
#pragma warning disable 0169, 0649
        private readonly Type _ownerType;
        private readonly string _name;
        private readonly IntPtr _methodDef;
#pragma warning restore 0169, 0649

        public override string Name => _name;
        
        public object Invoke(object target, object[] parameters)
        {
            // This is not invoked at runtime, because the JITter specifically replaces calls
            // to MethodBase.Invoke with its own special opcode
            throw new NotImplementedException();
        }
    }
}