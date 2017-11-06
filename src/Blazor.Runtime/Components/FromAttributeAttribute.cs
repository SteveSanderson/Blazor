using System;
using System.Collections.Generic;
using System.Text;

namespace Blazor.Runtime.Components
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class FromAttributeAttribute : Attribute
    {
        public string AttributeName {get; set;}
        public bool IsOptional { get; set; }

        public FromAttributeAttribute(string attributeName)
        {
            AttributeName = attributeName;
        }

        public FromAttributeAttribute(string attributeName, bool isOptional)
        {
            AttributeName = attributeName;
            IsOptional = isOptional;
        }
    }
}
