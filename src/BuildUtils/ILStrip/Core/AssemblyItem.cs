using System;
using Mono.Cecil;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Mono.Cecil.Cil;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Core
{
    public class AssemblyItem
    {
        public static IEnumerable<AssemblyItem> ListContents(string assemblyPath)
        {
            var moduleDefinition = ModuleDefinition.ReadModule(assemblyPath);
            return ListContents(moduleDefinition);
        }

        public static IEnumerable<AssemblyItem> ListContents(ModuleDefinition moduleDefinition)
        {
            return moduleDefinition.Types
                .SelectMany(type => type.Methods)
                .Select(method => new AssemblyItem(method))
                .OrderBy(item => item.ToString(), StringComparer.Ordinal);
        }

        public MethodDefinition Method { get; }

        public AssemblyItem(MethodDefinition method)
        {
            Method = method ?? throw new ArgumentNullException(nameof(method));
        }

        internal void StripFromAssembly(MethodDefinition createMethodStrippedException)
        {
            if (!Method.HasBody)
            {
                return; // Nothing to do
            }

            // We don't want to actually remove the method definition from the assembly, because
            // then you'd have an assembly that was invalid (it could contain calls to the method
            // that no longer exists). Instead, remove all the instructions from its body, and
            // replace it with "throw CreateMethodStrippedException()". Then:
            // [1] The method body is very short, while still definitely being valid (still OK for
            //     it to have any return type)
            // [2] We've removed its references to other methods/types, so they are more likely
            //     to be actually stripped out fully by a subsequent IL linker pass
            // [3] If the method is actually invoked at runtime, the stack trace will make clear
            //     which method is being excessively stripped
            var il = Method.Body.GetILProcessor();
            il.Body.Instructions.Clear();
            il.Body.Variables.Clear();
            il.Body.ExceptionHandlers.Clear();
            il.Append(il.Create(OpCodes.Call, createMethodStrippedException));
            il.Append(il.Create(OpCodes.Throw));
        }

        public override string ToString()
        {
            var result = Method.ToString();
            return result.Substring(result.IndexOf(' ') + 1);
        }

        public int CodeSize
            => Method.Body.CodeSize;
    }
}
