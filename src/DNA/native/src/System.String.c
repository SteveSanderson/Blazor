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

#include <string.h>
#include <wchar.h>

#include "Compat.h"
#include "Sys.h"

#include "System.Char.h"
#include "System.String.h"

#include "MetaData.h"
#include "Types.h"
#include "Heap.h"
#include "Type.h"
#include "System.Array.h"

#include "errno.h"

typedef struct tSystemString_ tSystemString;
// This structure must tie up with string.cs
struct tSystemString_ {
	// Length in characters (not bytes)
	U32 length;
	// The characters
	CHAR2 chars[0];
};

// length in characters, not bytes
static tSystemString* CreateStringHeapObj(U32 len) {
	tSystemString *pSystemString;
	U32 totalSize;
	
	totalSize = sizeof(tSystemString) + ((len + 1) << 1);
	pSystemString = (tSystemString*)Heap_Alloc(types[TYPE_SYSTEM_STRING], totalSize);
	pSystemString->length = len;
	return pSystemString;
}

tAsyncCall* System_String_ctor_CharInt32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pSystemString;
	CHAR2 c;
	U32 i, len;

	c = (CHAR2)(((U32*)pParams)[0]);
	len = ((U32*)pParams)[1];
	pSystemString = CreateStringHeapObj(len);
	for (i=0; i<len; i++) {
		pSystemString->chars[i] = c;
	}
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pSystemString;

	return NULL;
}

tAsyncCall* System_String_ctor_CharA(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pSystemString;
	HEAP_PTR charArray;
	PTR charElements;
	U32 startIndex = 0, length = SystemArray_GetLength(((HEAP_PTR*)pParams)[0]);

	charArray = ((HEAP_PTR*)pParams)[0];

	charElements = SystemArray_GetElements(charArray);
	pSystemString = CreateStringHeapObj(length);
	memcpy(pSystemString->chars, charElements + (startIndex << 1), length << 1);
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pSystemString;

	return NULL;
}

tAsyncCall* System_String_ctor_CharAIntInt(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pSystemString;
	HEAP_PTR charArray;
	PTR charElements;
	U32 startIndex, length;

	charArray = ((HEAP_PTR*)pParams)[0];
	startIndex = ((U32*)pParams)[1];
	length = ((U32*)pParams)[2];

	charElements = SystemArray_GetElements(charArray);
	pSystemString = CreateStringHeapObj(length);
	memcpy(pSystemString->chars, charElements + (startIndex << 1), length << 1);
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pSystemString;

	return NULL;
}

tAsyncCall* System_String_ctor_StringIntInt(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pSystemString, *pStr;
	U32 startIndex, length;

	pStr = ((tSystemString**)pParams)[0];
	startIndex = ((U32*)pParams)[1];
	length = ((U32*)pParams)[2];

	pSystemString = CreateStringHeapObj(length);
	memcpy(pSystemString->chars, &pStr->chars[startIndex], length << 1);
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pSystemString;

	return NULL;
}

tAsyncCall* System_String_get_Chars(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	U32 index;

	index = *(U32*)pParams;
	*(U32*)pReturnValue = pThis->chars[index];

	return NULL;
}

tAsyncCall* System_String_InternalConcat(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *s0, *s1, *ret;

	s0 = ((tSystemString**)pParams)[0];
	s1 = ((tSystemString**)pParams)[1];
	ret = CreateStringHeapObj(s0->length + s1->length);
	memcpy(ret->chars, s0->chars, s0->length << 1);
	memcpy(&ret->chars[s0->length], s1->chars, s1->length << 1);
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)ret;

	return NULL;
}

tAsyncCall* System_String_InternalCopyTo(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;

	I32 sourceIndex = ((I32*)pParams)[0];
	HEAP_PTR pCharArray = ((HEAP_PTR*)pParams)[1];
	I32 destIndex = ((I32*)pParams)[2];
	I32 count = ((I32*)pParams)[3];

	CHAR2 *pDestChars = (CHAR2*)SystemArray_GetElements(pCharArray);
	memcpy(&pDestChars[destIndex], &pThis->chars[sourceIndex], count << 1);

	return NULL;
}

