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

#ifndef __CONFIG_H
#define __CONFIG_H

// Diagnostic stuff
// Some of this will only work on Windows
// (although could be implemented on other platforms with a little work.
// The issue is that a very fast time function is needed. It uses the rdtsc
// instruction on x86 - so the results are in ticks, not seconds)

// Count how many times each .NET method is called
#undef DIAG_METHOD_CALLS

// Measure how much time is spent in each .NET opcode
// This only works on Windows
// This is not currently implemented, after the change to threaded code
#undef DIAG_OPCODE_TIMES

// Count how many times each .NET opcode is used
#ifdef _DEBUG
#undef DIAG_OPCODE_USE
#endif

// Measure how much time is spent in the garbage collector
#undef DIAG_GC

// Measure how long the entire .NET programme execution takes
#define DIAG_TOTAL_TIME



// Non-diagnostic stuff

// Generate combined (dynamic) .NET opcodes.
// This does work, but currently has no intellegence about which opcodes
// are worth combining, so it uses lots of memory and on some platforms
// will not lead to a performance increase.
//#define GEN_COMBINED_OPCODES
#define GEN_COMBINED_OPCODES_MAX_MEMORY 0x4000
#define GEN_COMBINED_OPCODES_CALL_TRIGGER 20

#endif
