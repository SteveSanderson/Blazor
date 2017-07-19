using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AngleSharp.Attributes;

namespace Blazor.Tools.DomBuilder
{
    public class Program
    {
        private Dictionary<string, Type> _domTypeMap = new Dictionary<string, Type>();
        private Dictionary<Type, string> _typeDomMap = new Dictionary<Type, string>
        {
            [typeof(void)] = "void",
            [typeof(object)] = "object",
            [typeof(bool)] = "boolean",
            [typeof(int)] = "int",
            [typeof(string)] = "string",
            [typeof(DateTime)] = "datetime",

            [typeof(AngleSharp.Dom.DomEventHandler)] = "DomEventHandler",
            [typeof(AngleSharp.Dom.DocumentReadyState)] = "DocumentReadyState",
            [typeof(AngleSharp.Dom.NodeFilter)] = "NodeFilter",
            [typeof(AngleSharp.Dom.RangePosition)] = "RangePosition",

            [typeof(Task<AngleSharp.Dom.IDocument>)] = "Task<IDocument>",
        };

        public void Walk(Type domType, int maxDepth = int.MaxValue)
        {
            var ta = domType.GetTypeInfo().GetCustomAttributes<DomNameAttribute>()?.ToArray();
            if (ta?.Length == 0)
            {
                Err($"WARN:  cannot process non-DOM type [{domType.FullName}]");
                return;
            }

            Out($"  Walking [{domType.Name}]:");
            _typeDomMap[domType] = ta.First().OfficialName;
            foreach (var domAttr in ta)
            {
                _domTypeMap[domAttr.OfficialName] = domType;
                Out($"    DOM Type Name:  [{domAttr.OfficialName}]");
            }

            if (domType.GetTypeInfo().IsEnum)
            {
                return;
            }

            var unkType = new List<Type>();
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

                Out($"    DOM Member {m.MemberType}:  {m.Name} : {retType?.Name} : {memberAttributes}");
                foreach (var memDomAttr in ma)
                    Out($"      -> {memDomAttr.OfficialName}");
                
                if (retType != null && !_typeDomMap.ContainsKey(retType))
                    unkType.Add(retType);
            }

            if (maxDepth > 0)
            {
                foreach (var ut in unkType)
                    // We have to check a second time in case this
                    // was already handled earlier in this iterator
                    if (!_typeDomMap.ContainsKey(ut))
                        Walk(ut, maxDepth - 1);
            }
        }

        public static void Out(string fmt, params object[] args)
        {
            Console.Out.WriteLine(string.Format(fmt, args));
        }

        public static void Err(string fmt, params object[] args)
        {
            Console.Error.WriteLine(string.Format(fmt, args));
        }

        public static void Main(string[] args)
        {
            var prog = new Program();
            var domType = typeof(AngleSharp.Dom.IWindow);
            
            Console.WriteLine($"Walking the DOM model starting with [{domType.Name}]");
            prog.Walk(domType);
            Console.WriteLine($"Mapped [{prog._domTypeMap.Count}] types");
        }
    }
}
