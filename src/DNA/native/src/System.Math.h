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

#if !defined(__SYSTEM_MATH_H)
#define __SYSTEM_MATH_H

#include "Types.h"

tAsyncCall* System_Math_Sin(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Math_Cos(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Math_Tan(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Math_Pow(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Math_Sqrt(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Math_Ceiling(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Math_Floor(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* System_Math_Round(PTR pThis_, PTR pParams, PTR pReturnValue);

#endif