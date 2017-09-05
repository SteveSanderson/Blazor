using System.Collections.Generic;

namespace System.Reflection {

    public class TypeInfo {

        private readonly Type _type;

        internal TypeInfo(Type type) {
            _type = type;
        }

        public virtual Type BaseType => _type.BaseType;
        public virtual bool IsValueType => _type.IsValueType;
        public virtual bool IsGenericType => _type.IsGenericType;
        public virtual bool IsGenericTypeDefinition => _type.IsGenericTypeDefinition;

        public virtual Type[] GenericTypeParameters => _type.GetGenericArguments();
        public virtual IEnumerable<MethodInfo> DeclaredMethods => _type.GetMethods();

    }
}