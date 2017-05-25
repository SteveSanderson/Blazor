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

#include "Type.h"

#include "MetaData.h"
#include "Types.h"
#include "EvalStack.h"
#include "Generics.h"
#include "System.RuntimeType.h"
#include "Thread.h"

typedef struct tArrayTypeDefs_ tArrayTypeDefs;
struct tArrayTypeDefs_ {
	tMD_TypeDef *pArrayType;
	tMD_TypeDef *pElementType;

	tArrayTypeDefs *pNext;
};

static tArrayTypeDefs *pArrays;

#define GENERICARRAYMETHODS_NUM 13
static U8 genericArrayMethodsInited = 0;
static tMD_MethodDef *ppGenericArrayMethods[GENERICARRAYMETHODS_NUM];

#define GENERICARRAYMETHODS_Internal_GetGenericEnumerator 0
#define GENERICARRAYMETHODS_get_Length 1
#define GENERICARRAYMETHODS_get_IsReadOnly 2
#define GENERICARRAYMETHODS_Internal_GenericAdd 3
#define GENERICARRAYMETHODS_Internal_GenericClear 4
#define GENERICARRAYMETHODS_Internal_GenericContains 5
#define GENERICARRAYMETHODS_Internal_GenericCopyTo 6
#define GENERICARRAYMETHODS_Internal_GenericRemove 7
#define GENERICARRAYMETHODS_Internal_GenericIndexOf 8
#define GENERICARRAYMETHODS_Internal_GenericInsert 9
#define GENERICARRAYMETHODS_Internal_GenericRemoveAt 10
#define GENERICARRAYMETHODS_Internal_GenericGetItem 11
#define GENERICARRAYMETHODS_Internal_GenericSetItem 12
static char *pGenericArrayMethodsInit[GENERICARRAYMETHODS_NUM] = {
	"Internal_GetGenericEnumerator",
	"get_Length",
	"Internal_GenericIsReadOnly",
	"Internal_GenericAdd",
	"Internal_GenericClear",
	"Internal_GenericContains",
	"Internal_GenericCopyTo",
	"Internal_GenericRemove",
	"Internal_GenericIndexOf",
	"Internal_GenericInsert",
	"Internal_GenericRemoveAt",
	"Internal_GenericGetItem",
	"Internal_GenericSetItem",
};

static void GetMethodDefs() {
	IDX_TABLE token, last;
	tMetaData *pMetaData;

	pMetaData = types[TYPE_SYSTEM_ARRAY_NO_TYPE]->pMetaData;
	last = types[TYPE_SYSTEM_ARRAY_NO_TYPE]->isLast?
		MAKE_TABLE_INDEX(MD_TABLE_METHODDEF, pMetaData->tables.numRows[MD_TABLE_METHODDEF]):
		(types[TYPE_SYSTEM_ARRAY_NO_TYPE][1].methodList - 1);
	token = types[TYPE_SYSTEM_ARRAY_NO_TYPE]->methodList;
	for (; token <= last; token++) {
		tMD_MethodDef *pMethod;
		U32 i;

		pMethod = (tMD_MethodDef*)MetaData_GetTableRow(pMetaData, token);
		for (i=0; i<GENERICARRAYMETHODS_NUM; i++) {
			if (strcmp(pMethod->name, pGenericArrayMethodsInit[i]) == 0) {
				ppGenericArrayMethods[i] = pMethod;
				break;
			}
		}

	}
	genericArrayMethodsInited = 1;
}

