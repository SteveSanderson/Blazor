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
#include "JIT.h"

#ifdef GEN_COMBINED_OPCODES

// Pointer to the least called method
static tMD_MethodDef *pLeastCalledMethod = NULL;
// Amount of memory currently used by combined JITted methods
static U32 combinedJITSize = 0;

static void AddCall(tMD_MethodDef *pMethod) {
	pMethod->genCallCount++;
	// See if this method needs moving in the 'call quantity' linked-list,
	// or if this method needs adding to the list for the first time
	if (pMethod->genCallCount == 1) {
		// Add for the first time
		pMethod->pNextHighestCalls = pLeastCalledMethod;
		pMethod->pPrevHighestCalls = NULL;
		if (pLeastCalledMethod != NULL) {
			pLeastCalledMethod->pPrevHighestCalls = pMethod;
		}
		pLeastCalledMethod = pMethod;
	} else {
		// See if this method needs moving up the linked-list
		tMD_MethodDef *pCheckMethod = pMethod;
		U64 numCalls = pMethod->genCallCount;
		while (pCheckMethod->pNextHighestCalls != NULL && numCalls > pCheckMethod->pNextHighestCalls->genCallCount) {
			pCheckMethod = pCheckMethod->pNextHighestCalls;
		}
		if (numCalls > pCheckMethod->genCallCount) {
			// Swap the two methods in the linked-list
			tMD_MethodDef *pT1, *pT2;
			U32 adjacent = pCheckMethod->pPrevHighestCalls == pMethod;

			if (pCheckMethod->pNextHighestCalls != NULL) {
				pCheckMethod->pNextHighestCalls->pPrevHighestCalls = pMethod;
			}
			pT1 = pMethod->pNextHighestCalls;
			pMethod->pNextHighestCalls = pCheckMethod->pNextHighestCalls;

			if (pMethod->pPrevHighestCalls != NULL) {
				pMethod->pPrevHighestCalls->pNextHighestCalls = pCheckMethod;
			} else {
				pLeastCalledMethod = pCheckMethod;
			}
			pT2 = pCheckMethod->pPrevHighestCalls;
			pCheckMethod->pPrevHighestCalls = pMethod->pPrevHighestCalls;

			if (!adjacent) {
				pT2->pNextHighestCalls = pMethod;
				pMethod->pPrevHighestCalls = pT2;
				pT1->pPrevHighestCalls = pCheckMethod;
				pCheckMethod->pNextHighestCalls = pT1;
			} else {
				pMethod->pPrevHighestCalls = pCheckMethod;
				pCheckMethod->pNextHighestCalls = pMethod;
			}
		}
	}	
}

static void DeleteCombinedJIT(tMD_MethodDef *pMethod) {
	tCombinedOpcodesMem *pCOM;
	tJITted *pJIT = pMethod->pJITtedCombined;
	free(pJIT->pExceptionHeaders);
	free(pJIT->pOps);
	pCOM = pJIT->pCombinedOpcodesMem;
	while (pCOM != NULL) {
		tCombinedOpcodesMem *pT = pCOM;
		free(pCOM->pMem);
		pCOM = pCOM->pNext;
		free(pT);
	}
}

static void RemoveCombinedJIT(tMD_MethodDef *pMethod) {
	if (pMethod->callStackCount == 0) {
		DeleteCombinedJIT(pMethod);
	} else {
		// Mark this JIT for removal. Don't quite know how to do this!
		log_f(0, "!!! CANNOT REMOVE COMBINED JIT !!!\n");
	}
	combinedJITSize -= pMethod->pJITtedCombined->opsMemSize;
	pMethod->pJITtedCombined = NULL;
	log_f(1, "Removing Combined JIT: %s\n", Sys_GetMethodDesc(pMethod));
}

static void AddCombinedJIT(tMD_MethodDef *pMethod) {
	JIT_Prepare(pMethod, 1);
	combinedJITSize += pMethod->pJITtedCombined->opsMemSize;
	log_f(1, "Creating Combined JIT: %s\n", Sys_GetMethodDesc(pMethod));
}

#endif

