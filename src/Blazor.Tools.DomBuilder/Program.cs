using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AngleSharp.Attributes;

namespace Blazor.Tools.DomBuilder
{
    public class Program
    {
        private Dictionary<string, Type> _domTypeMap = new Dictionary<string, Type>();
        private Dictionary<Type, IdlTypeInfo> _typeIdlMap = new Dictionary<Type, IdlTypeInfo>()
        {
            [typeof(void)] = new IdlTypeInfo(typeof(void), "void"),
            
            [typeof(bool)] = new IdlTypeInfo(typeof(bool), "bool"),
            [typeof(int)] = new IdlTypeInfo(typeof(int), "int"),
            [typeof(DateTime)] = new IdlTypeInfo(typeof(DateTime), "DateTime"),

            [typeof(object)] = new IdlTypeInfo(typeof(object), "object") { IsNative = true },
            [typeof(string)] = new IdlTypeInfo(typeof(string), "string") { IsNative = true },

            [typeof(AngleSharp.Dom.DomEventHandler)] = new IdlTypeInfo(typeof(AngleSharp.Dom.DomEventHandler), "AngleSharp.Dom.DomEventHandler"),
            [typeof(AngleSharp.Dom.DocumentReadyState)] = new IdlTypeInfo(typeof(AngleSharp.Dom.DocumentReadyState), "AngleSharp.Dom.DocumentReadyState"),
            [typeof(AngleSharp.Dom.NodeFilter)] = new IdlTypeInfo(typeof(AngleSharp.Dom.NodeFilter), "AngleSharp.Dom.NodeFilter"),
            [typeof(AngleSharp.Dom.RangePosition)] = new IdlTypeInfo(typeof(AngleSharp.Dom.RangePosition), "AngleSharp.Dom.RangePosition") { IsNative = true },

            [typeof(Task<AngleSharp.Dom.IDocument>)] = new IdlTypeInfo(typeof(AngleSharp.Dom.IDocument), "Document"),
        };

        private Dictionary<Type, string> _typeClassMap;
        
        public Program()
        {
            _typeClassMap = _typeIdlMap.ToDictionary(
                x => x.Key, x => x.Value.DomName);
        }

        public IdlTypeInfo GetIdlTypeInfo(Type t)
        {
            if (!_typeIdlMap.ContainsKey(t))
            {
                var iti = new IdlTypeInfo
                {
                    IdlType = t,
                };

                var ti = t.GetTypeInfo();
                iti.ModelTypeBareName = ti.Name;

                var ta = ti.GetCustomAttributes<DomNameAttribute>()?.ToArray();
                if (ta?.Length > 0)
                {
                    iti.DomName = ta[0].OfficialName;
                    iti.ModelTypeBareName = iti.DomName;
                    // Do some basic cleaning up of the class name
                    if (char.IsLower(iti.ModelTypeBareName[0]))
                        iti.ModelTypeBareName = iti.ModelTypeBareName.Substring(0, 1).ToUpper()
                                + iti.ModelTypeBareName.Substring(1);
                }

                iti.ModelTypeName = iti.ModelTypeBareName;
                iti.ModelTypeClassName = iti.ModelTypeBareName;

                if (ti.IsGenericType)
                {
                    iti.GenericBaseType = ti.GetGenericTypeDefinition();

                    var genericTypeArgs = $@"<{string.Join(",",
                            ti.GenericTypeArguments.Select((_, num) => $"T{num}"))}>";
                    var genericTypeNames = $@"<{string.Join(",",
                            ti.GenericTypeArguments.Select(x => $"{GetIdlTypeInfo(x).ModelTypeName}"))}>";

                    iti.ModelTypeName = $"{iti.ModelTypeBareName}{genericTypeNames}";
                    iti.ModelTypeClassName = $"{iti.ModelTypeBareName}{genericTypeArgs}";

