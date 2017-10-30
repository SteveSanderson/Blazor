using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

namespace System.Reflection
{
    public static class CustomAttributeExtensions
    {
        public static IEnumerable<Attribute> GetCustomAttributes(this MemberInfo element)
        {
            var customAttributeInfos = element.GetCustomAttributes();
            var result = new Attribute[customAttributeInfos.Length];
            for (var i = 0; i < customAttributeInfos.Length; i++)
            {
                var uninitializedInstance = customAttributeInfos[i].UninitializedInstance;
                result[i] = uninitializedInstance;

                // Call the constructor
                customAttributeInfos[i].ConstructorMethodBase.Invoke(
                    uninitializedInstance,
                    customAttributeInfos[i].ConstructorParams);
            }
            return result;
        }

        public static IEnumerable<Attribute> GetCustomAttributes(this MemberInfo element, Type attributeType, bool inherit)
        {
            var attributes = GetCustomAttributes(element);
            return attributes.Where(attr => attributeType.IsAssignableFrom(attr.GetType()));
        }

    }
}
