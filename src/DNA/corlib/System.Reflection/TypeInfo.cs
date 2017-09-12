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
        public virtual IEnumerable<Type> ImplementedInterfaces => _type.GetInterfaces();
        public virtual IEnumerable<MethodInfo> DeclaredMethods => _type.GetMethods();
        public virtual IEnumerable<PropertyInfo> DeclaredProperties => _type.GetProperties();

        public virtual IEnumerable<TypeInfo> DeclaredNestedTypes {
            get {
                var types = _type.GetNestedTypes();
                var typeInfos = new TypeInfo[types.Length];
                for (int i = 0; i < types.Length; i++) {
                    typeInfos[i] = new TypeInfo(types[i]);
                }
                return typeInfos;
            }
        }

        public virtual MethodInfo GetDeclaredMethod(string name) => _type.GetMethod(name);
        public virtual PropertyInfo GetDeclaredProperty(string name) => _type.GetProperty(name);

        public virtual TypeInfo GetDeclaredNestedType(string name) {
            var type = _type.GetNestedType(name);
            return (type != null) ? new TypeInfo(type) : null;
        }

    }
}