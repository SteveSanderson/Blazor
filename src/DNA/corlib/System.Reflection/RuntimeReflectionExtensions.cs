using System;
using System.Collections.Generic;
using System.Text;

namespace System.Reflection {

    public static class RuntimeReflectionExtensions {

        // public static MethodInfo GetRuntimeMethod(this Type type, string name, Type[] parameters) => type.GetMethod(name);
        public static PropertyInfo GetRuntimeProperty(this Type type, string name) => type.GetProperty(name);
        public static IEnumerable<MethodInfo> GetRuntimeMethods(this Type type) => type.GetMethods();
        public static IEnumerable<PropertyInfo> GetRuntimeProperties(this Type type) => type.GetProperties();
    }
}
