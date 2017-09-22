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

#include <signal.h>

#include "Compat.h"
#include "Sys.h"

#include "CLIFile.h"
#include "MetaData.h"
#include "Type.h"
#include "Heap.h"
#include "Finalizer.h"
#include "System.Net.Sockets.Socket.h"
#include "MethodState.h"
#include "JSInterop.h"

#ifdef DIAG_TOTAL_TIME
U64 startTime;
#endif

void Diag_Init() {

#ifdef DIAG_OPCODE_TIMES
#ifdef _WIN32
	{
		HANDLE hProcess = GetCurrentProcess();
		SetProcessAffinityMask(hProcess, 1);
	}
#endif
	memset(opcodeTimes, 0, sizeof(opcodeTimes));
#endif

#ifdef DIAG_OPCODE_USES
	memset(opcodeNumUses, 0, sizeof(opcodeNumUses));
#endif

#ifdef DIAG_TOTAL_TIME
	startTime = microTime();
#endif
}

void Diag_Print() {

#ifdef DIAG_TOTAL_TIME
	printf("Total execution time = %.3f sec\n", (microTime() - startTime) / 1000000.0);
#endif

#ifdef DIAG_GC
	printf("Total GC time = %llu ms\n", gcTotalTime / 1000);
#endif

#ifdef DIAG_METHOD_CALLS
	{
		tMD_MethodDef* topMethods[50];
		U32 numTop = sizeof(topMethods) / sizeof(topMethods[0]);
		for (U32 t = 0; t < numTop; t++) { topMethods[t] = NULL; }

		// Report on most-used methods
		printf("\nTop %d methods by execution time:\n\n", numTop);

		tFilesLoaded *pFiles = CLIFile_GetLoadedAssemblies();
		while (pFiles != NULL) {
			tMetaData *pMetaData = pFiles->pCLIFile->pMetaData;

			U32 numMethods = pMetaData->tables.numRows[MD_TABLE_METHODDEF];
			for (U32 i = 1; i <= numMethods; i++) {
				tMD_MethodDef *pMethod = (tMD_MethodDef*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_METHODDEF, i));

				for (U32 t = 0; t < numTop; t++) {
					if (topMethods[t] == NULL) { topMethods[t] = pMethod; }
#if defined(DIAG_METHOD_CALLS_SORT_BY_COUNT)
					if (topMethods[t]->callCount < pMethod->callCount) {
#elif defined(DIAG_METHOD_CALLS_SORT_BY_START)
					if (topMethods[t]->startTime < pMethod->startTime) {
#else
					if (topMethods[t]->totalTime < pMethod->totalTime) {
#endif
						memmove(&topMethods[t + 1], &topMethods[t], (numTop - t - 1) * sizeof(topMethods[0]));
						topMethods[t] = pMethod;
						break;
					}
				}
			}

			pFiles = pFiles->pNext;
		}

		for (U32 t = 0; t < numTop; t++) {
			tMD_MethodDef *pMethod = topMethods[t];
			char* methodName = pMethod->isFilled ? Sys_GetMethodDesc(pMethod) : pMethod->name;
			printf("%02d: %s\n    calls: %llu", t+1, methodName, pMethod->callCount);
			printf(", total: %.3f sec", pMethod->totalTime / 1000000.0);
			printf(", max: %f sec", pMethod->maxTime / 1000000.0);
			printf(", avg: %f sec\n", pMethod->totalTime / max(pMethod->callCount, 1) / 1000000.0);
		}

		printf("\n");
	}
#endif

#ifdef DIAG_OPCODE_TIMES
	{
		I32 howMany = 25;
		U32 i;
		printf("\nJIT OpCodes execution time:\n");
		for (; howMany > 0; howMany--) {
			U64 maxTime = 0;
			U32 maxIndex = 0;
			for (i=0; i<JIT_OPCODE_MAXNUM; i++) {
				if (opcodeTimes[i] > maxTime) {
					maxTime = opcodeTimes[i];
					maxIndex = i;
				}
			}
			printf("0x%03x: %llu ms", maxIndex, maxTime / 1000);
#ifdef DIAG_OPCODE_USES
			printf(" (used %u times) (avg time = %llu)\n", opcodeNumUses[maxIndex], maxTime / opcodeNumUses[maxIndex]);
#endif
			printf("\n");
			opcodeTimes[maxIndex] = 0;
		}
	}
#endif

#ifdef DIAG_OPCODE_USES
	{
		I32 howMany = 25;
		U32 i, j;
		printf("\nOpcode use:\n");
		for (j=1; howMany>0; howMany--, j++) {
			U32 maxUse = 0;
			U32 maxIndex = 0;
			for (i=0; i<JIT_OPCODE_MAXNUM; i++) {
				if (opcodeNumUses[i] > maxUse) {
					maxUse = opcodeNumUses[i];
					maxIndex = i;
				}
			}
			printf("%02d 0x%03x: %d\n", j, maxIndex, maxUse);
			opcodeNumUses[maxIndex] = 0;
		}
	}
#endif
}

static void ShowUsage() {
	printf("Usage:\n");
	printf("\tdna [-v] <.Net executable to execute> [.Net executable arguments]\n");
	printf("\n");
	printf("\t-v  : Verbose output of files loaded and GC statistics\n");
	printf("\t-vv : More verbose output, including methods JITted and types/arrays/generics use\n");
	printf("\n");
	exit(1);
}

void almost_c99_signal_handler(int sig) {
	switch (sig) {
	case SIGABRT:
		fputs("Caught SIGABRT: usually caused by an abort() or assert()\n", stderr);
		break;
	case SIGFPE:
		fputs("Caught SIGFPE: arithmetic exception, such as divide by zero\n", stderr);
		break;
	case SIGILL:
		fputs("Caught SIGILL: illegal instruction\n", stderr);
		break;
	case SIGINT:
		fputs("Caught SIGINT: interactive attention signal, probably a ctrl+c\n", stderr);
		break;
	case SIGSEGV:
		fputs("Caught SIGSEGV: segfault\n", stderr);
		break;
	case SIGTERM:
	default:
		fputs("Caught SIGTERM: a termination request was sent to the program\n", stderr);
		break;
	}

	Diag_Print();
}

void set_signal_handler() {
	signal(SIGABRT, almost_c99_signal_handler);
	signal(SIGFPE, almost_c99_signal_handler);
	signal(SIGILL, almost_c99_signal_handler);
	signal(SIGINT, almost_c99_signal_handler);
	signal(SIGSEGV, almost_c99_signal_handler);
	signal(SIGTERM, almost_c99_signal_handler);
}

int main(int argc, char **argp) {
	tCLIFile *pCLIFile;
	char *pFileName;
	U32 i;
	I32 retValue;

#ifdef _WIN32
	set_signal_handler();
#endif

	if (argc < 2) {
		ShowUsage();
	}

	// Read any flags passed in
	for (i=1; i < (U32)argc; i++) {
		if (argp[i][0] == '-') {
			U32 j;

			for (j=1; ; j++) {
				switch (argp[i][j]) {
					case 0:
						goto doneArgs;
					case 'v':
						logLevel++;
						break;
					default:
						Crash("Invalid argument: -%c", argp[i][1]);
				}
			}
doneArgs:;
		} else {
			break;
		}
	}

	JIT_Execute_Init();
	MetaData_Init();
	Type_Init();
	Heap_Init();
	Finalizer_Init();
	Socket_Init();

	Diag_Init();

	pFileName = argp[i];
	pCLIFile = CLIFile_Load(pFileName);

	if (pCLIFile->entryPoint) {
		retValue = CLIFile_Execute(pCLIFile, argc - i, argp + i);
	} else {
		printf("File %s has no entry point, skipping execution\n", pFileName);
		retValue = 0;
	}

	Diag_Print();

	//Crash("FINISHED!!!");

#ifdef DIAG_MEMORY_LEAKS
	// cleanup memory
	Heap_GarbageCollect();
	Finalizer_Free();
	freeForever();

#ifdef _WIN32
	// looking for memory leaks
	_CrtDumpMemoryLeaks();
#endif
#endif

	return retValue;
}
