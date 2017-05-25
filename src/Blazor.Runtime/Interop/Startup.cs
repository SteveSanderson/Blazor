using System.Collections.Generic;
using System.Reflection;

namespace Blazor.Runtime.Interop
{
    public static class Startup
    {
        public static int EnsureAssembliesLoaded(string descriptor)
        {
            var parsed = MiniJSON.Json.Deserialize(descriptor) as IEnumerable<object>;

            foreach (var assemblyName in parsed)
            {
                var assemblyNameString = assemblyName as string;
                if (assemblyNameString != null)
                {
                    Assembly.Load(new AssemblyName(assemblyNameString));
                }
            }

            return 0;
        }
    }
}
