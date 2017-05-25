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

#if !defined(__GENERICS_H)
#define __GENERICS_H

typedef struct tGenericInstance_ tGenericInstance;
typedef struct tGenericMethodInstance_ tGenericMethodInstance;

#include "Types.h"
#include "MetaData.h"


struct tGenericInstance_ {
	// The tMD_TypeDef for this instance of this generic type
	tMD_TypeDef *pInstanceTypeDef;

	// The next instantiation of this generic type
	tGenericInstance *pNext;

	// The number of type arguments for this instance
	U32 numTypeArgs;
	// The type arguments for this instantiation
	tMD_TypeDef *pTypeArgs[0];
};

struct tGenericMethodInstance_ {
	// This instance method.
	tMD_MethodDef *pInstanceMethodDef;

	// The next instantiation of this generic method
	tGenericMethodInstance *pNext;

	// The number of type arguments for this instance
	U32 numTypeArgs;
	// The method type arguments for this instance
	tMD_TypeDef *pTypeArgs[0];
};

void Generic_GetHeapRoots(tHeapRoots *pHeapRoots, tMD_TypeDef *pTypeDef);

tMD_TypeDef* Generics_GetGenericTypeFromSig(tMetaData *pMetaData, SIG *pSig, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppCallingMethodTypeArgs);
tMD_TypeDef* Generics_GetGenericTypeFromCoreType(tMD_TypeDef *pCoreType, U32 numArgs, tMD_TypeDef **ppTypeArgs);//, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs);

tMD_MethodDef* Generics_GetMethodDefFromSpec(tMD_MethodSpec *pMethodSpec, tMD_TypeDef **ppCallingClassTypeArgs, tMD_TypeDef **ppCallingMethodTypeArgs);
tMD_MethodDef* Generics_GetMethodDefFromCoreMethod(tMD_MethodDef *pCoreMethod, tMD_TypeDef *pParentType, U32 numMethodTypeArgs, tMD_TypeDef **ppMethodTypeArgs);

#endif