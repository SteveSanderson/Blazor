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

#include "System.Char.h"

#include "MetaData.h"
#include "Types.h"
#include "Type.h"

#include "System.Char.UC_IndexRuns.h"
#include "System.Char.CaseConversion.h"

#define UC_INDEX_LEN (sizeof(UC_Index) / 4)
tAsyncCall* System_Char_GetUnicodeCategory(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 paramCodePoint = ((U32*)pParams)[0];
	// Do a binary search on the UC_Index array
	U32 curOfs = UC_INDEX_LEN / 2;
	U32 upper = UC_INDEX_LEN;
	U32 lower = 0;
	U32 indexCodePoint;
	if (paramCodePoint == 0xffff) {
		// Special case for 0xffff, as this will not be handled correctly by the code below
		*(U32*)pReturnValue = 29;
		return NULL;
	}
	for(;;) {
		indexCodePoint = UC_Index[curOfs << 1];
		if (paramCodePoint >= indexCodePoint && paramCodePoint < UC_Index[(curOfs+1) << 1]) {
			// Found the correct entry...
			U32 value = UC_Index[(curOfs << 1) + 1];
			if (value & 0x8000) {
				// This is a run, not a direct look-up
				value &= 0x7fff;
				value += paramCodePoint - indexCodePoint;
				value = UC_Runs[value];
			}
			*(U32*)pReturnValue = value;
			return NULL;
		}
		if (paramCodePoint < indexCodePoint) {
			upper = curOfs;
		} else {
			lower = curOfs;
		}
		curOfs = lower + ((upper - lower) >> 1);
	}
}

// Return -1 if not found
static I32 SearchCaseArray(unsigned short *pCaseArray, unsigned short find) {
	U32 lower = 0;
	U32 upper = sizeof(UC_CaseUpper) / 2;
	U32 curOfs = sizeof(UC_CaseUpper) / 4;
	unsigned short val;

	if (find == 0xffff) {
		// Hande 0xffff specially, as the search below cannot handle it.
		return -1;
	}

	for(;;) {
		val = pCaseArray[curOfs];
		if (find >= val && find < pCaseArray[curOfs + 1]) {
			// Found the correct entry
			if (find == val) {
				return (I32)curOfs;
			}
			return -1;
		}
		if (find < val) {
			upper = curOfs;
		} else {
			lower = curOfs;
		}
		if (upper == 0) {
			return -1;
		}
		curOfs = lower + ((upper - lower) >> 1);
	}
}

tAsyncCall* System_Char_ToLowerInvariant(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 paramCodePoint = ((U32*)pParams)[0];
	I32 pos;

	pos = SearchCaseArray(UC_CaseUpper, (unsigned short)paramCodePoint);
	*(U32*)pReturnValue = (pos < 0)?paramCodePoint:UC_CaseLower[pos];

	return NULL;
}

tAsyncCall* System_Char_ToUpperInvariant(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 paramCodePoint = ((U32*)pParams)[0];
	I32 pos;

	pos = SearchCaseArray(UC_CaseLower, (unsigned short)paramCodePoint);
	*(U32*)pReturnValue = (pos < 0)?paramCodePoint:UC_CaseUpper[pos];

	return NULL;
}
