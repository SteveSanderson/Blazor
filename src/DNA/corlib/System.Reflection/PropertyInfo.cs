namespace System.Reflection
{
    public abstract class PropertyInfo : MemberInfo
    {
#pragma warning disable 0649
        private readonly Type _ownerType;
        private readonly string _name;
        private readonly Type _propertyType;
#pragma warning restore 0649

        public override string Name => _name;

        public Type PropertyType => _propertyType;

        public MethodInfo GetGetMethod()
        {
            return _ownerType.GetMethod("get_" + _name);
        }

        public MethodInfo GetSetMethod()
        {
            return _ownerType.GetMethod("set_" + _name);
        }

        public MethodInfo GetMethod => GetGetMethod();
        public MethodInfo SetMethod => GetSetMethod();
    }
}