static void CreateNewArrayType(tMD_TypeDef *pNewArrayType, tMD_TypeDef *pElementType, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	MetaData_Fill_TypeDef(types[TYPE_SYSTEM_ARRAY_NO_TYPE], NULL, NULL);

	memcpy(pNewArrayType, types[TYPE_SYSTEM_ARRAY_NO_TYPE], sizeof(tMD_TypeDef));
	pNewArrayType->pArrayElementType = pElementType;
	pNewArrayType->isFilled = 1;

	// Auto-generate the generic interfaces IEnumerable<T>, ICollection<T> and IList<T> for this array
	{
		tInterfaceMap *pInterfaceMap, *pAllIMs;
		tMD_TypeDef *pInterfaceT;
		tMD_MethodDef *pMethod;
		U32 orgNumInterfaces;

		if (genericArrayMethodsInited == 0) {
			GetMethodDefs();
		}

		orgNumInterfaces = pNewArrayType->numInterfaces;
		pNewArrayType->numInterfaces += 3;
		pAllIMs = (tInterfaceMap*)mallocForever(pNewArrayType->numInterfaces * sizeof(tInterfaceMap));
		memcpy(pAllIMs, pNewArrayType->pInterfaceMaps, orgNumInterfaces * sizeof(tInterfaceMap));
		pNewArrayType->pInterfaceMaps = pAllIMs;

		// Get the IEnumerable<T> interface
		pInterfaceMap = &pAllIMs[orgNumInterfaces + 0];
		pInterfaceT = Generics_GetGenericTypeFromCoreType(types[TYPE_SYSTEM_COLLECTIONS_GENERIC_IENUMERABLE_T], 1, &pElementType);
		pInterfaceMap->pInterface = pInterfaceT;
		pInterfaceMap->pVTableLookup = NULL;
		pInterfaceMap->ppMethodVLookup = mallocForever(pInterfaceT->numVirtualMethods * sizeof(tMD_MethodDef*));
		pMethod = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GetGenericEnumerator], pNewArrayType, 1, &pElementType);
		pInterfaceMap->ppMethodVLookup[0] = pMethod;

		// Get the ICollection<T> interface
		pInterfaceMap = &pAllIMs[orgNumInterfaces + 1];
		pInterfaceT = Generics_GetGenericTypeFromCoreType(types[TYPE_SYSTEM_COLLECTIONS_GENERIC_ICOLLECTION_T], 1, &pElementType);
		pInterfaceMap->pInterface = pInterfaceT;
		pInterfaceMap->pVTableLookup = NULL;
		pInterfaceMap->ppMethodVLookup = mallocForever(pInterfaceT->numVirtualMethods * sizeof(tMD_MethodDef*));
		pInterfaceMap->ppMethodVLookup[0] = ppGenericArrayMethods[GENERICARRAYMETHODS_get_Length];
		pInterfaceMap->ppMethodVLookup[1] = ppGenericArrayMethods[GENERICARRAYMETHODS_get_IsReadOnly];
		pInterfaceMap->ppMethodVLookup[2] = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericAdd], pNewArrayType, 1, &pElementType);
		pInterfaceMap->ppMethodVLookup[3] = ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericClear];
		pInterfaceMap->ppMethodVLookup[4] = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericContains], pNewArrayType, 1, &pElementType);
		pInterfaceMap->ppMethodVLookup[5] = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericCopyTo], pNewArrayType, 1, &pElementType);
		pInterfaceMap->ppMethodVLookup[6] = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericRemove], pNewArrayType, 1, &pElementType);

		// Get the IList<T> interface
		pInterfaceMap = &pAllIMs[orgNumInterfaces + 2];
		pInterfaceT = Generics_GetGenericTypeFromCoreType(types[TYPE_SYSTEM_COLLECTIONS_GENERIC_ILIST_T], 1, &pElementType); //, ppClassTypeArgs, ppMethodTypeArgs);
		pInterfaceMap->pInterface = pInterfaceT;
		pInterfaceMap->pVTableLookup = NULL;
		pInterfaceMap->ppMethodVLookup = mallocForever(pInterfaceT->numVirtualMethods * sizeof(tMD_MethodDef*));
		pInterfaceMap->ppMethodVLookup[0] = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericIndexOf], pNewArrayType, 1, &pElementType);
		pInterfaceMap->ppMethodVLookup[1] = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericInsert], pNewArrayType, 1, &pElementType);
		pInterfaceMap->ppMethodVLookup[2] = ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericRemoveAt];
		pInterfaceMap->ppMethodVLookup[3] = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericGetItem], pNewArrayType, 1, &pElementType);
		pInterfaceMap->ppMethodVLookup[4] = Generics_GetMethodDefFromCoreMethod(ppGenericArrayMethods[GENERICARRAYMETHODS_Internal_GenericSetItem], pNewArrayType, 1, &pElementType);
	}

	log_f(2, "Array: Array[%s.%s]\n", pElementType->nameSpace, pElementType->name);
}

