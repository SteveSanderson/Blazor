// Copyright (c) 2012 DotNetAnywhere
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#include "Compat.h"
#include "Sys.h"

#include "InternalCall.h"
#include "MetaData.h"
#include "Type.h"

#include "System.String.h"
#include "System.Object.h"
#include "System.Console.h"
#include "System.Array.h"
#include "System.Environment.h"
#include "System.Runtime.CompilerServices.RuntimeHelpers.h"
#include "System.ValueType.h"
#include "System.RuntimeType.h"
#include "System.Type.h"
#include "System.Threading.Monitor.h"
#include "System.Threading.Thread.h"
#include "System.Threading.Interlocked.h"
#include "System.Enum.h"
#include "System.WeakReference.h"
#include "System.GC.h"
#include "System.IO.FileInternal.h"
#include "System.Char.h"
#include "System.Diagnostics.Debugger.h"
#include "System.Net.Sockets.Socket.h"
#include "System.Net.Dns.h"
#include "System.DateTime.h"
#include "System.Math.h"
#include "Delegate.h"

#define MAX_PARAMS 6

typedef struct tInternalCall_ tInternalCall;
struct tInternalCall_ {
	STRING nameSpace;
	STRING type;
	STRING method;
	fnInternalCall fn;
	U8 returnType;
	U8 numParameters;
	U8 parameterTypes[MAX_PARAMS];
};

