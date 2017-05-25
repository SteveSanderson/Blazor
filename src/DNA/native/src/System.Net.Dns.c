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

#include "System.Net.Dns.h"

#include "Type.h"
#include "System.Array.h"
#include "System.String.h"

#ifndef WIN32
#include <netdb.h>
#endif

tAsyncCall* System_Net_Dns_Internal_GetHostEnt(PTR pThis_, PTR pParams, PTR pReturnValue) {
	struct hostent *pHostEnt;
	U32 i, len;
	STRING2 name2;
	HEAP_PTR retArray;
	U8 nameU8[256];

	HEAP_PTR name = INTERNALCALL_PARAM(0, STRING);
	HEAP_PTR *pHostName = INTERNALCALL_PARAM(4, STRING*);

	name2 = SystemString_GetString(name, &len);
	for (i=0; i<len && i<256; i++) {
		nameU8[i] = (U8)name2[i];
	}
	nameU8[i] = 0;
	pHostEnt = gethostbyname(nameU8);
	*pHostName = SystemString_FromCharPtrASCII(pHostEnt->h_name);

	// Count how many entries there are
	for (i=0; pHostEnt->h_addr_list[i] != NULL; i++);

	retArray = SystemArray_NewVector(types[TYPE_SYSTEM_ARRAY_INT32], i);
	*(HEAP_PTR*)pReturnValue = retArray;
	for (i=0; pHostEnt->h_addr_list[i] != NULL; i++) {
		SystemArray_StoreElement(retArray, i, pHostEnt->h_addr_list[i]);
	}

	return NULL;

}