// Returns a TypeDef for an array to the given element type
tMD_TypeDef* Type_GetArrayTypeDef(tMD_TypeDef *pElementType, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	tArrayTypeDefs *pIterArrays;

	if (pElementType == NULL) {
		return types[TYPE_SYSTEM_ARRAY_NO_TYPE];
	}
	
	pIterArrays = pArrays;
	while (pIterArrays != NULL) {
		if (pIterArrays->pElementType == pElementType) {
			return pIterArrays->pArrayType;
		}
		pIterArrays = pIterArrays->pNext;
	}

	// Must have this new array type in the linked-list of array types before it is initialised
	// (otherwise it can get stuck in an infinite loop)
	pIterArrays = TMALLOCFOREVER(tArrayTypeDefs);
	pIterArrays->pElementType = pElementType;
	pIterArrays->pNext = pArrays;
	pArrays = pIterArrays;
	pIterArrays->pArrayType = TMALLOC(tMD_TypeDef);

	CreateNewArrayType(pIterArrays->pArrayType, pElementType, ppClassTypeArgs, ppMethodTypeArgs);
	return pIterArrays->pArrayType;
}

U32 Type_IsValueType(tMD_TypeDef *pTypeDef) {
	// If this type is an interface, then return 0
	if (TYPE_ISINTERFACE(pTypeDef)) {
		return 0;
	}
	// If this type is Object or ValueType then return an answer
	if (strcmp(pTypeDef->nameSpace, "System") == 0) {
		if (strcmp(pTypeDef->name, "ValueType") == 0) {
			return 1;
		}
		if (strcmp(pTypeDef->name, "Object") == 0) {
			return 0;
		}
	}
	// Return the isValueType determined by parent type
	pTypeDef = MetaData_GetTypeDefFromDefRefOrSpec(pTypeDef->pMetaData, pTypeDef->extends, NULL, NULL);
	MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
	return pTypeDef->isValueType;
}

