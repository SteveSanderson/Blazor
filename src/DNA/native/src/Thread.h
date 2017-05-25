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

#if !defined(__THREAD_H)
#define __THREAD_H

typedef struct tThread_ tThread;
typedef struct tThreadStack_ tThreadStack;

#include "MetaData.h"
#include "MethodState.h"
#include "Heap.h"
#include "Types.h"

#define THREADSTACK_CHUNK_SIZE 10000

struct tThreadStack_ {
	// This chunk of stack memory
	unsigned char memory[THREADSTACK_CHUNK_SIZE];
	// Current offset into this memory chunk
	U32 ofs;
	// Pointer to the next chunk.
	tThreadStack *pNext;
};

struct tThread_ {
	// Stuff that's synced with Thread.cs
	// The threadID of this thread
	U32 threadID;
	// The delegate that this thread starts by executing
	PTR startDelegate;
	// The parameter to pass to the starting method (this is ignored if no parameter is needed).
	HEAP_PTR param;
	// The current state of the thread (running/paused/etc...)
	U32 state;
	// The current culture of the thread. Never accessed in C
	void *pCurrentCulture;

	// Stuff that is independant of Thread.cs
	// Note that the size of this can be anything we like, as the size of the Thread .NET type is ignored.

	// This thread's currently executing method
	tMethodState *pCurrentMethodState;
	// Thread exit value
	I32 threadExitValue;
	// The current exception object of this thread (for use by RETHROW)
	HEAP_PTR pCurrentExceptionObject;
	// When unwinding the stack after a throw, this keeps track of which finally clauses have already been executed
	U32 nextFinallyUnwindStack;
	// And the method state that we're aiming for..
	tMethodState *pCatchMethodState;
	// And the exception catch handler we're aiming for...
	tExceptionHeader *pCatchExceptionHandler;
	// If this thread is waiting on async data, then the details are stored here
	tAsyncCall *pAsync;
	// Does this thread start with a parameter?
	U32 hasParam;
	// Pointer to the first chunk of thread-stack memory
	tThreadStack *pThreadStack;

	// The next thread in the system (needed for garbage collection and theading)
	tThread *pNextThread;
};

// The thread has finished
#define THREAD_STATUS_EXIT 1
// The thread is still running, but has completed its timeslot
#define THREAD_STATUS_RUNNING 2
// The thread is waiting on some async data (sleep or IO)
#define THREAD_STATUS_ASYNC 3
// The thread has just exited a lock, so allow other threads to acquire it if they are waiting
#define THREAD_STATUS_LOCK_EXIT 4

#define ASYNC_LOCK_EXIT ((tAsyncCall*)0x00000001)

// These are the same as the C# definitions in corelib,
// and can be ORed together.
#define THREADSTATE_RUNNING			0x0000
#define THREADSTATE_BACKGROUND		0x0004
#define THREADSTATE_UNSTARTED		0x0008
#define THREADSTATE_STOPPED			0x0010
#define THREADSTATE_SUSPENDED		0x0040

tThread* Thread();
void Thread_SetEntryPoint(tThread *pThis, tMetaData *pMetaData, IDX_TABLE entryPointToken, PTR params, U32 paramBytes);
I32 Thread_Execute();
tThread* Thread_GetCurrent();
void* Thread_StackAlloc(tThread *pThread, U32 size);
void Thread_StackFree(tThread *pThread, void *pAddr);

void Thread_GetHeapRoots(tHeapRoots *pHeapRoots);

#endif
