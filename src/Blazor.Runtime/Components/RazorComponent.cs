using Blazor.VirtualDom;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Blazor.Routing;
using Blazor.Runtime.Components;
using System.Reflection;
using Blazor.Runtime.Interop;

namespace Blazor.Components
{
    public abstract class RazorComponent : Component
    {
        private static IDictionary<string, Type> cshtmlFilenameToTypeCache
            = new Dictionary<string, Type>();

        public static Component Instantiate(string cshtmlFileName, BlazorContext context)
        {
            var viewType = GetTypeForCompiledRazorFile(cshtmlFileName);
            var instance = (RazorComponent)Activator.CreateInstance(viewType);
            instance.Context = context;
            return instance;
        }

        public static string GetViewClassName(string rootDir, string cshtmlFilename)
        {
            rootDir = rootDir
                .Replace('\\', BlazorPath.DirectorySeparatorChar)
                .Replace('/', BlazorPath.DirectorySeparatorChar);
            cshtmlFilename = cshtmlFilename
                .Replace('\\', BlazorPath.DirectorySeparatorChar)
                .Replace('/', BlazorPath.DirectorySeparatorChar);

            if (!rootDir.EndsWith(BlazorPath.DirectorySeparatorChar.ToString()))
            {
                rootDir += BlazorPath.DirectorySeparatorChar;
            }

            if (!cshtmlFilename.StartsWith(rootDir))
            {
                throw new ArgumentException($"The requested file {cshtmlFilename} is not within the root dir {rootDir}.");
            }

            // TODO: More robustly ensure you end up with a non-clashing valid C# class name
            // Try to be more explicit about the fact that sometimes the inputs are based on filenames, and other
            // times they are based on type names. It's all very delicate right now.

            var relativePath = cshtmlFilename.Substring(rootDir.Length);
            return relativePath.Replace(BlazorPath.DirectorySeparatorChar, '_').Replace('.', '_').ToLowerInvariant();
        }

        protected override void RenderVirtualDom()
        {
            // Subclasses override this with logic that populates 'builder'.
            // Making this an empty override rather than leaving as abstract so that code-behind classes
            // don't have to be marked abstract.
        }

        private static Dictionary<Type, IEnumerable<MemberInfo>> ParameterMembersCache = new Dictionary<Type, IEnumerable<MemberInfo>>();
        private IEnumerable<MemberInfo> GetComponentParameterMembers()
        {
            if (ParameterMembersCache.ContainsKey(this.GetType()))
            {
                return ParameterMembersCache[this.GetType()];
            }

            var decoratedMembers = new List<MemberInfo>();

            //TODO: Add field support -> needs corlib FieldInfo implementation
            //     Also, the following Linq will not work for some reason (missing GetEnumerator)

            //decoratedMembers.AddRange(this.GetType().GetTypeInfo().DeclaredFields.Where(x => x.GetCustomAttribute(typeof(FromAttributeAttribute)) != null));
            //decoratedMembers.AddRange(this.GetType().GetTypeInfo().DeclaredProperties.Where(x => x.GetCustomAttributes(typeof(FromAttributeAttribute),false).Count() > 0));


            //foreach works normally
            foreach (var property in this.GetType().GetTypeInfo().DeclaredProperties)
            {
                if (property.GetCustomAttributes(typeof(FromAttributeAttribute), true).Count() > 0)
                {
                    decoratedMembers.Add(property);
                }
            }

            ParameterMembersCache.Add(this.GetType(), decoratedMembers);
            return decoratedMembers;
        }

        protected override void ReceiveParameters(IDictionary<string, object> parameters)
        {
            var decoratedMembers = GetComponentParameterMembers();

            foreach (var member in decoratedMembers)
            {

                var attribute = (FromAttributeAttribute)member.GetCustomAttributes().First(x => x.GetType() == typeof(FromAttributeAttribute));
                if (!parameters.ContainsKey(attribute.AttributeName) && !attribute.IsOptional)
                {
                    throw new Exception($"Parameter '{attribute.AttributeName}' is required");
                }

                var parameterValue = parameters[attribute.AttributeName];

                //TODO add field support -> needs corlib FieldInfo implementation

                //if(member is FieldInfo)
                //    ((FieldInfo)member).SetValue(this, parameterValue);
                //else
                ((PropertyInfo)member).SetValue(this, parameterValue);
            }
        }

