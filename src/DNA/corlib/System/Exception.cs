#if !LOCALTEST

namespace System {
	public class Exception {

		private Exception innerException;
		private string message;
		private int hresult = unchecked((int)0x80004005);

		public Exception() { }

		public Exception(string message) {
			this.message = message;
		}

		public Exception(string message, Exception innerException) {
			this.innerException = innerException;
			this.message = message;
		}

		public virtual string Message {
			get {
				return message;
			}
		}

		public Exception InnerException {
			get {
				return innerException;
			}
		}

		protected int HResult {
			get { return hresult; }
			set { hresult = value; }
		}

		public override string ToString() {
			return Message ?? string.Empty;
		}
	}
}

#endif