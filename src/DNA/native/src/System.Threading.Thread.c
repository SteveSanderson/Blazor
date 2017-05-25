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

#include "System.Threading.Thread.h"

#include "Types.h"
#include "Type.h"
#include "Delegate.h"
#include "Thread.h"

tAsyncCall* System_Threading_Thread_ctor(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tThread *pThread = Thread();
	pThread->startDelegate = ((PTR*)pParams)[0];
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pThread;
	return NULL;
}

tAsyncCall* System_Threading_Thread_ctorParam(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tThread *pThread = Thread();
	pThread->startDelegate = ((PTR*)pParams)[0];
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pThread;
	pThread->hasParam = 1;
	return NULL;
}

tAsyncCall* System_Threading_Thread_Start(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tThread *pThread = (tThread*)pThis_;
	tMD_MethodDef *pStartMethod;
	HEAP_PTR pStartObj;
	PTR params[2];
	U32 paramBytes = 0;

	// This selects the RUNNING state (=0), without changing the IsBackground bit
	pThread->state &= THREADSTATE_BACKGROUND;

	pStartMethod = Delegate_GetMethodAndStore(pThread->startDelegate, &pStartObj, NULL);

	if (pStartObj != NULL) {
		// If this method is not static, so it has a start object, then make it the first parameter
		params[0] = (PTR)pStartObj;
		paramBytes = sizeof(void*);
	}
	if (pThread->hasParam) {
		// If this method has an object parameter (ParameterizedThreadStart)
		params[paramBytes] = (PTR)pThread->param;
		paramBytes += sizeof(void*);
	}

	Thread_SetEntryPoint(pThread, pStartMethod->pMetaData, pStartMethod->tableIndex, (PTR)&params, paramBytes);

	return NULL;
}

tAsyncCall* System_Threading_Thread_Sleep(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tAsyncCall *pAsync = TMALLOC(tAsyncCall);

	pAsync->sleepTime = ((I32*)pParams)[0];

	return pAsync;
}

tAsyncCall* System_Threading_Thread_get_CurrentThread(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tThread *pThread = Thread_GetCurrent();
	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pThread;

	return NULL;
}
