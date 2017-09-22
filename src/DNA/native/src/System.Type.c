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

#include "System.Array.h"
#include "System.Type.h"
#include "System.Reflection.MethodInfo.h"
#include "System.Reflection.PropertyInfo.h"
#include "System.RuntimeType.h"
#include "System.String.h"

#include "Types.h"
#include "Type.h"
#include "CLIFile.h"

static void DotNetStringToCString(unsigned char* buf, U32 bufLength, STRING dotnetString) {
	U32 stringLen;
	STRING2 dotnetString2 = SystemString_GetString(dotnetString, &stringLen);
	if (stringLen > bufLength) {
		Crash("String of length %i was too long for buffer of length %i\n", stringLen, bufLength);
	}

	U32 i;
	for (i=0; i<stringLen; i++) {
		buf[i] = (unsigned char)dotnetString2[i];
	}
	buf[i] = 0;
}

tAsyncCall* System_Type_EnsureAssemblyLoaded(PTR pThis_, PTR pParams, PTR pReturnValue) {
	unsigned char assemblyName[256];
	DotNetStringToCString(assemblyName, 256, ((HEAP_PTR*)pParams)[0]);
	CLIFile_GetMetaDataForAssembly(assemblyName);

	*(HEAP_PTR*)pReturnValue = NULL;
	return NULL;
}

tAsyncCall* System_Type_get_Attributes(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	*(U32*)pReturnValue = pThisType->flags;

	return NULL;
}

tAsyncCall* System_Type_get_IsValueType(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	*(U32*)pReturnValue = pThisType->isValueType;

	return NULL;
}

tAsyncCall* System_Type_GetTypeFromHandle(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pTypeDef = *(tMD_TypeDef**)pParams;

	*(HEAP_PTR*)pReturnValue = Type_GetTypeObject(pTypeDef);

	return NULL;
}

tAsyncCall* System_Type_GetTypeFromName(PTR pThis_, PTR pParams, PTR pReturnValue) {
	unsigned char namespaceName[256];
	unsigned char className[256];
	tMD_TypeDef *pTypeDef;

	DotNetStringToCString(namespaceName, 256, ((HEAP_PTR*)pParams)[1]);
	DotNetStringToCString(className, 256, ((HEAP_PTR*)pParams)[2]);

	if (((HEAP_PTR*)pParams)[0] == 0) {
		// assemblyName is null, so search all loaded assemblies
		pTypeDef = CLIFile_FindTypeInAllLoadedAssemblies(namespaceName, className);
	} else {
		// assemblyName is specified
		unsigned char assemblyName[256];
		DotNetStringToCString(assemblyName, 256, ((HEAP_PTR*)pParams)[0]);
		tMetaData *pAssemblyMetadata = CLIFile_GetMetaDataForAssembly(assemblyName);
		pTypeDef = MetaData_GetTypeDefFromName(pAssemblyMetadata, namespaceName, className, NULL, /* assertExists */ 1);
	}

	if (pTypeDef != NULL) {
		MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
		*(HEAP_PTR*)pReturnValue = Type_GetTypeObject(pTypeDef);
	} else {
		// Not found
		*(HEAP_PTR*)pReturnValue = NULL;
	}
	return NULL;
}

tAsyncCall* System_Type_GetNestedType(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	unsigned char className[256];
	DotNetStringToCString(className, 256, ((HEAP_PTR*)pParams)[0]);

	tMD_TypeDef *pTypeDef = MetaData_GetTypeDefFromName(pThisType->pMetaData, pThisType->nameSpace, className, pThisType, /* assertExists */ 1);
	if (pTypeDef != NULL) {
		MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
		*(HEAP_PTR*)pReturnValue = Type_GetTypeObject(pTypeDef);
	} else {
		// Not found
		*(HEAP_PTR*)pReturnValue = NULL;
	}
	return NULL;
}

tAsyncCall* System_Type_GetNestedTypes(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	
	// get the number of nested types
	tMD_TypeDef *pTypeDef;
	U32 numNestedTypes = 0;
	U32 numTypes = pThisType->pMetaData->tables.numRows[MD_TABLE_TYPEDEF];
	for (U32 i = 1; i <= numTypes; i++) {
		pTypeDef = (tMD_TypeDef*)MetaData_GetTableRow(pThisType->pMetaData, MAKE_TABLE_INDEX(MD_TABLE_TYPEDEF, i));
		if (pThisType == pTypeDef->pNestedIn) {
			numNestedTypes++;
		}
	}

	// Instantiate a Type array
	tMD_TypeDef *pArrayType = Type_GetArrayTypeDef(types[TYPE_SYSTEM_TYPE], NULL, NULL);
	HEAP_PTR ret = SystemArray_NewVector(pArrayType, numNestedTypes);
	// Allocate to return value straight away, so it cannot be GCed
	*(HEAP_PTR*)pReturnValue = ret;

	// Fill the Type array
	for (U32 i = 1, iNested = 0; i <= numTypes; i++) {
		pTypeDef = (tMD_TypeDef*)MetaData_GetTableRow(pThisType->pMetaData, MAKE_TABLE_INDEX(MD_TABLE_TYPEDEF, i));
		if (pThisType == pTypeDef->pNestedIn) {
			HEAP_PTR typeObject = Type_GetTypeObject(pTypeDef);
			SystemArray_StoreElement(ret, iNested++, (PTR)&typeObject);
		}
	}

	return NULL;
}

