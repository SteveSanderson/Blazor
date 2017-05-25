namespace System.Reflection
{
    public class TypeInfo
    {
        private readonly Type _type;

        internal TypeInfo(Type type)
        {
            _type = type;
        }

        public bool IsValueType => _type.IsValueType;
    }
}