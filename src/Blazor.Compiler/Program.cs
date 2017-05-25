using System;
using System.IO;
using System.Linq;

namespace RazorRenderer
{
    class Program
    {
        const bool EnableLogging = false;

        static int Main(string[] args)
        {
            if (args.Length < 4)
            {
                ShowUsage();
                return 1;
            }

            var rootDir = Path.GetFullPath(args[0]);
            if (string.IsNullOrEmpty(rootDir))
            {
                ShowUsage();
                return 1;
            }

            if (!Directory.Exists(rootDir))
            {
                Console.WriteLine("Can't find directory: " + rootDir);
                return 1;
            }

            var applicationAssembly = args[2];
            var outputFilename = args[3];
            RazorVDomCompiler.CompileToFile(EnableLogging, rootDir, new[] { applicationAssembly }, outputFilename);
            return 0;
        }

        private static void Log(string message)
        {
            if (EnableLogging)
            {
#pragma warning disable CS0162 // Unreachable code detected
                Console.WriteLine(message);
#pragma warning restore CS0162 // Unreachable code detected
            }
        }

        private static void ShowUsage()
        {
            Console.WriteLine("Usage: RazorRenderer.exe <rootDir> <namespace> <modelAssembly> <outputAssemblyName>");
        }
    }
}