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

#if !defined(__SYSTEM_STRING_H)
#define __SYSTEM_STRING_H

#include "MetaData.h"
#include "Types.h"

tAsyncCall* System_String_ctor_CharInt32(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_ctor_CharAIntInt(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_ctor_StringIntInt(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_get_Chars(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_InternalConcat(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_InternalTrim(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_Equals(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_GetHashCode(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_InternalReplace(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_InternalIndexOf(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_String_InternalIndexOfAny(PTR pThis_, PTR pParams, PTR pReturnValue);

HEAP_PTR SystemString_FromUserStrings(tMetaData *pMetaData, IDX_USERSTRINGS index);
HEAP_PTR SystemString_FromCharPtrASCII(U8 *pStr);
HEAP_PTR SystemString_FromCharPtrUTF16(U16 *pStr);
STRING2 SystemString_GetString(HEAP_PTR pThis_, U32 *pLength);
U32 SystemString_GetNumBytes(HEAP_PTR pThis_);

#endif