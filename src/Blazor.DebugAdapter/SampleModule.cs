// © Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol.Messages;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol.Utilities;
using Newtonsoft.Json.Linq;

using static System.FormattableString;

namespace SampleDebugAdapter
{
    internal sealed class SampleModule
    {
        private static Random RND = new Random();
        private static int loadOrder = 0;

        public SampleModule(string moduleId, string modulePath)
        {
            this.Id = moduleId;
            this.ModulePath = modulePath;
        }

        public SampleModule(string modulePath) :
            this(Guid.NewGuid().ToString(), modulePath)
        {
        }

        public void PopulateRandom()
        {
            this.Version = new Version(RND.Next(10), RND.Next(10)).ToString();

            if (RND.Next(2) == 0)
            {
                this.SymbolStatus = "Not Loaded";
            }
            else
            {
                this.SymbolStatus = "Loaded";
                this.SymbolFile = Path.ChangeExtension(this.ModulePath, "pdb");
            }

            this.LoadAddress = (ulong)(RND.Next(0x7FFFFFFF) + RND.Next(0x7FFFFFFF));
            this.PreferredLoadAddress = (RND.Next(2) == 0) ? (ulong)(RND.Next(0x7FFFFFFF) + RND.Next(0x7FFFFFFF)) : this.LoadAddress;
            this.Size = 10000000 * (RND.Next(10) + 1);
            this.LoadOrder = SampleModule.loadOrder++;
            this.TimestampUTC = DateTime.Now;
            this.Is64Bit = RND.Next(2) == 0;
            this.IsOptimized = RND.Next(2) == 0;
            this.IsUserCode = RND.Next(2) == 0;
            this.AppDomain = Invariant($"AppDomain{RND.Next(10)}");

            if (this.Is64Bit.HasValue)
            {
                this.LoadAddress <<= 32;
                this.PreferredLoadAddress <<= 32;
            }
        }

        public string Id { get; private set; }
        public string Name
        {
            get { return Path.GetFileName(this.ModulePath); }
        }
        public string ModulePath { get; private set; }
        public string Version { get; internal set; }
        public string SymbolStatus { get; internal set; }
        public ulong? LoadAddress { get; internal set; }
        public ulong? PreferredLoadAddress { get; internal set; }
        public int? Size { get; internal set; }
        public int? LoadOrder { get; internal set; }
        public DateTime? TimestampUTC { get; internal set; }
        public string SymbolFile { get; internal set; }
        public bool? Is64Bit { get; internal set; }
        public bool? IsOptimized { get; internal set; }
        public bool? IsUserCode { get; internal set; }
        public string AppDomain { get; internal set; }

        public Module GetProtocolModule()
        {
            string addressRange = null;
            if (this.Is64Bit ?? false)
            {
                addressRange = Invariant($"0x{(this.LoadAddress ?? 0):X16} - 0x{((this.LoadAddress ?? 0) + (ulong)(this.Size ?? 0)):X16}");
            }
            else
            {
                addressRange = Invariant($"0x{(this.LoadAddress ?? 0):X8} - 0x{((this.LoadAddress ?? 0) + (ulong)(this.Size ?? 0)):X8}");
            }

            Module module = new Module(
                id: this.Id.ToString(),
                name: this.Name,
                path: this.ModulePath,
                isOptimized: this.IsOptimized,
                isUserCode: this.IsUserCode,
                version: this.Version.ToString(),
                symbolStatus: this.SymbolStatus,
                symbolFilePath: this.SymbolFile,
                dateTimeStamp: this.TimestampUTC.HasValue ? this.TimestampUTC.Value.ToLocalTime().ToString() : null,
                addressRange: addressRange,
                vsLoadAddress: this.LoadAddress?.ToString(),
                vsPreferredLoadAddress: this.PreferredLoadAddress?.ToString(),
                vsModuleSize: this.Size,
                vsLoadOrder: this.LoadOrder,
                vsTimestampUTC: ((ulong?)this.TimestampUTC?.ToUnixTimestamp())?.ToString(),
                vsIs64Bit: this.Is64Bit,
                vsAppDomain: this.AppDomain
                );


            return module;
        }
    }
}
