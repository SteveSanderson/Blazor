/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;

namespace VSCodeDebug
{
    internal class Program
    {
        const int DEFAULT_PORT = 4711;

        private static bool trace_requests;
        private static bool trace_responses;
        private static bool wait_for_debugger;
        static string LOG_FILE_PATH = null;

        private static void Main(string[] argv)
        {
            int port = -1;

            // parse command line arguments
            foreach (var a in argv)
            {
                switch (a)
                {
                    case "--trace":
                        trace_requests = true;
                        break;
                    case "--trace=response":
                        trace_requests = true;
                        trace_responses = true;
                        break;
                    case "--server":
                        port = DEFAULT_PORT;
                        break;
                    case "--debug":
                        wait_for_debugger = true;
                        break;
                    default:
                        if (a.StartsWith("--server="))
                        {
                            if (!int.TryParse(a.Substring("--server=".Length), out port))
                            {
                                port = DEFAULT_PORT;
                            }
                        }
                        else if (a.StartsWith("--log-file="))
                        {
                            LOG_FILE_PATH = a.Substring("--log-file=".Length);
                        }
                        break;
                }
            }

            if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable("mono_debug_logfile")) == false)
            {
                LOG_FILE_PATH = Environment.GetEnvironmentVariable("mono_debug_logfile");
                trace_requests = true;
                trace_responses = true;
            }

            if (wait_for_debugger)
            {
                Console.WriteLine("Waiting for attach");
                while (Debugger.IsAttached)
                {
                    System.Threading.Thread.Sleep(100);
                }
            }

            if (port > 0)
            {
                // TCP/IP server
                Program.Log("waiting for debug protocol on port " + port);
                RunServer(port);
            }
            else
            {
                // stdin/stdout
                Program.Log("waiting for debug protocol on stdin/stdout");
                RunSession(Console.OpenStandardInput(), Console.OpenStandardOutput());
            }
        }

        static TextWriter logFile;

        public static void Log(bool predicate, string format, params object[] data)
        {
            if (predicate)
            {
                Log(format, data);
            }
        }

        public static void Log(string format, params object[] data)
        {
            try
            {
                Console.Error.WriteLine(format, data);

                if (LOG_FILE_PATH != null)
                {
                    if (logFile == null)
                    {
                        logFile = File.CreateText(LOG_FILE_PATH);
                    }

                    string msg = string.Format(format, data);
                    logFile.WriteLine(string.Format("{0} {1}", DateTime.UtcNow.ToLongTimeString(), msg));
                }
            }
            catch (Exception ex)
            {
                if (LOG_FILE_PATH != null)
                {
                    try
                    {
                        File.WriteAllText(LOG_FILE_PATH + ".err", ex.ToString());
                    }
                    catch
                    {
                    }
                }

                throw;
            }
        }

        private static void RunSession(Stream inputStream, Stream outputStream)
        {
            DebugSession debugSession = new BlazorDebugSession();
            debugSession.TRACE = trace_requests;
            debugSession.TRACE_RESPONSE = trace_responses;
            debugSession.Start(inputStream, outputStream).Wait();

            if (logFile != null)
            {
                logFile.Flush();
                logFile.Close();
                logFile = null;
            }
        }

        private static void RunServer(int port)
        {
            TcpListener serverSocket = new TcpListener(IPAddress.Parse("127.0.0.1"), port);
            serverSocket.Start();

            new System.Threading.Thread(() =>
            {
                while (true)
                {
                    var clientSocket = serverSocket.AcceptSocket();
                    if (clientSocket != null)
                    {
                        Program.Log(">> accepted connection from client");

                        new System.Threading.Thread(() =>
                        {
                            using (var networkStream = new NetworkStream(clientSocket))
                            {
                                try
                                {
                                    RunSession(networkStream, networkStream);
                                }
                                catch (Exception e)
                                {
                                    Console.Error.WriteLine("Exception: " + e);
                                }
                            }
                            clientSocket.Close();
                            Console.Error.WriteLine(">> client connection closed");
                        }).Start();
                    }
                }
            }).Start();
        }
    }
}
