using Mono.Cecil;
using Mono.Cecil.Cil;
using System;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Core
{
    internal static class MethodStrippedExceptionMethod
    {
        public static MethodDefinition AddToAssembly(ModuleDefinition moduleDefinition)
        {
            // Adds the following method to the assembly:
            // namespace ILStrip
            // {
            //     internal static class ILStripHelpers
            //     {
            //         public static Exception CreateMethodStrippedException()
            //         {
            //             return new NotImplementedException("Cannot call method because it was stripped. See stack trace for details.");
            //         }
            //     }
            // }
            var ilStripHelpersType = new TypeDefinition("ILStrip", "ILStripHelpers",
                TypeAttributes.NotPublic | TypeAttributes.Abstract | TypeAttributes.Sealed | TypeAttributes.BeforeFieldInit);
            moduleDefinition.Types.Add(ilStripHelpersType);

            var methodAttributes =
                MethodAttributes.Public |
                MethodAttributes.HideBySig |
                MethodAttributes.Static;
            var createMethodStrippedExceptionMethod = new MethodDefinition(
                "CreateMethodStrippedException",
                methodAttributes,
                moduleDefinition.ImportReference(typeof(Exception)));
            ilStripHelpersType.Methods.Add(createMethodStrippedExceptionMethod);

            var nieCtor = moduleDefinition.ImportReference(
                typeof(NotImplementedException).GetConstructor(new[] { typeof(string) }));

            var il = createMethodStrippedExceptionMethod.Body.GetILProcessor();
            il.Append(il.Create(OpCodes.Ldstr, "Cannot invoke method because it was stripped. See stack trace for details."));
            il.Append(il.Create(OpCodes.Newobj, nieCtor));
            il.Append(il.Create(OpCodes.Ret));

            return createMethodStrippedExceptionMethod;
        }
    }
}