static tInternalCall internalCalls[] = {
	{"System", "Object", "Equals", System_Object_Equals, TYPE_SYSTEM_BOOLEAN, 1, {TYPE_SYSTEM_OBJECT}},
	{NULL,      NULL,    "Clone", System_Object_Clone, TYPE_SYSTEM_OBJECT, 1, {TYPE_SYSTEM_OBJECT}},
	{NULL,      NULL,    "GetHashCode", System_Object_GetHashCode, TYPE_SYSTEM_INT32, 0},
	{NULL,      NULL,    "GetType", System_Object_GetType, TYPE_SYSTEM_TYPE, 0},

	{NULL, "String", ".ctor", System_String_ctor_CharInt32, TYPE_SYSTEM_VOID, 2, {TYPE_SYSTEM_CHAR, TYPE_SYSTEM_INT32}},
	{NULL, NULL,     ".ctor", System_String_ctor_CharAIntInt, TYPE_SYSTEM_VOID, 3, {TYPE_SYSTEM_ARRAY_CHAR, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32}},
	{NULL, NULL,     ".ctor", System_String_ctor_StringIntInt, TYPE_SYSTEM_VOID, 3, {TYPE_SYSTEM_STRING, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32}},
	{NULL, NULL,     "get_Chars", System_String_get_Chars, TYPE_SYSTEM_CHAR, 1, {TYPE_SYSTEM_INT32}},
	{NULL, NULL,     "InternalConcat", System_String_InternalConcat, TYPE_SYSTEM_STRING, 2, {TYPE_SYSTEM_STRING, TYPE_SYSTEM_STRING}},
	{NULL, NULL,     "InternalTrim", System_String_InternalTrim, TYPE_SYSTEM_STRING, 2, {TYPE_SYSTEM_ARRAY_CHAR, TYPE_SYSTEM_INT32}},
	{NULL, NULL,     "Equals", System_String_Equals, TYPE_SYSTEM_BOOLEAN, 2, {TYPE_SYSTEM_STRING, TYPE_SYSTEM_STRING}},
	{NULL, NULL,     "GetHashCode", System_String_GetHashCode, TYPE_SYSTEM_INT32, 0},
	{NULL, NULL,     "InternalReplace", System_String_InternalReplace, TYPE_SYSTEM_STRING, 2, {TYPE_SYSTEM_STRING, TYPE_SYSTEM_STRING}},
	{NULL, NULL,     "InternalIndexOf", System_String_InternalIndexOf, TYPE_SYSTEM_INT32, 4, {TYPE_SYSTEM_CHAR, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_BOOLEAN}},
	{NULL, NULL,     "InternalIndexOfAny", System_String_InternalIndexOfAny, TYPE_SYSTEM_INT32, 4, {TYPE_SYSTEM_ARRAY_CHAR, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_BOOLEAN}},

	{NULL, "Array", "Internal_GetValue", System_Array_Internal_GetValue, TYPE_SYSTEM_OBJECT, 1, {TYPE_SYSTEM_INT32}},
	{NULL, NULL,    "Internal_SetValue", System_Array_Internal_SetValue, TYPE_SYSTEM_BOOLEAN, 2, {TYPE_SYSTEM_OBJECT, TYPE_SYSTEM_INT32}},
	{NULL, NULL,    "Clear", System_Array_Clear, TYPE_SYSTEM_VOID, 3, {TYPE_SYSTEM_ARRAY_NO_TYPE, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32}},
	{NULL, NULL,    "Internal_Copy", System_Array_Internal_Copy, TYPE_SYSTEM_BOOLEAN, 5, {TYPE_SYSTEM_ARRAY_NO_TYPE, TYPE_SYSTEM_INT32, TYPE_SYSTEM_ARRAY_NO_TYPE, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32}},
	{NULL, NULL,    "Resize", System_Array_Resize, TYPE_SYSTEM_VOID, 2, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_INT32}},
	{NULL, NULL,    "Reverse", System_Array_Reverse, TYPE_SYSTEM_VOID, 3, {TYPE_SYSTEM_ARRAY_NO_TYPE, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32}},

	{NULL, "Console", "Write", System_Console_Write, TYPE_SYSTEM_VOID, 1, {TYPE_SYSTEM_STRING}},
	{NULL, NULL     , "Internal_ReadKey", System_Console_Internal_ReadKey, TYPE_SYSTEM_INT32, 0},
	{NULL, NULL     , "Internal_KeyAvailable", System_Console_Internal_KeyAvailable, TYPE_SYSTEM_BOOLEAN, 0},

	{NULL, "Environment", "get_TickCount", System_Environment_get_TickCount, TYPE_SYSTEM_INT32, 0},
	{NULL, NULL         , "GetOSVersionString", System_Environment_GetOSVersionString, TYPE_SYSTEM_STRING, 0},
	{NULL, NULL         , "get_Platform", System_Environment_get_Platform, TYPE_SYSTEM_PLATFORMID, 0},

	{NULL, "Type", "GetTypeFromHandle", System_Type_GetTypeFromHandle, TYPE_SYSTEM_TYPE, 1, {TYPE_SYSTEM_RUNTIMETYPEHANDLE}},
	{NULL, NULL,   "get_IsValueType", System_Type_get_IsValueType, TYPE_SYSTEM_BOOLEAN, 0},

	{NULL, "RuntimeType", "get_Name", System_RuntimeType_get_Name, TYPE_SYSTEM_STRING, 0},
	{NULL, NULL,          "get_Namespace", System_RuntimeType_get_Namespace, TYPE_SYSTEM_STRING, 0},
	{NULL, NULL,          "GetNestingParentType", System_RuntimeType_GetNestingParentType, TYPE_SYSTEM_RUNTIMETYPE, 0},
	{NULL, NULL,          "get_BaseType", System_RuntimeType_get_BaseType, TYPE_SYSTEM_TYPE, 0},
	{NULL, NULL,          "get_IsEnum", System_RuntimeType_get_IsEnum, TYPE_SYSTEM_BOOLEAN, 0},
	{NULL, NULL,          "get_IsGenericType", System_RuntimeType_get_IsGenericType, TYPE_SYSTEM_BOOLEAN, 0},
	{NULL, NULL,          "Internal_GetGenericTypeDefinition", System_RuntimeType_Internal_GetGenericTypeDefinition, TYPE_SYSTEM_RUNTIMETYPE, 0},
	{NULL, NULL,          "GetGenericArguments", System_RuntimeType_GetGenericArguments, TYPE_SYSTEM_ARRAY_TYPE, 0},

	{NULL, "Char", "GetUnicodeCategory", System_Char_GetUnicodeCategory, TYPE_SYSTEM_GLOBALIZATION_UNICODECATEGORY, 1, {TYPE_SYSTEM_CHAR}},
	{NULL, NULL  , "ToLowerInvariant", System_Char_ToLowerInvariant, TYPE_SYSTEM_CHAR, 1, {TYPE_SYSTEM_CHAR}},
	{NULL, NULL  , "ToUpperInvariant", System_Char_ToUpperInvariant, TYPE_SYSTEM_CHAR, 1, {TYPE_SYSTEM_CHAR}},

	{NULL, "GC", "Collect", System_GC_Collect, TYPE_SYSTEM_VOID, 0},
	{NULL, NULL, "Internal_CollectionCount", System_GC_Internal_CollectionCount, TYPE_SYSTEM_INT32, 0},
	{NULL, NULL, "GetTotalMemory", System_GC_GetTotalMemory, TYPE_SYSTEM_INT64, 1, {TYPE_SYSTEM_BOOLEAN}},
	{NULL, NULL, "SuppressFinalize", System_GC_SuppressFinalize, TYPE_SYSTEM_VOID, 1, {TYPE_SYSTEM_OBJECT}},

	{NULL, "Enum", "Internal_GetValue", System_Enum_Internal_GetValue, TYPE_SYSTEM_INT32, 0},
	{NULL, NULL,   "Internal_GetInfo", System_Enum_Internal_GetInfo, TYPE_SYSTEM_VOID, 3, {TYPE_SYSTEM_TYPE, TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_INTPTR}},

	{NULL, "ValueType", "GetFields", System_ValueType_GetFields, TYPE_SYSTEM_ARRAY_NO_TYPE, 2, {TYPE_SYSTEM_OBJECT, TYPE_SYSTEM_OBJECT}},

	{NULL, "WeakReference", "get_Target", System_WeakReference_get_Target, TYPE_SYSTEM_OBJECT, 0},
	{NULL, NULL,            "set_Target", System_WeakReference_set_Target, TYPE_SYSTEM_VOID, 1, {TYPE_SYSTEM_OBJECT}},

	{NULL, "DateTime", "InternalUtcNow", System_DateTime_InternalUtcNow, TYPE_SYSTEM_INT64, 0},

	{NULL, "Math", "Sin", System_Math_Sin, TYPE_SYSTEM_DOUBLE, 1, {TYPE_SYSTEM_DOUBLE}},
	{NULL, NULL,   "Cos", System_Math_Cos, TYPE_SYSTEM_DOUBLE, 1, {TYPE_SYSTEM_DOUBLE}},
	{NULL, NULL,   "Tan", System_Math_Tan, TYPE_SYSTEM_DOUBLE, 1, {TYPE_SYSTEM_DOUBLE}},
	{NULL, NULL,   "Pow", System_Math_Pow, TYPE_SYSTEM_DOUBLE, 2, {TYPE_SYSTEM_DOUBLE, TYPE_SYSTEM_DOUBLE}},
	{NULL, NULL,   "Sqrt", System_Math_Sqrt, TYPE_SYSTEM_DOUBLE, 1, {TYPE_SYSTEM_DOUBLE}},

	{"System.Threading", "Thread", ".ctor", System_Threading_Thread_ctor, TYPE_SYSTEM_VOID, 1, {TYPE_SYSTEM_THREADING_THREADSTART}},
	{NULL,               NULL,     ".ctor", System_Threading_Thread_ctorParam, TYPE_SYSTEM_VOID, 1, {TYPE_SYSTEM_THREADING_PARAMETERIZEDTHREADSTART}},
	{NULL,               NULL,     "Start", System_Threading_Thread_Start, TYPE_SYSTEM_VOID, 0},
	{NULL,               NULL,     "Sleep", System_Threading_Thread_Sleep, TYPE_SYSTEM_VOID, 1, {TYPE_SYSTEM_INT32}},
	{NULL,               NULL,     "get_CurrentThread", System_Threading_Thread_get_CurrentThread, TYPE_SYSTEM_THREADING_THREAD, 0},

	{NULL, "Monitor", "Internal_TryEnter", System_Threading_Monitor_Internal_TryEnter, TYPE_SYSTEM_BOOLEAN, 2, {TYPE_SYSTEM_OBJECT, TYPE_SYSTEM_INT32}},
	{NULL, NULL,      "Internal_Exit", System_Threading_Monitor_Internal_Exit, TYPE_SYSTEM_VOID, 1, {TYPE_SYSTEM_OBJECT}},

	{NULL, "Interlocked", "CompareExchange", System_Threading_Interlocked_CompareExchange_Int32, TYPE_SYSTEM_INT32, 3, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32}},
	{NULL, NULL,          "Increment", System_Threading_Interlocked_Increment_Int32, TYPE_SYSTEM_INT32, 1, {TYPE_SYSTEM_INTPTR}},
	{NULL, NULL,          "Decrement", System_Threading_Interlocked_Decrement_Int32, TYPE_SYSTEM_INT32, 1, {TYPE_SYSTEM_INTPTR}},
	{NULL, NULL,          "Add", System_Threading_Interlocked_Add_Int32, TYPE_SYSTEM_INT32, 2, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_INT32}},
	{NULL, NULL,          "Exchange", System_Threading_Interlocked_Exchange_Int32, TYPE_SYSTEM_INT32, 2, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_INT32}},

	{"System.IO", "FileInternal", "Open", System_IO_FileInternal_Open, TYPE_SYSTEM_INTPTR, 5, {TYPE_SYSTEM_STRING, TYPE_SYSTEM_IO_FILEMODE, TYPE_SYSTEM_IO_FILEACCESS, TYPE_SYSTEM_IO_FILESHARE, TYPE_SYSTEM_INTPTR}},
	{NULL,        NULL,           "Read", System_IO_FileInternal_Read, TYPE_SYSTEM_INT32, 5, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_ARRAY_BYTE, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INTPTR}},
	{NULL,        NULL,           "Close", System_IO_FileInternal_Close, TYPE_SYSTEM_VOID, 2, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_INTPTR}},
	{NULL,        NULL,           "GetCurrentDirectory", System_IO_FileInternal_GetCurrentDirectory, TYPE_SYSTEM_STRING, 1, {TYPE_SYSTEM_INTPTR}},
	{NULL,        NULL,           "GetFileAttributes", System_IO_FileInternal_GetFileAttributes, TYPE_SYSTEM_IO_FILESYSTEMATTRIBUTES, 2, {TYPE_SYSTEM_STRING, TYPE_SYSTEM_INTPTR}},
	{NULL,        NULL,           "GetFileSystemEntries", System_IO_FileInternal_GetFileSystemEntries, TYPE_SYSTEM_ARRAY_STRING, 5, {TYPE_SYSTEM_STRING, TYPE_SYSTEM_STRING, TYPE_SYSTEM_IO_FILESYSTEMATTRIBUTES, TYPE_SYSTEM_IO_FILESYSTEMATTRIBUTES, TYPE_SYSTEM_INTPTR}},

	{"System.Runtime.CompilerServices", "RuntimeHelpers", "InitializeArray", System_Runtime_CompilerServices_InitializeArray, TYPE_SYSTEM_VOID, 2, {TYPE_SYSTEM_ARRAY_NO_TYPE, TYPE_SYSTEM_RUNTIMEFIELDHANDLE}},

	{"System.Diagnostics", "Debugger", "Break", System_Diagnostics_Debugger_Break, TYPE_SYSTEM_VOID, 0},

	{"System.Net", "Dns", "Internal_GetHostEnt", System_Net_Dns_Internal_GetHostEnt, TYPE_SYSTEM_ARRAY_INT32, 2, {TYPE_SYSTEM_STRING, TYPE_SYSTEM_INTPTR}},

	{"System.Net.Sockets", "Socket", "Internal_CreateSocket", System_Net_Sockets_Internal_CreateSocket, TYPE_SYSTEM_INTPTR, 4, {TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INTPTR}}, 
	{NULL,                 NULL,     "Internal_Bind", System_Net_Sockets_Internal_Bind, TYPE_SYSTEM_VOID, 4, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_UINT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INTPTR}},
	{NULL,                 NULL,     "Internal_Close", System_Net_Sockets_Internal_Close, TYPE_SYSTEM_VOID, 1, {TYPE_SYSTEM_INTPTR}},
	{NULL,                 NULL,     "Internal_Listen", System_Net_Sockets_Internal_Listen, TYPE_SYSTEM_VOID, 3, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INTPTR}},
	{NULL,                 NULL,     "Internal_Accept", System_Net_Sockets_Internal_Accept, TYPE_SYSTEM_INTPTR, 2, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_INTPTR}},
	{NULL,                 NULL,     "Internal_Connect", System_Net_Sockets_Internal_Connect, TYPE_SYSTEM_VOID, 4, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_UINT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INTPTR}},
	{NULL,                 NULL,     "Internal_Receive", System_Net_Sockets_Internal_Receive, TYPE_SYSTEM_INT32, 6, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_ARRAY_BYTE, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INTPTR}},
	{NULL,                 NULL,     "Internal_Send", System_Net_Sockets_Internal_Send, TYPE_SYSTEM_INT32, 6, {TYPE_SYSTEM_INTPTR, TYPE_SYSTEM_ARRAY_BYTE, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INT32, TYPE_SYSTEM_INTPTR}},

	{NULL, NULL, NULL, NULL}
};

fnInternalCall InternalCall_Map(tMD_MethodDef *pMethod) {
	tInternalCall *pCall;
	STRING curNameSpace;
	STRING curType;

	if (pMethod->pParentType->pParent == types[TYPE_SYSTEM_MULTICASTDELEGATE]) {
		// Special case to handle delegates
		fnInternalCall fn = Map_Delegate(pMethod);
		if (fn != NULL) {
			return fn;
		}
	} else {

		for (pCall = internalCalls; pCall->method != NULL; pCall++) {
			if (pCall->nameSpace != NULL) {
				curNameSpace = pCall->nameSpace;
			}
			if (pCall->type != NULL) {
				curType = pCall->type;
			}
			if (strcmp(pMethod->pParentType->nameSpace, curNameSpace) == 0) {
				if (strcmp(pMethod->pParentType->name, curType) == 0) {
					if (Type_IsMethod(pMethod, pCall->method, types[pCall->returnType], pCall->numParameters, pCall->parameterTypes)) {
						return pCall->fn;
					}
				}
			}
		}

	}
	Crash("InternalCall_Map(): Cannot map [%s]%s.%s", pMethod->pParentType->nameSpace, pMethod->pParentType->name, pMethod->name);
	FAKE_RETURN;
}
