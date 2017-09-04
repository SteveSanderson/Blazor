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

#include "System.Char.h"

#include "MetaData.h"
#include "Types.h"
#include "Type.h"
#include "PInvoke.h"


typedef struct tBreakPoint_ tBreakPoint;

struct tBreakPoint_ {
    char* pID;
    // MAX breakpoints in a single method
    int breakOnSequencePoints[100];
    int offset;

    tBreakPoint* next;
};

static tBreakPoint* pBreakpoints;

int Debugger_Reset() {
    // Clear all break points
    pBreakpoints = NULL;

    // Reset all debugger state and continue
    waitingOnBreakPoint = 0;
    releaseBreakPoint = 0;
    alwaysBreak = 0;

    return 0;
}

int Debugger_Clear_BreakPoints() {
    // Clear all break points
    pBreakpoints = NULL;
    return 0;
}

int Debugger_Continue() {
    if (waitingOnBreakPoint) {
        releaseBreakPoint = 1;

        // Resume execution
        return Thread_Execute();
    }
    return 1;
}

int Debugger_Step() {
    alwaysBreak = 1;
    return 0;
}

int Debugger_SetBreakPoint(char* pID, int sequencePoint)
{
    tBreakPoint* pNode = pBreakpoints;
    tBreakPoint* pTail = NULL;

    // Search for method node
    while (pNode != NULL) {
        if (strcmp(pNode->pID, pID) == 0) {
            break;
        }
        pTail = pNode;
        pNode = pNode->next;
    }

    // Didn't find the node
    if (pNode == NULL) {
        pNode = TMALLOC(tBreakPoint);
        pNode->pID = mallocForever((U32)strlen(pID) + 1);
        strcpy(pNode->pID, pID);
        pNode->offset = 0;
        pNode->next = NULL;

        if (pBreakpoints == NULL) {
            pBreakpoints = pNode;
        } else {
            // Append
            pTail->next = pNode;
		}
    }
    
    if (pNode->offset < 100) {
        pNode->breakOnSequencePoints[pNode->offset++] = sequencePoint;
    }

    return 0;
}

tAsyncCall* System_Diagnostics_Debugger_Break(PTR pThis_, PTR pParams, PTR pReturnValue) {
#if defined(_WIN32) && defined(_DEBUG)
    __debugbreak();
#endif
    return NULL;
}

int CheckIfSequencePointIsBreakpoint(tMethodState* pMethodState, I32 sequencePoint) {
	tBreakPoint* pHead;
	int doBreakpoint;
    tDebugMetaDataEntry* pDebugEntry;

    pDebugEntry = pMethodState->pMethod->pJITted->pDebugMetadataEntry;
    U32 ilOffset = pDebugEntry->sequencePoints[sequencePoint];

    if (!alwaysBreak) {
        doBreakpoint = 0;
        pHead = pBreakpoints;

        while (pHead != NULL) {
            if (strcmp(pHead->pID, pDebugEntry->pID) == 0) {
                for (int i = 0; i < pHead->offset; i++) {
                    if (pHead->breakOnSequencePoints[i] == sequencePoint) {
                        doBreakpoint = 1;
                        break;
                    }
                }
            }
            pHead = pHead->next;
        }

        if (doBreakpoint == 0) {
            return 0;
        }
    }

    waitingOnBreakPoint = 1;
    alwaysBreak = 0;

    // TODO: Handle overflow
    unsigned char payload[1024];
    sprintf(payload, "{\"command\":\"breakpoint\", \"ilOffset\":%d, \"sequencePoint\":%d,\"ID\":\"%s\"}", ilOffset, sequencePoint, pDebugEntry->pID);
#ifndef _WIN32
    invokeJsFunc("browser.js", "SendDebuggerMessage", payload);
#else
    printf("%s\n", payload);
#endif
	return 1;
}
