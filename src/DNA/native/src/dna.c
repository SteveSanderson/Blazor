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

#include "CLIFile.h"
#include "MetaData.h"
#include "Type.h"
#include "Heap.h"
#include "Finalizer.h"
#include "System.Net.Sockets.Socket.h"
#include "MethodState.h"
#include "JSInterop.h"

static void ShowUsage() {
	printf("Usage:\n");
	printf("\tdna [-v] <.Net executable to execute> [.Net executable arguments]\n");
	printf("\n");
	printf("\t-v  : Verbose output of files loaded and GC statistics\n");
	printf("\t-vv : More verbose output, including methods JITted and types/arrays/generics use\n");
	printf("\n");
	exit(1);
}

int main(int argc, char **argp) {
	tCLIFile *pCLIFile;
	char *pFileName;
	U32 i;
	I32 retValue;
#ifdef DIAG_TOTAL_TIME
	U64 startTime;
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

#ifdef DIAG_OPCODE_TIMES
#ifdef WIN32
	{
		HANDLE hProcess = GetCurrentProcess();
		SetProcessAffinityMask(hProcess, 1);
	}
#endif
	memset(opcodeTimes, 0, sizeof(opcodeTimes));
#endif

#ifdef DIAG_OPCODE_USE
	memset(opcodeNumUses, 0, sizeof(opcodeNumUses));
#endif

	pFileName = argp[i];

	pCLIFile = CLIFile_Load(pFileName);

#ifdef DIAG_TOTAL_TIME
	startTime = microTime();
#endif

	if (pCLIFile->entryPoint) {
		retValue = CLIFile_Execute(pCLIFile, argc - i, argp + i);
	} else {
		printf("File %s has no entry point, skipping execution\n", pFileName);
		retValue = 0;
	}

#ifdef DIAG_TOTAL_TIME
	printf("Total execution time = %d ms\n", (int)((microTime() - startTime) / 1000));
#endif

#ifdef DIAG_GC
	printf("Total GC time = %d ms\n", (int)(gcTotalTime / 1000));
#endif

#ifdef DIAG_METHOD_CALLS
	{
		U32 numMethods, i;
		I32 howMany = 25;
		tMetaData *pCorLib;
		// Report on most-used methods
		pCorLib = CLIFile_GetMetaDataForAssembly("mscorlib");
		numMethods = pCorLib->tables.numRows[MD_TABLE_METHODDEF];
		printf("\nCorLib method usage:\n");
		for (; howMany > 0; howMany--) {
			tMD_MethodDef *pMethod;
			U32 maxCount = 0, maxIndex = 0;
			for (i=1; i<=numMethods; i++) {
				pMethod = (tMD_MethodDef*)MetaData_GetTableRow(pCorLib, MAKE_TABLE_INDEX(MD_TABLE_METHODDEF, i));
				if (pMethod->callCount > maxCount) {
					maxCount = pMethod->callCount;
					maxIndex = i;
				}
			}
			pMethod = (tMD_MethodDef*)MetaData_GetTableRow(pCorLib, MAKE_TABLE_INDEX(MD_TABLE_METHODDEF, maxIndex));
			printf("%d: %s (%d)\n", (int)pMethod->callCount, Sys_GetMethodDesc(pMethod), (int)(pMethod->totalTime/1000));
			pMethod->callCount = 0;
		}
		printf("\n");
	}
	{
		U32 numMethods, i;
		I32 howMany = 25;
		tMetaData *pCorLib;
		// Report on most-used methods
		pCorLib = CLIFile_GetMetaDataForAssembly("mscorlib");
		numMethods = pCorLib->tables.numRows[MD_TABLE_METHODDEF];
		printf("\nCorLib method execution time:\n");
		for (; howMany > 0; howMany--) {
			tMD_MethodDef *pMethod;
			U64 maxTime = 0;
			U32 maxIndex = 0;
			for (i=1; i<=numMethods; i++) {
				pMethod = (tMD_MethodDef*)MetaData_GetTableRow(pCorLib, MAKE_TABLE_INDEX(MD_TABLE_METHODDEF, i));
				if (pMethod->totalTime > maxTime) {
					maxTime = pMethod->totalTime;
					maxIndex = i;
				}
			}
			pMethod = (tMD_MethodDef*)MetaData_GetTableRow(pCorLib, MAKE_TABLE_INDEX(MD_TABLE_METHODDEF, maxIndex));
			printf("%d: %s (%d)\n", (int)pMethod->callCount, Sys_GetMethodDesc(pMethod), (int)(pMethod->totalTime/1000));
			pMethod->totalTime = 0;
		}
		printf("\n");
	}
#endif
#ifdef DIAG_OPCODE_TIMES
	{
		I32 howMany = 25;
		U32 i;
		printf("\nOpCodes execution time:\n");
		for (; howMany > 0; howMany--) {
			U64 maxTime = 0;
			U32 maxIndex = 0;
			for (i=0; i<JIT_OPCODE_MAXNUM; i++) {
				if (opcodeTimes[i] > maxTime) {
					maxTime = opcodeTimes[i];
					maxIndex = i;
				}
			}
			printf("0x%03x: %dms (used %d times) (ave = %d)\n",
				maxIndex, (int)(maxTime / 1000), (int)opcodeNumUses[maxIndex], (int)(maxTime / opcodeNumUses[maxIndex]));
			opcodeTimes[maxIndex] = 0;
		}
	}
#endif
#ifdef DIAG_OPCODE_USE
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

	//Crash("FINISHED!!!");

	return retValue;
}
