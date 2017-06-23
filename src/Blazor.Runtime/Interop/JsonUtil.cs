using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Blazor.Util
{
    public static class JsonUtil
    {
        public static string Serialize(object value)
        {
            return MiniJSON.Json.Serialize(value);
        }

        public static T Deserialize<T>(string json)
        {
            var deserialized = MiniJSON.Json.Deserialize(json);
            return (T)CoerceShallow(deserialized, typeof(T));
        }

        private static object CoerceShallow(object deserializedValue, Type typeOfT)
        {
            if (deserializedValue == null)
            {
                // Return default value for type
                if (typeOfT.GetTypeInfo().IsValueType)
                {
                    return Activator.CreateInstance(typeOfT);
                }
                else
                {
                    return null;
                }
            }
            else if (deserializedValue is int)
            {
                var deserializedValueInt = (int)deserializedValue;
                if (typeOfT == typeof(int)) { return deserializedValueInt; }
                if (typeOfT == typeof(uint)) { return (uint)deserializedValueInt; }
                if (typeOfT == typeof(long)) { return (long)deserializedValueInt; }
                if (typeOfT == typeof(ulong)) { return (ulong)deserializedValueInt; }
                if (typeOfT == typeof(short)) { return (short)deserializedValueInt; }
                if (typeOfT == typeof(ushort)) { return (ushort)deserializedValueInt; }
                if (typeOfT == typeof(float)) { return (float)deserializedValueInt; }
                if (typeOfT == typeof(double)) { return (double)deserializedValueInt; }

                throw new ArgumentException($"Can't convert JSON value parsed as type {deserializedValue.GetType().FullName} to a value of type {typeOfT.FullName}");
            }
            else if (deserializedValue is string)
            {
                if (typeOfT == typeof(string))
                {
                    return deserializedValue;
                }

                throw new ArgumentException($"Can't convert JSON value parsed as type {deserializedValue.GetType().FullName} to a value of type {typeOfT.FullName}");
            }
            else if (deserializedValue is bool)
            {
                if (typeOfT == typeof(bool))
                {
                    return deserializedValue;
                }

                throw new ArgumentException($"Can't convert JSON value parsed as type {deserializedValue.GetType().FullName} to a value of type {typeOfT.FullName}");
            }
            else if (deserializedValue is double)
            {
                var deserializedValueDouble = (double)deserializedValue;
                if (typeOfT == typeof(float)) { return (float)deserializedValueDouble; }
                if (typeOfT == typeof(double)) { return deserializedValueDouble; }

                throw new ArgumentException($"Can't convert JSON value parsed as type {deserializedValue.GetType().FullName} to a value of type {typeOfT.FullName}");
            }
            else if (deserializedValue is List<object>)
            {
                if (!typeOfT.IsArray)
                {
                    throw new ArgumentException($"Can't convert JSON array to type {typeOfT.FullName}, because that's not an array type.");
                }

                var deserializedValueList = (List<object>)deserializedValue;
                var count = deserializedValueList.Count;
                var elementType = typeOfT.GetElementType();
                var result = Array.CreateInstance(elementType, count);
                for (var index = 0; index < count; index++)
                {
                    var deserializedPropertyValue = deserializedValueList[index];
                    var mappedPropertyValue = CoerceShallow(deserializedPropertyValue, elementType);
                    result.SetValue(mappedPropertyValue, index);
                }
                return result;
            }
            else if (deserializedValue is Dictionary<string, object>)
            {
                var result = Activator.CreateInstance(typeOfT);
                var deserializedPropertyDict = (Dictionary<string, object>)deserializedValue;
                foreach (var propInfo in typeOfT.GetRuntimeProperties())
                {
                    if (deserializedPropertyDict.TryGetValue(propInfo.Name, out var deserializedPropertyValue))
                    {
                        var setMethod = propInfo.SetMethod;
                        if (setMethod != null)
                        {
                            var mappedPropertyValue = CoerceShallow(deserializedPropertyValue, propInfo.PropertyType);
                            setMethod.Invoke(result, new[] { mappedPropertyValue });
                        }
                    }
                }

                return result;
            }
            else
            {
                throw new ArgumentException($"Unexpected type received by CoerceShallow. Type was: { deserializedValue.GetType().FullName }");
            }
        }
    }
}
