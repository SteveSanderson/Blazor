namespace System.Reflection
{
    public abstract class PropertyInfo : MemberInfo
    {
#pragma warning disable 0649
        // populated by interop, MUST be synced with C code
        private readonly Type _ownerType;
        private readonly string _name;
        private readonly Type _propertyType;
#pragma warning restore 0649

        public override string Name { get { return _name; } }

        public Type PropertyType { get { return _propertyType; } }

        public MethodInfo GetGetMethod() {
            return _ownerType.GetMethod("get_" + Name);
        }

        public MethodInfo GetSetMethod() {
            return _ownerType.GetMethod("set_" + Name);
        }

        public MethodInfo GetMethod => GetGetMethod();
        public MethodInfo SetMethod => GetSetMethod();
    }
}
