using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace System.Reflection
{
    public static class CustomAttributeExtensions
    {
        public static IEnumerable<Attribute> GetCustomAttributes(this MemberInfo element)
        {
            return element.GetCustomAttributes();
        }
    }
}
