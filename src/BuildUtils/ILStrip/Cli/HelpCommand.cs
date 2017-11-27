using Microsoft.Extensions.CommandLineUtils;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Cli
{
    internal class HelpCommand
    {
        public static void Command(CommandLineApplication app, CommandLineApplication helpCommand)
        {
            helpCommand.Description = "Shows help.";
            var commandArgument = helpCommand.Argument(
                "command",
                "The command for which to show help.");

            helpCommand.OnExecute(() =>
            {
                app.ShowHelp(
                    string.IsNullOrEmpty(commandArgument.Value) ? null : commandArgument.Value);
                return 0;
            });
        }
    }
}
