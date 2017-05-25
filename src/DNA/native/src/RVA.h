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

#if !defined (__RVA_H)
#define __RVA_H

typedef struct tRVA_Item_ tRVA_Item;
struct tRVA_Item_ {
	unsigned int baseAddress;
	unsigned int size;
	void *pData;

	tRVA_Item *pNext;
};

typedef struct tRVA_ tRVA;
struct tRVA_ {
	tRVA_Item *pFirstRVA;
};

tRVA* RVA();
tRVA_Item* RVA_Create(tRVA *pThis, void *pFile, void *pSectionHeader);
void* RVA_FindData(tRVA *pThis, unsigned int rva);

#endif
