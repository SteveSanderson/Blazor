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

#include "System.Object.h"

#include "Types.h"
#include "Type.h"

tAsyncCall* System_Object_Equals(PTR pThis_, PTR pParams, PTR pReturnValue) {
	*(U32*)pReturnValue = (pThis_ == *(PTR*)pParams);

	return NULL;
}

tAsyncCall* System_Object_Clone(PTR pThis_, PTR pParams, PTR pReturnValue) {
	HEAP_PTR obj, clone;

	obj = ((HEAP_PTR*)pParams)[0];
	clone = Heap_Clone(obj);
	*(HEAP_PTR*)pReturnValue = clone;

	return NULL;
}

tAsyncCall* System_Object_GetHashCode(PTR pThis_, PTR pParams, PTR pReturnValue) {
	*(U32*)pReturnValue = ((((U32)pThis_) >> 2) * 2654435761UL);

	return NULL;
}

tAsyncCall* System_Object_GetType(PTR pThis_, PTR pParams, PTR pReturnValue) {
	HEAP_PTR typeObject;
	tMD_TypeDef *pTypeDef;

	pTypeDef = Heap_GetType((HEAP_PTR)pThis_);
	typeObject = Type_GetTypeObject(pTypeDef);
	*(HEAP_PTR*)pReturnValue = typeObject;

	return NULL;
}
