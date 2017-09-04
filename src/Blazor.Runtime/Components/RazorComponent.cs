using Blazor.VirtualDom;
using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Blazor.Routing;
using Blazor.Runtime.Components;

namespace Blazor.Components
{
    public abstract class RazorComponent : Component
    {
        public static Component Instantiate(string cshtmlFileName, BlazorContext context)
        {
            var razorViewClassName = GetViewClassName(".", cshtmlFileName);
            var viewTypeName = $"Views.{razorViewClassName}";
            Type viewType;

            if (Router.ViewAssemblies == null)
            {
                // In DNA, we can search across all loaded assemblies
                viewType = Type.GetType(viewTypeName);
            }
            else
            {
                // On the server, need to explicitly walk through the supplied list of assemblies
                viewType = Router.ViewAssemblies.Select(a => a.GetType(viewTypeName)).Where(t => t != null).FirstOrDefault();
            }

            // To ensure that the constructor actually runs, use Instantiate from the IComponentRazorViewFactory interface.
            // For more info on why this is needed, see the comments about it in AddIComponentRazorViewFactoryImplementation
            // in the RazorRenderer project.
            var instance = ((IRazorComponentFactory)Activator.CreateInstance(viewType)).Instantiate();
            instance.Context = context;
            return instance;
        }

        public static string GetViewClassName(string rootDir, string cshtmlFilename)
        {
            cshtmlFilename = cshtmlFilename.Replace('/', Path.DirectorySeparatorChar);

            if (!rootDir.EndsWith(Path.DirectorySeparatorChar.ToString()))
            {
                rootDir += Path.DirectorySeparatorChar;
            }

            if (!cshtmlFilename.StartsWith(rootDir))
            {
                throw new ArgumentException($"The requested file {cshtmlFilename} is not within the root dir {rootDir}.");
            }

            // TODO: More robustly ensure you end up with a non-clashing valid C# class name
            // Try to be more explicit about the fact that sometimes the inputs are based on filenames, and other
            // times they are based on type names. It's all very delicate right now.

            var relativePath = cshtmlFilename.Substring(rootDir.Length);
            return relativePath.Replace(Path.DirectorySeparatorChar, '_').Replace('.', '_').ToLowerInvariant();
        }

        protected override void RenderVirtualDom()
        {
            // Subclasses override this with logic that populates 'builder'.
            // Making this an empty override rather than leaving as abstract so that code-behind classes
            // don't have to be marked abstract.
        }

        protected override void ReceiveParameters(IDictionary<string, object> parameters)
        {
            // Subclasses may optionally override this
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

        protected VDomAttribute onclick(Action<EventInfo> callback)
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

        protected VDomAttribute onclickAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onclick",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onchange(Action<EventInfo> callback)
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
    }
}
