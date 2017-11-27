using Microsoft.Blazor.BuildUtils.IlStrip.Cli;
using Microsoft.Extensions.CommandLineUtils;

namespace Microsoft.Blazor.BuildUtils.IlStrip
{
    class Program
    {
        static void Main(string[] args)
        {
            var app = new CommandLineApplication
            {
                Name = "ilstrip"
            };
            app.HelpOption("-?|-h|--help");

            app.Command("list", ListCommand.Command);
            app.Command("help", command => HelpCommand.Command(app, command));
            app.Command("strip", StripCommand.Command);

            if (args.Length > 0)
            {
                app.Execute(args);
            }
            else
            {
                app.ShowHelp();
            }
        }
    }
}