tAsyncCall* System_Type_GetInterfaces(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	// Instantiate a Type array
	tMD_TypeDef *pArrayType = Type_GetArrayTypeDef(types[TYPE_SYSTEM_TYPE], NULL, NULL);
	HEAP_PTR ret = SystemArray_NewVector(pArrayType, pThisType->numInterfaces);
	// Allocate to return value straight away, so it cannot be GCed
	*(HEAP_PTR*)pReturnValue = ret;

	// Fill the Type array
	for (U32 i = 0; i<pThisType->numInterfaces; i++) {
		HEAP_PTR typeObject = Type_GetTypeObject(pThisType->pInterfaceMaps[i].pInterface);
		SystemArray_StoreElement(ret, i, (PTR)&typeObject);
	}

	return NULL;
}

static tPropertyInfo* GetPropertyInfo(PTR pThis_, IDX_TABLE index) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	tMD_Property *pPropertyMetadata = (tMD_Property*)MetaData_GetTableRow(pThisType->pMetaData, index);

	// Instantiate PropertyInfo and put it in the array
	tPropertyInfo *pPropertyInfo = (tPropertyInfo*)Heap_AllocType(types[TYPE_SYSTEM_REFLECTION_PROPERTYINFO]);

	// Assign ownerType and name
	pPropertyInfo->ownerType = pThis_;
	pPropertyInfo->name = SystemString_FromCharPtrASCII(pPropertyMetadata->name);

	// Assign propertyType
	U32 sigLength;
	PTR typeSig = MetaData_GetBlob(pPropertyMetadata->typeSig, &sigLength);
	MetaData_DecodeSigEntry(&typeSig); // Ignored: prolog
	MetaData_DecodeSigEntry(&typeSig); // Ignored: number of 'getter' parameters		
	tMD_TypeDef *propertyTypeDef = Type_GetTypeFromSig(pThisType->pMetaData, &typeSig, pThisType->ppClassTypeArgs, NULL);
	MetaData_Fill_TypeDef(propertyTypeDef, NULL, NULL);
	pPropertyInfo->propertyType = Type_GetTypeObject(propertyTypeDef);

	// Assign propertyMetadata
	pPropertyInfo->index = index;
	pPropertyInfo->pMetaData = pPropertyMetadata;

	return pPropertyInfo;
}

static tMethodInfo* GetMethodInfo(PTR pThis_, U32 i) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	tMD_MethodDef *pMethodDef = pThisType->ppMethods[i];

	// Instantiate a MethodInfo and put it in the array
	tMethodInfo *pMethodInfo = (tMethodInfo*)Heap_AllocType(types[TYPE_SYSTEM_REFLECTION_METHODINFO]);

	// Assign ownerType, name and flags
	pMethodInfo->methodBase.ownerType = pThis_;
	pMethodInfo->methodBase.name = SystemString_FromCharPtrASCII(pMethodDef->name);
	pMethodInfo->methodBase.flags = pMethodDef->flags;

	// Assign method def
	pMethodInfo->methodBase.methodDef = pMethodDef;

	return pMethodInfo;
}

static U32 GetNumProperties(tMD_TypeDef *pThisType, IDX_TABLE *pFirstIdx) {
	tMetaData *pMetaData = pThisType->pMetaData;

	// First we search through the table of propertymaps to find the propertymap for the requested type
	*pFirstIdx = 0;
	IDX_TABLE lastIdxExc = 0;
	U32 numPropertyRows = pMetaData->tables.numRows[MD_TABLE_PROPERTY];
	U32 numPropertymapRows = pMetaData->tables.numRows[MD_TABLE_PROPERTYMAP];
	for (U32 i=1; i <= numPropertymapRows; i++) {
		tMD_PropertyMap *pPropertyMap = (tMD_PropertyMap*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_PROPERTYMAP, i));
		if (pPropertyMap->parent == pThisType->tableIndex) {
			*pFirstIdx = TABLE_OFS(pPropertyMap->propertyList);
			if (i < numPropertymapRows) {
				tMD_PropertyMap *pNextPropertyMap = (tMD_PropertyMap*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_PROPERTYMAP, i + 1));
				lastIdxExc = TABLE_OFS(pNextPropertyMap->propertyList);
			}
			else {
				lastIdxExc = numPropertyRows + 1;
			}
			break;
		}
	}
	U32 numProperties = lastIdxExc - *pFirstIdx;
	return numProperties;
}

