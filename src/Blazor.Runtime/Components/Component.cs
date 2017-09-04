using Blazor.Interop;
using System.Threading;
using System;
using Blazor.VirtualDom;
using System.Collections.Generic;
using System.Threading.Tasks;
using Blazor.Runtime;
using Blazor.Runtime.Components;

namespace Blazor.Components
{
    public abstract class Component : IDisposable
    {
        private static int NextId = 0; // Ideally, switch to long
        private static WeakIdentityMap<int, Component> LookupById = new WeakIdentityMap<int, Component>(c => c._id);

        internal int Id => _id;

        protected virtual string Layout => null;
        internal Component BodyComponent { get; set; }

        private Task _firstRenderCompletedTask;
        internal Task FirstRenderCompletedTask => _firstRenderCompletedTask;

        // Try to find ways of encapsulating this better. Currently, derived components can interfere with this directly.
        protected readonly VDomBuilder builder = new VDomBuilder();

        private DOMElement Element { get; set; }
        private bool _replaceElement;

        private readonly int _id;
        private int _parentId;
        private Dictionary<int, Component> _children = new Dictionary<int, Component>();
        private bool _isDisposed;

        public BlazorContext Context { get; internal set; }

        internal static Component FindById(int id)
        {
            // Returns null if not known or already garbage collected
            return LookupById.Get(id);
        }

        public Component()
        {
            _id = Interlocked.Increment(ref NextId);
            LookupById.Get(_id, () => this);
        }

        public Component MountAsPage(string populateElementRef)
        {
            return Mount(populateElementRef, replace: false, enableLayouts: true);
        }

        public Component MountAsComponent(string replaceElementRef)
        {
            return Mount(replaceElementRef, replace: true, enableLayouts: false);
        }

        private Component Mount(string elementRef, bool replace, bool enableLayouts)
        {
            if (Element != null)
            {
                throw new InvalidOperationException("Component is already mounted.");
            }

            _replaceElement = replace;

            if (enableLayouts && !string.IsNullOrEmpty(Layout))
            {
                var layoutComponent = RazorComponent.Instantiate(Layout, Context);
                layoutComponent.BodyComponent = this;
                layoutComponent.MountAsPage(elementRef);
                return layoutComponent;
            }
            else
            {
                Element = new DOMElement(elementRef);
                
                // Render after Init/InitAsync have run synchronously, plus again after
                // InitAsync's task completes (where applicable)
                Init();
                var initAsyncTask = InitAsync();
                Render();
                _firstRenderCompletedTask = initAsyncTask?.ContinueWith(_ => {
                    Render();
                });
                return this;
            }
        }

        public void Render()
        {
            builder.Clear();
            RenderVirtualDom();

            if (Env.IsClient)
            {
                Element.UpdateContents(_id, builder.PrevItems, builder.Items, _replaceElement);
                builder.SwapBuffers();
            }
        }

        public virtual void Dispose()
        {
            if (_isDisposed)
            {
                throw new InvalidOperationException("The component " + _id + " is already disposed.");
            }

            var parent = Component.FindById(_parentId);
            parent.UnregisterChild(this);
            _isDisposed = true;
        }

        protected abstract void RenderVirtualDom();
        protected abstract void ReceiveParameters(IDictionary<string, object> parameters);

        protected virtual void Init() { }
        protected virtual Task InitAsync() { return null; }

        internal Component InstantiateAndRegisterChildComponent(int vdomItemIndex)
        {
            var vdomItem = builder.Items[vdomItemIndex];
            if (vdomItem.ItemType != VDomItemType.Component)
            {
                throw new ArgumentException($"vdom item at index {vdomItemIndex} does not represent a child component.");
            }

            Component childComponent;
            if (vdomItem.ComponentInstance != null)
            {
                childComponent = vdomItem.ComponentInstance;
            }
            else
            {
                childComponent = RazorComponent.Instantiate(vdomItem.ComponentName, Context);
                childComponent.ReceiveParameters(builder.ReadAttributes(vdomItemIndex));
            }

            RegisterChild(childComponent);
            return childComponent;
        }

        internal void UpdateChildComponentParams(Component component, int vdomItemIndex)
        {
            var updatedParams = builder.ReadAttributes(vdomItemIndex);
            component.ReceiveParameters(updatedParams);
            component.Render();
        }

        internal void RegisterChild(Component childComponent)
        {
            // We only track them just so they are rooted in memory and don't get GCed.
            // Otherwise the .NET side would have no references to the child components, but the JS
            // side would do because it would appear in the DOM.
            // This awkwardness would not be necessary if the vdom-diffing happened on the .NET side,
            // because the child component instances could be referenced from the vdom itself and hence
            // would naturally have a lifetime exactly matching usage in the document.
            _children.Add(childComponent._id, childComponent);
            childComponent._parentId = _id;
        }

        internal void UnregisterChild(Component childComponent)
        {
            _children.Remove(childComponent._id);
            childComponent._parentId = default(int);
        }

        internal void DispatchEvent(int eventRef, EventInfo eventInfo)
        {
            var vdomItem = builder.PrevItems[eventRef];
            var handler = vdomItem.AttributeEventHandlerValue;
            if (handler == null)
            {
                Console.WriteLine($"Error dispatching event - item ${eventRef} does not have any event handler.");
            }

            if (handler is VEventHandler)
            {
                ((VEventHandler)handler)(eventInfo);
            }
            else if (handler is VEventAsyncHandler)
            {
                // For async event handlers, we also re-render after the returned task completes
                var task = ((VEventAsyncHandler)handler)(eventInfo);
                if (task != null)
                {
                    task.ContinueWith(_ =>
                    {
                        if (task.IsFaulted)
                        {
                            throw task.Exception;
                        }
                        else
                        {
                            Render();
                        }
                    });
                }
            }
            else
            {
                throw new InvalidOperationException("Event handler is of unexpected type " + handler.GetType().FullName);
            }

            // Always re-render after an event handler completes synchronously. Could make this controlled by
            // a flag on the EventInfo so you could do @onclick(..., AutoRender: false).
            Render();
        }

        public string AbsoluteUrl(string relativeUrl)
        {
            if (Env.IsServer)
            {
                return ServerAbsoluteUrl(relativeUrl);
            }
            else
            {
                return Browser.ResolveRelativeUrl(relativeUrl);
            }
        }

        private string ServerAbsoluteUrl(string relativeUrl)
        {
            return new Uri(new Uri(Context.AbsoluteUrl), relativeUrl).ToString();
        }
    }
}