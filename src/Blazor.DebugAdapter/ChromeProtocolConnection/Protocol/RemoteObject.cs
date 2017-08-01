namespace Blazor.DebugAdapter.ChromeProtocolConnection.Protocol
{
    class RemoteObject
    {
        public string Type { get; set; }
        public string Subtype { get; set; }
        public string ClassName { get; set; }
        public object Value { get; set; }
        public string Description { get; set; }
        public object ObjectId { get; set; }
        public string Preview { get; set; }
    }
}
