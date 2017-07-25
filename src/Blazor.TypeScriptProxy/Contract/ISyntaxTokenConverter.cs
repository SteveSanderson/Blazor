using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Blazor.TypeScriptProxy.Contract
{
    public class ISyntaxTokenConverter : JsonConverter
    {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var obj = JObject.Load(reader);
            var kind = (int)obj["kind"];
            var syntaxKind = kind;
            
            switch ((SyntaxKind)kind)
            {
                case SyntaxKind.InterfaceDeclaration:
                    var members = obj["members"].ToObject<IEnumerable<ISyntaxToken>>();
                    return new InterfaceDeclaration()
                    {
                        Name = (string)obj["name"]["text"],
                        Members = members,
                    };
                case SyntaxKind.PropertySignature:
                    var typeName = GetTypeName((JObject)obj["type"]);

                    return new PropertySignature()
                    {
                        Name = (string)obj["name"]["text"],
                        Optional = obj["questionToken"] != null,
                        TypeName = typeName,
                    };
                case SyntaxKind.MethodSignature:
                    var returnTypeName = GetTypeName((JObject)obj["type"]);
                    var parameters = obj["parameters"].ToObject<IEnumerable<ISyntaxToken>>();

                    return new MethodSignature()
                    {
                        Name = (string)obj["name"]["text"],
                        Optional = obj["questionToken"] != null,
                        ReturnTypeName = returnTypeName,
                        Parameters = parameters,
                    };
                case SyntaxKind.Parameter:
                    typeName = GetTypeName((JObject)obj["type"]);

                    return new Parameter()
                    {
                        Name = (string)obj["name"]["text"],
                        TypeName = typeName,
                    };
            }

            return existingValue;
        }

        private static string GetTypeName(JObject type)
        {
            var typeKind = (int)type["kind"];
            switch ((SyntaxKind)typeKind)
            {
                case SyntaxKind.AnyKeyword:
                    return "any";
                case SyntaxKind.BooleanKeyword:
                    return "boolean";
                case SyntaxKind.TypeReference:
                    return (string)type["typeName"]["text"];
                default:
                    return null;
            }
        }

        public override bool CanConvert(Type objectType)
        {
            return true;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var property = value.GetType().GetProperties().FirstOrDefault(p => p.Name == "Kind");
            if (property == null)
            {
                return;
            }

            // Light weight rendering
            writer.WriteStartObject();
            writer.WritePropertyName("Kind");
            serializer.Serialize(writer, property.GetValue(value, null));
            writer.WriteEndObject();
        }
    }
}
