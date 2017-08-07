using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging.Models
{
    public class DebugInfoStore
    {
        public const string DotnetSourceFilePrefix = "dotnet:";

        private int nextSourceFileId = 0;
        private IDictionary<string, SourceFileInfo> _sourceFiles = new Dictionary<string, SourceFileInfo>();

        public IEnumerable<SourceFileInfo> SourceFiles => _sourceFiles.Values;

        public SourceFileInfo GetSourceFileByUrl(string url)
        {
            return _sourceFiles.Values.FirstOrDefault(file => file.Url == url);
        }

        public SourceFileInfo GetSourceFileById(string scriptId)
        {
            return _sourceFiles[scriptId];
        }

        public void AddPdbFiles(string clientBinDir)
        {
            var pdbFiles = Directory.GetFiles(clientBinDir, "*.pdb");
            foreach (var pdbFileName in pdbFiles)
            {
                var assemblyFilename = Path.ChangeExtension(pdbFileName, "dll");
                if (File.Exists(assemblyFilename))
                {
                    using (var peStream = File.OpenRead(assemblyFilename))
                    using (var pdbStream = File.OpenRead(pdbFileName))
                    {
                        AddPdb(peStream, pdbStream);
                    }
                }
            }
        }

        public void AddPdb(Stream peStream, Stream pdbStream)
        {
            using (var peReader = new PEReader(peStream))
            using (var pdbProvider = MetadataReaderProvider.FromPortablePdbStream(pdbStream))
            {
                var peMetadataReader = peReader.GetMetadataReader();
                var pdbMetadataReader = pdbProvider.GetMetadataReader();
                var moduleName = peMetadataReader.GetString(peMetadataReader.GetModuleDefinition().Name);

                AddPdb(moduleName, peMetadataReader, pdbMetadataReader);
            }
        }

        private void AddPdb(string moduleName, MetadataReader peMetadataReader, MetadataReader pdbMetadataReader)
        {
            // Add all the documents (source files)
            var tempDocNameToSourceFileMap = new Dictionary<string, SourceFileInfo>();
            foreach (var docHandle in pdbMetadataReader.Documents)
            {
                var doc = pdbMetadataReader.GetDocument(docHandle);
                var docRawName = pdbMetadataReader.GetString(doc.Name);
                var filenameWithForwardSlashes = docRawName.Replace('\\', '/');
                var url = $"{DotnetSourceFilePrefix}//{moduleName}/{filenameWithForwardSlashes}";
                var sourceFile = new SourceFileInfo
                {
                    Id = $"{DotnetSourceFilePrefix}{nextSourceFileId++}",
                    AssemblyName = moduleName,
                    FileName = filenameWithForwardSlashes,
                    Url = url,
                    PossibleBreakpointLocationsByLine = new Dictionary<int, List<PossibleBreakpointLocation>>()
                };
                _sourceFiles.Add(sourceFile.Id, sourceFile);
                tempDocNameToSourceFileMap.Add(docRawName, sourceFile);
            }

            // Add all the debug sequence points
            foreach (var methodDebugInfoHandle in pdbMetadataReader.MethodDebugInformation)
            {
                var methodDebugInfo = pdbMetadataReader.GetMethodDebugInformation(methodDebugInfoHandle);
                var methodDefHandle = methodDebugInfoHandle.ToDefinitionHandle();
                var methodDef = peMetadataReader.GetMethodDefinition(methodDefHandle);
                var document = pdbMetadataReader.GetDocument(methodDebugInfo.Document);
                string documentName = null;
                try
                {
                    documentName = pdbMetadataReader.GetString(document.Name);
                }
                catch (Exception)
                {
                    // If the document name isn't readable, don't process it
                }
                if (documentName != null && tempDocNameToSourceFileMap.TryGetValue(documentName, out var sourceFile))
                {
                    // Construct the DNA method identifier string
                    var methodDefToken = MetadataTokens.GetToken(methodDefHandle);
                    var methodDebugInfoToken = MetadataTokens.GetToken(methodDefHandle);
                    var declaringType = peMetadataReader.GetTypeDefinition(methodDef.GetDeclaringType());
                    var namespaceName = peMetadataReader.GetString(declaringType.Namespace);
                    var className = peMetadataReader.GetString(declaringType.Name);
                    var methodName = peMetadataReader.GetString(methodDef.Name);
                    var dnaMethodIdentifier = moduleName + namespaceName + className + methodName;

                    // Add PossibleBreakpointLocation objects to the sourcefile
                    int sequencePointIndex = 0;
                    foreach (var sequencePoint in methodDebugInfo.GetSequencePoints().Where(sp => !sp.IsHidden))
                    {
                        var possibleBreakpointLocations = sourceFile.PossibleBreakpointLocationsByLine;
                        var lineNumber = sequencePoint.StartLine;
                        if (!possibleBreakpointLocations.TryGetValue(lineNumber, out _))
                        {
                            possibleBreakpointLocations.Add(lineNumber, new List<PossibleBreakpointLocation>());
                        }
                        possibleBreakpointLocations[lineNumber].Add(new PossibleBreakpointLocation
                        {
                            DnaMethodIdentifier = dnaMethodIdentifier,
                            SequencePointIndex = sequencePointIndex,
                            SequencePointInfo = sequencePoint,
                            MethodName = methodName,
                            SourceFile = sourceFile,
                        });

                        sequencePointIndex++;
                    }
                }
            }
        }

        internal PossibleBreakpointLocation FindBreakpointUsingDnaData(string dnaLocationId, int ilOffset, out SourceFileInfo inSourceFile)
        {
            // TODO: Find a more efficient way of looking this up. Might just need to maintain
            // a lookup from dnaLocationId to sourcefiles
            foreach (var sourceFile in _sourceFiles.Values)
            {
                foreach (var breakpointCollections in sourceFile.PossibleBreakpointLocationsByLine.Values)
                {
                    foreach (var breakpoint in breakpointCollections)
                    {
                        if (breakpoint.DnaMethodIdentifier == dnaLocationId && breakpoint.SequencePointInfo.Offset == ilOffset)
                        {
                            inSourceFile = sourceFile;
                            return breakpoint;
                        }
                    }
                }
            }

            inSourceFile = null;
            return null;
        }

        public bool ContainsScript(string sourceFileId)
        {
            return _sourceFiles.ContainsKey(sourceFileId);
        }

        private int? GetLineWithPossibleBreakpoint(SourceFileInfo sourceFile, int startLine)
        {
            if (sourceFile.PossibleBreakpointLocationsByLine.ContainsKey(startLine))
            {
                return startLine;
            }

            return sourceFile.PossibleBreakpointLocationsByLine.Keys.FirstOrDefault(l => l >= startLine);
        }

        public IEnumerable<PossibleBreakpointLocation> GetBreakpointLocations(string scriptId, int lineNumber)
        {
            var sourceFile = GetSourceFileById(scriptId);
            var foundLineNumber = GetLineWithPossibleBreakpoint(sourceFile, lineNumber);

            return foundLineNumber.HasValue
                ? sourceFile.PossibleBreakpointLocationsByLine[foundLineNumber.Value]
                : Enumerable.Empty<PossibleBreakpointLocation>();
        }

        public PossibleBreakpointLocation GetClosestBreakpointLocation(SourceFileInfo script, int lineNumber, int columnNumber)
        {
            var candidates = GetBreakpointLocations(script.Id, lineNumber);
            return candidates.FirstOrDefault(loc => loc.SequencePointInfo.StartLine >= lineNumber && loc.SequencePointInfo.StartColumn >= columnNumber);
        }
    }
}