                    _typeIdlMap[iti.GenericBaseType] = new IdlTypeInfo
                    {
                        IdlType = iti.GenericBaseType,
                        DomName = iti.DomName,
                        ModelTypeBareName = iti.ModelTypeBareName,
                    };
                }

                _typeIdlMap[t] = iti;
            }
            return _typeIdlMap[t];
        }

        private StringWriter _emit = new StringWriter();
        public void Walk(Type domType, int maxDepth = int.MaxValue)
        {
            var iti = GetIdlTypeInfo(domType);
            if (iti.DomName == null)
            {
                Err($"WARN:  cannot process non-DOM type [{domType.FullName}]");
                return;
            }

            Out($"  Walking [{domType.Name}]:");

            if (_domTypeMap.ContainsKey(iti.DomName))
            {
                Err($"WARN:  duplicate DOM name {iti.DomName} with class {domType.FullName}");
                var oldBareName = iti.ModelTypeBareName;
                var newBareName = string.Empty;
                int i = 1;
                do {
                    newBareName = $"{oldBareName}_{++i}";
                } while (_domTypeMap.ContainsKey(newBareName));

                iti.ModelTypeName = iti.ModelTypeName.Replace(oldBareName, newBareName);
                iti.ModelTypeClassName = iti.ModelTypeClassName.Replace(oldBareName, newBareName);
                iti.ModelTypeBareName = newBareName;
                EmitLn("/** WARNING:  Duplicate DOM name -- class name incremented **/");
                _domTypeMap[newBareName] = domType;
            }
            else
            {
                _domTypeMap[iti.DomName] = domType;
            }

            _typeClassMap[domType] = iti.DomName;
            if (iti.GenericBaseType != null)
                _typeClassMap[iti.GenericBaseType] = iti.DomName;

            EmitLn($"public partial class {iti.ModelTypeClassName} : JSObject {{");
            Out($"    DOM Type Name:  [{iti.DomName}]");
            EmitLn($"  // AngSharp Type: {iti.IdlType.FullName}");
            EmitLn($"  // DOM IDL Type: {iti.DomName}");
            EmitLn();
            EmitLn($"  internal {iti.ModelTypeBareName}(JSObjectHandle handle) : base(handle) {{ }}");
            EmitLn();

            var isEnum = domType.GetTypeInfo().IsEnum;
            var unkType = new List<Type>();
            if (isEnum)
            {
                EmitLn("  /** TODO: Enum is not supported yet **/");
            }
            else
            {
                foreach (var m in domType.GetTypeInfo().GetMembers())
                {
                    var ma = m.GetCustomAttributes<DomNameAttribute>()?.ToArray();
                    if (ma?.Length == 0)
                        continue;

                    Type retType = null;
                    string memberAttributes = string.Empty;
                    switch (m.MemberType)
                    {
                        case MemberTypes.Property when m is PropertyInfo pi:
                            retType = pi.PropertyType;
                            memberAttributes = pi.Attributes.ToString();
                            break;
                        case MemberTypes.Method when m is MethodInfo mi:
                            retType = mi.ReturnType;
                            memberAttributes = mi.Attributes.ToString();
                            break;
                        case MemberTypes.Event when m is EventInfo ei:
                            retType = ei.EventHandlerType;
                            memberAttributes = ei.Attributes.ToString();
                            break;
                        default:
                            Err($"WARN: don't support member type of [{m.MemberType}]");
                            break;
                    }

                    var memDomName = ma[0].OfficialName;
                    var memModelName = memDomName;
                    // We do some very basic name cleansing
                    if (char.IsLower(memModelName[0]))
                        memModelName = memModelName.Substring(0, 1).ToUpper()
                                + memModelName.Substring(1);

                    Out($"    DOM Member {m.MemberType}:  {m.Name} : {memDomName} : {memModelName} : {retType?.Name} : {memberAttributes}");
                    foreach (var memDomAttr in ma)
                    {
                        Out($"      -> {memDomAttr.OfficialName}");
                    }
                    
                    if (retType != null && !_typeIdlMap.ContainsKey(retType))
                    {
                        unkType.Add(retType);
                    }
                    var retTypeInfo = retType.GetTypeInfo();
                    if (retTypeInfo.IsGenericType)
                    {
                        foreach (var retGenericArgType in retTypeInfo.GenericTypeArguments)
                            // ASSUME that param types are not generic themselves
                            if (!_typeIdlMap.ContainsKey(retGenericArgType))
                                unkType.Add(retGenericArgType);
                    }

                    switch (m.MemberType)
                    {
                        case MemberTypes.Property when m is PropertyInfo pi:
                            if (memModelName == iti.ModelTypeClassName)
                                // member names cannot be the same as their enclosing type
                                memModelName += "Property";

                            var propTypeName = GetIdlTypeInfo(retType).ModelTypeName;
                            EmitLn($"  public {propTypeName} {memModelName} => ({propTypeName})GetProperty(\"{memDomName}\");");
                            break;
                        case MemberTypes.Method when m is MethodInfo mi:
                            if (memModelName == iti.ModelTypeClassName)
                                // member names cannot be the same as their enclosing type
                                memModelName += "Method";

                            var methTypeInfo = GetIdlTypeInfo(retType);
                            var methTypeName = methTypeInfo.ModelTypeName;
                            var methParams = mi.GetParameters();
                            if (methParams.Any(x => !_typeIdlMap.ContainsKey(x.ParameterType)))
                            {
                                EmitLn($"  /** TODO: Method with non-DOM params is not yet supported **/");
                                EmitLn($"  // {m.Name}:");
                                foreach (var p in methParams)
                                    EmitLn($"  //    {p.Name} : {p.ParameterType.Name}");
                            }
                            else
                            {
                                var methSig = string.Join(", ", methParams.Select(x =>
                                        $"{GetIdlTypeInfo(x.ParameterType).ModelTypeName} {x.Name}"));
                                var callParams = string.Join(", ", methParams.Select(x =>
                                        $"{x.Name}").Prepend($"\"{memDomName}\""));

                                EmitLn($"  public {methTypeName} {memModelName}({methSig}) {{");
                                if (retType == typeof(void))
                                {
                                    EmitLn($"    Call({callParams});");
                                }
                                else
                                {
                                    if (methTypeInfo.IsNative
                                        || methTypeInfo.IdlType.GetTypeInfo().IsPrimitive)
                                    {
                                        EmitLn($"    var ret = ({methTypeName})Call({callParams});");
                                        EmitLn($"    return ret;");
                                    }
                                    else
                                    {
                                        EmitLn($"    var ret = (JSObjectHandle)Call({callParams});");
                                        EmitLn($"    return ret == null ? default({methTypeName}) : new {methTypeName}(ret);");
                                    }
                                }
                                EmitLn($"  }}");
                            }
                            break;
                        case MemberTypes.Event when m is EventInfo ei:
                            EmitLn($"  /** TODO: Event is not yet supported **/");
                            EmitLn($"  // {m.Name}");
                            break;
                    }
                }
            }
            EmitLn($"}} // {iti.ModelTypeClassName}");
            EmitLn();

            if (maxDepth > 0 && unkType.Count > 0)
            {
                foreach (var ut in unkType)
                    // We have to check a second time in case this
                    // was already handled earlier in this iterator
                    if (!_typeClassMap.ContainsKey(ut))
                    {
                        var uiti = GetIdlTypeInfo(ut);
                        if (!_typeClassMap.ContainsKey(uiti.GenericBaseType ?? uiti.IdlType))
                        {
                            Walk(ut, maxDepth - 1);
                        }
                    }
            }
        }

        public void Out(string fmt, params object[] args)
        {
            // Console.Out.WriteLine(string.Format(fmt, args));
        }

        public void Err(string fmt, params object[] args)
        {
            Console.Error.WriteLine(string.Format(fmt, args));
        }

        public void Emit(string fmt, params object[] args)
        {
            _emit.Write(string.Format(fmt, args));
        }

        public void EmitLn(string txt = null)
        {
            if (txt == null)
                _emit.WriteLine();
            else
                _emit.WriteLine(txt);
        }

        public void WriteEmitted(TextWriter writer)
        {
            writer.Write(_emit.ToString());
        }

        public static void Main(string[] args)
        {
            var prog = new Program();
            var domType = typeof(AngleSharp.Dom.IWindow);

            prog.EmitLn("using System;");
            prog.EmitLn("using Blazor.Runtime.Interop;");
            prog.EmitLn();

            prog.EmitLn("namespace Blazor.Dom {");
            prog.EmitLn();

            Console.WriteLine("/**");
            Console.WriteLine($"Walking the DOM model starting with [{domType.Name}]");
            prog.Walk(domType);
            Console.WriteLine($"Mapped [{prog._domTypeMap.Count}] types");
            Console.WriteLine("**/");
            Console.WriteLine();

            prog.EmitLn("}");
            
            prog.WriteEmitted(Console.Out);
        }

        public class IdlTypeInfo
        {
            public IdlTypeInfo()
            { }

            public IdlTypeInfo(Type t, string name)
            {
                IdlType = t;
                ModelTypeBareName = name;
                ModelTypeName = name;
                ModelTypeClassName = name;
            }

            public Type IdlType
            { get; set; }

            public Type GenericBaseType
            { get; set; }

            public string DomName
            { get; set; }

            public string ModelTypeBareName
            { get; set; }

            public string ModelTypeName
            { get; set; }

            public string ModelTypeClassName
            { get; set; }

            public bool IsNative
            { get; set; }
        }
    }
}
