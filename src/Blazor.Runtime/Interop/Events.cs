using Blazor.Components;
using Blazor.VirtualDom;
using System;
using System.Collections.Generic;

namespace Blazor.Interop
{
    public static class Events
    {
        private static int DispatchIncoming(string descriptor)
        {
            var parsed = MiniJSON.Json.Deserialize(descriptor) as Dictionary<string, object>;
            var componentRef = (int)parsed["componentRef"];
            var vdomItemIndex = (int)parsed["vdomItemIndex"];
            var eventInfoDict = parsed["eventInfo"] as IDictionary<string, object>;
            var type = (string)eventInfoDict["type"];
            var eventInfo = new EventInfo(type,
                eventInfoDict.ContainsKey("targetValue") ? eventInfoDict["targetValue"] : null);

            var component = Component.FindById(componentRef);
            if (component == null)
            {
                Console.WriteLine($"Error dispatching event to component ref {componentRef} - no such component exists.");
            }
            else
            {
                component.DispatchEvent(vdomItemIndex, eventInfo);
            }
            
            return 0;
        }
    }
}