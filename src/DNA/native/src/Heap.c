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

#include "Heap.h"

#include "MetaData.h"
#include "CLIFile.h"
#include "Type.h"
#include "EvalStack.h"
#include "Finalizer.h"
#include "Thread.h"
#include "System.String.h"
#include "System.Array.h"
#include "System.WeakReference.h"

// Memory roots are:
// All threads, all MethodStates - the ParamLocals memory and the evaluation stack
// All static fields of all types
// Note that the evaluation stack is not typed, so every 4-byte entry is treated as a pointer

typedef struct tSync_ tSync;
typedef struct tHeapEntry_ tHeapEntry;

struct tSync_ {
	// The thread that holds this sync block
	tThread *pThread;
	// The number of times this thread has entered the sync block
	U32 count;

	// Link to the first weak-ref that targets this object.
	// This allows the tracking of all weak-refs that target this object.
	HEAP_PTR weakRef;
};

// The memory is kept track of using a balanced binary search tree (ordered by memory address)
// See http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx for details.

struct tHeapEntry_ {
	// Left/right links in the heap binary tree
	tHeapEntry *pLink[2];
	// The 'level' of this node. Leaf nodes have lowest level
	U8 level;
	// Used to mark that this node is still in use.
	// If this is set to 0xff, then this heap entry is undeletable.
	U8 marked;
	// Set to 1 if the Finalizer needs to be run.
	// Set to 2 if this has been added to the Finalizer queue
	// Set to 0 when the Finalizer has been run (or there is no Finalizer in the first place)
	// Only set on types that have a Finalizer
	U8 needToFinalize;
	
	// unused
	U8 padding;

	// The type in this heap entry
	tMD_TypeDef *pTypeDef;

	// Used for locking sync, and tracking WeakReference that point to this object
	tSync *pSync;

	// The user memory
	U8 memory[0];
};
// Get the tHeapEntry pointer when given a HEAP_PTR object
#define GET_HEAPENTRY(heapObj) ((tHeapEntry*)(heapObj - sizeof(tHeapEntry)))

// Forward ref
static void RemoveWeakRefTarget(tHeapEntry *pHeapEntry, U32 removeLongRefs);

static tHeapEntry *pHeapTreeRoot;
static tHeapEntry *nil;
#define MAX_TREE_DEPTH 40

// The total heap memory currently allocated
static U32 trackHeapSize;
// The max heap size allowed before a garbage collection is triggered
static U32 heapSizeMax;
// The number of allocated memory nodes
static U32 numNodes = 0;
// The number of collections done
static U32 numCollections = 0;

#ifdef DIAG_GC
// Track how much time GC's are taking
U64 gcTotalTime = 0;
#endif

#define MIN_HEAP_SIZE 50000
#define MAX_HEAP_EXCESS 200000

void Heap_Init() {
	// Initialise vars
	trackHeapSize = 0;
	heapSizeMax = MIN_HEAP_SIZE;
	// Create nil node - for leaf termination
	nil = TMALLOCFOREVER(tHeapEntry);
	memset(nil, 0, sizeof(tHeapEntry));
	nil->pLink[0] = nil->pLink[1] = nil;
	// Set the heap tree as empty
	pHeapTreeRoot = nil;
}

// Get the size of a heap entry, NOT including the header
// This works by returning the size of the type, unless the type is an array or a string,
// which are the only two types that can have variable sizes
static U32 GetSize(tHeapEntry *pHeapEntry) {
	tMD_TypeDef *pType = pHeapEntry->pTypeDef;
	if (pType == types[TYPE_SYSTEM_STRING]) {
		// If it's a string, return the string length in bytes
		return SystemString_GetNumBytes((HEAP_PTR)(pHeapEntry + 1));
	}
	if (TYPE_ISARRAY(pType)) {
		// If it's an array, return the array length * array element size
		return SystemArray_GetNumBytes((HEAP_PTR)(pHeapEntry + 1), pType->pArrayElementType);
	}
	// If it's not string or array, just return the instance memory size
	return pType->instanceMemSize;
}

static tHeapEntry* TreeSkew(tHeapEntry *pRoot) {
	if (pRoot->pLink[0]->level == pRoot->level && pRoot->level != 0) {
		tHeapEntry *pSave = pRoot->pLink[0];
		pRoot->pLink[0] = pSave->pLink[1];
		pSave->pLink[1] = pRoot;
		pRoot = pSave;
	}
	return pRoot;
}

