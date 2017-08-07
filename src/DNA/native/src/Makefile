.include <N750.prog.mk>

PROG=	dna

SRCS=	CLIFile.c
SRCS+=	Delegate.c
SRCS+=	dna.c
SRCS+=	Finalizer.c
SRCS+=	Generics.c
SRCS+=	Heap.c
SRCS+=	InternalCall.c
SRCS+=	JIT.c
SRCS+=	JIT_Execute.c
SRCS+=	MetaData.c
SRCS+=	MetaData_Fill.c
SRCS+=	MetaData_Search.c
SRCS+=	MethodState.c
SRCS+=	PInvoke.c
SRCS+=	RVA.c
SRCS+=	Sys.c
SRCS+=	Thread.c
SRCS+=	Type.c

SRCS+=	System.Array.c
SRCS+=	System.Char.c
SRCS+=	System.Console.c
SRCS+=	System.DateTime.c
SRCS+=	System.Diagnostics.Debugger.c
SRCS+=	System.Environment.c
SRCS+=	System.Enum.c
SRCS+=	System.GC.c
SRCS+=	System.IO.FileInternal.c
SRCS+=	System.Math.c
SRCS+=	System.Net.Dns.c
SRCS+=	System.Net.Sockets.Socket.c
SRCS+=	System.Object.c
SRCS+=	System.Runtime.CompilerServices.RuntimeHelpers.c
SRCS+=	System.RuntimeType.c
SRCS+=	System.String.c
SRCS+=	System.Type.c
SRCS+=	System.Threading.Interlocked.c
SRCS+=	System.Threading.Monitor.c
SRCS+=	System.Threading.Thread.c
SRCS+=	System.ValueType.c
SRCS+=	System.WeakReference.c

#CFLAGS= -O0 -g -I. -Wall -Werror 
#-mips2 -mcpu=r3900
#CFLAGS= -Os -g -I. -Wall -Werror -mips2 -mcpu=r3900
CFLAGS= -Os -I. -Wall -Werror

LDFLAGS+=--no-undefined
LDADD+=-s
LDADD+=-lm

.include <bsd.prog.mk>

