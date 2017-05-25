namespace System.Reflection
{
    public sealed class AssemblyName
    {
        public AssemblyName() {}

        public AssemblyName(string assemblyName) : this()
        {
            Name = assemblyName;
        }
        
        public string Name { get; set; }
    }
}
