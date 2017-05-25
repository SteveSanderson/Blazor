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

#include "System.Array.h"

#include "Types.h"
#include "MetaData.h"
#include "Heap.h"
#include "Type.h"

typedef struct tWeakRef_ tWeakRef;
struct tWeakRef_ {
	// The target of this weak-ref
	HEAP_PTR target;
	// Does this weak-ref track resurrection?
	U32 trackRes;
	// Link to the next weak-ref that points to the same target
	tWeakRef *pNextWeakRef;
};

tAsyncCall* System_WeakReference_get_Target(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tWeakRef *pThis = (tWeakRef*)pThis_;
	*(HEAP_PTR*)pReturnValue = pThis->target;
	return NULL;
}

tAsyncCall* System_WeakReference_set_Target(PTR pThis_, PTR pParams, PTR pReturnValue) {
	tWeakRef *pThis = (tWeakRef*)pThis_;
	HEAP_PTR target = ((HEAP_PTR*)pParams)[0];

	if (pThis->target != NULL) {
		tWeakRef **ppWeakRef = (tWeakRef**)Heap_GetWeakRefAddress(pThis->target);
		while (*ppWeakRef != NULL) {
			tWeakRef *pWeakRef = *ppWeakRef;
			if (pWeakRef == pThis) {
				*ppWeakRef = pWeakRef->pNextWeakRef;
				Heap_RemovedWeakRefTarget(pWeakRef->target);
				goto foundOK;
			}
			ppWeakRef = &(pWeakRef->pNextWeakRef);
		}
		Crash("WeakRef.set_Target() Error: cannot find weak-ref target for removal");
foundOK:;
	}
	pThis->target = target;
	if (target != NULL) {
		pThis->pNextWeakRef = (tWeakRef*)Heap_SetWeakRefTarget(target, (HEAP_PTR)pThis);
	}

	return NULL;
}

void SystemWeakReference_TargetGone(HEAP_PTR *ppWeakRef_, U32 removeLongRefs) {
	tWeakRef **ppWeakRef = (tWeakRef**)ppWeakRef_;
	tWeakRef *pWeakRef = *ppWeakRef;
	while (pWeakRef != NULL) {
		if (removeLongRefs || !pWeakRef->trackRes) {
			// Really remove it
			pWeakRef->target = NULL;
		} else {
			// Long ref, so keep it
			*ppWeakRef = pWeakRef;
			ppWeakRef = &(pWeakRef->pNextWeakRef);
		}
		pWeakRef = pWeakRef->pNextWeakRef;
	}
	*ppWeakRef = NULL;
}
