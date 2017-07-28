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
    int ILOffsets[100];
    int offset;

    tBreakPoint* next;
};

static tBreakPoint* pBreakpoints;

int Debugger_Continue() {
    log_f(1, "Debugger_Continue called\n");
    if (waitingOnBreakPoint) {
        releaseBreakPoint = 1;
        printf("DEBUGGER_CONTINUE\n");

        // Resume execution
        return Thread_Execute();
    }
    return 1;
}

int Debugger_SetBreakPoint(char* pID, int ILOffset)
{
    log_f(1, "Debugger_SetBreakPoint(%s, %d) called\n", pID, ILOffset);
    tBreakPoint* pNode = pBreakpoints;
    tBreakPoint* pTail = NULL;

    // Search for method node
    while (pNode != NULL) {
        if (strcmp(pNode->pID, pID) == 0) {
            break;
        }
        pNode = pNode->next;
        pTail = pNode;
    }

    // Didn't find the node
    if (pNode == NULL) {
        pNode = TMALLOC(tBreakPoint);
        pNode->pID = mallocForever((U32)strlen(pID) + 1);
        strcpy(pNode->pID, pID);
        pNode->offset = 0;
        pNode->next = NULL;
    }

    if (pBreakpoints == NULL) {
        pBreakpoints = pNode;
    }
    else {
        // Append
        pTail->next = pNode;
    }
    
    if (pNode->offset < 100) {
        log_f(1, "Breakpoint successfully set\n", pID, ILOffset);
        pNode->ILOffsets[pNode->offset++] = ILOffset;
    }

    // Dump break points
    tBreakPoint* pScan = pBreakpoints;
    while (pScan != NULL) {
        for (int i = 0; i < pScan->offset; i++) {
            log_f(1, "Break point at (%s, %d) \n", pScan->pID, pScan->ILOffsets[i]);
        }
        pScan = pScan->next;
    }

    return 0;
}

tAsyncCall* System_Diagnostics_Debugger_Break(PTR pThis_, PTR pParams, PTR pReturnValue) {
    printf("BREAK\n");
#if defined(_WIN32) && defined(_DEBUG)
    __debugbreak();
#endif
    return NULL;
}

tAsyncCall* System_Diagnostics_Debugger_Internal_Break_Point(PTR pThis_, PTR pParams, PTR pReturnValue) {
    tBreakPoint* pHead;
    int doBreakpoint;

    U32 arg0 = INTERNALCALL_PARAM(0, U32);
    U32 offset = INTERNALCALL_PARAM(4, U32);

    tDebugMetaDataEntry* pDebugEntry = (tDebugMetaDataEntry*)arg0;

    doBreakpoint = 0;
    pHead = pBreakpoints;

    log_f(1, "Scanning break point matching (%s, %d) \n", pDebugEntry->pID, offset);

    while (pHead != NULL) {
        log_f(1, "Found entry for (%s) \n", pHead->pID);

        if (strcmp(pHead->pID, pDebugEntry->pID) == 0) {
            for (int i = 0; i < pHead->offset; i++) {
                if (pHead->ILOffsets[i] == offset) {
                    doBreakpoint = 1;
                    break;
                }
            }

            log_f(1, "No break point set at %s \n", pHead->pID);
        }
        pHead = pHead->next;
    }

    if (doBreakpoint == 0) {
        return NULL;
    }

    log_f(1, "BREAK_POINT hit (%s, %d) \n", pDebugEntry->pMethodName, offset);

    waitingOnBreakPoint = 1;

    // TODO: Handle overflow
    unsigned char payload[1024];
    sprintf(payload, "{\"command\":\"breakpoint\", \"offset\":%d,\"ID\":\"%s\"}", offset, pDebugEntry->pID);
#ifndef _WIN32
    invokeJsFunc("browser.js", "SendDebuggerMessage", payload);
#else
    printf("%s\n", payload);
#endif
    tAsyncCall *pAsync = TMALLOC(tAsyncCall);

    pAsync->sleepTime = -1;
    pAsync->checkFn = Internal_Debugger_Resume_Check;
    pAsync->state = NULL;

    return pAsync;
}
