using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using Blazor.TypeScriptProxy.TypeScriptIR;
using Blazor.TypeScriptProxy.Generator;
using Microsoft.CodeAnalysis.CSharp;
using Newtonsoft.Json;
using Microsoft.CodeAnalysis;
using System.Reflection;
using Blazor.Components;

namespace Blazor.TypeScriptProxy
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                throw new ArgumentOutOfRangeException(nameof(args), "Usage: dotnet run <Path-to-ts-files> <optional-assembly-output-path>");
            }

            var assemblyOutputPath = Path.Combine(Directory.GetCurrentDirectory(), "JSTypeProxies.dll");
            var searchDirectory = args[0];
            if (args.Length == 2)
            {
                assemblyOutputPath = args[1];
            }

            var headerFiles = Directory.GetFiles(searchDirectory, "*.d.ts", SearchOption.AllDirectories);
            for(var i = 0; i < headerFiles.Length; i++)
            {
                var application = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\npm\ts-node.cmd";

                if (!File.Exists(application))
                {
                    throw new InvalidOperationException("First run npm install prior to executing this command line.");
                }

                var absolutePath = Path.Combine(Directory.GetCurrentDirectory(), headerFiles[i]);

                var processInfo = new ProcessStartInfo(application, $"--compiler ntypescript generate.ts -n -- {absolutePath}")
                {
                    WorkingDirectory = Path.Combine(Directory.GetCurrentDirectory(), "../../../src/Blazor.TypeScriptProxy/"), // TODO: Super hack; need to change
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    WindowStyle = ProcessWindowStyle.Hidden,
                    CreateNoWindow = true,
                    UseShellExecute = false,
                    ErrorDialog = true,
                };

                var process = new Process()
                {
                    StartInfo = processInfo,
                    EnableRaisingEvents = true,
                };
                process.Start();
                var json = process.StandardOutput.ReadToEnd();
                var module = JsonConvert.DeserializeObject<Blazor.TypeScriptProxy.TypeScriptIR.Module>(json);

                var generator = new CSharpGenerator();
                var code = generator.Render(module);

                //Console.WriteLine(code);

                var compilationOptions = new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary)
                .WithOptimizationLevel(OptimizationLevel.Debug);
                var syntaxTree = CSharpSyntaxTree.ParseText(code);

                var standardReferencePaths = new[]
                {
                    AssemblyLocation("mscorlib"),
                    AssemblyLocation(typeof(object)), // CoreLib
                    AssemblyLocation("System.Console"),
                    AssemblyLocation("System.Collections"),
                    AssemblyLocation("System.Linq"),
                    AssemblyLocation("System.Runtime"),
                    AssemblyLocation("System.Threading.Tasks"),
                    AssemblyLocation("System.Net.Http"),
                    AssemblyLocation("System.Private.Uri"),
                    AssemblyLocation("System.Security.Principal"),
                    AssemblyLocation("System.Security.Claims"),
                    AssemblyLocation("Blazor.Runtime")
                };

                var compilation = CSharpCompilation.Create("JSTypeProxies",
                    syntaxTrees: new[] { syntaxTree },
                    references: standardReferencePaths.Select(assemblyLocation => MetadataReference.CreateFromFile(assemblyLocation)),
                    options: compilationOptions);
                var errors = compilation.GetDiagnostics().Where(d => d.Severity == DiagnosticSeverity.Error);

                if (errors.Any())
                {
                    foreach (var error in errors)
                    {
                        //Console.WriteLine(error.ToString());
                    }
                    throw new InvalidOperationException(string.Join(Environment.NewLine, errors.Select(e => e.ToString()).ToArray()));
                }
                else
                {
                    compilation.Emit(assemblyOutputPath);
                }

                //Console.ReadLine();

                //var settings = new JsonSerializerSettings();
                //settings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                //var serialized = JsonConvert.SerializeObject(module, Formatting.Indented, settings);
                //Console.WriteLine(serialized);
            }
        }

        static string AssemblyLocation(string assemblyName)
        {
            return AssemblyLocation(Assembly.Load(new AssemblyName(assemblyName)));
        }

        static string AssemblyLocation(Type containedType)
        {
            return AssemblyLocation(containedType.GetTypeInfo().Assembly);
        }

        static string AssemblyLocation(Assembly assembly)
        {
            var locationProperty = typeof(Assembly).GetRuntimeProperty("Location");
            return (string)locationProperty.GetValue(assembly);
        }
    }
}
