using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Blazor.TypeScriptProxy.TypeScriptIR
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
                    members = members.Where(member => member != null);
                    var genericTypeParameters = obj["typeParameters"]?.ToObject<IEnumerable<ISyntaxToken>>();

                    return new InterfaceDeclaration()
                    {
                        Name = (string)obj["name"]["text"],
                        Members = members,
                        GenericTypeParameters = genericTypeParameters,
                    };
                case SyntaxKind.PropertySignature:
                    var type = GetTypeToken((JObject)obj["type"]);

                    return new PropertySignature()
                    {
                        Name = (string)obj["name"]["text"],
                        Optional = obj["questionToken"] != null,
                        TypeToken = type,
                    };
                case SyntaxKind.MethodSignature:
                    var returnType = GetTypeToken((JObject)obj["type"]);
                    var parameters = obj["parameters"].ToObject<IEnumerable<ISyntaxToken>>();
                    parameters = parameters.Where(parameter => parameter != null);
                    genericTypeParameters = obj["typeParameters"]?.ToObject<IEnumerable<ISyntaxToken>>();

                    return new MethodSignature()
                    {
                        Name = (string)obj["name"]["text"],
                        Optional = obj["questionToken"] != null,
                        ReturnTypeToken = returnType,
                        Parameters = parameters,
                        GenericTypeParameters = genericTypeParameters,
                    };
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.TypeReference:
                case SyntaxKind.TypeParameter:
                case SyntaxKind.ArrayType:
                case SyntaxKind.FunctionType:
                case SyntaxKind.VoidKeyword:
                    type = GetTypeToken(obj);

                    return type;
                case SyntaxKind.Parameter:
                    type = GetTypeToken((JObject)obj["type"]);

                    return new Parameter()
                    {
                        Name = (string)obj["name"]["text"],
                        TypeToken = type,
                    };
            }

            return existingValue;
        }

        private static TypeToken GetTypeToken(JObject type)
        {
            var typeKind = (int)type["kind"];
            switch ((SyntaxKind)typeKind)
            {
                case SyntaxKind.FunctionType:
                    var parameters = type["parameters"]?.ToObject<IEnumerable<ISyntaxToken>>().Where(parameter => parameter != null);
                    var returnType = GetTypeToken((JObject)type["type"]);

                    return new FunctionTypeToken()
                    {
                        Parameters = parameters,
                        ReturnTypeToken = returnType,
                    };
                case SyntaxKind.TypeReference:
                    var genericTypeParameters = type["typeArguments"]?.ToObject<IEnumerable<ISyntaxToken>>().Where(parameter => parameter != null);
                    return new ReferenceTypeToken()
                    {
                        TypeName = (string)type["typeName"]["text"],
                        GenericTypeParameters = genericTypeParameters,
                    };
                case SyntaxKind.ArrayType:
                    var elementTypeToken = GetTypeToken((JObject)type["elementType"]);
                    return new ArrayTypeToken()
                    {
                        ElementTypeToken = elementTypeToken
                    };
                case SyntaxKind.TypeParameter:
                    return new GenericTypeToken()
                    {
                        TypeName = (string)type["name"]["text"]
                    };
                default:
                    return new TypeToken((SyntaxKind)typeKind);
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
