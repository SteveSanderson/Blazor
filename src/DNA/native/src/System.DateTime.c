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

#include "System.DateTime.h"

#ifndef WIN32

#include <sys/time.h>

#endif

#define TicksPerSecond 10000000L
#define TicksPerMicroSecond 10L
#define TicksAtUnixEpoch 621355968000000000L
#define TicksAtFileTimeEpoch 504911232000000000L

tAsyncCall* System_DateTime_InternalUtcNow(PTR pThis_, PTR pParams, PTR pReturnValue) {

#ifdef WIN32

	FILETIME ft;

	GetSystemTimeAsFileTime(&ft);

	*(U64*)pReturnValue = ((U64)ft.dwHighDateTime) * 0x100000000L + ((U64)ft.dwLowDateTime) + TicksAtFileTimeEpoch;

#else

	struct timeval tp;

	gettimeofday(&tp, NULL);

	*(U64*)pReturnValue = ((U64)tp.tv_sec) * TicksPerSecond + ((U64)tp.tv_usec) * TicksPerMicroSecond
		+ TicksAtUnixEpoch;

#endif

	return NULL;
}