tAsyncCall* System_String_InternalTrim(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	HEAP_PTR pWhiteChars;
	U32 trimType, i, j, checkCharsLen;
	U32 ofsStart, ofsEnd;
	CHAR2 *pCheckChars;
	U32 isWhiteSpace;
	tSystemString *pRet;
	CHAR2 c;

	pWhiteChars = ((HEAP_PTR*)pParams)[0];
	trimType = ((U32*)pParams)[1];
	pCheckChars = (CHAR2*)SystemArray_GetElements(pWhiteChars);
	checkCharsLen = SystemArray_GetLength(pWhiteChars);

	ofsStart = 0;
	ofsEnd = pThis->length;
	if (trimType & 1) {
		// Trim start
		for (i=ofsStart; i<ofsEnd; i++) {
			// Check if each char is in the array
			isWhiteSpace = 0;
			c = pThis->chars[i];
			for (j=0; j<checkCharsLen; j++) {
				if (c == pCheckChars[j]) {
					isWhiteSpace = 1;
					break;
				}
			}
			if (isWhiteSpace == 0) {
				ofsStart = i;
				break;
			}
		}
	}
	if (trimType & 2) {
		// Trim end
		for (i=ofsEnd-1; i>=ofsStart; i--) {
			// Check if each char is in the array
			isWhiteSpace = 0;
			c = pThis->chars[i];
			for (j=0; j<checkCharsLen; j++) {
				if (c == pCheckChars[j]) {
					isWhiteSpace = 1;
					break;
				}
			}
			if (isWhiteSpace == 0) {
				ofsEnd = i + 1;
				break;
			}
		}
	}

	pRet = CreateStringHeapObj(ofsEnd - ofsStart);
	memcpy(pRet->chars, &pThis->chars[ofsStart], (ofsEnd - ofsStart) << 1);
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pRet;

	return NULL;
}

tAsyncCall* System_String_CompareOrdinal(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *a, *b;
	I32 ret;

	a = ((tSystemString**)pParams)[0];
	b = ((tSystemString**)pParams)[1];

	if (a == NULL && b == NULL) { ret = 0; }
	else if (a == NULL) { ret = -1; }
	else if (b == NULL) { ret = 1; }
	else { ret = wcscmp((wchar_t *)a->chars, (wchar_t *)b->chars); }
	*(I32*)pReturnValue = ret;

	return NULL;
}

tAsyncCall* System_String_Equals(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *a, *b;
	U32 ret;

	a = ((tSystemString**)pParams)[0];
	b = ((tSystemString**)pParams)[1];

	if (a == b) {
		ret = 1;
	} else if (a == NULL || b == NULL || a->length != b->length) {
		ret = 0;
	} else {
		ret = (memcmp(a->chars, b->chars, a->length<<1) == 0)?1:0;
	}
	*(U32*)pReturnValue = ret;

	return NULL;
}

tAsyncCall* System_String_GetHashCode(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	I32 hash1 = 5381;
	I32 hash2 = hash1;
	CHAR2 *pChar = pThis->chars;
	CHAR2 *pEnd = pChar + pThis->length - 1;
	for (; pChar < pEnd; pChar += 2) {
		hash1 = ((hash1 << 5) + hash1) ^ pChar[0];
		hash2 = ((hash2 << 5) + hash2) ^ pChar[1];
	}
	if (pChar <= pEnd) {
		hash1 = ((hash1 << 5) + hash1) ^ pChar[0];
	}
	*(I32*)pReturnValue = hash1 + (hash2 * 1566083941);
	return NULL;
}

