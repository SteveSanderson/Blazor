using System;

namespace System.Reflection {

    public static class TypeExtensions {

        public static Type[] GetGenericArguments(Type type) => type.GetGenericArguments();
        public static MethodInfo[] GetMethods(Type type) => type.GetMethods();
        public static PropertyInfo[] GetProperties(Type type) => type.GetProperties();
        public static MethodInfo GetMethod(Type type, string name) => type.GetMethod(name);
        public static PropertyInfo GetProperty(Type type, string name) => type.GetProperty(name);
    }
}
