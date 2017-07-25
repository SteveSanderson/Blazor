using Blazor.VirtualDom;
using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Blazor.Routing;
using Blazor.Runtime.Components;
using Blazor.Interop;
using Blazor.Runtime.Interop;

namespace Blazor.Components
{
    public abstract class RazorComponent : Component
    {
        public IDictionary<string, object> ViewData { get; } = new Dictionary<string, object>();

        public void NavigationHelper(string url)
        {
            JavaScript.Window["location"]["assign"].Invoke<object>(url);
        }

        public void DefineSection(string name, Action<VDomBuilder> section)
        {
            SectionWriters[name] = section;
        }

        public override void DefineSections()
        {
        }

        public void RenderSection(string name)
        {
            if (!SectionWriters.ContainsKey(name))
            {
                return;
            }

            var section = SectionWriters[name];
            section(builder);
        }

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


        protected VDomAttribute onmouseover(Action callback)
        {
            return new VDomAttribute
            {
                Name = "onmouseover",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute onmouseover(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "onmouseover",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onmouseoverAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onmouseover",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute onmouseoverAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onmouseover",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onabort(Action callback)
        {
            return new VDomAttribute
            {
                Name = "onabort",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute onabort(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "onabort",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onabortAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onabort",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute onabortAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onabort",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }


        protected VDomAttribute oncancel(Action callback)
        {
            return new VDomAttribute
            {
                Name = "oncancel",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute oncancel(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "oncancel",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute oncancelAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "oncancel",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute oncancelAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "oncancel",
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

        protected VDomAttribute ondblclick(Action callback)
        {
            return new VDomAttribute
            {
                Name = "ondblclick",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute ondblclick(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "ondblclick",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute ondblclickAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "ondblclick",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute ondblclickAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "ondblclick",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute ondrag(Action callback)
        {
            return new VDomAttribute
            {
                Name = "ondrag",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute ondrag(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "ondrag",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute ondragAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "ondrag",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute ondragAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "ondrag",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute ondragend(Action callback)
        {
            return new VDomAttribute
            {
                Name = "ondragend",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute ondragend(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "ondragend",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute ondragendAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "ondragend",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute ondragendAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "ondragend",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onerror(Action callback)
        {
            return new VDomAttribute
            {
                Name = "onerror",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute onerror(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "onerror",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onerrorAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onerror",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute onerrorAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onerror",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute oninput(Action callback)
        {
            return new VDomAttribute
            {
                Name = "oninput",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute oninput(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "oninput",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute oninputAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "oninput",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute oninputAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "oninput",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }


        protected VDomAttribute onkeydown(Action callback)
        {
            return new VDomAttribute
            {
                Name = "onkeydown",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute onkeydown(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "onkeydown",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onkeydownAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onkeydown",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute onkeydownAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onkeydown",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
            };
        }


        protected VDomAttribute onload(Action callback)
        {
            return new VDomAttribute
            {
                Name = "onload",
                Value = new VEventHandler(_ => { callback(); })
            };
        }

        protected VDomAttribute onload(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "onload",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onloadAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onload",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute onloadAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onload",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
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

        protected VDomAttribute onsubmit(Action<EventInfo> callback)
        {
            return new VDomAttribute
            {
                Name = "onsubmit",
                Value = new VEventHandler(evtInfo => callback(evtInfo))
            };
        }

        protected VDomAttribute onsubmitAsync(Func<Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onsubmit",
                Value = new VEventAsyncHandler(_ => callback())
            };
        }

        protected VDomAttribute onsubmitAsync(Func<EventInfo, Task> callback)
        {
            return new VDomAttribute
            {
                Name = "onsubmit",
                Value = new VEventAsyncHandler(evtInfo => callback(evtInfo))
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

        protected virtual VDomComponent RenderBody()
        {
            if (BodyComponent != null)
            {
                BodyComponent.DefineSections();
                BodyComponent.InitAsync();
                Console.WriteLine("Hello!");
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

        public static TModel Model { get;  set; } // TODO this really should be a private set.

        public bool IsPage { get; set; }

        public override Task InitAsync()
        {
            Console.WriteLine("Trying to call init async");
            if (IsPage)
            {
                Console.WriteLine("IsPage is true");
                return (Model as IModel).InitAsync();
            }
            else
            {
                Console.WriteLine("Failed to call init async");
                return null;
            }
        }


        protected override VDomComponent RenderBody()
        {
            if (BodyComponent != null)
            {
                BodyComponent.DefineSections();
                InitAsync();
                Console.WriteLine("Hello!");
                return RenderComponent(BodyComponent);
            }
            else
            {
                throw new InvalidOperationException("Cannot call RenderBody except on layouts");
            }
        }
    }
}