tAsyncCall* System_String_InternalReplace(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	tSystemString *pOld = ((tSystemString**)pParams)[0];
	tSystemString *pNew = ((tSystemString**)pParams)[1];
	tSystemString *pResult;
	U32 thisLen, oldLen, newLen;
	CHAR2 *pThisChar0, *pOldChar0, *pNewChar0, *pResultChar0;
	U32 i, j, replacements, dstIndex;
	U32 resultLen;

	// This function (correctly) assumes that the old string is not empty
	thisLen = pThis->length;
	oldLen = pOld->length;
	newLen = pNew->length;
	pThisChar0 = pThis->chars;
	pOldChar0 = pOld->chars;
	pNewChar0 = pNew->chars;

	replacements = 0;
	for (i=0; i<thisLen-oldLen+1; i++) {
		U32 match = 1;
		for (j=0; j<oldLen; j++) {
			if (pThisChar0[i+j] != pOldChar0[j]) {
				match = 0;
				break;
			}
		}
		if (match) {
			i += oldLen - 1;
			replacements++;
		}
	}
	resultLen = thisLen - (oldLen - newLen) * replacements;
	pResult = CreateStringHeapObj(resultLen);
	pResultChar0 = pResult->chars;
	dstIndex = 0;
	for (i=0; i<thisLen; i++) {
		U32 match;
		if (i<thisLen-oldLen+1) {
			for (j=0; j<oldLen; j++) {
				match = 1;
				if (pThisChar0[i+j] != pOldChar0[j]) {
					match = 0;
					break;
				}
			}
		} else {
			match = 0;
		}
		if (match) {
			memcpy(&pResultChar0[dstIndex], pNewChar0, newLen << 1);
			dstIndex += newLen;
			i += oldLen - 1;
		} else {
			pResultChar0[dstIndex++] = pThisChar0[i];
		}
	}
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pResult;

	return NULL;
}

tAsyncCall* System_String_InternalIndexOf(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	CHAR2 value = ((CHAR2*)pParams)[0];
	I32 startIndex = ((I32*)pParams)[1];
	I32 count = ((I32*)pParams)[2];
	U32 forward = ((U32*)pParams)[3];

	I32 inc = forward ? 1 : -1;
	I32 lastIndex = forward ? startIndex + count : startIndex - count;

	for (I32 i = startIndex; i != lastIndex; i += inc) {
		if (pThis->chars[i] == value) {
			*(I32*)pReturnValue = i;
			return NULL;
		}
	}
	*(I32*)pReturnValue = -1;
	return NULL;
}

tAsyncCall* System_String_InternalIndexOfAny(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	HEAP_PTR valueArray = ((HEAP_PTR*)pParams)[0];
	I32 startIndex = ((I32*)pParams)[1];
	I32 count = ((I32*)pParams)[2];
	U32 forward = ((U32*)pParams)[3];

	PTR valueChars = SystemArray_GetElements(valueArray);
	U32 numValueChars = SystemArray_GetLength(valueArray);

	I32 inc = forward ? 1 : -1;
	I32 lastIndex = forward ? startIndex + count : startIndex - count;

	for (I32 i = startIndex; i != lastIndex; i += inc) {
		CHAR2 thisChar = pThis->chars[i];
		for (I32 j=numValueChars - 1; j >= 0; j--) {
			if (thisChar == ((CHAR2*)valueChars)[j]) {
				*(I32*)pReturnValue = i;
				return NULL;
			}
		}
	}

	*(I32*)pReturnValue = -1;
	return NULL;
}

tAsyncCall* System_String_InternalIndexOfStr(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	tSystemString *pValue = ((tSystemString**)pParams)[0];
	I32 startIndex = ((I32*)pParams)[1];
	I32 count = ((I32*)pParams)[2];
	U32 forward = ((U32*)pParams)[3];

	if (pThis->length == 0) {
		*(I32*)pReturnValue = (pValue->length == 0 ? 0 : -1);
		return NULL;
	}
	if (pValue->length == 0) {
		*(I32*)pReturnValue = (forward ? startIndex : min((I32)pThis->length - 1, startIndex));
		return NULL;
	}

	if (!forward && startIndex == pThis->length) {
		startIndex--;
		if (count > 0) { count--; }
	}

	I32 inc = forward ? 1 : -1;
	I32 fromIndex = forward ? startIndex : startIndex - pValue->length + 1;
	I32 lastIndex = forward ? startIndex + count - pValue->length + 1 : startIndex - count;
	U32 byteLen = pValue->length << 1;

	for (I32 i = fromIndex; i != lastIndex; i += inc) {
		if (memcmp(&pThis->chars[i], pValue->chars, byteLen) == 0) {
			*(I32*)pReturnValue = i;
			return NULL;
		}
	}

	*(I32*)pReturnValue = -1;
	return NULL;
}

