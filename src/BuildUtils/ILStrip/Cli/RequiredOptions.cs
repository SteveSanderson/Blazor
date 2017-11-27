using Microsoft.Extensions.CommandLineUtils;
using System;
using System.Linq;

namespace Microsoft.Blazor.BuildUtils.IlStrip.Cli
{
    internal static class RequiredOptions
    {
        public static bool AssertHasValue(params CommandOption[] options)
        {
            var missingValues = options.Where(o => !o.HasValue()).ToList();
            if (missingValues.Any())
            {
                Console.Error.WriteLine("Missing values for required options:" +
                    string.Join(string.Empty, missingValues.Select(o => $"\n * {o.LongName}: {o.Description}\n   e.g., --{o.LongName} <value>").ToArray()));
                return false;
            }

            return true;
        }
    }
}
