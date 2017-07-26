using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.CodeAnalysis.CSharp;

namespace RazorRenderer
{
    public class ValidationHack
    {
        public static string GetValidationStuffToAppend()
        {
            var csharp = new StringBuilder();
            csharp.Append($@"
public override void Validate()
{{
    ValidationSummary = """";
    var type = Model.GetType();
    foreach (var prop in type.GetRuntimeProperties())
    {{
        var propVal = prop.GetGetMethod().Invoke(Model, null);
        //Console.WriteLine(""Prop: "" + prop.Name + "" Value: "");

        foreach (var attribute in prop.GetCustomAttributes())
        {{
            var attributeName = attribute.GetType().Name;
            if (attribute is RequiredAttribute)
            {{
                if (propVal == null ||
                    (propVal.GetType().Name == ""String"" && (string)propVal == """") ||
                    (propVal.GetType().Name == ""Boolean"" && (bool)propVal == false))
                {{
                    ValidationSummary += $""{{prop.Name}} is required. "";
                }}
            }}
            else if (attribute is StringLengthAttribute strLenAttr)
            {{
                var length = strLenAttr.MaximumLength;
                if (propVal != null && ((string)propVal).Length > length)
                {{
                    ValidationSummary += $""The value of {{prop.Name}} exceeds the maximum length of {{length}}. "";
               }}
            }}
        }}
    }}
}}
"
);

            var csharpString = csharp.ToString();
            return csharpString;
        }

        /*
        public override void Validate()
        {
            ValidationSummary = "asd";
            var type = Model.GetType();
            foreach (var prop in type.GetRuntimeProperties())
            {
                Console.WriteLine("Prop: " + prop.Name + " Value: ");

                foreach (var attribute in prop.GetCustomAttributes())
                {
                    var attributeName = attribute.GetType().Name;
                    if (attribute is RequiredAttribute)
                    {
                        if (Model.AnotherProp == null ||
                            (Model.AnotherProp.GetType().Name == "String" && Model.AnotherProp == ""))
                        {
                            ValidationSummary += $"{prop.Name} is required.";
                        }
                    }
                    else if (attribute is StringLengthAttribute strLenAttr)
                    {
                        var length = strLenAttr.MaximumLength;
                        if (Model.AnotherProp != null && Model.AnotherProp.Length > length)
                        {
                            ValidationSummary += $"<br>The value of {prop.Name} exceeds the maximum length of {length}";
                        }
                    }
                }
            }
        }*/
    }
}
