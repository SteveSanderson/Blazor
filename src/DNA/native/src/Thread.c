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

#include "Thread.h"

#include "MethodState.h"
#include "Heap.h"
#include "Type.h"

static tThread *pAllThreads = NULL;
static tThread *pCurrentThread;

tThread* Thread() {
	static U32 threadID = 0;
	tThread *pThis;

	// Create thread and initial method state. This is allocated on the managed heap, and
	// mark as undeletable. When the thread exits, it was marked as deletable.
	pThis = (tThread*)Heap_AllocType(types[TYPE_SYSTEM_THREADING_THREAD]);
	Heap_MakeUndeletable((HEAP_PTR)pThis);
	pThis->threadID = ++threadID;
	pThis->pCurrentMethodState = NULL;
	pThis->threadExitValue = 0;
	pThis->nextFinallyUnwindStack = 0;
	pThis->pAsync = NULL;
	pThis->hasParam = 0;

	pThis->startDelegate = NULL;
	pThis->param = NULL;
	pThis->state = THREADSTATE_UNSTARTED;

	// Allocate the first chunk of thread-local stack
	pThis->pThreadStack = TMALLOC(tThreadStack);
	pThis->pThreadStack->ofs = 0;
	pThis->pThreadStack->pNext = NULL;

	// Add to list of all thread
	pThis->pNextThread = pAllThreads;
	pAllThreads = pThis;

	return pThis;
}

void* Thread_StackAlloc(tThread *pThread, U32 size) {
	tThreadStack *pStack = pThread->pThreadStack;
	void *pAddr = pStack->memory + pStack->ofs;
#if _DEBUG
	*(U32*)pAddr = 0xabababab;
	((U32*)pAddr)++;
	pStack->ofs += 4;
#endif
	pStack->ofs += size;
	if (pStack->ofs > THREADSTACK_CHUNK_SIZE) {
		Crash("Thread-local stack is too large");
	}
#if _DEBUG
	memset(pAddr, 0xcd, size);
	*(U32*)(((char*)pAddr) + size) = 0xfbfbfbfb;
	pStack->ofs += 4;
#endif
	return pAddr;
}

void Thread_StackFree(tThread *pThread, void *pAddr) {
	tThreadStack *pStack = pThread->pThreadStack;
#if _DEBUG
	((U32*)pAddr)--;
	memset(pAddr, 0xfe, pStack->ofs - (U32)(((unsigned char*)pAddr) - pStack->memory));
#endif
	pStack->ofs = (U32)(((unsigned char*)pAddr) - pStack->memory);
}

void Thread_SetEntryPoint(tThread *pThis, tMetaData *pMetaData, IDX_TABLE entryPointToken, PTR params, U32 paramBytes) {
	// Set up the initial MethodState
	pThis->pCurrentMethodState = MethodState(pThis, pMetaData, entryPointToken, NULL);
	// Insert initial parameters (if any)
	if (paramBytes > 0) {
		memcpy(pThis->pCurrentMethodState->pParamsLocals, params, paramBytes);
	}
}

static void Thread_Delete(tThread *pThis) {
	tThreadStack *pStack = pThis->pThreadStack;
	while (pStack != NULL) {
		tThreadStack *pNextStack = pStack->pNext;
		free(pStack);
		pStack = pNextStack;
	}
	Heap_MakeDeletable((HEAP_PTR)pThis);
}

