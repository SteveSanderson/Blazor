using System;
using System.IO;
using System.Linq;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;
using System.Reflection.PortableExecutable;
using System.Text;

namespace PdbReader
{
    class Program
    {
        static void Main(string[] args)
        {
            var pePath = args[0];
            var outputPath = args[1];

            var peStream = File.OpenRead(pePath);
            var pdbStream = File.OpenRead(Path.ChangeExtension(pePath, "pdb"));
            var peReader = new PEReader(peStream);
            var pdbProvider = MetadataReaderProvider.FromPortablePdbStream(pdbStream);
            var peMetadataReader = peReader.GetMetadataReader();
            var pdbMetadataReader = pdbProvider.GetMetadataReader();

            using (var outputFile = File.OpenWrite(outputPath))
            {
                var moduleNameBytes = Encoding.UTF8.GetBytes(peMetadataReader.GetString(peMetadataReader.GetModuleDefinition().Name));

                foreach (var methodDebugInfoHandle in pdbMetadataReader.MethodDebugInformation)
                {
                    var methodDebugInfo = pdbMetadataReader.GetMethodDebugInformation(methodDebugInfoHandle);
                    var methodDefHandle = methodDebugInfoHandle.ToDefinitionHandle();
                    var methodDef = peMetadataReader.GetMethodDefinition(methodDefHandle);
                    var document = pdbMetadataReader.GetDocument(methodDebugInfo.Document);
                    var methodDefToken = MetadataTokens.GetToken(methodDefHandle);
                    var methodDebugInfoToken = MetadataTokens.GetToken(methodDefHandle);
                    var sequencePoints = methodDebugInfo.GetSequencePoints().ToArray();

                    var declaringType = peMetadataReader.GetTypeDefinition(methodDef.GetDeclaringType());
                    var namespaceNameBytes = Encoding.UTF8.GetBytes(peMetadataReader.GetString(declaringType.Namespace));
                    var classNameBytes = Encoding.UTF8.GetBytes(peMetadataReader.GetString(declaringType.Name));
                    var methodNameBytes = Encoding.UTF8.GetBytes(peMetadataReader.GetString(methodDef.Name));

                    outputFile.Write(moduleNameBytes, 0, moduleNameBytes.Length);
                    outputFile.WriteByte(0);
                    outputFile.Write(namespaceNameBytes, 0, namespaceNameBytes.Length);
                    outputFile.WriteByte(0);
                    outputFile.Write(classNameBytes, 0, classNameBytes.Length);
                    outputFile.WriteByte(0);
                    outputFile.Write(methodNameBytes, 0, methodNameBytes.Length);
                    outputFile.WriteByte(0);
                    WriteInt32(outputFile, sequencePoints.Length);

                    foreach (var sequencePoint in sequencePoints)
                    {
                        WriteInt32(outputFile, sequencePoint.Offset);
                        Console.WriteLine($"document name: {pdbMetadataReader.GetString(document.Name)} namespace: {peMetadataReader.GetString(declaringType.Namespace)} class name: {peMetadataReader.GetString(declaringType.Name)} method name: {peMetadataReader.GetString(methodDef.Name)} method def token: {methodDefToken} method debug info token: {methodDebugInfoToken} start line: {sequencePoint.StartLine} offset: {sequencePoint.Offset}");
                    }
                }
            }
        }

        public static void WriteInt32(Stream output, int value)
        {
            output.Write(new byte[]
            {
                (byte)(value >> 24),
                (byte)(0xFF & (value >> 16)),
                (byte)(0xFF & (value >> 8)),
                (byte)(0xFF & value)
            }, 0, 4);
        }
    }
}
