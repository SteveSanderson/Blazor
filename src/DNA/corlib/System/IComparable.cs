#if !LOCALTEST

namespace System {

	public interface IComparable {
		int CompareTo(object obj);
	}

	public interface IComparable<T> {
		int CompareTo(T x);
	}

}

#endif