// Copyright (c) 2012 DotNetAnywhere
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#if !LOCALTEST

namespace System {
	public sealed class OperatingSystem : ICloneable {

		private PlatformID platformID;
		private Version version;

		public OperatingSystem(PlatformID platformID, Version version) {
			if (version == null) {
				throw new ArgumentNullException("version");
			}
			this.platformID = platformID;
			this.version = version;
		}

		public PlatformID Platform {
			get {
				return this.platformID;
			}
		}

		public Version Version {
			get {
				return this.version;
			}
		}

		public string ServicePack {
			get {
				return String.Empty;
			}
		}

		public string VersionString {
			get {
				return ToString();
			}
		}

		public override string ToString() {
			string str;

			switch (this.platformID) {
				case PlatformID.Win32NT:
					str = "Microsoft Windows NT";
					break;
				case PlatformID.Win32S:
					str = "Microsoft Win32S";
					break;
				case PlatformID.Win32Windows:
					str = "Microsoft Windows 98";
					break;
				case PlatformID.WinCE:
					str = "Microsoft Windows CE";
					break;
				case PlatformID.Unix:
					str = "Unix";
					break;
				default:
					str = "<unknown>";
					break;
			}

			return str + " " + this.version.ToString() + " (DNA)";
		}

		#region ICloneable Members

		public object Clone() {
			return (OperatingSystem)object.Clone(this);
		}

		#endregion
	}
}

#endif
