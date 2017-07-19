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
            [typeof(object)] = new IdlTypeInfo(typeof(object), "object"),
            [typeof(bool)] = new IdlTypeInfo(typeof(bool), "boolean"),
            [typeof(int)] = new IdlTypeInfo(typeof(int), "int"),
            [typeof(string)] = new IdlTypeInfo(typeof(string), "string"),
            [typeof(DateTime)] = new IdlTypeInfo(typeof(DateTime), "datetime"),

            [typeof(AngleSharp.Dom.DomEventHandler)] = new IdlTypeInfo(typeof(AngleSharp.Dom.DomEventHandler), "DomEventHandler"),
            [typeof(AngleSharp.Dom.DocumentReadyState)] = new IdlTypeInfo(typeof(AngleSharp.Dom.DocumentReadyState), "DocumentReadyState"),
            [typeof(AngleSharp.Dom.NodeFilter)] = new IdlTypeInfo(typeof(AngleSharp.Dom.NodeFilter), "NodeFilter"),
            [typeof(AngleSharp.Dom.RangePosition)] = new IdlTypeInfo(typeof(AngleSharp.Dom.RangePosition), "RangePosition"),

            [typeof(Task<AngleSharp.Dom.IDocument>)] = new IdlTypeInfo(typeof(AngleSharp.Dom.IDocument), "Task<IDocument>"),
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
                    var gtd = ti.GetGenericTypeDefinition();
                    iti.ModelTypeBareName = gtd.Name;

                    var genericTypeArgs = $@"<{string.Join(",",
                            ti.GenericTypeArguments.Select((_, num) => $"T{num}"))}>";
                    var genericTypeNames = $@"<{string.Join(",",
                            ti.GenericTypeArguments.Select(x => $"T{GetIdlTypeInfo(x).ModelTypeName}"))}>";

                    iti.ModelTypeName = $"{iti.ModelTypeBareName}{genericTypeNames}";
                    iti.ModelTypeClassName = $"{iti.ModelTypeBareName}{genericTypeArgs}";

                    _typeIdlMap[gtd] = new IdlTypeInfo
                    {
                        IdlType = gtd,
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
            EmitLn($"public partial class {iti.ModelTypeClassName} : JSObject {{");
            _domTypeMap[iti.DomName] = domType;
            _typeClassMap[domType] = iti.DomName;
            Out($"    DOM Type Name:  [{iti.DomName}]");
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
                    Out($"    DOM Member {m.MemberType}:  {m.Name} : {memDomName} : {retType?.Name} : {memberAttributes}");
                    foreach (var memDomAttr in ma)
                    {
                        Out($"      -> {memDomAttr.OfficialName}");
                    }
                    
                    if (retType != null && !_typeIdlMap.ContainsKey(retType))
                        unkType.Add(retType);

                    switch (m.MemberType)
                    {
                        case MemberTypes.Property when m is PropertyInfo pi:
                            var propTypeName = GetIdlTypeInfo(retType).ModelTypeName;
                            EmitLn($"  public {propTypeName} {m.Name} => ({propTypeName})GetProperty(\"{memDomName}\");");
                            break;
                        case MemberTypes.Method when m is MethodInfo mi:
                            var methTypeName = GetIdlTypeInfo(retType).ModelTypeName;
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

                                EmitLn($"  public {methTypeName} {m.Name}({methSig}) {{");
                                if (retType == typeof(void))
                                {
                                    EmitLn($"    Call({callParams});");
                                }
                                else
                                {
                                    EmitLn($"    var ret = (JSObjectHandle)Call({callParams});");
                                    EmitLn($"    return ret == null ? null : new {methTypeName}(ret);");
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
                        Walk(ut, maxDepth - 1);
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

            public string DomName
            { get; set; }

            public string ModelTypeBareName
            { get; set; }

            public string ModelTypeName
            { get; set; }

            public string ModelTypeClassName
            { get; set; }
        }

    }
}
