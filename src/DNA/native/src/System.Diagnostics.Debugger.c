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

tAsyncCall* System_Diagnostics_Debugger_Break(PTR pThis_, PTR pParams, PTR pReturnValue) {
    printf("BREAK\n");
#if defined(_WIN32) && defined(_DEBUG)
    __debugbreak();
#endif
    return NULL;
}

tAsyncCall* System_Diagnostics_Debugger_Internal_Break_Point(PTR pThis_, PTR pParams, PTR pReturnValue) {
    U32 arg0 = INTERNALCALL_PARAM(0, U32);
    U32 offset = INTERNALCALL_PARAM(4, U32);

    tMD_MethodDef* pMethodDef = (tMD_MethodDef*)arg0;

    printf("BREAK_POINT hit (%s, %d) \n", pMethodDef->name, offset);

    waitingOnBreakPoint = 1;

    unsigned char payload[1024];
    sprintf(payload, "{\"command\":\"breakpoint\", \"offset\":%d,\"method\":\"%s\"}", offset, pMethodDef->name);
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
