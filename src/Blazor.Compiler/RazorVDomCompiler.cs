using Blazor.Components;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.CodeAnalysis.Emit;
using Blazor.Compiler;

namespace RazorRenderer
{
    public static class RazorVDomCompiler
    {
        readonly static string ViewImportsSuffix = Path.DirectorySeparatorChar + "_ViewImports.cshtml";
        static bool EnableLogging = false;

        public static string CompileToFile(bool enableLogging, string rootDir, string[] referenceAssemblies, string outputFilename)
        {
            outputFilename = Path.GetFullPath(outputFilename);
            var outputAssemblyName = Path.GetFileNameWithoutExtension(outputFilename);

            using (var fs = File.OpenWrite(outputFilename))
            using (var pdbStream = File.OpenWrite(Path.ChangeExtension(outputFilename, ".pdb")))
            {
                return CompileToStream(enableLogging, rootDir, referenceAssemblies, outputAssemblyName, fs, pdbStream);
            }
        }

        public static string CompileToStream(bool enableLogging, string rootDir, string[] referenceAssemblies, string outputAssemblyName, Stream outputStream, Stream pdbStream)
        {
            if (!rootDir.EndsWith(Path.DirectorySeparatorChar.ToString()))
            {
                rootDir += Path.DirectorySeparatorChar.ToString();
            }

            EnableLogging = enableLogging;
            Log("Creating Razor engine...");
            var engine = RazorEngine.Create(builder =>
            {
                var defaultCSharpLoweringPhase = builder.Phases.OfType<IRazorCSharpLoweringPhase>().Single();
                builder.Phases.Remove(defaultCSharpLoweringPhase);
                builder.Phases.Add(new VirtualDomCSharpLoweringPhase(defaultCSharpLoweringPhase));
                builder.SetNamespace("Views");
                builder.SetBaseType(typeof(RazorComponent).FullName);
                builder.ConfigureClass((codeDoc, classNode) =>
                {
                    classNode.Name = RazorComponent.GetViewClassName(rootDir, codeDoc.Source.FileName);
                    if (!string.IsNullOrEmpty((string)codeDoc.Items["DetectedBaseClass"]))
                    {
                        classNode.BaseType = (string)codeDoc.Items["DetectedBaseClass"];
                    }

                    var layoutProperty = new CSharpStatementIRNode
                    {
                        Parent = classNode,
                        Source = null
                    };
                    classNode.Children.Add(layoutProperty);

                    layoutProperty.Children.Add(new RazorIRToken
                    {
                        Kind = RazorIRToken.TokenKind.CSharp,
                        Parent = classNode,
                        Content = $"protected override string Layout {{ get {{ return \"{ codeDoc.Items["DetectedLayout"] ?? string.Empty }\"; }} }}"
                    });
                });
            });

            Log("Compiling Razor files to C#...");
            var filenames = GetFilesToCompile(rootDir);
            var syntaxTrees = GetSyntaxTrees(engine, rootDir, filenames);

            Log("Compiling C#...");
            var modelAssemblyRefs = referenceAssemblies
                .Concat(ProjectReferenceUtil.FindReferencedAssemblies(rootDir, OptimizationLevel.Debug))
                .Select(a => MetadataReference.CreateFromFile(Path.GetFullPath(a)))
                .Cast<MetadataReference>()
                .ToList();

            CompileToFile(syntaxTrees, modelAssemblyRefs, outputAssemblyName, outputStream, pdbStream);
            return $"Compiled {syntaxTrees.Count} view(s) as {outputAssemblyName}";
        }

