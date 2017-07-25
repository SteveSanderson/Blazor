// © Microsoft. All rights reserved.

using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using Ookii.CommandLine;

using static System.FormattableString;

namespace SampleDebugAdapter
{
    internal class ProgramArgs
    {
        [CommandLineArgument("debug", DefaultValue = false, IsRequired = false)]
        public bool Debug { get; set; }

        [CommandLineArgument("nodebug", DefaultValue = false, IsRequired = false)]
        public bool NoDebug { get; set; }

        [CommandLineArgument("server", DefaultValue = 0, IsRequired = false)]
        public int ServerPort { get; set; }
    }

    internal class Program
    {
        private static void Main(string[] args)
        {
            CommandLineParser parser = new CommandLineParser(typeof(ProgramArgs));
            ProgramArgs arguments = null;

            try
            {
                arguments = (ProgramArgs)parser.Parse(args);
            }
            catch (CommandLineArgumentException ex)
            {
                Console.WriteLine(ex.Message);
                parser.WriteUsageToConsole();
                return;
            }

            if (arguments.Debug)
            {
                Console.WriteLine("Waiting for debugger...");
                while (true)
                {
                    if (Debugger.IsAttached)
                    {
                        Console.WriteLine("Debugger attached!");
                        break;
                    }

                    Thread.Sleep(100);
                }
            }

            if (arguments.ServerPort != 0)
            {
                // Server mode - listen on a network socket
                RunServer(arguments.ServerPort);
            }
            else
            {
                // Standard mode - run with the adapter connected to the process's stdin and stdout
                SampleDebugAdapter adapter = new SampleDebugAdapter(Console.OpenStandardInput(), Console.OpenStandardOutput());
                adapter.Protocol.LogMessage += (sender, e) => Debug.WriteLine(e.Message);
                adapter.Run();
            }
        }

        private static void RunServer(int port)
        {
            Console.WriteLine(Invariant($"Waiting for connections on port {port}..."));

            Thread listenThread = new Thread(() =>
            {
                TcpListener listener = new TcpListener(IPAddress.Parse("127.0.0.1"), port);
                listener.Start();

                while (true)
                {
                    Socket clientSocket = listener.AcceptSocket();
                    Thread clientThread = new Thread(() =>
                    {
                        Console.WriteLine("Accepted connection");

                        using (Stream stream = new NetworkStream(clientSocket))
                        {
                            SampleDebugAdapter adapter = new SampleDebugAdapter(stream, stream);
                            adapter.Protocol.LogMessage += (sender, e) => Console.WriteLine(e.Message);
                            adapter.Protocol.DispatcherError += (sender, e) =>
                            {
                                Console.Error.WriteLine(e.Exception.Message);
                            };
                            adapter.Run();
                            adapter.Protocol.WaitForReader();
                        }

                        Console.WriteLine("Connection closed");
                    });

                    clientThread.Name = "DebugServer connection thread";
                    clientThread.Start();
                }
            });

            listenThread.Name = "DebugServer listener thread";
            listenThread.Start();
            listenThread.Join();
        }
    }
}