tMethodState* MethodState_Direct(tThread *pThread, tMD_MethodDef *pMethod, tMethodState *pCaller, U32 isInternalNewObjCall) {
	tMethodState *pThis;

	if (!pMethod->isFilled) {
		tMD_TypeDef *pTypeDef;

		pTypeDef = MetaData_GetTypeDefFromMethodDef(pMethod);
		MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
	}

	pThis = (tMethodState*)Thread_StackAlloc(pThread, sizeof(tMethodState));
	pThis->finalizerThis = NULL;
	pThis->pCaller = pCaller;
	pThis->pMetaData = pMethod->pMetaData;
	pThis->pMethod = pMethod;
	if (pMethod->pJITted == NULL) {
		// If method has not already been JITted
		JIT_Prepare(pMethod, 0);
	}
	pThis->pJIT = pMethod->pJITted;
	pThis->ipOffset = 0;
	pThis->pEvalStack = (PTR)Thread_StackAlloc(pThread, pThis->pMethod->pJITted->maxStack);
	pThis->stackOfs = 0;
	pThis->isInternalNewObjCall = isInternalNewObjCall;
	pThis->pNextDelegate = NULL;
	pThis->pDelegateParams = NULL;

	pThis->pParamsLocals = (PTR)Thread_StackAlloc(pThread, pMethod->parameterStackSize + pMethod->pJITted->localsStackSize);
	memset(pThis->pParamsLocals, 0, pMethod->parameterStackSize + pMethod->pJITted->localsStackSize);

#ifdef GEN_COMBINED_OPCODES
	AddCall(pMethod);

	/*if (combinedJITSize < GEN_COMBINED_OPCODES_MAX_MEMORY) {
		if (pMethod->genCallCount > GEN_COMBINED_OPCODES_CALL_TRIGGER) {
			if (pMethod->pJITtedCombined == NULL) {
				JIT_Prepare(pMethod, 1);
				combinedJITSize += pMethod->pJITtedCombined->opsMemSize;
			}
		}
	}*/
	if (pMethod->pJITtedCombined == NULL && pMethod->genCallCount >= GEN_COMBINED_OPCODES_CALL_TRIGGER &&
		(pMethod->pNextHighestCalls == NULL || pMethod->pPrevHighestCalls == NULL ||
		pMethod->pPrevHighestCalls->pJITtedCombined != NULL ||
		(combinedJITSize < GEN_COMBINED_OPCODES_MAX_MEMORY && pMethod->pNextHighestCalls->pJITtedCombined != NULL))) {
		// Do a combined JIT, if there's enough room after removing combined JIT from previous
		if (combinedJITSize > GEN_COMBINED_OPCODES_MAX_MEMORY) {
			// Remove the least-called function's combined JIT
			tMD_MethodDef *pToRemove = pMethod;
			while (pToRemove->pPrevHighestCalls != NULL && pToRemove->pPrevHighestCalls->pJITtedCombined != NULL) {
				pToRemove = pToRemove->pPrevHighestCalls;
			}
			if (pToRemove != pMethod) {
				RemoveCombinedJIT(pToRemove);
			}
		}
		if (combinedJITSize < GEN_COMBINED_OPCODES_MAX_MEMORY) {
			// If there's enough room, then create new combined JIT
			AddCombinedJIT(pMethod);
		}
	}

	// See if there is a combined opcode JIT ready to use
	if (pMethod->pJITtedCombined != NULL) {
		pThis->pJIT = pMethod->pJITtedCombined;
		pMethod->callStackCount++;
	}
#endif

#ifdef DIAG_METHOD_CALLS
	// Keep track of the number of times this method is called
	pMethod->callCount++;
	pThis->startTime = microTime();
#endif

	return pThis;
}

tMethodState* MethodState(tThread *pThread, tMetaData *pMetaData, IDX_TABLE methodToken, tMethodState *pCaller) {
	tMD_MethodDef *pMethod;

	pMethod = MetaData_GetMethodDefFromDefRefOrSpec(pMetaData, methodToken, NULL, NULL);
	return MethodState_Direct(pThread, pMethod, pCaller, 0);
}

void MethodState_Delete(tThread *pThread, tMethodState **ppMethodState) {
	tMethodState *pThis = *ppMethodState;


#ifdef GEN_COMBINED_OPCODES
	if (pThis->pJIT != pThis->pMethod->pJITted) {
		// Only decrease call-stack count if it's been using the combined JIT
		pThis->pMethod->callStackCount--;
	}
	if (pThis->pCaller != NULL) {
		// Add a call to the method being returned to.
		// This is neccesary to give a more correct 'usage heuristic' to long-running
		// methods that call lots of other methods.
		AddCall(pThis->pCaller->pMethod);
	}
#endif

#ifdef DIAG_METHOD_CALLS
	pThis->pMethod->totalTime += microTime() - pThis->startTime;
#endif

	// If this MethodState is a Finalizer, then let the heap know this Finalizer has been run
	if (pThis->finalizerThis != NULL) {
		Heap_UnmarkFinalizer(pThis->finalizerThis);
	}

	if (pThis->pDelegateParams != NULL) {
		free(pThis->pDelegateParams);
	}

	// Note that the way the stack free funtion works means that only the 1st allocated chunk
	// needs to be free'd, as this function just sets the current allocation offset to the address given.
	Thread_StackFree(pThread, pThis);

	*ppMethodState = NULL;
}