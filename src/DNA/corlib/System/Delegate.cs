#if !LOCALTEST

namespace System {
	public abstract class Delegate {

		// These must be the same as defined in the interpreter
		// If/when reflection is implemented, this IntPtr may change to MethodInfo
		private object targetObj = null;
		private IntPtr targetMethod = IntPtr.Zero;
		protected Delegate pNext = null;

		public override bool Equals(object obj) {
			Delegate d = obj as Delegate;
			if (d == null) {
				return false;
			}
			return d.targetObj == this.targetObj && d.targetMethod.Equals(this.targetMethod);
		}

		public override int GetHashCode() {
			int ret = targetMethod.GetHashCode();
			if (targetObj != null) {
				ret ^= targetObj.GetHashCode();
			}
			return ret;
		}

		public static Delegate Combine(Delegate a, Delegate b) {
			if (a == null) {
				return b;
			} else if (b == null) {
				return a;
			}

			if (a.GetType() != b.GetType()) {
				throw new ArgumentException("Incompatible delegate types");
			}

			return a.CombineImpl(b);
		}

		protected virtual Delegate CombineImpl(Delegate d) {
			throw new MulticastNotSupportedException();
		}

		public static Delegate Remove(Delegate source, Delegate value) {
			if (source == null) {
				return null;
			}
			return source.RemoveImpl(value);
		}

		protected virtual Delegate RemoveImpl(Delegate d) {
			if (d.Equals(this)) {
				return null;
			}
			return this;
		}
	}
}

#endif