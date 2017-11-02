using Microsoft.CodeAnalysis;
using System.Collections.Generic;
using System.IO;
using MiniJSON;
using System.Linq;
using JsonDict = System.Collections.Generic.IDictionary<string, object>;

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
            var packageFolders = ((JsonDict)assetsInfo["packageFolders"]);
            if (packageFolders.Count != 1)
            {
                throw new InvalidDataException($"Expected to find exactly 1 package folder, but found {packageFolders.Count}.");
            }
            var packageFolder = packageFolders.Keys.Single();

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
                        return compileItems.Select(item => Path.Combine(packageFolder, packageNameAndVersion, item));
                    }
                    else if (referenceType == "project")
                    {
                        return compileItems.Select(item => item.Replace("bin/placeholder", binDir));
                    }
                }

                return Enumerable.Empty<string>();
            });

            return referenceAssemblies.Select(path => path.Replace('/', Path.DirectorySeparatorChar)).ToArray();
        }
    }
}
