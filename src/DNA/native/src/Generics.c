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

#include "Generics.h"

#include "MetaData.h"
#include "Types.h"
#include "Type.h"
#include "EvalStack.h"

void Generic_GetHeapRoots(tHeapRoots *pHeapRoots, tMD_TypeDef *pTypeDef) {
	tGenericInstance *pInst = pTypeDef->pGenericInstances;
	while (pInst != NULL) {
		tMD_TypeDef *pTypeDef = pInst->pInstanceTypeDef;
		if (pTypeDef->staticFieldSize > 0) {
			Heap_SetRoots(pHeapRoots, pTypeDef->pStaticFields, pTypeDef->staticFieldSize);
		}
		pInst = pInst->pNext;
	}
}

tMD_TypeDef* Generics_GetGenericTypeFromSig
	(tMetaData *pMetaData, SIG *pSig, tMD_TypeDef **ppCallingClassTypeArgs, tMD_TypeDef **ppCallingMethodTypeArgs) {
	tMD_TypeDef *pCoreType, *pRet;
	U32 numTypeArgs, i;
	tMD_TypeDef **ppTypeArgs;

	pCoreType = Type_GetTypeFromSig(pMetaData, pSig, ppCallingClassTypeArgs, ppCallingMethodTypeArgs);
	MetaData_Fill_TypeDef(pCoreType, ppCallingClassTypeArgs, ppCallingMethodTypeArgs); //NULL, NULL);

	numTypeArgs = MetaData_DecodeSigEntry(pSig);
	ppTypeArgs = (tMD_TypeDef**)malloc(numTypeArgs * sizeof(tMD_TypeDef*));
	for (i=0; i<numTypeArgs; i++) {
		ppTypeArgs[i] = Type_GetTypeFromSig(pMetaData, pSig, ppCallingClassTypeArgs, ppCallingMethodTypeArgs);
		if (ppTypeArgs[i] != NULL) {
			MetaData_Fill_TypeDef(ppTypeArgs[i], NULL, NULL);
		}
	}

	pRet = Generics_GetGenericTypeFromCoreType(pCoreType, numTypeArgs, ppTypeArgs);
	free(ppTypeArgs);
	return pRet;
}

// TODO: This is not the most efficient way of doing this, as it has to search through all the
// entries in the GenericParams table for all lookups. This can be improved.
static tMD_GenericParam* FindGenericParam(tMD_TypeDef *pCoreType, U32 typeArgIndex) {
	tMD_GenericParam *pGenericParam;
	U32 i;

	pGenericParam = (tMD_GenericParam*)MetaData_GetTableRow(pCoreType->pMetaData, MAKE_TABLE_INDEX(MD_TABLE_GENERICPARAM, 1));

	for (i=0; i<pCoreType->pMetaData->tables.numRows[MD_TABLE_GENERICPARAM]; i++, pGenericParam++) {
		if (pGenericParam->owner == pCoreType->tableIndex && pGenericParam->number == typeArgIndex) {
			return pGenericParam;
		}
	}
	return NULL;
}

tMD_TypeDef* Generics_GetGenericTypeFromCoreType(tMD_TypeDef *pCoreType, U32 numTypeArgs, tMD_TypeDef **ppTypeArgs) {
	tGenericInstance *pInst;
	tMD_TypeDef *pTypeDef;
	U32 i;
	unsigned char name[2048];
	tMetaData *pMetaData;

	pMetaData = pCoreType->pMetaData;
	MetaData_Fill_TypeDef(pCoreType, NULL, NULL);

	// See if we have already built an instantiation of this type with the given type args.
	pInst = pCoreType->pGenericInstances;
	while (pInst != NULL) {
		if (pInst->numTypeArgs == numTypeArgs &&
			memcmp(pInst->pTypeArgs, ppTypeArgs, numTypeArgs * sizeof(tMD_TypeDef*)) == 0) {
			return pInst->pInstanceTypeDef;
		}
		pInst = pInst->pNext;
	}

	// This has not already been instantiated, so instantiate it now.
	pInst = (tGenericInstance*)mallocForever(sizeof(tGenericInstance) + numTypeArgs * sizeof(tMD_TypeDef*));
	// Insert this into the chain of instantiations.
	pInst->pNext = pCoreType->pGenericInstances;
	pCoreType->pGenericInstances = pInst;
	// Copy the type args into the instantiation.
	pInst->numTypeArgs = numTypeArgs;
	memcpy(pInst->pTypeArgs, ppTypeArgs, numTypeArgs * sizeof(tMD_TypeDef*));

	// Create the new instantiated type
	pInst->pInstanceTypeDef = pTypeDef = TMALLOCFOREVER(tMD_TypeDef);
	memset(pTypeDef, 0, sizeof(tMD_TypeDef));
	// Make the name of the instantiation.
	strcpy(name, pCoreType->name);
	strcat(name, "[");
	for (i=0; i<numTypeArgs; i++) {
		if (i > 0) {
			strcat(name, ",");
		}
		if (ppTypeArgs[i] != NULL) {
			sprintf(strchr(name, 0), "%s.%s", ppTypeArgs[i]->nameSpace, ppTypeArgs[i]->name);
		} else {
			tMD_GenericParam *pGenericParam = FindGenericParam(pCoreType, i);
			if (pGenericParam != NULL) {
				sprintf(strchr(name, 0), pGenericParam->name);
			} else {
				sprintf(strchr(name, 0), "???");
			}
		}
	}
	strcat(name, "]");
	// Fill in the basic bits of the new type def.
	pTypeDef->pTypeDef = pTypeDef;
	pTypeDef->pMetaData = pMetaData;
	pTypeDef->flags = pCoreType->flags;
	pTypeDef->pGenericDefinition = pCoreType;
	for (i=0; i<numTypeArgs; i++) {
		if (ppTypeArgs[i] == NULL) {
			pTypeDef->isGenericDefinition = 1;
			break;
		}
	}
	pTypeDef->nameSpace = pCoreType->nameSpace;
	pTypeDef->name = (STRING)mallocForever((U32)strlen(name)+1);
	strcpy(pTypeDef->name, name);
	pTypeDef->ppClassTypeArgs = pInst->pTypeArgs;
	pTypeDef->extends = pCoreType->extends;
	pTypeDef->tableIndex = pCoreType->tableIndex;
	pTypeDef->fieldList = pCoreType->fieldList;
	pTypeDef->methodList = pCoreType->methodList;
	pTypeDef->numFields = pCoreType->numFields;
	pTypeDef->numMethods = pCoreType->numMethods;
	pTypeDef->numVirtualMethods = pCoreType->numVirtualMethods;
	pTypeDef->pNestedIn = pCoreType->pNestedIn;
	pTypeDef->isPrimed = 1;

	MetaData_Fill_TypeDef_(pTypeDef, ppTypeArgs, NULL);

	return pTypeDef;
}

