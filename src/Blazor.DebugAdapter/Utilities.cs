/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
using System;
using System.Net.Sockets;
using System.Net;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Reflection;
using System.Diagnostics;

namespace VSCodeDebug
{
    public class Utilities
    {
        private const string WHICH = "/usr/bin/which";
        private const string WHERE = "where";

        private static readonly Regex VARIABLE = new Regex(@"\{(\w+)\}");

        private static char[] ARGUMENT_SEPARATORS = new char[] { ' ', '\t' };

        /*
		 * Enclose the given string in quotes if it contains space or tab characters.
		 */
        public static string Quote(string arg)
        {
            if (arg.IndexOfAny(ARGUMENT_SEPARATORS) >= 0)
            {
                return '"' + arg + '"';
            }
            return arg;
        }

        /*
		 * Is the given runtime executable on the PATH.
		 */
        public static bool IsOnPath(string runtime)
        {
            var process = new Process();

            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.FileName = File.Exists(WHICH) ? WHICH : WHERE;
            process.StartInfo.Arguments = Quote(runtime);

            try
            {
                process.Start();
                process.WaitForExit();
                return process.ExitCode == 0;
            }
            catch (Exception)
            {
                // ignore
            }

            return false;
        }

        public static string ConcatArgs(string[] args)
        {
            var arg = "";
            if (args != null)
            {
                foreach (var r in args)
                {
                    if (arg.Length > 0)
                    {
                        arg += " ";
                    }
                    arg += Utilities.Quote(r);
                }
            }
            return arg;
        }

        /*
		 * Resolve hostname, dotted-quad notation for IPv4, or colon-hexadecimal notation for IPv6 to IPAddress.
		 * Returns null on failure.
		 */
        public static IPAddress ResolveIPAddress(string addressString)
        {
            try
            {
                IPAddress ipaddress = null;
                if (IPAddress.TryParse(addressString, out ipaddress))
                {
                    return ipaddress;
                }

#if DNXCORE50
				IPHostEntry entry = Dns.GetHostEntryAsync(addressString).Result;
#else
                IPHostEntry entry = Dns.GetHostEntry(addressString);
#endif
                if (entry != null && entry.AddressList != null && entry.AddressList.Length > 0)
                {
                    if (entry.AddressList.Length == 1)
                    {
                        return entry.AddressList[0];
                    }
                    foreach (IPAddress address in entry.AddressList)
                    {
                        if (address.AddressFamily == AddressFamily.InterNetwork)
                        {
                            return address;
                        }
                    }
                }
            }
            catch (Exception)
            {
                // fall through
            }

            return null;
        }

        /*
		 * Find a free socket port.
		 */
        public static int FindFreePort(int fallback)
        {
            TcpListener l = null;
            try
            {
                l = new TcpListener(IPAddress.Loopback, 0);
                l.Start();
                return ((IPEndPoint)l.LocalEndpoint).Port;
            }
            catch (Exception)
            {
                // ignore
            }
            finally
            {
                l.Stop();
            }
            return fallback;
        }

        public static string ExpandVariables(string format, dynamic variables, bool underscoredOnly = true)
        {
            if (variables == null)
            {
                variables = new { };
            }
            Type type = variables.GetType();
            return VARIABLE.Replace(format, match =>
            {
                string name = match.Groups[1].Value;
                if (!underscoredOnly || name.StartsWith("_"))
                {

                    PropertyInfo property = type.GetProperty(name);
                    if (property != null)
                    {
                        object value = property.GetValue(variables, null);
                        return value.ToString();
                    }
                    return '{' + name + ": not found}";
                }
                return match.Groups[0].Value;
            });
        }

        /**
		 * converts the given absPath into a path that is relative to the given dirPath.
		 */
        public static string MakeRelativePath(string dirPath, string absPath)
        {
            if (!dirPath.EndsWith("/"))
            {
                dirPath += "/";
            }
            if (absPath.StartsWith(dirPath))
            {
                return absPath.Replace(dirPath, "");
            }
            return absPath;
            /*
			Uri uri1 = new Uri(path);
			Uri uri2 = new Uri(dir_path);
			return uri2.MakeRelativeUri(uri1).ToString();
			*/
        }
    }
}
