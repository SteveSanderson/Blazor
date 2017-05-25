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
    }
}