tMD_MethodDef* Generics_GetMethodDefFromSpec
	(tMD_MethodSpec *pMethodSpec, tMD_TypeDef **ppCallingClassTypeArgs, tMD_TypeDef **ppCallingMethodTypeArgs) {

	tMD_MethodDef *pCoreMethod, *pMethod;
	SIG sig;
	U32 argCount, i;
	tMD_TypeDef **ppTypeArgs;

	pCoreMethod = MetaData_GetMethodDefFromDefRefOrSpec(pMethodSpec->pMetaData, pMethodSpec->method, NULL, NULL);//ppCallingClassTypeArgs, ppCallingMethodTypeArgs);

	//ppClassTypeArgs = pCoreMethod->pParentType->ppClassTypeArgs;
	sig = MetaData_GetBlob(pMethodSpec->instantiation, NULL);
	MetaData_DecodeSigEntry(&sig); // always 0x0a
	argCount = MetaData_DecodeSigEntry(&sig);
	ppTypeArgs = malloc(argCount * sizeof(tMD_TypeDef*));

	for (i=0; i<argCount; i++) {
		tMD_TypeDef *pArgType;

		pArgType = Type_GetTypeFromSig(pMethodSpec->pMetaData, &sig, ppCallingClassTypeArgs, ppCallingMethodTypeArgs);
		ppTypeArgs[i] = pArgType;
	}

	pMethod = Generics_GetMethodDefFromCoreMethod(pCoreMethod, pCoreMethod->pParentType, argCount, ppTypeArgs);
	free(ppTypeArgs);

	return pMethod;
}

tMD_MethodDef* Generics_GetMethodDefFromCoreMethod
	(tMD_MethodDef *pCoreMethod, tMD_TypeDef *pParentType, U32 numTypeArgs, tMD_TypeDef **ppTypeArgs) {

	tGenericMethodInstance *pInst;
	tMD_MethodDef *pMethod;

	// See if we already have an instance with the given type args
	pInst = pCoreMethod->pGenericMethodInstances;
	while (pInst != NULL) {
		if (pInst->numTypeArgs == numTypeArgs &&
			memcmp(pInst->pTypeArgs, ppTypeArgs, numTypeArgs * sizeof(tMD_TypeDef*)) == 0) {
			return pInst->pInstanceMethodDef;
		}
		pInst = pInst->pNext;
	}

	// We don't have an instance so create one now.
	pInst = mallocForever(sizeof(tGenericMethodInstance) + numTypeArgs * sizeof(tMD_TypeDef*));
	pInst->pNext = pCoreMethod->pGenericMethodInstances;
	pCoreMethod->pGenericMethodInstances = pInst;
	pInst->numTypeArgs = numTypeArgs;
	memcpy(pInst->pTypeArgs, ppTypeArgs, numTypeArgs * sizeof(tMD_TypeDef*));

	pInst->pInstanceMethodDef = pMethod = TMALLOCFOREVER(tMD_MethodDef);
	memset(pMethod, 0, sizeof(tMD_MethodDef));
	pMethod->pMethodDef = pMethod;
	pMethod->pMetaData = pCoreMethod->pMetaData;
	pMethod->pCIL = pCoreMethod->pCIL;
	pMethod->implFlags = pCoreMethod->implFlags;
	pMethod->flags = pCoreMethod->flags;
	pMethod->name = pCoreMethod->name;
	pMethod->signature = pCoreMethod->signature;
	pMethod->vTableOfs = pCoreMethod->vTableOfs;
	pMethod->ppMethodTypeArgs = pInst->pTypeArgs;

	MetaData_Fill_MethodDef(pParentType, pMethod, pParentType->ppClassTypeArgs, pInst->pTypeArgs);

	return pMethod;
}
