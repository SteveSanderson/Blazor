using System;

namespace System.Reflection {

    public static class TypeExtensions {

        public static Type[] GetGenericArguments(Type type) {
            return type.GetGenericArguments();
        }

        public static MethodInfo GetMethod(Type type, string name) {
            return type.GetMethod(name);
        }

        public static MethodInfo[] GetMethods(Type type) {
            return type.GetMethods();
        }

        public static PropertyInfo[] GetProperties(Type type) {
            return type.GetProperties();
        }

    }
}
