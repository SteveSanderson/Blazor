// © Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol.Messages;
using Ookii.CommandLine;

using static System.FormattableString;

namespace SampleDebugAdapter
{
    internal class ModuleManager
    {
        #region Private Fields

        private SampleDebugAdapter adapter;
        private IList<SampleModule> loadedModules;

        #endregion

        #region Constructor

        internal ModuleManager(SampleDebugAdapter adapter)
        {
            this.adapter = adapter;
            this.loadedModules = new List<SampleModule>();

            this.adapter.RegisterDirective<LoadModuleArgs>("LoadModule", this.DoLoadModule);
            this.adapter.RegisterDirective<UnloadModuleArgs>("UnloadModule", this.DoUnloadModule);
        }

        #endregion

        #region Internal API

        internal SampleModule GetModuleById(string moduleId)
        {
            return this.loadedModules.FirstOrDefault(m => String.Equals(m.Id, moduleId, StringComparison.Ordinal));
        }

        #endregion

        #region Protocol Members

        internal ModulesResponse HandleModulesRequest(ModulesArguments arguments)
        {
            IEnumerable<Module> modules = this.loadedModules.Select(m => m.GetProtocolModule());

            int startModule = arguments.StartModule ?? 0;
            if (startModule != 0)
            {
                modules = modules.Skip(startModule);
            }

            int moduleCount = arguments.ModuleCount ?? 0;
            if (moduleCount != 0)
            {
                modules = modules.Take(moduleCount);
            }

            return new ModulesResponse(
                modules: modules.ToList(),
                totalModules: this.loadedModules.Count);
        }

        #endregion

        #region LoadModule Directive

        private class LoadModuleArgs
        {
            [CommandLineArgument("name", IsRequired = true, Position = 0, ValueDescription = "module name")]
            public string ModuleName { get; set; }

            [CommandLineArgument("id", IsRequired = false, ValueDescription = "module id")]
            public string Id { get; set; }

            [CommandLineArgument("version", IsRequired = false, ValueDescription = "version")]
            public string Version { get; set; }

            [CommandLineArgument("symbolstatus", IsRequired = false, ValueDescription = "symbol status")]
            public string SymbolStatus { get; set; }

            [CommandLineArgument("loadaddress", IsRequired = false, ValueDescription = "load address")]
            public string LoadAddress { get; set; }

            [CommandLineArgument("preferredloadaddress", IsRequired = false, ValueDescription = "preferred load address")]
            public string PreferredLoadAddress { get; set; }

            [CommandLineArgument("size", IsRequired = false, ValueDescription = "module size")]
            public string Size { get; set; }

            [CommandLineArgument("timestamp", IsRequired = false, ValueDescription = "symbol timestamp")]
            public string Timestamp { get; set; }

            [CommandLineArgument("symbolfile", IsRequired = false, ValueDescription = "symbol file")]
            public string SymbolFile { get; set; }

            [CommandLineArgument("is64bit", IsRequired = false, ValueDescription = "is 64-bit")]
            public bool? Is64Bit { get; set; }

            [CommandLineArgument("optimized", IsRequired = false, ValueDescription = "is optimized")]
            public bool? IsOptimized { get; set; }

            [CommandLineArgument("usercode", IsRequired = false, ValueDescription = "is user code")]
            public bool? IsUserCode { get; set; }

            [CommandLineArgument("appdomain", IsRequired = false, ValueDescription = "app domain")]
            public string AppDomain { get; set; }
        }