HEAP_PTR SystemString_FromUserStrings(tMetaData *pMetaData, IDX_USERSTRINGS index) {
	unsigned int stringLen;
	STRING2 string;
	tSystemString *pSystemString;
	
	string = MetaData_GetUserString(pMetaData, index, &stringLen);
	// Note: stringLen is in bytes
	pSystemString = (tSystemString*)CreateStringHeapObj(stringLen >> 1);
	memcpy(pSystemString->chars, string, stringLen);
	return (HEAP_PTR)pSystemString;
}

HEAP_PTR SystemString_FromCharPtrASCII(U8 *pStr) {
	int stringLen, i;
	tSystemString *pSystemString;

	stringLen = (int)strlen(pStr);
	pSystemString = CreateStringHeapObj(stringLen);
	for (i=0; i<stringLen; i++) {
		pSystemString->chars[i] = pStr[i];
	}
	return (HEAP_PTR)pSystemString;
}

HEAP_PTR SystemString_FromCharPtrUTF16(CHAR2 *pStr) {
	tSystemString *pSystemString;
	int strLen = 0;

	while (pStr[strLen] != 0) {
		strLen++;
	}
	pSystemString = CreateStringHeapObj(strLen);
	memcpy(pSystemString->chars, pStr, strLen << 1);
	return (HEAP_PTR)pSystemString;
}

STRING2 SystemString_GetString(HEAP_PTR pThis_, U32 *pLength) {
	tSystemString *pThis = (tSystemString*)pThis_;

	if (pLength != NULL) {
		*pLength = pThis->length;
	}
	return pThis->chars;
}

U32 SystemString_GetNumBytes(HEAP_PTR pThis_) {
	tSystemString *pThis = (tSystemString*)pThis_;
	return ((pThis->length + 1) << 1) + sizeof(tSystemString);
}

tAsyncCall* System_String_InternalFromInt32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	CHAR2 buf[30];
	swprintf((wchar_t*)buf, sizeof(buf)/sizeof(buf[0]), L"%d", INTERNALCALL_PARAM(0, I32));
	*(HEAP_PTR*)pReturnValue = SystemString_FromCharPtrUTF16(buf);
	return NULL;
}

tAsyncCall* System_String_InternalFromInt64(PTR pThis_, PTR pParams, PTR pReturnValue) {
	CHAR2 buf[30];
	swprintf((wchar_t*)buf, sizeof(buf) / sizeof(buf[0]), L"%lld", INTERNALCALL_PARAM(0, I64));
	*(HEAP_PTR*)pReturnValue = SystemString_FromCharPtrUTF16(buf);
	return NULL;
}

tAsyncCall* System_String_InternalFromUInt32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	CHAR2 buf[30];
	swprintf((wchar_t*)buf, sizeof(buf) / sizeof(buf[0]), L"%u", INTERNALCALL_PARAM(0, U32));
	*(HEAP_PTR*)pReturnValue = SystemString_FromCharPtrUTF16(buf);
	return NULL;
}

tAsyncCall* System_String_InternalFromUInt64(PTR pThis_, PTR pParams, PTR pReturnValue) {
	CHAR2 buf[30];
	swprintf((wchar_t*)buf, sizeof(buf) / sizeof(buf[0]), L"%llu", INTERNALCALL_PARAM(0, U64));
	*(HEAP_PTR*)pReturnValue = SystemString_FromCharPtrUTF16(buf);
	return NULL;
}

