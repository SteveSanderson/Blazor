using System;
using System.Collections.Generic;
using System.Text;

namespace System.Reflection
{
    public static class RuntimeReflectionExtensions
    {
        public static IEnumerable<PropertyInfo> GetRuntimeProperties(this Type type)
        {
            return type.GetProperties();
        }
        public static IEnumerable<MethodInfo> GetRuntimeMethods(this Type type)
        {
            return type.GetMethods();
        }
    }
}
