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

#if !defined(__SYSTEM_ARRAY_H)
#define __SYSTEM_ARRAY_H

#include "MetaData.h"
#include "Types.h"

tAsyncCall* System_Array_Internal_GetValue(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Array_Internal_SetValue(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Array_Clear(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Array_Internal_Copy(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Array_Resize(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Array_Reverse(PTR pThis_, PTR pParams, PTR pReturnValue);

HEAP_PTR SystemArray_NewVector(tMD_TypeDef *pArrayTypeDef, U32 length);
#define SystemArray_GetLength(pArray) (*(U32*)(pArray))
void SystemArray_StoreElement(HEAP_PTR pThis_, U32 index, PTR value);
void SystemArray_LoadElement(HEAP_PTR pThis_, U32 index, PTR value);
#define SystemArray_GetElements(pArray) ((PTR)(((PTR)pArray)+4))
PTR SystemArray_LoadElementAddress(HEAP_PTR pThis_, U32 index);
U32 SystemArray_GetNumBytes(HEAP_PTR pThis_, tMD_TypeDef *pElementType);
tAsyncCall* System_Array_CreateInstance(PTR pThis_, PTR pParams, PTR pReturnValue);
#endif