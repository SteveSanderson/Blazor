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

#include "System.Enum.h"

#include "MetaData.h"
#include "Types.h"
#include "Type.h"
#include "System.RuntimeType.h"
#include "System.Array.h"
#include "System.String.h"

tAsyncCall* System_Enum_Internal_GetValue(PTR pThis_, PTR pParams, PTR pReturnValue) {
	*(U32*)pReturnValue = *(U32*)pThis_;

	return NULL;
}

tAsyncCall* System_Enum_Internal_GetInfo(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tMD_TypeDef *pEnumType = RuntimeType_DeRef((PTR)((tMD_TypeDef**)pParams)[0]);
	U32 i, retIndex;
	HEAP_PTR names, values;

	// An enum type always has just one non-literal field, with all other fields being the values.
	names = SystemArray_NewVector(types[TYPE_SYSTEM_ARRAY_STRING], pEnumType->numFields - 1);
	values = SystemArray_NewVector(types[TYPE_SYSTEM_ARRAY_INT32], pEnumType->numFields - 1);
	
	for (i=0, retIndex=0; i<pEnumType->numFields; i++) {
		tMD_FieldDef *pField = pEnumType->ppFields[i];
		HEAP_PTR name;
		I32 value;

		if (!FIELD_ISLITERAL(pField)) {
			continue;
		}

		name = SystemString_FromCharPtrASCII(pField->name);
		SystemArray_StoreElement(names, retIndex, (PTR)&name);
		MetaData_GetConstant(pField->pMetaData, pField->tableIndex, (PTR)&value);
		SystemArray_StoreElement(values, retIndex, (PTR)&value);
		retIndex++;
	}

	*(((HEAP_PTR**)pParams)[1]) = names;
	*(((HEAP_PTR**)pParams)[2]) = values;

	return NULL;
}
