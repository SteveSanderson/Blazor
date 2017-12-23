using Microsoft.CodeAnalysis;
using System.Collections.Generic;
using System.IO;
using MiniJSON;
using System.Linq;
using JsonDict = System.Collections.Generic.IDictionary<string, object>;
using System;

namespace Blazor.Compiler
{
    internal static class ProjectReferenceUtil
    {
        /// <summary>
        /// Inspects the project.assets.json file and .csproj files in a .NET Core project and attempts to determine
        /// which .dll files are referenced in its compilation
        /// </summary>
        public static string[] FindReferencedAssemblies(string projectRoot, OptimizationLevel optimizationLevel) {
            return assembliesFromProjectAssets(projectRoot, optimizationLevel)
                .Concat(assembliesFromCSProj(projectRoot, optimizationLevel))
                .Select(path => path.Replace('/', Path.DirectorySeparatorChar))
                .Distinct(new FilenameComparer()) // TODO: Make sure you pick the most recent version of each assembly, not just an arbitrary one
                .ToArray();
        }

        private static IEnumerable<string> assembliesFromProjectAssets(string projectRoot, OptimizationLevel optimizationLevel) {
            var assetsJsonPath = Path.Combine(projectRoot, "obj", "project.assets.json");
            if(!File.Exists(assetsJsonPath)) {
                throw new FileNotFoundException($"Cannot local project assets file. Maybe the referenced project hasn't been restored yet. Searched for: {assetsJsonPath}");
            }

            var assetsInfo = (JsonDict)Json.Deserialize(File.ReadAllText(assetsJsonPath));

            var packageFolders = ((JsonDict)assetsInfo["packageFolders"]).Keys.ToList();
            if(!packageFolders.Any()) {
                throw new InvalidDataException($"Expected to find package folders, but found none.");
            }

            var targets = ((JsonDict)assetsInfo["targets"]);
            if(targets.Count != 1) {
                throw new InvalidDataException($"Expected to find exactly 1 target, but found {targets.Count}.");
            }
            var target = (Dictionary<string, object>)targets.Values.Single();

            var project = (JsonDict)assetsInfo["project"];
            var frameworks = ((JsonDict)project["frameworks"]);
            if(frameworks.Count != 1) {
                throw new InvalidDataException($"Expected to find exactly 1 frameworks, but found {frameworks.Count}.");
            }
            var framework = frameworks.Single();
            var binDir = Path.Combine(projectRoot, "bin", optimizationLevel.ToString(), framework.Key);

            return compiledReferences(target, packageFolders, binDir);
        }



        private static IEnumerable<string> compiledReferences(IDictionary<string, object> references, IList<string> packageFolders, string binDir) {
            foreach(var (packageNameAndVersion, reference) in references) {
                var referenceInfo = (JsonDict)reference;
                if(referenceInfo.TryGetValue("compile", out var compileInfo)) {
                    var compileItems = ((JsonDict)compileInfo).Keys.Where(item => Path.GetExtension(item) == ".dll");
                    switch(referenceInfo["type"]) {
                        case "package":
                            foreach(var item in compileItems) {
                                var partialPath = Path.Combine(packageNameAndVersion, item);
                                yield return packageFolders
                                    .Select(getCandidate)
                                    .FirstOrDefault(File.Exists)
                                    ?? throw new InvalidDataException($"Could not find {partialPath} in any of the package folders:\n" +
                                        $"{String.Join('\n', packageFolders)}");

                                string getCandidate(string packageFolder) => Path.Combine(packageFolder, partialPath);
                            }
                            break;
                        case "project":
                            foreach(var item in compileItems) {
                                yield return item.Replace("bin/placeholder", binDir);
                            }
                            break;
                    }
                }
            }
        }

        private static IEnumerable<string> assembliesFromCSProj(string projectRoot, OptimizationLevel optimizationLevel) {
            string projectName = Path.GetFileName(projectRoot.TrimEnd(Path.DirectorySeparatorChar));
            var csProjPath = Path.Combine(projectRoot, projectName + ".csproj");
            if(!File.Exists(csProjPath)) {
                throw new FileNotFoundException($"Could not find csproj for {projectRoot}");
            }

            var projInfo = new AngleSharp.Parser.Xml.XmlParser().Parse(File.ReadAllText(csProjPath));

            var projectNode = elementsOf(projInfo, "Project").Single();

            string binDir;
            {
                var propertyGroup = elementsOf(projectNode, "PropertyGroup").Single();
                var frameworkNode = elementsOf(propertyGroup, "TargetFramework").Single();
                var targetFramework = frameworkNode.TextContent;
                binDir = Path.Combine(projectRoot, "bin", optimizationLevel.ToString(), targetFramework);
            }

            foreach(var itemGroup in elementsOf(projectNode, "ItemGroup")) {
                foreach(var reference in elementsOf(itemGroup, "Reference")) {
                    var includeAttr = reference.Attributes.Single(x => x.Name == "Include");

                    //Look in bin dir first, else try looking for the hint
                    var assemblyPath = Path.Combine(binDir, includeAttr.Value + ".dll"); //TODO is it possible to reference others eg. .exe
                    if(File.Exists(assemblyPath)) {
                        yield return assemblyPath;
                        continue;
                    }
                    else {
                        var hint = elementsOf(reference, "HintPath")
                            .SingleOrDefault()?.TextContent;
                        if(!String.IsNullOrWhiteSpace(hint)) {
                            assemblyPath = Path.Combine(projectRoot, hint);
                            if(File.Exists(assemblyPath)) {
                                yield return assemblyPath;
                                continue;
                            }
                        }
                    }
                    throw new InvalidDataException($"Could not find {includeAttr.Value} in the bin directory \"{binDir}\"");
                }

                //foreach(var projReference in elementsOf(itemGroup, "ProjectReference")) {
                //    The project references should be picked up from the project assets. The csproj is only needed for direct dll references.
                //}
            }


            IEnumerable<AngleSharp.Dom.Xml.XmlElement> elementsOf(AngleSharp.Dom.INode node, string nodeName) {
                return node.ChildNodes.OfType<AngleSharp.Dom.Xml.XmlElement>().Where(x => x.NodeName == nodeName);
            }
        }


        private class FilenameComparer : IEqualityComparer<string>
        {
            public bool Equals(string x, string y) => String.Equals(
                Path.GetFileName(x),
                Path.GetFileName(y),
                StringComparison.OrdinalIgnoreCase);

            public int GetHashCode(string obj) => Path.GetFileName(obj).ToLowerInvariant().GetHashCode();
        }
    }
}