// Get the TypeDef from the type signature
// Also get the size of a field from the signature
// This is needed to avoid recursive sizing of types like System.Boolean,
// that has a field of type System.Boolean
tMD_TypeDef* Type_GetTypeFromSig(tMetaData *pMetaData, SIG *pSig, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	U32 entry;

	entry = MetaData_DecodeSigEntry(pSig);
	switch (entry) {
		case ELEMENT_TYPE_VOID:
			return NULL;

		case ELEMENT_TYPE_BOOLEAN:
			return types[TYPE_SYSTEM_BOOLEAN];

		case ELEMENT_TYPE_CHAR:
			return types[TYPE_SYSTEM_CHAR];

		case ELEMENT_TYPE_I1:
			return types[TYPE_SYSTEM_SBYTE];

		case ELEMENT_TYPE_U1:
			return types[TYPE_SYSTEM_BYTE];

		case ELEMENT_TYPE_I2:
			return types[TYPE_SYSTEM_INT16];

		case ELEMENT_TYPE_U2:
			return types[TYPE_SYSTEM_UINT16];

		case ELEMENT_TYPE_I4:
			return types[TYPE_SYSTEM_INT32];

		case ELEMENT_TYPE_I8:
			return types[TYPE_SYSTEM_INT64];

		case ELEMENT_TYPE_U8:
			return types[TYPE_SYSTEM_UINT64];

		case ELEMENT_TYPE_U4:
			return types[TYPE_SYSTEM_UINT32];

		case ELEMENT_TYPE_R4:
			return types[TYPE_SYSTEM_SINGLE];

		case ELEMENT_TYPE_R8:
			return types[TYPE_SYSTEM_DOUBLE];

		case ELEMENT_TYPE_STRING:
			return types[TYPE_SYSTEM_STRING];

		case ELEMENT_TYPE_PTR:
			return types[TYPE_SYSTEM_UINTPTR];

		case ELEMENT_TYPE_BYREF:
			{
				tMD_TypeDef *pByRefType;

				// type of the by-ref parameter, don't care
				pByRefType = Type_GetTypeFromSig(pMetaData, pSig, ppClassTypeArgs, ppMethodTypeArgs);
			}
			// fall-through
		case ELEMENT_TYPE_INTPTR:
			return types[TYPE_SYSTEM_INTPTR];

		case ELEMENT_TYPE_VALUETYPE:
		case ELEMENT_TYPE_CLASS:
			entry = MetaData_DecodeSigEntryToken(pSig);
			return MetaData_GetTypeDefFromDefRefOrSpec(pMetaData, entry, ppClassTypeArgs, ppMethodTypeArgs);

		case ELEMENT_TYPE_VAR:
			entry = MetaData_DecodeSigEntry(pSig); // This is the argument number
			if (ppClassTypeArgs == NULL) {
				// Return null here as we don't yet know what the type really is.
				// The generic instantiation code figures this out later.
				return NULL;
			} else {
				return ppClassTypeArgs[entry];
			}

		case ELEMENT_TYPE_GENERICINST:
			{
				tMD_TypeDef *pType;

				pType = Generics_GetGenericTypeFromSig(pMetaData, pSig, ppClassTypeArgs, ppMethodTypeArgs);
				return pType;
			}

		//case ELEMENT_TYPE_INTPTR:
		//	return types[TYPE_SYSTEM_INTPTR];

		case ELEMENT_TYPE_UINTPTR:
			return types[TYPE_SYSTEM_UINTPTR];

		case ELEMENT_TYPE_OBJECT:
			return types[TYPE_SYSTEM_OBJECT];

		case ELEMENT_TYPE_SZARRAY:
			{
				tMD_TypeDef *pElementType;

				pElementType = Type_GetTypeFromSig(pMetaData, pSig, ppClassTypeArgs, ppMethodTypeArgs);
				return Type_GetArrayTypeDef(pElementType, ppClassTypeArgs, ppMethodTypeArgs);
			}

		case ELEMENT_TYPE_MVAR:
			entry = MetaData_DecodeSigEntry(pSig); // This is the argument number
			if (ppMethodTypeArgs == NULL) {
				// Can't do anything sensible, as we don't have any type args
				return NULL;
			} else {
				return ppMethodTypeArgs[entry];
			}

		default:
			Crash("Type_GetTypeFromSig(): Cannot handle signature element type: 0x%02x", entry);
			FAKE_RETURN;
	}
}

tMD_TypeDef **types;
static U32 numInitTypes;

typedef struct tTypeInit_ tTypeInit;
struct tTypeInit_ {
	char *assemblyName;
	char *nameSpace;
	char *name;
	U8 stackType;
	U8 stackSize;
	U8 arrayElementSize;
	U8 instanceMemSize;
};

static char mscorlib[] = "mscorlib";
static char System[] = "System";
static char SystemCollectionsGeneric[] = "System.Collections.Generic";
static char SystemThreading[] = "System.Threading";
static char SystemIO[] = "System.IO";
static char SystemGlobalization[] = "System.Globalization";

