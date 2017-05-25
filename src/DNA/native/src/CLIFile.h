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

#if !defined (__CLIFILE_H)
#define __CLIFILE_H

#include "RVA.h"
#include "Types.h"
#include "MetaData.h"

typedef struct tCLIFile_ tCLIFile;
struct tCLIFile_ {
	// The filename
	char *pFileName;
	// The RVA sections of this file
	tRVA *pRVA;
	// NULL-terminated UTF8 string of file version
	unsigned char *pVersion;
	// The entry point token if this is executable, 0 if it isn't
	IDX_TABLE entryPoint;

	tMetaData *pMetaData;
};

// static methods
tMetaData* CLIFile_GetMetaDataForAssembly(unsigned char *pAssemblyName);
void CLIFile_GetHeapRoots(tHeapRoots *pHeapRoots);

// instance methods
tCLIFile* CLIFile_Load(char *pFileName);
I32 CLIFile_Execute(tCLIFile *pThis, int argc, char **argp);

#endif