static tHeapEntry* TreeSplit(tHeapEntry *pRoot) {
	if (pRoot->pLink[1]->pLink[1]->level == pRoot->level && pRoot->level != 0) {
		tHeapEntry *pSave = pRoot->pLink[1];
		pRoot->pLink[1] = pSave->pLink[0];
		pSave->pLink[0] = pRoot;
		pRoot = pSave;
		pRoot->level++;
	}
	return pRoot;
}

static tHeapEntry* TreeInsert(tHeapEntry *pRoot, tHeapEntry *pEntry) {
	if (pRoot == nil) {
		pRoot = pEntry;
		pRoot->level = 1;
		pRoot->pLink[0] = pRoot->pLink[1] = nil;
		pRoot->marked = 0;
	} else {
		tHeapEntry *pNode = pHeapTreeRoot;
		tHeapEntry *pUp[MAX_TREE_DEPTH];
		I32 top = 0, dir;
		// Find leaf position to insert into tree. This first step is unbalanced
		for (;;) {
			pUp[top++] = pNode;
			dir = pNode < pEntry; // 0 for left, 1 for right
			if (pNode->pLink[dir] == nil) {
				break;
			}
			pNode = pNode->pLink[dir];
		}
		// Create new node
		pNode->pLink[dir] = pEntry;
		pEntry->level = 1;
		pEntry->pLink[0] = pEntry->pLink[1] = nil;
		pEntry->marked = 0;
		// Balance the tree
		while (--top >= 0) {
			if (top != 0) {
				dir = pUp[top-1]->pLink[1] == pUp[top];
			}
			pUp[top] = TreeSkew(pUp[top]);
			pUp[top] = TreeSplit(pUp[top]);
			if (top != 0) {
				pUp[top-1]->pLink[dir] = pUp[top];
			} else {
				pRoot = pUp[0];
			}
		}
	}
	return pRoot;
}

static tHeapEntry* TreeRemove(tHeapEntry *pRoot, tHeapEntry *pDelete) {
	if (pRoot != nil) {
		if (pRoot == pDelete) {
			if (pRoot->pLink[0] != nil && pRoot->pLink[1] != nil) {
				tHeapEntry *pL0;
				U8 l;
				tHeapEntry *pHeir = pRoot->pLink[0], **ppHeirLink = &pHeir->pLink[0];
				while (pHeir->pLink[1] != nil) {
					ppHeirLink = &pHeir->pLink[1];
					pHeir = pHeir->pLink[1];
				}
				// Swap the two nodes
				pL0 = pHeir->pLink[0];
				l = pHeir->level;
				// Bring heir to replace root
				pHeir->pLink[0] = pRoot->pLink[0];
				pHeir->pLink[1] = pRoot->pLink[1];
				pHeir->level = pRoot->level;
				// Send root to replace heir
				*ppHeirLink = pRoot;
				pRoot->pLink[0] = pL0;
				pRoot->pLink[1] = nil;
				pRoot->level = l;
				// Set correct return value
				pL0 = pRoot;
				pRoot = pHeir;
				// Delete the node that's been sent down
				pRoot->pLink[0] = TreeRemove(pRoot->pLink[0], pL0);
			} else {
				pRoot = pRoot->pLink[pRoot->pLink[0] == nil];
			}
		} else {
			I32 dir = pRoot < pDelete;
			pRoot->pLink[dir] = TreeRemove(pRoot->pLink[dir], pDelete);
		}
	}

	if (pRoot->pLink[0]->level < pRoot->level-1 || pRoot->pLink[1]->level < pRoot->level-1) {
		if (pRoot->pLink[1]->level > --pRoot->level) {
			pRoot->pLink[1]->level = pRoot->level;
		}
		pRoot = TreeSkew(pRoot);
		pRoot->pLink[1] = TreeSkew(pRoot->pLink[1]);
		pRoot->pLink[1]->pLink[1] = TreeSkew(pRoot->pLink[1]->pLink[1]);
		pRoot = TreeSplit(pRoot);
		pRoot->pLink[1] = TreeSplit(pRoot->pLink[1]);
	}

	return pRoot;
}

