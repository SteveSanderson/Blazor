namespace System.Reflection
{
    public class TypeInfo : MemberInfo
    {
        private readonly Type _type;

        internal TypeInfo(Type type) : base(type, type.Name)
        {
            _type = type;
        }

        public bool IsValueType => _type.IsValueType;
    }
}