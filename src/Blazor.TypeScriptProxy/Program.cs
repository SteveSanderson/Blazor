using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using Blazor.TypeScriptProxy.Contract;
using Newtonsoft.Json;

namespace Blazor.TypeScriptProxy
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                throw new ArgumentOutOfRangeException(nameof(args), "You must provide a root directory.");
            }

            var searchDirectory = args[0];
            var headerFiles = Directory.GetFiles(searchDirectory, "*.d.ts", SearchOption.AllDirectories);
            for(var i = 0; i < headerFiles.Length; i++)
            {
                var application = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + @"\npm\ts-node.cmd";

                if (!File.Exists(application))
                {
                    throw new InvalidOperationException("First run npm install prior to executing this command line.");
                }

                var processInfo = new ProcessStartInfo(application, $"--compiler ntypescript generate.ts -n -- {headerFiles[i]}")
                {
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    WindowStyle = ProcessWindowStyle.Hidden,
                    CreateNoWindow = true,
                    UseShellExecute = false,
                    ErrorDialog = true,
                };

                var process = new Process()
                {
                    StartInfo = processInfo,
                    EnableRaisingEvents = true,
                };
                process.Start();
                var json = process.StandardOutput.ReadToEnd();
                var module = JsonConvert.DeserializeObject<Module>(json);

                var settings = new JsonSerializerSettings();
                settings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                var serialized = JsonConvert.SerializeObject(module, Formatting.Indented, settings);
                Console.WriteLine(serialized);
            }
        }
    }
}
