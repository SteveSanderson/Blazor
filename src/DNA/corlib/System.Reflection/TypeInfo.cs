using System.Collections.Generic;

namespace System.Reflection {

    public class TypeInfo {

        private readonly Type _type;

        internal TypeInfo(Type type) {
            _type = type;
        }

        public bool IsAnsiClass => _type.IsAnsiClass;
        public bool IsUnicodeClass => _type.IsUnicodeClass;
        public bool IsAutoClass => _type.IsAutoClass;
        public bool IsNotPublic => _type.IsNotPublic;
        public bool IsPublic => _type.IsPublic;
        public bool IsNestedPublic => _type.IsNestedPublic;
        public bool IsNestedPrivate => _type.IsNestedPrivate;
        public bool IsNestedFamily => _type.IsNestedFamily;
        public bool IsNestedAssembly => _type.IsNestedAssembly;
        public bool IsNestedFamANDAssem => _type.IsNestedFamANDAssem;
        public bool IsNestedFamORAssem => _type.IsNestedFamORAssem;
        public bool IsAutoLayout => _type.IsAutoLayout;
        public bool IsLayoutSequential => _type.IsLayoutSequential;
        public bool IsExplicitLayout => _type.IsExplicitLayout;
        public bool IsClass => _type.IsClass;
        public bool IsInterface => _type.IsInterface;
        public bool IsAbstract => _type.IsAbstract;
        public bool IsSealed => _type.IsSealed;
        public bool IsSpecialName => _type.IsSpecialName;
        public bool IsImport => _type.IsImport;
        public bool IsSerializable => _type.IsSerializable;

        public virtual Type BaseType => _type.BaseType;
        public virtual bool IsValueType => _type.IsValueType;
        public virtual bool IsGenericType => _type.IsGenericType;
        public virtual bool IsGenericTypeDefinition => _type.IsGenericTypeDefinition;
        public virtual bool IsAssignableFrom(TypeInfo ti) => _type.IsAssignableFrom(ti._type);

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