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

#include "System.Environment.h"

#include "Type.h"
#include "System.String.h"
#include "Heap.h"

#include <time.h>

tAsyncCall* System_Environment_get_TickCount(PTR pThis_, PTR pParams, PTR pReturnValue) {
	I32 t;
	
	t = (I32)msTime();
	*(I32*)pReturnValue = t;

	return NULL;
}

tAsyncCall* System_Environment_GetOSVersionString(PTR pThis_, PTR pParams, PTR pReturnValue) {
	static HEAP_PTR versionString = NULL;
	if (versionString == NULL) {
		char ver[64];
#ifdef WIN32
		OSVERSIONINFO osVer;
		osVer.dwOSVersionInfoSize = sizeof(OSVERSIONINFO);
		GetVersionEx(&osVer);
		sprintf(ver, "%d.%d.%d", osVer.dwMajorVersion, osVer.dwMinorVersion, osVer.dwBuildNumber);
#else
		strcpy(ver, "0.0.0");
#endif
		versionString = SystemString_FromCharPtrASCII(ver);
		Heap_MakeUndeletable(versionString);
	}
	*(HEAP_PTR*)pReturnValue = versionString;
	return NULL;
}

tAsyncCall* System_Environment_get_Platform(PTR pThis_, PTR pParams, PTR pReturnValue) {
#ifdef WIN32
	OSVERSIONINFO osVer;
	osVer.dwOSVersionInfoSize = sizeof(OSVERSIONINFO);
	GetVersionEx(&osVer);
	*(U32*)pReturnValue = (osVer.dwPlatformId == VER_PLATFORM_WIN32_NT)?2:1; // Win32NT:Win32Windows
#else
	*(U32*)pReturnValue = 4; // UNIX
#endif
	return NULL;
}
