using System.Threading.Tasks;

namespace Blazor.VirtualDom
{
    public delegate void VEventHandler(EventInfo evt);
    public delegate Task VEventAsyncHandler(EventInfo evt);

    public struct EventInfo
    {
        public string EventType { get; }
        public object TargetValue { get; }

        public EventInfo(string eventType, object targetValue)
        {
            EventType = eventType;
            TargetValue = targetValue;
        }
    }
}