static void GarbageCollect() {
	tHeapRoots heapRoots;
	tHeapEntry *pNode;
	tHeapEntry *pUp[MAX_TREE_DEPTH * 2];
	I32 top;
	tHeapEntry *pToDelete = NULL;
	U32 orgHeapSize = trackHeapSize;
	U32 orgNumNodes = numNodes;
#ifdef DIAG_GC
	U64 startTime;
#endif

	numCollections++;

#ifdef DIAG_GC
	startTime = microTime();
#endif

	heapRoots.capacity = 64;
	heapRoots.num = 0;
	heapRoots.pHeapEntries = malloc(heapRoots.capacity * sizeof(tHeapRootEntry));

	Thread_GetHeapRoots(&heapRoots);
	CLIFile_GetHeapRoots(&heapRoots);

	// Mark phase
	while (heapRoots.num > 0) {
		tHeapRootEntry *pRootsEntry;
		U32 i;
		U32 moreRootsAdded = 0;
		U32 rootsEntryNumPointers;
		void **pRootsEntryMem;

		// Get a piece of memory off the list of heap memory roots.
		pRootsEntry = &heapRoots.pHeapEntries[heapRoots.num - 1];
		rootsEntryNumPointers = pRootsEntry->numPointers;
		pRootsEntryMem = pRootsEntry->pMem;
		// Mark this entry as done
		pRootsEntry->numPointers = 0;
		pRootsEntry->pMem = NULL;
		// Iterate through all pointers in it
		for (i=0; i<rootsEntryNumPointers; i++) {
			void *pMemRef = pRootsEntryMem[i];
			// Quick escape for known non-memory 
			if (pMemRef == NULL) {
				continue;
			}
			// Find this piece of heap memory in the tracking tree.
			// Note that the 2nd memory address comparison MUST be >, not >= as might be expected,
			// to allow for a zero-sized memory to be detected (and not garbage collected) properly.
			// E.g. The object class has zero memory.
			pNode = pHeapTreeRoot;
			while (pNode != nil) {
				if (pMemRef < (void*)pNode) {
					pNode = pNode->pLink[0];
				} else if ((char*)pMemRef > ((char*)pNode) + GetSize(pNode) + sizeof(tHeapEntry)) {
					pNode = pNode->pLink[1];
				} else {
					// Found memory. See if it's already been marked.
					// If it's already marked, then don't do anything.
					// It it's not marked, then add all of its memory to the roots, and mark it.
					if (pNode->marked == 0) {
						tMD_TypeDef *pType = pNode->pTypeDef;

						// Not yet marked, so mark it, and add it to heap roots.
						pNode->marked = 1;
	
						// Don't look at the contents of strings, arrays of primitive types, or WeakReferences
						if (pType->stackType == EVALSTACK_O ||
							pType->stackType == EVALSTACK_VALUETYPE ||
							pType->stackType == EVALSTACK_PTR) {

							if (pType != types[TYPE_SYSTEM_STRING] &&
								(!TYPE_ISARRAY(pType) ||
								pType->pArrayElementType->stackType == EVALSTACK_O ||
								pType->pArrayElementType->stackType == EVALSTACK_VALUETYPE ||
								pType->pArrayElementType->stackType == EVALSTACK_PTR)) {

								if (pType != types[TYPE_SYSTEM_WEAKREFERENCE]) {
									Heap_SetRoots(&heapRoots,pNode->memory, GetSize(pNode));
									moreRootsAdded = 1;
								}
							}
						}
					}
					break;
				}
			}
		}
		if (!moreRootsAdded) {
			heapRoots.num--;
		}
	}

	free(heapRoots.pHeapEntries);

	// Sweep phase
	// Traverse nodes
	pUp[0] = pHeapTreeRoot;
	top = 1;
	while (top != 0) {
		// Get this node
		pNode = pUp[--top];
		// Act on this node
		if (pNode->marked) {
			if (pNode->marked != 0xff) {
				// Still in use (but not marked undeletable), so unmark
				pNode->marked = 0;
			}
		} else {
			// Not in use any more, so put in deletion queue if it does not need Finalizing
			// If it does need Finalizing, then don't garbage collect, and put in Finalization queue.
			if (pNode->needToFinalize) {
				if (pNode->needToFinalize == 1) {
					AddFinalizer((HEAP_PTR)pNode + sizeof(tHeapEntry));
					// Mark it has having been placed in the finalization queue.
					// When it has been finalized, then this will be set to 0
					pNode->needToFinalize = 2;
					// If this object is being targetted by weak-ref(s), handle it
					if (pNode->pSync != NULL) {
						RemoveWeakRefTarget(pNode, 0);
						free(pNode->pSync);
					}
				}
			} else {
				// If this object is being targetted by weak-ref(s), handle it
				if (pNode->pSync != NULL) {
					RemoveWeakRefTarget(pNode, 1);
					free(pNode->pSync);
				}
				// Use pSync to point to next entry in this linked-list.
				//(tHeapEntry*)(pNode->pSync) = pToDelete;
				pNode->pSync = pToDelete;
				pToDelete = pNode;
			}
		}
		// Get next node(s)
		if (pNode->pLink[1] != nil) {
			pUp[top++] = pNode->pLink[1];
		}
		if (pNode->pLink[0] != nil) {
			pUp[top++] = pNode->pLink[0];
		}
	}

	// Delete all unused memory nodes.
	while (pToDelete != NULL) {
		tHeapEntry *pThis = pToDelete;
		pToDelete = (tHeapEntry*)(pToDelete->pSync);
		pHeapTreeRoot = TreeRemove(pHeapTreeRoot, pThis);
		numNodes--;
		trackHeapSize -= GetSize(pThis) + sizeof(tHeapEntry);
		free(pThis);
	}

#ifdef DIAG_GC
	gcTotalTime += microTime() - startTime;
#endif

	log_f(1, "--- GARBAGE --- [Size: %d -> %d] [Nodes: %d -> %d]\n",
		orgHeapSize, trackHeapSize, orgNumNodes, numNodes);

#ifdef DIAG_GC
	log_f(1, "GC time = %d ms\n", gcTotalTime / 1000);
#endif
}

