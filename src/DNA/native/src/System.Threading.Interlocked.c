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

#include "System.Threading.Interlocked.h"

tAsyncCall* System_Threading_Interlocked_CompareExchange_Int32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 *pLoc = INTERNALCALL_PARAM(0, U32*);
	U32 value = INTERNALCALL_PARAM(4, U32);
	U32 comparand = INTERNALCALL_PARAM(8, U32);

	*(U32*)pReturnValue = *pLoc;
	if (*pLoc == comparand) {
		*pLoc = value;
	}

	return NULL;
}

tAsyncCall* System_Threading_Interlocked_Increment_Int32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	I32 *pLoc = INTERNALCALL_PARAM(0, I32*);

	(*pLoc)++;
	*(I32*)pReturnValue = *pLoc;

	return NULL;
}

tAsyncCall* System_Threading_Interlocked_Decrement_Int32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	I32 *pLoc = INTERNALCALL_PARAM(0, I32*);

	(*pLoc)--;
	*(I32*)pReturnValue = *pLoc;

	return NULL;
}

tAsyncCall* System_Threading_Interlocked_Add_Int32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 *pLoc = INTERNALCALL_PARAM(0, U32*);
	U32 value = INTERNALCALL_PARAM(4, U32);

	*pLoc += value;
	*(U32*)pReturnValue = *pLoc;

	return NULL;
}

tAsyncCall* System_Threading_Interlocked_Exchange_Int32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 *pLoc = INTERNALCALL_PARAM(0, U32*);
	U32 value = INTERNALCALL_PARAM(4, U32);

	*(U32*)pReturnValue = *pLoc;
	*pLoc = value;

	return NULL;
}