tAsyncCall* System_Type_GetProperties(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	IDX_TABLE firstIdx = 0;
	U32 numProperties = GetNumProperties(pThisType, &firstIdx);

	// Instantiate a PropertyInfo array
	tMD_TypeDef *pArrayType = Type_GetArrayTypeDef(types[TYPE_SYSTEM_REFLECTION_PROPERTYINFO], NULL, NULL);
	HEAP_PTR ret = SystemArray_NewVector(pArrayType, numProperties);
	// Allocate to return value straight away, so it cannot be GCed
	*(HEAP_PTR*)pReturnValue = ret;

	// Fill the PropertyInfo array
	for (U32 i=0; i<numProperties; i++) {
		IDX_TABLE index = MAKE_TABLE_INDEX(MD_TABLE_PROPERTY, firstIdx + i);
		tPropertyInfo *pPropertyInfo = GetPropertyInfo(pThis_, index);
		SystemArray_StoreElement(ret, i, (PTR)&pPropertyInfo);
	}

	return NULL;
}

tAsyncCall* System_Type_GetProperty(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	// Get property name from param
	unsigned char propertyName[256];
	DotNetStringToCString(propertyName, 256, ((HEAP_PTR*)pParams)[0]);

	IDX_TABLE firstIdx = 0;
	U32 numProperties = GetNumProperties(pThisType, &firstIdx);

	// Search for the property by name
	for (U32 i = 0; i<numProperties; i++) {
		IDX_TABLE index = MAKE_TABLE_INDEX(MD_TABLE_PROPERTY, firstIdx + i);
		tMD_Property *pPropertyMetadata = (tMD_Property*)MetaData_GetTableRow(pThisType->pMetaData, index);
		if (strcmp(pPropertyMetadata->name, propertyName) == 0) {
			tPropertyInfo *pPropertyInfo = GetPropertyInfo(pThis_, index);
			*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pPropertyInfo;
			return NULL;
		}
	}

	// Not found
	*(HEAP_PTR*)pReturnValue = NULL;
	return NULL;
}

tAsyncCall* System_Type_GetMethods(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	// Instantiate a MethodInfo array
	tMD_TypeDef *pArrayType = Type_GetArrayTypeDef(types[TYPE_SYSTEM_REFLECTION_METHODINFO], NULL, NULL);
	HEAP_PTR ret = SystemArray_NewVector(pArrayType, pThisType->numMethods);
	// Allocate to return value straight away, so it cannot be GCed
	*(HEAP_PTR*)pReturnValue = ret;

	// Fill the MethodInfo array
	for (U32 i = 0; i<pThisType->numMethods; i++) {
		tMethodInfo *pMethodInfo = GetMethodInfo(pThis_, i);
		SystemArray_StoreElement(ret, i, (PTR)&pMethodInfo);
	}

	return NULL;
}

tAsyncCall* System_Type_GetMethod(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	// Get method name from param
	unsigned char methodName[256];
	DotNetStringToCString(methodName, 256, ((HEAP_PTR*)pParams)[0]);

	// Search for the method by name
	for (U32 i=0; i<pThisType->numMethods; i++) {
		if (strcmp(pThisType->ppMethods[i]->name, methodName) == 0) {
			tMethodInfo *pMethodInfo = GetMethodInfo(pThis_, i);
			*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pMethodInfo;
			return NULL;
		}
	}

	// Not found
	*(HEAP_PTR*)pReturnValue = NULL;
	return NULL;
}

tAsyncCall* System_Type_IsAssignableFrom(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	tMD_TypeDef *pFromType = RuntimeType_DeRef((PTR)((tMD_TypeDef**)pParams)[0]);
	
	*(U32*)pReturnValue = Type_IsAssignableFrom(pThisType, pFromType);
	return NULL;
}

tAsyncCall* System_Type_IsSubclassOf(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pBaseType = RuntimeType_DeRef(pThis_);
	tMD_TypeDef *pTestType = RuntimeType_DeRef((PTR)((tMD_TypeDef**)pParams)[0]);
	
	*(U32*)pReturnValue = Type_IsDerivedFromOrSame(pBaseType, pTestType);
	return NULL;
}

tAsyncCall* System_Type_MakeGenericType(PTR pThis_, PTR pParams, PTR pReturnValue)
{
	// get type arguments
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	HEAP_PTR pTypeArgs = ((HEAP_PTR*)pParams)[0];
	U32 numTypeArgs = SystemArray_GetLength(pTypeArgs);
	HEAP_PTR* pArray = (HEAP_PTR*)SystemArray_GetElements(pTypeArgs);

	// get arg types
	tMD_TypeDef **ppTypeArgs = TMALLOC(numTypeArgs, tMD_TypeDef*);
	for (U32 i = 0; i < numTypeArgs; i++) {
		ppTypeArgs[i] = RuntimeType_DeRef(pArray[i]);
	}

	// specialize generic type
	tMD_TypeDef* pTypeDef = Generics_GetGenericTypeFromCoreType(pThisType, numTypeArgs, ppTypeArgs);
	free(ppTypeArgs);

	*(HEAP_PTR*)pReturnValue = Type_GetTypeObject(pTypeDef);

	return NULL;
}