I32 Thread_Execute() {
	tThread *pThread, *pPrevThread;
	U32 status;

	pThread = pAllThreads;
	// Set the initial thread to the RUNNING state.
	pThread->state = THREADSTATE_RUNNING;
	// Set the initial CurrentThread
	pCurrentThread = pThread;

	for (;;) {
		U32 minSleepTime = 0xffffffff;
		I32 threadExitValue;

		status = JIT_Execute(pThread, 100);
		switch (status) {
		case THREAD_STATUS_EXIT:
			threadExitValue = pThread->threadExitValue;
			log_f(1, "Thread ID#%d exited. Return value: %d\n", (int)pThread->threadID, (int)threadExitValue);
			// Remove the current thread from the running threads list.
			// Note that this list may have changed since before the call to JIT_Execute().
			{
				tThread **ppThread = &pAllThreads;
				while (*ppThread != pThread) {
					ppThread = &((*ppThread)->pNextThread);
				}
				*ppThread = (*ppThread)->pNextThread;
			}
			// Delete the current thread
			Thread_Delete(pThread);
			// If there are no more threads left running, then exit application (by returning)
			// Threads that are unstarted or background do not stop the exit
			{
				tThread *pThread = pAllThreads;
				U32 canExit = 1;
				while (pThread != NULL) {
					if ((!(pThread->state & THREADSTATE_BACKGROUND)) && ((pThread->state & (~THREADSTATE_BACKGROUND)) != THREADSTATE_UNSTARTED)) {
						canExit = 0;
						break;
					}
					pThread = pThread->pNextThread;
				}
				if (canExit) {
					return threadExitValue;
				}
			}
			pThread = pAllThreads; // This is not really correct, but it'll work for the time being
			break;
		case THREAD_STATUS_RUNNING:
		case THREAD_STATUS_LOCK_EXIT:
			// Nothing to do
			break;
		case THREAD_STATUS_ASYNC:
			pThread->pAsync->startTime = msTime();
			break;		
		}

		// Move on to the next thread.
		// Find the next thread that isn't sleeping or blocked on IO
		pPrevThread = pThread;
		for (;;) {
			pThread = pThread->pNextThread;
			if (pThread == NULL) {
				pThread = pAllThreads;
			}
			// Set the CurrentThread correctly
			pCurrentThread = pThread;
			if ((pThread->state & (~THREADSTATE_BACKGROUND)) != 0) {
				// Thread is not running
				continue;
			}
			if (pThread->pAsync != NULL) {
				// Discover if whatever is being waited for is finished
				tAsyncCall *pAsync = pThread->pAsync;
				if (pAsync->sleepTime >= 0) {
					// This is a sleep
					U64 nowTime = msTime();
					I32 msSleepRemaining = pAsync->sleepTime - (I32)(nowTime - pAsync->startTime);
					if (msSleepRemaining <= 0) {
						// Sleep is finished
						break;
					}
					// Sleep is not finished, so continue to next thread
					if ((U32)msSleepRemaining < minSleepTime) {
						minSleepTime = msSleepRemaining;
					}
				} else {
					// This is blocking IO, or a lock
					tMethodState *pMethodState = pThread->pCurrentMethodState;
					PTR pThis;
					U32 thisOfs;
					U32 unblocked;

					if (METHOD_ISSTATIC(pMethodState->pMethod)) {
						pThis = NULL;
						thisOfs = 0;
					} else {
						pThis = *(PTR*)pMethodState->pParamsLocals;
						thisOfs = 4;
					}
					unblocked = pAsync->checkFn(pThis, pMethodState->pParamsLocals + thisOfs, pMethodState->pEvalStack, pAsync);
					if (unblocked) {
						// The IO has unblocked, and the return value is ready.
						// So delete the async object.
						// TODO: The async->state object needs to be deleted somehow (maybe)
						free(pAsync);
						// And remove it from the thread
						pThread->pAsync = NULL;
						break;
					}
					minSleepTime = 5;
				}
			} else {
				// Thread is ready to run
				break;
			}
			if (pThread == pPrevThread) {
				// When it gets here, it means that all threads are currently blocked.
				//printf("All blocked; sleep(%d)\n", minSleepTime);
				SleepMS(minSleepTime);
			}
		}
	}

}

tThread* Thread_GetCurrent() {
	return pCurrentThread;
}

void Thread_GetHeapRoots(tHeapRoots *pHeapRoots) {
	tThread *pThread;

	pThread = pAllThreads;
	while (pThread != NULL) {
		tMethodState *pMethodState;

		pMethodState = pThread->pCurrentMethodState;
		while (pMethodState != NULL) {
			// Put the evaluation stack on the roots
			Heap_SetRoots(pHeapRoots, pMethodState->pEvalStack, pMethodState->pMethod->pJITted->maxStack);
			// Put the params/locals on the roots
			Heap_SetRoots(pHeapRoots, pMethodState->pParamsLocals,
				pMethodState->pMethod->parameterStackSize+pMethodState->pMethod->pJITted->localsStackSize);

			pMethodState = pMethodState->pCaller;
		}

		pThread = pThread->pNextThread;
	}
}
