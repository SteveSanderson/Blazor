namespace System.Reflection {
    public abstract class PropertyInfo : MemberInfo {

#pragma warning disable 0649
        private readonly Type _propertyType;
#pragma warning restore 0649

        public Type PropertyType => _propertyType;

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
