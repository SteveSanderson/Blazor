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

#if !defined (__EVALSTACK_H)
#define __EVALSTACK_H

#define EVALSTACK_INT64 0
#define EVALSTACK_INT32 1
#define EVALSTACK_INTNATIVE 2
//#define EVALSTACK_F 3
#define EVALSTACK_F64 3
#define EVALSTACK_PTR 4
#define EVALSTACK_O 5
//#define EVALSTACK_TRANSPTR 6
#define EVALSTACK_F32 6
#define EVALSTACK_VALUETYPE 7


// dummy value used for methods that return nothing (void)
#define EVALSTACK_VOID 0xff

#endif