// source: https://bitbucket.org/danipen/mono/src/master/mcs/class/corlib/System.Collections/IStructuralComparable.cs
// Copyright (C) 2009 Novell

using System;

namespace System.Collections {
    public interface IStructuralComparable {
        int CompareTo(object other, IComparer comparer);
    }
}