        static string[] GetFilesToCompile(string rootDir)
        {
            return Directory.EnumerateFiles(rootDir, "*.cshtml", SearchOption.AllDirectories)
                .Where(fn => !fn.EndsWith(ViewImportsSuffix))
                .ToArray();
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

        static IList<SyntaxTree> GetSyntaxTrees(RazorEngine engine, string rootDir, string[] filenames)
        {
            var codeDocs = GetCodeDocuments(rootDir, filenames);
            var tagNamesToSourceFiles = codeDocs
                .Where(cd => !string.IsNullOrEmpty(cd.Items["DetectedTagName"] as string))
                .ToDictionary(
                    cd => cd.Items["DetectedTagName"] as string,
                    cd => "./" + MakeRelativePath(rootDir, cd.Source.FileName).Replace('\\', '/'));

            foreach (var codeDoc in codeDocs)
            {
                codeDoc.Items["tagNamesToSourceFiles"] = tagNamesToSourceFiles;
                engine.Process(codeDoc);
            }

            return codeDocs.Select(codeDoc =>
            {
                var csharpDocument = codeDoc.GetCSharpDocument();
                var generatedCode = csharpDocument.GeneratedCode;
                var usingNamespaces = (IEnumerable<string>)codeDoc.Items["UsingNamespaces"];
                var allNamespaces = new List<string>
                {
                    "System",
                    "System.Collections.Generic",
                    "System.Linq",
                    //"System.Net.Http",
                    "System.Threading.Tasks",
                    "Blazor.Util",
                };
                allNamespaces.AddRange(usingNamespaces);

                // If there's a better way to do this, it's not clear what it is. Don't see any public extension points
                // for this.
                generatedCode = string.Join(string.Empty, allNamespaces.Select(ns => $"using {ns};{Environment.NewLine}")) + generatedCode;
                generatedCode = generatedCode.Replace(
                    "public async override global::System.Threading.Tasks.Task ExecuteAsync()",
                    "protected override void RenderVirtualDom()");
                Log(generatedCode);

                var syntaxTree = CSharpSyntaxTree.ParseText(generatedCode);
                return syntaxTree;
            }).ToList();
        }

        // http://stackoverflow.com/questions/275689/how-to-get-relative-path-from-absolute-path
        private static String MakeRelativePath(String fromPath, String toPath)
        {
            if (String.IsNullOrEmpty(fromPath)) throw new ArgumentNullException("fromPath");
            if (String.IsNullOrEmpty(toPath)) throw new ArgumentNullException("toPath");

            fromPath = Path.Combine(Directory.GetCurrentDirectory(), fromPath);
            toPath = Path.Combine(Directory.GetCurrentDirectory(), toPath);

            if (fromPath.StartsWith("/"))
            {
                fromPath = "file://" + fromPath;
            }

            if (toPath.StartsWith("/"))
            {
                toPath = "file://" + toPath;
            }

            Uri fromUri = new Uri(fromPath);
            Uri toUri = new Uri(toPath);

            if (fromUri.Scheme != toUri.Scheme) { return toPath; } // path can't be made relative.

            Uri relativeUri = fromUri.MakeRelativeUri(toUri);
            String relativePath = Uri.UnescapeDataString(relativeUri.ToString());

            if (toUri.Scheme.Equals("file", StringComparison.OrdinalIgnoreCase))
            {
                relativePath = relativePath.Replace(Path.AltDirectorySeparatorChar, Path.DirectorySeparatorChar);
            }

            return relativePath;
        }

        static IList<RazorCodeDocument> GetCodeDocuments(string rootDir, string[] filenames)
        {
            return filenames
                .Select(fn => CreateCodeDocument(rootDir, fn))
                .ToList();
        }

        static RazorCodeDocument CreateCodeDocument(string rootDir, string sourceFileName)
        {
            string detectedLayout = null;
            string detectedTagName = null;
            using (var ms = new MemoryStream())
            {
                using (var sw = new StreamWriter(ms))
                {
                    var filesToIncludeInOrder = ViewImportsFromRootToSameDir(rootDir, sourceFileName)
                        .Concat(new[] { sourceFileName });
                    var sourceLines = filesToIncludeInOrder.SelectMany(file => File.ReadAllLines(file)).ToList();
                    string lastInheritsLine = null;
                    var usingNamespaces = new List<string>();
                    foreach (var line in sourceLines)
                    {
                        const string inheritsLinePrefix = "@inherits ";
                        if (line.StartsWith(inheritsLinePrefix))
                        {
                            lastInheritsLine = line.Substring(inheritsLinePrefix.Length).Replace("<TModel>", string.Empty);
                            continue;
                        }

                        const string layoutLinePrefix = "@layout ";
                        if (line.StartsWith(layoutLinePrefix))
                        {
                            detectedLayout = line.Substring(layoutLinePrefix.Length);
                            continue;
                        }

                        const string usingLinePrefix = "@using ";
                        if (line.StartsWith(usingLinePrefix))
                        {
                            usingNamespaces.Add(line.Substring(usingLinePrefix.Length));
                            continue;
                        }

                        var tagNameRegex = new Regex("^\\s*\\@TagName\\(\\s*\\\"([^\\\"]+)\\\"\\s*\\)");
                        var tagNameMatch = tagNameRegex.Match(line);
                        if (tagNameMatch.Success)
                        {
                            detectedTagName = tagNameMatch.Groups[1].Value;
                            continue;
                        }

                        sw.WriteLine(line);
                    }
                    sw.Flush();
                    ms.Position = 0;

                    var sourceDoc = RazorSourceDocument.ReadFrom(ms, sourceFileName);
                    var codeDoc = RazorCodeDocument.Create(sourceDoc);
                    codeDoc.Items["DetectedLayout"] = detectedLayout;
                    codeDoc.Items["DetectedTagName"] = detectedTagName;
                    codeDoc.Items["DetectedBaseClass"] = lastInheritsLine;
                    codeDoc.Items["UsingNamespaces"] = usingNamespaces;

                    return codeDoc;
                }
            }
        }

        static IEnumerable<string> ViewImportsFromRootToSameDir(string rootDir, string referencePath)
        {
            var foundItems = new List<string>();

            // Items with underscored names don't inherit ViewImports, otherwise you'd get
            // _Layout.cshtml having itself as a layout, and an infinite loop.
            if (!Path.GetFileName(referencePath).StartsWith("_"))
            {
                while (referencePath.Length > rootDir.Length)
                {
                    referencePath = Path.GetDirectoryName(referencePath);
                    var possibleViewImport = Path.Combine(referencePath, "_ViewImports.cshtml");
                    if (File.Exists(possibleViewImport))
                    {
                        foundItems.Insert(0, possibleViewImport);
                    }
                }
            }

            return foundItems;
        }

        static void CompileToFile(IList<SyntaxTree> syntaxTrees, IList<MetadataReference> assemblyReferences, string outputAssemblyName, Stream outputStream, Stream pdbStream)
        {
            var compilationOptions = new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary)
                .WithOptimizationLevel(OptimizationLevel.Debug)
                .WithAssemblyIdentityComparer(DesktopAssemblyIdentityComparer.Default);

            var compilation = CSharpCompilation.Create(outputAssemblyName,
                syntaxTrees: syntaxTrees,
                references: assemblyReferences,
                options: compilationOptions);

            var errors = compilation.GetDiagnostics().Where(d => d.Severity == DiagnosticSeverity.Error);

            if (errors.Any())
            {
                foreach (var error in errors)
                {
                    Console.WriteLine(error.ToString());
                }
                throw new InvalidOperationException(string.Join(Environment.NewLine, errors.Select(e => e.ToString()).ToArray()));
            }

            // Success
            var emitOptions = new EmitOptions().WithDebugInformationFormat(DebugInformationFormat.PortablePdb);
            compilation.Emit(outputStream, pdbStream, options: emitOptions);
        }
    }
}
