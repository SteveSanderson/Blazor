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

#include "RVA.h"

tRVA* RVA() {
	tRVA *pRet;
	pRet = TMALLOC(tRVA);
	return pRet;
}

tRVA_Item* RVA_Create(tRVA *pThis, void *pFile, void *pSectionHeader) {
	tRVA_Item* pRet;
	unsigned int rawOfs;
	unsigned int rawSize;

	pRet = TMALLOC(tRVA_Item);
	pRet->baseAddress = *(unsigned int*)&((char*)pSectionHeader)[12];
	pRet->size = *(unsigned int*)&((char*)pSectionHeader)[8];
	pRet->pData = malloc(pRet->size);
	memset(pRet->pData, 0, pRet->size);
	pRet->pNext = pThis->pFirstRVA;
	pThis->pFirstRVA = pRet;

	rawOfs = *(unsigned int*)&((char*)pSectionHeader)[20];
	rawSize = *(unsigned int*)&((char*)pSectionHeader)[16];
	if (rawOfs > 0) {
		if (rawSize > pRet->size) {
			rawSize = pRet->size;
		}
		memcpy(pRet->pData, ((char*)pFile)+rawOfs, rawSize);
	}

	return pRet;
}

void* RVA_FindData(tRVA *pThis, unsigned int rva) {
	tRVA_Item *pRVA;

	if (rva == 0) {
		return NULL;
	}

	pRVA = pThis->pFirstRVA;
	while (pRVA != NULL) {
		if (rva >= pRVA->baseAddress && rva < pRVA->baseAddress+pRVA->size) {
			return (char*)(pRVA->pData) + (rva - pRVA->baseAddress);
		}
		pRVA = pRVA->pNext;
	}
	return NULL;
}
