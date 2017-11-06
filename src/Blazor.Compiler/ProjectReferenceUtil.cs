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
        /// Inspects the project.assets.json file in a .NET Core project and attempts to determine
        /// which .dll files are referenced in its compilation
        /// </summary>
        public static string[] FindReferencedAssemblies(string copyFromProjectRoot, OptimizationLevel optimizationLevel)
        {
            var assetsJsonPath = Path.Combine(copyFromProjectRoot, "obj", "project.assets.json");
            if (!File.Exists(assetsJsonPath))
            {
                throw new FileNotFoundException($"Cannot local project assets file. Maybe the referenced project hasn't been restored yet. Searched for: {assetsJsonPath}");
            }

            var assetsInfo = (JsonDict)Json.Deserialize(File.ReadAllText(assetsJsonPath));
            var packageFolders = ((JsonDict)assetsInfo["packageFolders"]).Keys.ToList();
            if (!packageFolders.Any())
            {
                throw new InvalidDataException($"Expected to find package folders, but found none.");
            }

            var targets = ((JsonDict)assetsInfo["targets"]);
            if (targets.Count != 1)
            {
                throw new InvalidDataException($"Expected to find exactly 1 target, but found {targets.Count}.");
            }
            var target = (Dictionary<string, object>)targets.Values.Single();

            var project = (JsonDict)assetsInfo["project"];
            var frameworks = ((JsonDict)project["frameworks"]);
            if (frameworks.Count != 1)
            {
                throw new InvalidDataException($"Expected to find exactly 1 frameworks, but found {frameworks.Count}.");
            }
            var framework = frameworks.Single();
            var binDir = Path.Combine(copyFromProjectRoot, "bin", optimizationLevel.ToString(), framework.Key);

            var referenceAssemblies = target.SelectMany(referenceKvp =>
            {
                var reference = (JsonDict)referenceKvp.Value;
                if (reference.TryGetValue("compile", out var compileInfo))
                {
                    var compileItems = ((JsonDict)compileInfo).Keys.Where(item => item.EndsWith(".dll"));
                    var referenceType = (string)reference["type"];
                    if (referenceType == "package")
                    {
                        var packageNameAndVersion = referenceKvp.Key;

                        return compileItems.Select(item =>
                        {
                            var partialPath = Path.Combine(packageNameAndVersion, item);
                            foreach (var packageFolder in packageFolders)
                            {
                                var candidateFilename = Path.Combine(packageFolder, partialPath);
                                if (File.Exists(candidateFilename))
                                {
                                    return candidateFilename;
                                }
                            }

                            throw new InvalidDataException($"Could not find {partialPath} in any of the package folders:\n{string.Join('\n', packageFolders)}");
                        });
                    }
                    else if (referenceType == "project")
                    {
                        return compileItems.Select(item => item.Replace("bin/placeholder", binDir));
                    }
                }

                return Enumerable.Empty<string>();
            });

            return referenceAssemblies
                .Select(path => path.Replace('/', Path.DirectorySeparatorChar))
                .Distinct(new FilenameComparer()) // TODO: Make sure you pick the most recent version of each assembly, not just an arbitrary one
                .ToArray();
        }

        private class FilenameComparer : IEqualityComparer<string>
        {
            public bool Equals(string x, string y) => string.Equals(
                Path.GetFileName(x),
                Path.GetFileName(y),
                StringComparison.OrdinalIgnoreCase);

            public int GetHashCode(string obj) => Path.GetFileName(obj).ToLowerInvariant().GetHashCode();
        }
    }
}