tAsyncCall* System_String_InternalFromSingle(PTR pThis_, PTR pParams, PTR pReturnValue) {
	CHAR2 buf[30];
	swprintf((wchar_t*)buf, sizeof(buf) / sizeof(buf[0]), L"%.7G", INTERNALCALL_PARAM(0, float));
	*(HEAP_PTR*)pReturnValue = SystemString_FromCharPtrUTF16(buf);
	return NULL;
}

tAsyncCall* System_String_InternalFromDouble(PTR pThis_, PTR pParams, PTR pReturnValue) {
	CHAR2 buf[30];
	swprintf((wchar_t*)buf, sizeof(buf) / sizeof(buf[0]), L"%.15G", INTERNALCALL_PARAM(0, double));
	*(HEAP_PTR*)pReturnValue = SystemString_FromCharPtrUTF16(buf);
	return NULL;
}

tAsyncCall* System_String_InternalToInt32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	U32 *pError = ((U32**)pParams)[0];
	I32 radix = ((I32*)pParams)[1];
	wchar_t *end, *str = (wchar_t *)pThis->chars;
	errno = 0;
	I32 ret = wcstol(str, &end, radix);
	*pError = end != (str + pThis->length) || (ret == 0 && errno != 0);
	*(I32*)pReturnValue = ret;
	return NULL;
}

tAsyncCall* System_String_InternalToInt64(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	U32 *pError = ((U32**)pParams)[0];
	I32 radix = ((I32*)pParams)[1];
	wchar_t *end, *str = (wchar_t *)pThis->chars;
	errno = 0;
	I64 ret = wcstoll(str, &end, radix);
	*pError = end != (str + pThis->length) || (ret == 0 && errno != 0);
	*(I64*)pReturnValue = ret;
	return NULL;
}

tAsyncCall* System_String_InternalToUInt32(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	U32 *pError = ((U32**)pParams)[0];
	I32 radix = ((I32*)pParams)[1];
	wchar_t *end, *str = (wchar_t *)pThis->chars;
	errno = 0;
	U32 ret = wcstoul(str, &end, radix);
	*pError = end != (str + pThis->length) || (ret == 0 && errno != 0);
	*(U32*)pReturnValue = ret;
	return NULL;
}

tAsyncCall* System_String_InternalToUInt64(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	U32 *pError = ((U32**)pParams)[0];
	I32 radix = ((I32*)pParams)[1];
	wchar_t *end, *str = (wchar_t *)pThis->chars;
	errno = 0;
	U64 ret = wcstoull(str, &end, radix);
	*pError = end != (str + pThis->length) || (ret == 0 && errno != 0);
	*(U64*)pReturnValue = ret;
	return NULL;
}

tAsyncCall* System_String_InternalToSingle(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	U32 *pError = ((U32**)pParams)[0];
	wchar_t *end, *str = (wchar_t *)pThis->chars;
	errno = 0;
	float ret = wcstof(str, &end);
	*pError = end != (str + pThis->length) || (ret == 0 && errno != 0);
	*(float*)pReturnValue = ret;
	return NULL;
}

tAsyncCall* System_String_InternalToDouble(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	U32 *pError = ((U32**)pParams)[0];
	wchar_t *end, *str = (wchar_t *)pThis->chars;
	errno = 0;
	double ret = wcstod(str, &end);
	*pError = end != (str + pThis->length) || (ret == 0 && errno != 0);
	*(double*)pReturnValue = ret;
	return NULL;
}

tAsyncCall* System_String_ToLowerInvariant(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	tSystemString *pSystemString = CreateStringHeapObj(pThis->length);
	for (U32 i = 0; i < pThis->length; i++) {
		pSystemString->chars[i] = Char_ToLowerInvariant(pThis->chars[i]);
	}
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pSystemString;
	return NULL;
}

tAsyncCall* System_String_ToUpperInvariant(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tSystemString *pThis = (tSystemString*)pThis_;
	tSystemString *pSystemString = CreateStringHeapObj(pThis->length);
	for (U32 i = 0; i < pThis->length; i++) {
		pSystemString->chars[i] = Char_ToUpperInvariant(pThis->chars[i]);
	}
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pSystemString;
	return NULL;
}
