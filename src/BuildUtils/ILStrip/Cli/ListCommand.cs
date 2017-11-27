using System;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Blazor.BuildUtils.IlStrip.Core;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Cli
{
    internal class ListCommand
    {
        public static void Command(CommandLineApplication command)
        {
            command.Description = "Lists the contents of the specified assembly.";
            command.HelpOption("-?|-h|--help");

            var assemblyOption = command.Option(
                "-a|--assembly",
                "The assembly whose contents should be listed.",
                CommandOptionType.SingleValue);

            command.OnExecute(() =>
            {
                if (!RequiredOptions.AssertHasValue(assemblyOption))
                {
                    return 1;
                }

                var inputPath = assemblyOption.Value();
                var items = AssemblyItem.ListContents(inputPath);

                foreach (var item in items)
                {
                    Console.WriteLine($"{item} {item.CodeSize}");
                }

                return 0;
            });
        }
    }
}
