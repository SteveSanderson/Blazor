using System.Collections.Generic;

namespace System.Reflection {
    public class TypeInfo {
        private readonly Type _type;

        internal TypeInfo(Type type) {
            _type = type;
        }

        public bool IsValueType => _type.IsValueType;

        public virtual Type[] GenericTypeParameters {
            get { return _type.GetGenericArguments(); }
        }

        public virtual IEnumerable<MethodInfo> DeclaredMethods {
            get { return _type.GetMethods(); }
        }

        public virtual bool IsGenericType {
            get { return _type.IsGenericType; }
        }

        public virtual bool IsGenericTypeDefinition {
            get { return _type.IsGenericTypeDefinition; }
        }
    }
}