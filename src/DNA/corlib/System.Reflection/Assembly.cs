using System.Runtime.CompilerServices;

namespace System.Reflection
{
    public class Assembly
    {

        public static Assembly Load(AssemblyName assemblyRef)
        {
            if (string.IsNullOrEmpty(assemblyRef.Name))
            {
                throw new ArgumentException("Assembly name cannot be null or empty");
            }

            // For now, this is just a way of ensuring the referenced assembly exists and is loaded.
            // Returning null because there's not currently any need to implement all the
            // reflection functionality that would be required to have useful behaviour
            // on Assembly instances.

            Type.EnsureAssemblyLoaded(assemblyRef.Name);
            return null;
        }
    }
}
