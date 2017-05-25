using Blazor.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.Interop
{
    public static class Components
    {
        public static int InstantiateComponent(string descriptor)
        {
            var parsed = MiniJSON.Json.Deserialize(descriptor) as Dictionary<string, object>;
            var parentComponentRef = (int)parsed["parentComponentRef"];
            var vdomItemIndex = (int)parsed["vdomItemIndex"];
            var elementRef = (string)parsed["elementRef"];
            var parentComponent = Component.FindById(parentComponentRef);
            var newComponent = parentComponent
                .InstantiateAndRegisterChildComponent(vdomItemIndex)
                .MountAsComponent(elementRef);

            return newComponent.Id;
        }

        public static int UpdateComponentParameters(string descriptor)
        {
            var parsed = MiniJSON.Json.Deserialize(descriptor) as Dictionary<string, object>;
            var componentRef = (int)parsed["componentRef"];
            var parentComponentRef = (int)parsed["parentComponentRef"];
            var vdomItemIndex = (int)parsed["vdomItemIndex"];
            var component = Component.FindById(componentRef);
            var parentComponent = Component.FindById(parentComponentRef);
            parentComponent.UpdateChildComponentParams(component, vdomItemIndex);
            return 0;
        }

        public static int DisposeComponents(string descriptor)
        {
            var parsed = MiniJSON.Json.Deserialize(descriptor) as Dictionary<string, object>;
            var componentRefs = parsed["componentRefs"] as List<object>;
            foreach (int componentRef in componentRefs)
            {
                var componentInstance = Component.FindById(componentRef);
                componentInstance.Dispose();
            }
            return 0;
        }
    }
}