        private static Type GetTypeForCompiledRazorFile(string cshtmlFilename)
        {
            lock (cshtmlFilenameToTypeCache)
            {
                if (!cshtmlFilenameToTypeCache.ContainsKey(cshtmlFilename))
                {
                    cshtmlFilenameToTypeCache[cshtmlFilename] = FindTypeForCompiledRazorFile(cshtmlFilename);
                }

                return cshtmlFilenameToTypeCache[cshtmlFilename];
            }
        }

        private static Type FindTypeForCompiledRazorFile(string cshtmlFileName)
        {
            if (Router.ViewAssemblies == null)
            {
                throw new InvalidOperationException($"Could not instantiate component {cshtmlFileName} because {nameof(Router)}.{nameof(Router.ViewAssemblies)} is not yet populated.");
            }

            var viewTypeName = $"Views.{GetViewClassName(".", cshtmlFileName)}";
            var viewType = Router.ViewAssemblies
                .Select(asm => Type.GetType(
                    System.Reflection.Assembly.CreateQualifiedName(asm.FullName, viewTypeName)))
                .FirstOrDefault(type => type != null);

            return viewType
                ?? throw new ArgumentException($"Could not locate type for component {cshtmlFileName} in any registered views assembly.");
        }

        #region "Callback and binding helpers"

        protected VDomAttribute onclick(Action callback)
        {
            return new VDomAttribute
            {
                Name = "onclick",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute onclick(Action<VirtualDom.EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "onclick",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onclickAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onclick",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute onclickAsync(Func<VirtualDom.EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onclick",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onchange(Action<VirtualDom.EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "onchange",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onchange(Action callback)
        {
            return new VDomAttribute
            {
                Name = "onchange",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute onsubmit(Action callback)
        {
            return new VDomAttribute
            {
                Name = "onsubmit",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomElementKey key(string keyValue)
        {
            return new VDomElementKey
            {
                Value = keyValue
            };
        }

        protected VDomElementKey key(int keyValue)
        {
            return key(keyValue.ToString());
        }

        protected VDomElementKey key(object keyValue)
        {
            return key(keyValue.GetHashCode());
        }

        protected string bind(string value)
        {
            // Not invoked at runtime - this method is just a signal to the RazorRenderer compiler
            throw new NotImplementedException();
        }

        protected string bind(bool value)
        {
            // Not invoked at runtime - this method is just a signal to the RazorRenderer compiler
            throw new NotImplementedException();
        }

        protected string TagName(string tagName)
        {
            // Not invoked at runtime - this method is just a signal to the RazorRenderer compiler
            throw new NotImplementedException();
        }

        protected string layout
        {
            get
            {
                // Not invoked at runtime - this method is just a signal to the RazorRenderer compiler
                throw new NotImplementedException();
            }
        }

        protected VDomComponent RenderComponent(Component childComponent)
        {
            return new VDomComponent
            {
                Component = childComponent
            };
        }

        protected VDomComponent RenderBody()
        {
            if (BodyComponent != null)
            {
                return RenderComponent(BodyComponent);
            }
            else
            {
                throw new InvalidOperationException("Cannot call RenderBody except on layouts");
            }
        }

        #endregion
    }

    public abstract class RazorComponent<TModel> : RazorComponent
    {
        // This is not really used, but simply has to exist so that the Razor tooling is willing to regard
        // Blazor.Components.RazorComponent as a valid base class. This would probably go away if updating
        // to work using newer Razor tooling.

        public virtual Task ExecuteAsync()
        {
            // This method exists only because Razor tooling shows a warning otherwise
            throw new NotImplementedException();
        }
    }
}
