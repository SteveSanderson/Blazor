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

#if !defined (__JIT_H)
#define __JIT_H

typedef struct tJITted_ tJITted;
typedef struct tExceptionHeader_ tExceptionHeader;

// [Steve] This overly-specific-looking int-returning 3-STRING-arg signature is because it's difficult
// to support arbitrary signatures given Emscripten's limitations around needing to know the original
// type of a function pointer when invoking it: https://kripken.github.io/emscripten-site/docs/porting/guidelines/function_pointer_issues.html
// My workaround is just to hard-code this as the only possible PInvoke method signature and then skip
// the code in PInvoke.c that tries to dynamically select a function pointer type.
//
// With more work I'm sure it would be possible to figure out a mechanism for getting the original
// Pinvoke.c logic to work. It might even just be as simple as changing the return type of fnPInvoke from int
// to U64, since it looks like that's hardcoded as the return type in Pinvoke.c. But I don't need to deal
// with that now.
typedef int(*fnPInvoke)(STRING libName, STRING funcName, STRING arg0);

#include "Types.h"

#ifdef GEN_COMBINED_OPCODES
typedef struct tCombinedOpcodesMem_ tCombinedOpcodesMem;
struct tCombinedOpcodesMem_ {
	void *pMem;
	tCombinedOpcodesMem *pNext;
};
#endif

struct tJITted_ {
	// The JITted opcodes
	U32 *pOps;
	// The maximum size of the evaluation stack
	U32 maxStack;
	// The required size of the locals stack
	U32 localsStackSize;
	// Number of exception handler headers
	U32 numExceptionHandlers;
	// Pointer to the exception handler headers (NULL if none)
	tExceptionHeader *pExceptionHeaders;
#ifdef GEN_COMBINED_OPCODES
	// The number of bytes used by this JITted method - to include ALL bytes:
	// The size of the opcodes, plus the size of the combined opcodes.
	U32 opsMemSize;
	// Store all memory used to store combined opcodes, so they can be free()d later
	tCombinedOpcodesMem *pCombinedOpcodesMem;
#endif
};

#include "MetaDataTables.h"
#include "Thread.h"

#define COR_ILEXCEPTION_CLAUSE_EXCEPTION 0
#define COR_ILEXCEPTION_CLAUSE_FINALLY 2

struct tExceptionHeader_ {
	U32 flags;
	U32 tryStart;
	U32 tryEnd;
	U32 handlerStart;
	U32 handlerEnd;
	union {
		// Class token for type-based exception handler
		IDX_TABLE classToken;
		// Filter code offset for filter-based exception handler (not supported)
		U32 filterOffset;
		// The TypeDef of the catch type
		tMD_TypeDef *pCatchTypeDef;
	} u;
};

typedef struct tJITCallNative_ tJITCallNative;
struct tJITCallNative_ {
	U32 opCode;
	// The method meta-data
	tMD_MethodDef *pMethodDef;
	// the native pointer to the function
	fnInternalCall fn;
	// The RET instruction. This is needed when the native function has blocking IO or sleep
	U32 retOpCode;
};

typedef struct tJITCallPInvoke_ tJITCallPInvoke;
struct tJITCallPInvoke_ {
	U32 opCode;
	// The native function to call
	fnPInvoke fn;
	// The method that is being called
	tMD_MethodDef *pMethod;
	// The ImplMap of the function that's being called
	tMD_ImplMap *pImplMap;
};

typedef struct tJITCodeInfo_ {
	// The beginning and end of the actual native code to run the JIT opcode.
	void *pStart;
	void *pEnd;
	U32 isDynamic;
} tJITCodeInfo;

#include "JIT_OpCodes.h"

extern tJITCodeInfo jitCodeInfo[JIT_OPCODE_MAXNUM];
extern tJITCodeInfo jitCodeGoNext;

void JIT_Execute_Init();

//void JIT_Prepare(tMD_MethodDef *pMethodDef);
void JIT_Prepare(tMD_MethodDef *pMethodDef, U32 genCombinedOpcodes);

U32 JIT_Execute(tThread *pThread, U32 numInst);

#ifdef DIAG_OPCODE_TIMES
#include "JIT_OpCodes.h"
extern U64 opcodeTimes[JIT_OPCODE_MAXNUM];
#endif

#ifdef DIAG_OPCODE_USE
#include "JIT_OpCodes.h"
extern U32 opcodeNumUses[JIT_OPCODE_MAXNUM];
#endif

#endif