static tTypeInit typeInit[] = {
	{mscorlib, System, "Object", EVALSTACK_O,		4, 4, 0},
	{mscorlib, System, "Array", EVALSTACK_O,		4, 4, 0},
	{mscorlib, System, "Void", EVALSTACK_O,			4, 4, 0},
	{mscorlib, System, "Boolean", EVALSTACK_INT32,	4, 4, 4},
	{mscorlib, System, "Byte", EVALSTACK_INT32,		4, 1, 4},
	{mscorlib, System, "SByte", EVALSTACK_INT32,	4, 1, 4},
	{mscorlib, System, "Char", EVALSTACK_INT32,		4, 2, 4},
	{mscorlib, System, "Int16", EVALSTACK_INT32,	4, 2, 4},
	{mscorlib, System, "Int32", EVALSTACK_INT32,	4, 4, 4},
	{mscorlib, System, "String", EVALSTACK_O,		4, 4, 0},
	{mscorlib, System, "IntPtr", EVALSTACK_PTR,		sizeof(void*), sizeof(void*), 0},
	{mscorlib, System, "RuntimeFieldHandle", EVALSTACK_O, 4, 4, 0},
	{mscorlib, System, "InvalidCastException", EVALSTACK_O, 0, 0, 0},
	{mscorlib, System, "UInt32", EVALSTACK_INT32,	4, 4, 4},
	{mscorlib, System, "UInt16", EVALSTACK_INT32,	4, 2, 4},
	{NULL, NULL, (char*)TYPE_SYSTEM_CHAR, 0, 0, 0, 0},
	{NULL, NULL, (char*)TYPE_SYSTEM_OBJECT, 0, 0, 0, 0},
	{mscorlib, SystemCollectionsGeneric, "IEnumerable`1", EVALSTACK_O,	4, 4, 0},
	{mscorlib, SystemCollectionsGeneric, "ICollection`1", EVALSTACK_O,	4, 4, 0},
	{mscorlib, SystemCollectionsGeneric, "IList`1", EVALSTACK_O,		4, 4, 0},
	{mscorlib, System, "MulticastDelegate", EVALSTACK_O,				0, 0, 0},
	{mscorlib, System, "NullReferenceException", EVALSTACK_O,			0, 0, 0},
	{mscorlib, System, "Single", EVALSTACK_F32,		4, 4, 4},
	{mscorlib, System, "Double", EVALSTACK_F64,		8, 8, 8},
	{mscorlib, System, "Int64", EVALSTACK_INT64,	8, 8, 8},
	{mscorlib, System, "UInt64", EVALSTACK_INT64,	8, 8, 8},
	{mscorlib, System, "RuntimeType", EVALSTACK_O,	4, 4, sizeof(tRuntimeType)},
	{mscorlib, System, "Type", EVALSTACK_O,			4, 4, 0},
	{mscorlib, System, "RuntimeTypeHandle", EVALSTACK_O, 4, 4, 0},
	{mscorlib, System, "RuntimeMethodHandle", EVALSTACK_O, 4, 4, 0},
	{mscorlib, System, "Enum", EVALSTACK_VALUETYPE, 0, 0, 0},
	{NULL, NULL, (char*)TYPE_SYSTEM_STRING, 0, 0, 0, 0},
	{NULL, NULL, (char*)TYPE_SYSTEM_INT32, 0, 0, 0, 0},
	{mscorlib, SystemThreading, "Thread", EVALSTACK_O, 4, 4, sizeof(tThread)},
	{mscorlib, SystemThreading, "ThreadStart", EVALSTACK_O, 0, 0, 0},
	{mscorlib, SystemThreading, "ParameterizedThreadStart", EVALSTACK_O, 0, 0, 0},
	{mscorlib, System, "WeakReference", EVALSTACK_O, 4, 4, 0},
	{mscorlib, SystemIO, "FileMode", EVALSTACK_O, 0, 0, 0},
	{mscorlib, SystemIO, "FileAccess", EVALSTACK_O, 0, 0, 0},
	{mscorlib, SystemIO, "FileShare", EVALSTACK_O, 0, 0, 0},
	{NULL, NULL, (char*)TYPE_SYSTEM_BYTE, 0, 0, 0, 0},
	{mscorlib, SystemGlobalization, "UnicodeCategory", EVALSTACK_INT32,	0, 0, 0},
	{mscorlib, System, "OverflowException", EVALSTACK_O,				0, 0, 0},
	{mscorlib, System, "PlatformID", EVALSTACK_INT32,					0, 0, 0},
	{mscorlib, SystemIO, "FileAttributes", EVALSTACK_O, 0, 0, 0},
	{mscorlib, System, "UIntPtr", EVALSTACK_PTR,		sizeof(void*), sizeof(void*), 0},
	{mscorlib, System, "Nullable`1", EVALSTACK_VALUETYPE, 0, 0, 0},
	{NULL, NULL, (char*)TYPE_SYSTEM_TYPE, 0, 0, 0, 0},
};

int CorLibDone = 0;

