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

#include "System.RuntimeType.h"

#include "Types.h"
#include "Type.h"
#include "Heap.h"
#include "System.String.h"
#include "System.RuntimeType.h"
#include "System.Array.h"

tMD_TypeDef* RuntimeType_DeRef(PTR type) {
	return ((tRuntimeType*)type)->pTypeDef;
}

HEAP_PTR RuntimeType_New(tMD_TypeDef *pTypeDef) {
	tRuntimeType *pRuntimeType;

	pRuntimeType = (tRuntimeType*)Heap_AllocType(types[TYPE_SYSTEM_RUNTIMETYPE]);
	Heap_MakeUndeletable((HEAP_PTR)pRuntimeType);
	pRuntimeType->pTypeDef = pTypeDef;

	return (HEAP_PTR)pRuntimeType;
}

tAsyncCall* System_RuntimeType_get_Name(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	HEAP_PTR strResult;

	strResult = SystemString_FromCharPtrASCII(pThisType->name);
	*(HEAP_PTR*)pReturnValue = strResult;

	return NULL;
}

tAsyncCall* System_RuntimeType_get_Namespace(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	HEAP_PTR strResult;

	strResult = SystemString_FromCharPtrASCII(pThisType->nameSpace);
	*(HEAP_PTR*)pReturnValue = strResult;

	return NULL;
}

tAsyncCall* System_RuntimeType_GetNestingParentType(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	tMD_TypeDef *pNestingParentType;
	
	pNestingParentType = pThisType->pNestedIn;
	if (pNestingParentType == NULL) {
		*(HEAP_PTR*)pReturnValue = NULL;
	} else {
		*(HEAP_PTR*)pReturnValue = Type_GetTypeObject(pNestingParentType);
	}

	return NULL;
}

tAsyncCall* System_RuntimeType_get_BaseType(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	tMD_TypeDef *pBaseType = pThisType->pParent;

	if (pBaseType == NULL) {
		*(HEAP_PTR*)pReturnValue = NULL;
	} else {
		*(HEAP_PTR*)pReturnValue = Type_GetTypeObject(pBaseType);
	}

	return NULL;
}

tAsyncCall* System_RuntimeType_get_IsEnum(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	U32 isEnum = pThisType->pParent == types[TYPE_SYSTEM_ENUM];
	*(U32*)pReturnValue = isEnum;

	return NULL;
}

tAsyncCall* System_RuntimeType_get_IsGenericType(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	*(U32*)pReturnValue = TYPE_ISGENERICINSTANCE(pThisType) || pThisType->isGenericDefinition;
	return NULL;
}

tAsyncCall* System_RuntimeType_Internal_GetGenericTypeDefinition(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);

	if (TYPE_ISGENERICINSTANCE(pThisType)) {
		pThisType = pThisType->pGenericDefinition;
	}

	*(HEAP_PTR*)pReturnValue = Type_GetTypeObject(pThisType);

	return NULL;
}

tAsyncCall* System_RuntimeType_GetGenericArguments(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	tMD_TypeDef *pCoreType;
	U32 i, argCount = 0;
	HEAP_PTR ret;

	pCoreType = pThisType->pGenericDefinition;
	if (pCoreType != NULL) {
		// Find the core instantiation of this type
		tGenericInstance *pInst = pCoreType->pGenericInstances;
		while (pInst != NULL) {
			if (pInst->pInstanceTypeDef == pThisType) {
				// Found it!
				argCount = pInst->numTypeArgs;
			}
			pInst = pInst->pNext;
		}
	}

	ret = SystemArray_NewVector(types[TYPE_SYSTEM_ARRAY_TYPE], argCount);
	// Allocate to return value straight away, so it cannot be GCed
	*(HEAP_PTR*)pReturnValue = ret;

	for (i=0; i<argCount; i++) {
		HEAP_PTR argType = Type_GetTypeObject(pThisType->ppClassTypeArgs[i]);
		SystemArray_StoreElement(ret, i, (PTR)&argType);
	}

	return NULL;
}

tAsyncCall* System_RuntimeType_IsDefined(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	return NULL;
}

tAsyncCall* System_RuntimeType_GetCustomAttributes(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	return NULL;
}

tAsyncCall* System_RuntimeType_GetElementType(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pThisType = RuntimeType_DeRef(pThis_);
	tMD_TypeDef *pElementTypeDef = pThisType->pArrayElementType;

	if (pElementTypeDef != NULL) {
		*(HEAP_PTR*)pReturnValue = Type_GetTypeObject(pElementTypeDef);
	} else {
		*(HEAP_PTR*)pReturnValue = NULL;
	}

	return NULL;
}