        private bool DoLoadModule(LoadModuleArgs args, StringBuilder output)
        {
            SampleModule module;

            if (String.IsNullOrEmpty(args.Id))
            {
                module = new SampleModule(args.ModuleName);
            }
            else
            {
                module = new SampleModule(args.Id, args.ModuleName);
            }

            bool shouldPopulateRandom = true;

            if (!String.IsNullOrEmpty(args.Version))
            {
                module.Version = args.Version;
                shouldPopulateRandom = false;
            }

            if (!String.IsNullOrEmpty(args.SymbolStatus))
            {
                module.SymbolStatus = args.SymbolStatus;
                shouldPopulateRandom = false;
            }

            if (!String.IsNullOrEmpty(args.LoadAddress))
            {
                NumberStyles styles = NumberStyles.Number;
                if (args.LoadAddress.StartsWith("0x", StringComparison.Ordinal))
                {
                    args.LoadAddress = args.LoadAddress.Substring(2);
                    styles = NumberStyles.HexNumber;
                }

                ulong addr;
                if (UInt64.TryParse(args.LoadAddress, styles, CultureInfo.InvariantCulture, out addr))
                {
                    module.LoadAddress = addr;
                    shouldPopulateRandom = false;
                }
                else
                {
                    output.AppendLine(Invariant($"Could not parse '{args.LoadAddress}' as an address!"));
                    return false;
                }
            }

            if (!String.IsNullOrEmpty(args.PreferredLoadAddress))
            {
                NumberStyles styles = NumberStyles.Number;
                if (args.PreferredLoadAddress.StartsWith("0x", StringComparison.Ordinal))
                {
                    args.PreferredLoadAddress = args.PreferredLoadAddress.Substring(2);
                    styles = NumberStyles.HexNumber;
                }

                ulong addr;
                if (UInt64.TryParse(args.PreferredLoadAddress, styles, CultureInfo.InvariantCulture, out addr))
                {
                    module.PreferredLoadAddress = addr;
                    shouldPopulateRandom = false;
                }
                else
                {
                    output.AppendLine(Invariant($"Could not parse '{args.PreferredLoadAddress}' as an address!"));
                    return false;
                }
            }

            if (!String.IsNullOrEmpty(args.Size))
            {
                NumberStyles styles = NumberStyles.Number;
                if (args.Size.StartsWith("0x", StringComparison.Ordinal))
                {
                    args.Size = args.Size.Substring(2);
                    styles = NumberStyles.HexNumber;
                }

                int size;
                if (Int32.TryParse(args.Size, styles, CultureInfo.InvariantCulture, out size))
                {
                    module.Size = size;
                    shouldPopulateRandom = false;
                }
                else
                {
                    output.AppendLine(Invariant($"Could not parse '{args.Size}' as an integer!"));
                    return false;
                }
            }

            if (!String.IsNullOrEmpty(args.Timestamp))
            {
                DateTime timestamp;
                if (DateTime.TryParse(args.Timestamp, out timestamp))
                {
                    // We assume the provided date is in the local timezone, so convert to UTC
                    module.TimestampUTC = timestamp.ToUniversalTime();
                    shouldPopulateRandom = false;
                }
                else
                {
                    output.AppendLine(Invariant($"Could not parse '{args.Timestamp}' as a date / time!"));
                    return false;
                }
            }

            if (!String.IsNullOrEmpty(args.SymbolFile))
            {
                module.SymbolFile = args.SymbolFile;
                shouldPopulateRandom = false;
            }

            if (args.Is64Bit.HasValue)
            {
                module.Is64Bit = args.Is64Bit.Value;
                shouldPopulateRandom = false;
            }

            if (args.IsOptimized.HasValue)
            {
                module.IsOptimized = args.IsOptimized.Value;
                shouldPopulateRandom = false;
            }

            if (args.IsUserCode.HasValue)
            {
                module.IsUserCode = args.IsUserCode.Value;
                shouldPopulateRandom = false;
            }

            if (!String.IsNullOrEmpty(args.AppDomain))
            {
                module.AppDomain = args.AppDomain;
                shouldPopulateRandom = false;
            }

            if (shouldPopulateRandom)
            {
                module.PopulateRandom();
            }

            output.AppendLine($"Loading module '{args.ModuleName}'");

            this.loadedModules.Add(module);

            this.adapter.Protocol.SendEvent(
                new ModuleEvent(
                    reason: ModuleEvent.ReasonValue.New,
                    module: module.GetProtocolModule()));

            return true;
        }

        #endregion

        #region UnloadModule Directive

        private class UnloadModuleArgs
        {
            [CommandLineArgument("name", IsRequired = true, Position = 0, ValueDescription = "module name")]
            public string ModuleName { get; set; }
        }

        private bool DoUnloadModule(UnloadModuleArgs args, StringBuilder output)
        {
            SampleModule module = this.loadedModules.FirstOrDefault(m => String.Equals(m.Name, args.ModuleName, StringComparison.OrdinalIgnoreCase));
            if (module == null)
            {
                output.AppendLine(Invariant($"Error: Unknown module '{args.ModuleName}'!"));
                return false;
            }

            output.AppendLine(Invariant($"Unloading module '{args.ModuleName}'"));
            this.adapter.Protocol.SendEvent(
                new ModuleEvent(
                    reason: ModuleEvent.ReasonValue.Removed,
                    module: new Module(
                        id: module.Id,
                        name: null)));

            return true;
        }

        #endregion
    }
}
