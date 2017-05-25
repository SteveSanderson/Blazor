#if !LOCALTEST

using System.Collections.Generic;
using System.Collections;

namespace System {
	public sealed class CharEnumerator : ICloneable, IEnumerator, IEnumerator<char> {

		private string str;
		private int index;
		private int length;

		internal CharEnumerator(string s) {
			this.str = s;
			this.index = -1;
			this.length = s.Length;
		}

		#region IClonable Members

		public object Clone() {
			return object.Clone(this);
		}

		#endregion

		#region IEnumerator Members

		object IEnumerator.Current {
			get {
				return Current;
			}
		}

		public bool MoveNext() {
			this.index++;
			return (this.index < this.length);
		}

		public void Reset() {
			this.index = -1;
		}

		#endregion

		#region IEnumerator<char> Members

		public char Current {
			get {
				if (index == -1 || index >= length) {
					throw new InvalidOperationException("The position is not valid.");
				}
				return str[index];
			}
		}

		#endregion

		#region IDisposable Members

		public void Dispose() {
			// Nothing needed
		}

		#endregion
	}
}

#endif
