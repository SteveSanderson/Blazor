namespace System.Reflection {
	public abstract class ParameterInfo : ICustomAttributeProvider {

		protected ParameterInfo() {
		}

		public abstract string Name { get; }

		public abstract bool IsDefined(Type attributeType, bool inherit);

		public abstract Object[] GetCustomAttributes(bool inherit);

		public abstract Object[] GetCustomAttributes(Type attributeType, bool inherit);
	}
}
