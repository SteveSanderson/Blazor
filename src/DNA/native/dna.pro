TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt

LIBS += -lm -ldl
#QMAKE_CXXFLAGS += -DJS_INTEROP
#QMAKE_CFLAGS += -DJS_INTEROP

SOURCES = \
    src/CLIFile.c \
    src/Delegate.c \
    src/dna.c \
    src/Finalizer.c \
    src/Generics.c \
    src/Heap.c \
    src/InternalCall.c \
    src/JIT_Execute.c \
    src/JIT.c \
    src/JSInterop.c \
    src/MetaData_Fill.c \
    src/MetaData_Search.c \
    src/MetaData.c \
    src/MethodState.c \
    src/PInvoke.c \
    src/Reflection.c \
    src/RVA.c \
    src/Sys.c \
    src/System.Array.c \
    src/System.Char.c \
    src/System.Console.c \
    src/System.DateTime.c \
    src/System.Diagnostics.Debugger.c \
    src/System.Enum.c \
    src/System.Environment.c \
    src/System.GC.c \
    src/System.IO.FileInternal.c \
    src/System.Math.c \
    src/System.Net.Dns.c \
    src/System.Net.Sockets.Socket.c \
    src/System.Object.c \
    src/System.Runtime.CompilerServices.RuntimeHelpers.c \
    src/System.RuntimeType.c \
    src/System.String.c \
    src/System.Threading.Interlocked.c \
    src/System.Threading.Monitor.c \
    src/System.Threading.Thread.c \
    src/System.Type.c \
    src/System.ValueType.c \
    src/System.WeakReference.c \
    src/Thread.c \
    src/Type.c

HEADERS += \
    src/CIL_OpCodes.h \
    src/CLIFile.h \
    src/Compat.h \
    src/Config.h \
    src/Delegate.h \
    src/EvalStack.h \
    src/Finalizer.h \
    src/Generics.h \
    src/Heap.h \
    src/InternalCall.h \
    src/JIT_OpCodes.h \
    src/JIT.h \
    src/JSInterop.h \
    src/MetaData.h \
    src/MetaDataTables.h \
    src/MethodState.h \
    src/PInvoke_CaseCode.h \
    src/PInvoke_TypeDef.h \
    src/PInvoke.h \
    src/Reflection.h \
    src/RVA.h \
    src/Sys.h \
    src/System.Array.h \
    src/System.Attribute.h \
    src/System.Char.CaseConversion.h \
    src/System.Char.h \
    src/System.Char.UC_IndexRuns.h \
    src/System.Console.h \
    src/System.DateTime.h \
    src/System.Diagnostics.Debugger.h \
    src/System.Enum.h \
    src/System.Environment.h \
    src/System.GC.h \
    src/System.IO.FileInternal.h \
    src/System.Math.h \
    src/System.Net.Dns.h \
    src/System.Net.Sockets.Socket.h \
    src/System.Object.h \
    src/System.Reflection.MemberInfo.h \
    src/System.Reflection.MethodBase.h \
    src/System.Reflection.MethodInfo.h \
    src/System.Reflection.PropertyInfo.h \
    src/System.Runtime.CompilerServices.RuntimeHelpers.h \
    src/System.RuntimeType.h \
    src/System.String.h \
    src/System.Threading.Interlocked.h \
    src/System.Threading.Monitor.h \
    src/System.Threading.Thread.h \
    src/System.Type.h \
    src/System.ValueType.h \
    src/System.WeakReference.h \
    src/Thread.h \
    src/Type.h \
    src/Types.h
