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

#include "System.String.h"

#include "MetaData.h"
#include "Types.h"
#include "Type.h"

tAsyncCall* System_Console_Write(PTR pThis_, PTR pParams, PTR pReturnValue) {
	HEAP_PTR string;
	STRING2 str;
	U32 i, strLen;

	string = *(HEAP_PTR*)pParams;
	if (string != NULL) {
#define SUB_LEN 128
		unsigned char str8[SUB_LEN+1];
		U32 start = 0;
		str = SystemString_GetString(string, &strLen);
		while (strLen > 0) {
			U32 thisLen = (strLen > SUB_LEN)?SUB_LEN:strLen;
			for (i=0; i<thisLen; i++) {
				unsigned char c = str[start+i] & 0xff;
				str8[i] = c?c:'?';
			}
			str8[i] = 0;
			printf(str8);
			strLen -= thisLen;
			start += thisLen;
		}
	}

	return NULL;
}

static U32 nextKeybC = 0xffffffff;
static U32 Internal_ReadKey_Check(PTR pThis_, PTR pParams, PTR pReturnValue, tAsyncCall *pAsync) {
	if (nextKeybC != 0xffffffff) {
		*(U32*)pReturnValue = nextKeybC;
		nextKeybC = 0xffffffff;
		return 1;
	} else {
#ifdef WIN32
		if (_kbhit()) {
			U32 c = _getch();
			*(U32*)pReturnValue = c;
			return 1;
		} else {
			return 0;
		}
#else
		struct timeval tv_timeout;
		fd_set readfds;
		int res;
		U8 c;
		
		tv_timeout.tv_sec = 0;
		tv_timeout.tv_usec = 0;
		FD_ZERO(&readfds);
		FD_SET(STDIN_FILENO, &readfds);
		
		res = select(FD_SETSIZE, &readfds, NULL, NULL, &tv_timeout);
		if (res <= 0) {
			// timeout
			return 0;
		}
		res = read(STDIN_FILENO, &c, 1);
		if (res == 1) {
			*(U32*)pReturnValue = c;
			return 1;
		}

		return 0;
#endif
	}
}

tAsyncCall* System_Console_Internal_ReadKey(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tAsyncCall *pAsync = TMALLOC(tAsyncCall);

	pAsync->sleepTime = -1;
	pAsync->checkFn = Internal_ReadKey_Check;
	pAsync->state = NULL;

	return pAsync;
}

tAsyncCall* System_Console_Internal_KeyAvailable(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 c, isKey;

	isKey = Internal_ReadKey_Check(NULL, NULL, (PTR)&c, NULL);
	if (isKey) {
		nextKeybC = c;
		*(U32*)pReturnValue = 1;
	} else {
		*(U32*)pReturnValue = 0;
	}

	return NULL;
}