void Heap_UnmarkFinalizer(HEAP_PTR heapPtr) {
	((tHeapEntry*)(heapPtr - sizeof(tHeapEntry)))->needToFinalize = 0;
}

void Heap_GarbageCollect() {
	GarbageCollect();
}

U32 Heap_NumCollections() {
	return numCollections;
}

U32 Heap_GetTotalMemory() {
	return trackHeapSize;
}

void Heap_SetRoots(tHeapRoots *pHeapRoots, void *pRoots, U32 sizeInBytes) {
	tHeapRootEntry *pRootEntry;

	Assert((sizeInBytes & 0x3) == 0);
	if (pHeapRoots->num >= pHeapRoots->capacity) {
		pHeapRoots->capacity <<= 1;
		pHeapRoots->pHeapEntries = (tHeapRootEntry*)realloc(pHeapRoots->pHeapEntries, pHeapRoots->capacity * sizeof(tHeapRootEntry));
	}
	pRootEntry = &pHeapRoots->pHeapEntries[pHeapRoots->num++];
	pRootEntry->numPointers = sizeInBytes >> 2;
	pRootEntry->pMem = pRoots;
}

HEAP_PTR Heap_Alloc(tMD_TypeDef *pTypeDef, U32 size) {
	tHeapEntry *pHeapEntry;
	U32 totalSize;

	totalSize = sizeof(tHeapEntry) + size;

	// Trigger garbage collection if required.
	if (trackHeapSize >= heapSizeMax) {
		GarbageCollect();
		heapSizeMax = (trackHeapSize + totalSize) << 1;
		if (heapSizeMax < trackHeapSize + totalSize + MIN_HEAP_SIZE) {
			// Make sure there is always MIN_HEAP_SIZE available to allocate on the heap
			heapSizeMax = trackHeapSize + totalSize + MIN_HEAP_SIZE;
		}
		if (heapSizeMax > trackHeapSize + totalSize + MAX_HEAP_EXCESS) {
			// Make sure there is never more that MAX_HEAP_EXCESS space on the heap
			heapSizeMax = trackHeapSize + totalSize + MAX_HEAP_EXCESS;
		}
	}

	pHeapEntry = (tHeapEntry*)malloc(totalSize);
	pHeapEntry->pTypeDef = pTypeDef;
	pHeapEntry->pSync = NULL;
	pHeapEntry->needToFinalize = (pTypeDef->pFinalizer != NULL);
	memset(pHeapEntry->memory, 0, size);
	trackHeapSize += totalSize;

	pHeapTreeRoot = TreeInsert(pHeapTreeRoot, pHeapEntry);
	numNodes++;

	return pHeapEntry->memory;
}

