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

#include "System.Threading.Monitor.h"

#include "Type.h"
#include "Types.h"

static U32 Internal_TryEntry_Check(PTR pThis_, PTR pParams, PTR pReturnValue, tAsyncCall *pAsync) {
	HEAP_PTR pObj = ((HEAP_PTR*)pParams)[0];
	I32 timeout = ((I32*)pParams)[1];
	U32 ret = Heap_SyncTryEnter(pObj);
	U64 now;
	if (ret) {
		// Lock achieved, so return that we've got it, and unblock this thread
		*(U32*)pReturnValue = 1;
		return 1;
	}
	// Can't get lock - check timeout
	if (timeout < 0) {
		// Infinite timeout, continue to block thread
		return 0;
	}
	if (timeout == 0) {
		// Timeout is 0, so always unblock, and return failure to get lock
		*(U32*)pReturnValue = 0;
		return 1;
	}
	if (pAsync == NULL) {
		// This is the first time, so it can always block thread and wait
		return 0;
	}
	now = msTime();
	if ((I32)(now - pAsync->startTime) > timeout) {
		// Lock not got, but timeout has expired, unblock thread and return no lock
		*(U32*)pReturnValue = 0;
		return 1;
	}
	// Continue waiting, timeout not yet expired
	return 0;
}

tAsyncCall* System_Threading_Monitor_Internal_TryEnter(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 ok = Internal_TryEntry_Check(pThis_, pParams, pReturnValue, NULL);
	tAsyncCall *pAsync;
	if (ok) {
		// Got lock already, so don't block thread
		return NULL;
	}
	pAsync = TMALLOC(tAsyncCall);
	pAsync->sleepTime = -1;
	pAsync->checkFn = Internal_TryEntry_Check;
	pAsync->state = NULL;
	return pAsync;
}

tAsyncCall* System_Threading_Monitor_Internal_Exit(PTR pThis_, PTR pParams, PTR pReturnValue) {
	HEAP_PTR pObj = ((HEAP_PTR*)pParams)[0];
	Heap_SyncExit(pObj);
	return ASYNC_LOCK_EXIT;
}
