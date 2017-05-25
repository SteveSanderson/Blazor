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
	public class ArgumentException : SystemException {

		private string paramName;

		public ArgumentException() : base("An invalid argument was specified.") { }

		public ArgumentException(string message) : base(message) { }

		public ArgumentException(string message, Exception innerException) : base(message, innerException) { }

		public ArgumentException(string message, string paramName)
			: base(message) {

			this.paramName = paramName;
		}

		public virtual string ParamName {
			get {
				return paramName;
			}
		}

		public override string Message {
			get {
				string baseMsg = base.Message;
				if (baseMsg == null) {
					baseMsg = "An invalid argument was specified.";
				}
				if (paramName == null) {
					return baseMsg;
				} else {
					return baseMsg + Environment.NewLine + "Parameter name: " + paramName;
				}
			}
		}

	}
}

#endif
