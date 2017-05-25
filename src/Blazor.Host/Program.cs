using System;
using System.Linq;

namespace Blazor.Sdk
{
    class Program
    {
        static int Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Usage: dotnet blazor <command>");
                return 1;
            }

            var command = args[0];
            var remainingArgs = args.Skip(1).ToArray();

            switch (command.ToLowerInvariant())
            {
                case "serve":
                    Host.Program.Main(remainingArgs);
                    return 0;
                default:
                    throw new InvalidOperationException($"Unknown command: {command}");
            }
        }
    }
}
