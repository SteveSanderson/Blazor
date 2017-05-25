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

#if !defined(__METHODSTATE_H)
#define __METHODSTATE_H

typedef struct tMethodState_ tMethodState;

#include "MetaData.h"

struct tMethodState_ {
	// This method's meta-data
	tMetaData *pMetaData;
	// The method to execute
	tMD_MethodDef *pMethod;
	// The JITted code that this method-state is using.
	// When using the combined opcode JITter, this can vary between unoptimized and optimized.
	tJITted *pJIT;
	// The current offset into the method's JITted code (instruction offset, not byte offset)
	U32 ipOffset;
	// This method's evaluation stack
	PTR pEvalStack;
	// The evaluation stack current offset
	U32 stackOfs;
	// This method's parameters & local variable storage. Params are first, followed by locals
	PTR pParamsLocals;
	// Is this methodstate from a NEWOBJ op-code?
	U32 isInternalNewObjCall;
	// If this is a Finalizer, then the 'this' object goes here,
	// so it can be marked in the 'return' statement that it no longer has a Finalizer to run
	HEAP_PTR finalizerThis;
	// When in a delegate invoke, store the next delegate to invoke here.
	// This is to allow multi-cast delegates to call all their methods.
	void *pNextDelegate;
	// And store the parameters to go to this delegate call
	void *pDelegateParams;
	// When a leave instruction has to run a 'finally' bit of code, store the leave jump address here
	U32 *pOpEndFinally;

#ifdef DIAG_METHOD_CALLS
	// For tracking execution time.
	U64 startTime;
#endif

	// Link to caller methodstate
	tMethodState *pCaller;

	// In the case of a reflection-initiated invocation (i.e., someMethodBase.Invoke(...)),
	// we need to track the target method's return type so we can interpret the stack when
	// it's done.
	tMD_TypeDef *pReflectionInvokeReturnType;
};

//void MethodState_Init();
tMethodState* MethodState_Direct(tThread *pThread, tMD_MethodDef *pMethod, tMethodState *pCaller, U32 isInternalNewObjCall);
tMethodState* MethodState(tThread *pThread, tMetaData *pMetaData, IDX_TABLE methodToken, tMethodState *pCaller);
void MethodState_Delete(tThread *pThread, tMethodState **ppMethodState);

#endif