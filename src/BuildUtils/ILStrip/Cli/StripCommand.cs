using System;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Blazor.BuildUtils.IlStrip.Core;
using System.IO;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Cli
{
    internal static class StripCommand
    {
        public static void Command(CommandLineApplication command)
        {
            command.Description = "Strips code from the specified assembly.";
            command.HelpOption("-?|-h|--help");

            var assemblyOption = command.Option(
                "-a|--assembly",
                "The assembly from which code should be stripped.",
                CommandOptionType.SingleValue);

            var specFileOption = command.Option(
                "-s|--spec",
                "The spec file describing which members to strip from the assembly.",
                CommandOptionType.SingleValue);

            var verboseOption = command.Option(
                "-v|--verbose",
                "If set, logs additional information to the console.",
                CommandOptionType.NoValue);

            var outputOption = command.Option(
                "-o|--output",
                "The location where the stripped assembly should be written.",
                CommandOptionType.SingleValue);

            command.OnExecute(() =>
            {
                if (!RequiredOptions.AssertHasValue(assemblyOption, specFileOption))
                {
                    return 1;
                }

                var inputPath = assemblyOption.Value();
                var specLines = File.ReadAllLines(specFileOption.Value());

                var outputPath = StripAssembly.Exec(
                    inputPath,
                    outputOption.Value(),
                    specLines,
                    verboseOption.HasValue());

                Console.WriteLine(
                    $" Input: {inputPath} ({FormatFileSize(inputPath)})");
                Console.WriteLine(
                    $"Output: {outputPath} ({FormatFileSize(outputPath)})");

                return 0;
            });
        }

        private static string FormatFileSize(string path)
        {
            return FormatFileSize(new FileInfo(path).Length);
        }

        private static string FormatFileSize(long length)
        {
            return string.Format("{0:0.##} MB", ((double)length) / (1024*1024));
        }
    }
}
