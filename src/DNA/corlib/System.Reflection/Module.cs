namespace System.Reflection {
	public abstract class Module : ICustomAttributeProvider {

		protected Module() {
		}

		public abstract string Name { get; }

		public abstract bool IsDefined(Type attributeType, bool inherit);

		public abstract Object[] GetCustomAttributes(bool inherit);

		public abstract Object[] GetCustomAttributes(Type attributeType, bool inherit);
	}
}