void Type_Init() {
	U32 i;

	// Build all the types needed by the interpreter.
	numInitTypes = sizeof(typeInit) / sizeof(typeInit[0]);
	types = (tMD_TypeDef**)mallocForever(numInitTypes * sizeof(tMD_TypeDef*));
	for (i=0; i<numInitTypes; i++) {
		if (typeInit[i].assemblyName != NULL) {
			// Normal type initialisation
			types[i] = MetaData_GetTypeDefFromFullName(typeInit[i].assemblyName, typeInit[i].nameSpace, typeInit[i].name);
			// For the pre-defined system types, fill in the well-known memory sizes
			types[i]->stackType = typeInit[i].stackType;
			types[i]->stackSize = typeInit[i].stackSize;
			types[i]->arrayElementSize = typeInit[i].arrayElementSize;
			types[i]->instanceMemSize = typeInit[i].instanceMemSize;
		}
	}
	for (i=0; i<numInitTypes; i++) {
		if (typeInit[i].assemblyName != NULL) {
			MetaData_Fill_TypeDef(types[i], NULL, NULL);
		} else {
			// Special initialisation for arrays of particular types.
			types[i] = Type_GetArrayTypeDef(types[(U32)(typeInit[i].name)], NULL, NULL);
		}
	}
	CorLibDone = 1;
}

U32 Type_IsMethod(tMD_MethodDef *pMethod, STRING name, tMD_TypeDef *pReturnType, U32 numParams, U8 *pParamTypeIndexs) {
	SIG sig;
	U32 sigLen, numSigParams, i, nameLen;

	nameLen = (U32)strlen(name);
	if (name[nameLen-1] == '>') {
		// Generic instance method
		if (strncmp(pMethod->name, name, nameLen - 1) != 0) {
			return 0;
		}
	} else {
		if (strcmp(pMethod->name, name) != 0) {
			return 0;
		}
	}

	sig = MetaData_GetBlob(pMethod->signature, &sigLen);
	i = MetaData_DecodeSigEntry(&sig); // Don't care about this
	if (i & SIG_METHODDEF_GENERIC) {
		MetaData_DecodeSigEntry(&sig);
	}
	numSigParams = MetaData_DecodeSigEntry(&sig);

	if (numParams != numSigParams) {
		return 0;
	}

	if (pReturnType == types[TYPE_SYSTEM_VOID]) {
		pReturnType = NULL;
	}

	for (i=0; i<numParams + 1; i++) {
		tMD_TypeDef *pSigType, *pParamType;

		pSigType = Type_GetTypeFromSig(pMethod->pMetaData, &sig, NULL, NULL);
		pParamType = (i == 0)?pReturnType:types[pParamTypeIndexs[i-1]];

		if (pSigType != NULL && TYPE_ISARRAY(pSigType) && pParamType == types[TYPE_SYSTEM_ARRAY_NO_TYPE]) {
			// It's ok...
		} else {
			if (pSigType != pParamType) {
				goto endBad;
			}
		}
	}
	return 1;

endBad:
	return 0;
}

U32 Type_IsDerivedFromOrSame(tMD_TypeDef *pBaseType, tMD_TypeDef *pTestType) {
	while (pTestType != NULL) {
		if (pTestType == pBaseType) {
			return 1;
		}
		MetaData_Fill_TypeDef(pTestType, NULL, NULL);
		pTestType = pTestType->pParent;
	}
	return 0;
}

U32 Type_IsImplemented(tMD_TypeDef *pInterface, tMD_TypeDef *pTestType) {
	U32 i;

	for (i=0; i<pTestType->numInterfaces; i++) {
		if (pTestType->pInterfaceMaps[i].pInterface == pInterface) {
			return 1;
		}
	}
	return 0;
}

U32 Type_IsAssignableFrom(tMD_TypeDef *pToType, tMD_TypeDef *pFromType) {
	return
		Type_IsDerivedFromOrSame(pToType, pFromType) ||
		(TYPE_ISINTERFACE(pToType) && Type_IsImplemented(pToType, pFromType));
}

HEAP_PTR Type_GetTypeObject(tMD_TypeDef *pTypeDef) {
	if (pTypeDef->typeObject == NULL) {
		pTypeDef->typeObject = RuntimeType_New(pTypeDef);
	}
	return pTypeDef->typeObject;
}