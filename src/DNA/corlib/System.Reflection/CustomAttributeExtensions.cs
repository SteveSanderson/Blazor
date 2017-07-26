using System.Collections.Generic;
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
    }

    internal struct InternalCustomAttributeInfo
    {
#pragma warning disable 0649
        public Attribute UninitializedInstance;
        public MethodBase ConstructorMethodBase;
        public object[] ConstructorParams;
#pragma warning restore 0649
    }
}