HEAP_PTR Heap_AllocType(tMD_TypeDef *pTypeDef) {
	//printf("Heap_AllocType('%s')\n", pTypeDef->name);
	return Heap_Alloc(pTypeDef, pTypeDef->instanceMemSize);
}

tMD_TypeDef* Heap_GetType(HEAP_PTR heapEntry) {
	tHeapEntry *pHeapEntry = GET_HEAPENTRY(heapEntry);
	return pHeapEntry->pTypeDef;
}

void Heap_MakeUndeletable(HEAP_PTR heapEntry) {
	tHeapEntry *pHeapEntry = GET_HEAPENTRY(heapEntry);
	pHeapEntry->marked = 0xff;
}

void Heap_MakeDeletable(HEAP_PTR heapEntry) {
	tHeapEntry *pHeapEntry = GET_HEAPENTRY(heapEntry);
	pHeapEntry->marked = 0;
}

HEAP_PTR Heap_Box(tMD_TypeDef *pType, PTR pMem) {
	HEAP_PTR boxed;

	boxed = Heap_AllocType(pType);
	memcpy(boxed, pMem, pType->instanceMemSize);

	return boxed;
}

HEAP_PTR Heap_Clone(HEAP_PTR obj) {
	tHeapEntry *pObj = GET_HEAPENTRY(obj);
	HEAP_PTR clone;
	U32 size = GetSize(pObj);

	clone = Heap_Alloc(pObj->pTypeDef, size);
	memcpy(clone, pObj->memory, size);

	return clone;
}

static tSync* EnsureSync(tHeapEntry *pHeapEntry) {
	if (pHeapEntry->pSync == NULL) {
		tSync *pSync = TMALLOC(tSync);
		memset(pSync, 0, sizeof(tSync));
		pHeapEntry->pSync = pSync;
	}
	return pHeapEntry->pSync;
}

static void DeleteSync(tHeapEntry *pHeapEntry) {
	if (pHeapEntry->pSync != NULL) {
		if (pHeapEntry->pSync->count == 0 && pHeapEntry->pSync->weakRef == NULL) {
			free(pHeapEntry->pSync);
			pHeapEntry->pSync = NULL;
		}
	}
}

// Return 1 if lock succesfully got
// Return 0 if couldn't get the lock this time
U32 Heap_SyncTryEnter(HEAP_PTR obj) {
	tHeapEntry *pHeapEntry = GET_HEAPENTRY(obj);
	tThread *pThread = Thread_GetCurrent();
	tSync *pSync;

	pSync = EnsureSync(pHeapEntry);
	if (pSync->pThread == NULL) {
		pSync->pThread = pThread;
		pSync->count = 1;
		return 1;
	}
	if (pSync->pThread == pThread) {
		pSync->count++;
		return 1;
	}
	return 0;
}

// Returns 1 if all is OK
// Returns 0 if the wrong thread is releasing the sync, or if no thread hold the sync
U32 Heap_SyncExit(HEAP_PTR obj) {
	tHeapEntry *pHeapEntry = GET_HEAPENTRY(obj);
	tThread *pThread = Thread_GetCurrent();
	if (pHeapEntry->pSync == NULL) {
		return 0;
	}
	if (pHeapEntry->pSync->pThread != pThread) {
		return 0;
	}
	if (--pHeapEntry->pSync->count == 0) {
		DeleteSync(pHeapEntry);
	}
	return 1;
}

static void RemoveWeakRefTarget(tHeapEntry *pTarget, U32 removeLongRefs) {
	SystemWeakReference_TargetGone(&pTarget->pSync->weakRef, removeLongRefs);
}

// Returns the previous first weak-ref in target targetted by weakref
HEAP_PTR Heap_SetWeakRefTarget(HEAP_PTR target, HEAP_PTR weakRef) {
	tHeapEntry *pTarget = GET_HEAPENTRY(target);
	tSync *pSync;
	HEAP_PTR prevWeakRef;

	pSync = EnsureSync(pTarget);
	prevWeakRef = pSync->weakRef;
	pSync->weakRef = weakRef;
	return prevWeakRef;
}

HEAP_PTR* Heap_GetWeakRefAddress(HEAP_PTR target) {
	tHeapEntry *pTarget = GET_HEAPENTRY(target);
	return &pTarget->pSync->weakRef;
}

void Heap_RemovedWeakRefTarget(HEAP_PTR target) {
	tHeapEntry *pTarget = GET_HEAPENTRY(target);
	DeleteSync(pTarget);
}
