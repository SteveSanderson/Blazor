// source: https://bitbucket.org/danipen/mono/src/master/mcs/class/corlib/System.Collections/IStructuralEquatable.cs
// Copyright (C) 2009 Novell

using System;

namespace System.Collections
{
	public interface IStructuralEquatable {
		bool Equals (object other, IEqualityComparer comparer);

		int GetHashCode (IEqualityComparer comparer);
	}
}