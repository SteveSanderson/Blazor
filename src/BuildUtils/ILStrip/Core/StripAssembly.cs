using System;
using System.IO;
using Mono.Cecil;
using System.Linq;
using Mono.Cecil.Cil;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Core
{
    internal static class StripAssembly
    {
        public static string Exec(string inputPath, string outputPath, string[] specLines, bool logVerbose)
        {
            if (string.IsNullOrEmpty(outputPath))
            {
                outputPath = Path.ChangeExtension(inputPath, ".stripped" + Path.GetExtension(inputPath));
            }

            var stripSpecList = new SpecList(specLines);
            var moduleDefinition = ModuleDefinition.ReadModule(inputPath);
            var createMethodStrippedException = MethodStrippedExceptionMethod.AddToAssembly(moduleDefinition);

            var contents = AssemblyItem.ListContents(moduleDefinition).ToList();
            foreach (var contentItem in contents)
            {
                var shouldStrip = stripSpecList.Match(contentItem)
                    && contentItem.Method != createMethodStrippedException;

                if (logVerbose)
                {
                    Console.WriteLine($"{(shouldStrip ? "Stripping" : "Retaining")}: {contentItem}");
                }

                if (shouldStrip)
                {
                    contentItem.StripFromAssembly(createMethodStrippedException);
                }
            }

            moduleDefinition.Write(outputPath);
            return outputPath;
        }
    }
}
