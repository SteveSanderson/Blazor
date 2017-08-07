    using System.Runtime.CompilerServices;

    namespace System.Reflection {

    public abstract class MethodBase : MemberInfo {
#pragma warning disable 0169, 0649
        // populated by interop, MUST be synced with C code
        private readonly Type _ownerType;
        private readonly string _name;
        private readonly uint _flags;
        private readonly IntPtr _methodDef;
#pragma warning restore 0169, 0649

        public override string Name { get { return _name; } }

        public object Invoke(object target, object[] parameters) {
            // This is not invoked at runtime, because the JITter specifically replaces calls
            // to MethodBase.Invoke with its own special opcode
            throw new NotImplementedException();
        }

        public MethodAttributes Attributes { get { return (MethodAttributes)_flags; } }

        public Boolean IsPublic {
            get { return (Attributes & MethodAttributes.MemberAccessMask) == MethodAttributes.Public; }
        }
        public Boolean IsPrivate {
            get { return (Attributes & MethodAttributes.MemberAccessMask) == MethodAttributes.Private; }
        }
        public Boolean IsFamily {
            get { return (Attributes & MethodAttributes.MemberAccessMask) == MethodAttributes.Family; }
        }
        public Boolean IsAssembly {
            get { return (Attributes & MethodAttributes.MemberAccessMask) == MethodAttributes.Assembly; }
        }
        public Boolean IsFamilyAndAssembly {
            get { return (Attributes & MethodAttributes.MemberAccessMask) == MethodAttributes.FamANDAssem; }
        }
        public Boolean IsFamilyOrAssembly {
            get { return (Attributes & MethodAttributes.MemberAccessMask) == MethodAttributes.FamORAssem; }
        }
        public Boolean IsStatic {
            get { return (Attributes & MethodAttributes.Static) != 0; }
        }
        public Boolean IsFinal {
            get { return (Attributes & MethodAttributes.Final) != 0; }
        }
        public Boolean IsVirtual {
            get { return (Attributes & MethodAttributes.Virtual) != 0; }
        }
        public Boolean IsHideBySig {
            get { return (Attributes & MethodAttributes.HideBySig) != 0; }
        }
        public Boolean IsAbstract {
            get { return (Attributes & MethodAttributes.Abstract) != 0; }
        }
    }
}