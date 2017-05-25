using System;
using System.Collections.Generic;
using System.Text;

namespace System
{
    public delegate TRes Func<TRes>();
    public delegate TRes Func<T1, TRes>(T1 arg1);
    public delegate TRes Func<T1, T2, TRes>(T1 arg1, T2 arg2);
    public delegate TRes Func<T1, T2, T3, TRes>(T1 arg1, T2 arg2, T3 arg3);
    public delegate TRes Func<T1, T2, T3, T4, TRes>(T1 arg1, T2 arg2, T3 arg3, T4 arg4);
    public delegate TRes Func<T1, T2, T3, T4, T5, TRes>(T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5);
}
