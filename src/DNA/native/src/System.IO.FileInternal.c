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
#include <sys/stat.h>
#include "Compat.h"
#include "Sys.h"

#include "System.Object.h"

#include "Types.h"
#include "Type.h"
#include "Heap.h"
#include "System.String.h"
#include "System.Array.h"

#include "errno.h"

#define ERROR_UNKNOWNMODE -1

#define FILEMODE_CREATENEW 1
#define FILEMODE_CREATE 2
#define FILEMODE_OPEN 3
#define FILEMODE_OPENORCREATE 4
#define FILEMODE_TRUNCATE 5
#define FILEMODE_APPEND 6

#define FILEATTRIBUTES_DIRECTORY 0x00010

tAsyncCall* System_IO_FileInternal_Open(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 filenameLen;
	STRING2 filename2;
	U32 mode, access, share;
	U32 *pError;
	unsigned char filename[256];
	U32 i;
	I32 f = 0;
	int flags, error = 0;
	
	filename2 = SystemString_GetString(((HEAP_PTR*)pParams)[0], &filenameLen);
	mode = ((U32*)pParams)[1];
	access = ((U32*)pParams)[2];
	share = ((U32*)pParams)[3];
	pError = ((U32**)pParams)[4];

	for (i=0; i<filenameLen; i++) {
		filename[i] = (unsigned char)filename2[i];
	}
	filename[i] = 0;

	flags = O_BINARY;
	switch (mode) {
	case FILEMODE_OPEN:
		flags |= O_RDWR;
		break;
	default:
		error = ERROR_UNKNOWNMODE;
		goto done;
	}
	f = open(filename, flags);
	if (f < 0) {
		// Failed to open
		error = errno;
		goto done;
	}

done:
	*(I32*)pReturnValue = f;
	*pError = error;
	return NULL;
}

tAsyncCall* System_IO_FileInternal_Read(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 f;
	HEAP_PTR dst;
	U32 startOfs, count;
	U32 *pError;
	PTR pFirstElement;
	I32 ret = 0, error = 0;

	f = ((U32*)pParams)[0];
	dst = ((HEAP_PTR*)pParams)[1];
	startOfs = ((U32*)pParams)[2];
	count = ((U32*)pParams)[3];
	pError = ((U32**)pParams)[4];
	pFirstElement = SystemArray_LoadElementAddress(dst, startOfs);

	ret = read(f, pFirstElement, count);
	if (ret < 0) {
		error = errno;
	}

	*pError = error;
	*(U32*)pReturnValue = ret;
	return NULL;
}

tAsyncCall* System_IO_FileInternal_Close(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 f;
	U32 *pError;

	f = ((U32*)pParams)[0];
	pError = ((U32**)pParams)[1];

	close(f);

	*pError = 0;

	return NULL;
}

tAsyncCall* System_IO_FileInternal_GetCurrentDirectory(PTR pThis_, PTR pParams, PTR pReturnValue) {
	U32 *pError = ((U32**)pParams)[0];
	HEAP_PTR curDir;
#ifdef WIN32
	unsigned short dir[256];
	GetCurrentDirectoryW(256, dir);
	curDir = SystemString_FromCharPtrUTF16(dir);
#else
	unsigned char dir[256];
	getcwd(dir, 256);
	curDir = SystemString_FromCharPtrASCII(dir);
#endif
	*pError = 0;
	*(HEAP_PTR*)pReturnValue = curDir;
	return NULL;
}

#ifndef WIN32
// Get attributes of file and map from UNIX to .NET attribute flags
static U32 Attrs(unsigned char *pPath, U32 *pError) {
	struct stat info;
	int err = stat(pPath, &info);
	if (err == 0) {
		// Success, so map attributes to .NET values
		U32 ret = 0;
		if (info.st_mode & S_IFDIR) {
			ret |= FILEATTRIBUTES_DIRECTORY;
		}
		*pError = 0;
		return ret;
	} else {
		// Error
		*pError = errno;
		return (U32)-1;
	}
}
#endif

tAsyncCall* System_IO_FileInternal_GetFileAttributes(PTR pThis_, PTR pParams, PTR pReturnValue) {
	HEAP_PTR pathHeapPtr = ((HEAP_PTR*)pParams)[0];
	U32 *pError = ((U32**)pParams)[1];
	U32 pathLen;
	STRING2 path = SystemString_GetString(pathHeapPtr, &pathLen);
	U32 ret;
#ifdef WIN32
	unsigned short pathNullTerm[256];
	memcpy(pathNullTerm, path, pathLen << 1);
	pathNullTerm[pathLen] = 0;
	ret = GetFileAttributesW(pathNullTerm);
	if (ret == INVALID_FILE_ATTRIBUTES) {
		ret = (U32)-1;
	}
	*pError = 0;
#else
	unsigned char path8[256];
	U32 i;
	for (i=0; i<pathLen; i++) {
		path8[i] = (U8)path[i];
	}
	path8[i] = 0;
	ret = Attrs(path8, pError);
#endif
	*(U32*)pReturnValue = ret;
	return NULL;
}

tAsyncCall* System_IO_FileInternal_GetFileSystemEntries(PTR pThis_, PTR pParams, PTR pReturnValue) {
	//HEAP_PTR pathHP = ((HEAP_PTR*)pParams)[0];
	HEAP_PTR pathPatternHP = ((HEAP_PTR*)pParams)[1];
	U32 attrs = ((U32*)pParams)[2];
	U32 mask = ((U32*)pParams)[3];
	U32* pError = ((U32**)pParams)[4];
	U32 /*pathLen,*/ pathPatternLen;
	//STRING2 path = SystemString_GetString(pathHP, &pathLen);
	STRING2 pathPattern = SystemString_GetString(pathPatternHP, &pathPatternLen);
	HEAP_PTR retArray;
	U32 tempStoreSize = 32, tempStoreOfs = 0, i;
	HEAP_PTR *pTempStore = malloc(tempStoreSize * sizeof(void*));
	PTR arrayElements;
#ifdef WIN32
	unsigned short pathPatternNullTerm[256];
	HANDLE hFind;
	WIN32_FIND_DATA find;
	memcpy(pathPatternNullTerm, pathPattern, pathPatternLen << 1);
	pathPatternNullTerm[pathPatternLen] = 0;
	hFind = FindFirstFileW(pathPatternNullTerm, &find);
	if (hFind != INVALID_HANDLE_VALUE) {
		do {
			if ((find.dwFileAttributes & mask) == attrs) {
				HEAP_PTR str;
				// Want this file, so store it in tempStore
				if (tempStoreOfs >= tempStoreSize) {
					tempStoreSize <<= 1;
					pTempStore = realloc(pTempStore, tempStoreSize * sizeof(void*));
				}
				str = SystemString_FromCharPtrUTF16(find.cFileName);
				// Need to temporarily make these undeletable, in case a GC happens before they're in the array
				Heap_MakeUndeletable(str);
				pTempStore[tempStoreOfs++] = str;
			}
		} while (FindNextFile(hFind, &find) != 0);
		FindClose(hFind);
	}
#else
	unsigned char path8[256];
	glob_t gl;
	for (i=0; i<pathPatternLen; i++) {
		path8[i] = (U8)pathPattern[i];
	}
	path8[i] = 0;
	i = glob(path8, GLOB_NOSORT, NULL, &gl);
	if (i == 0) {
		for (i=0; i<gl.gl_pathc; i++) {
			unsigned char *pResult = gl.gl_pathv[i];
			U32 fileAttrs = Attrs(pResult, pError);
			if (fileAttrs == (U32)-1) {
				break;
			}
			if ((fileAttrs & mask) == attrs) {
				HEAP_PTR str;
				// Want this file, so store it in tempStore
				if (tempStoreOfs >= tempStoreSize) {
					tempStoreSize <<= 1;
					pTempStore = realloc(pTempStore, tempStoreSize * sizeof(void*));
				}
				str = SystemString_FromCharPtrASCII(pResult);
				// Need to temporarily make these undeletable, in case a GC happens before they're in the array
				Heap_MakeUndeletable(str);
				pTempStore[tempStoreOfs++] = str;
			}
		}
		globfree(&gl);
	} else {
		*pError = errno;
	}
#endif
	// Move the temp-store values into the final returnable array
	retArray = SystemArray_NewVector(types[TYPE_SYSTEM_ARRAY_STRING], tempStoreOfs);
	arrayElements = SystemArray_GetElements(retArray);
	memcpy(arrayElements, pTempStore, tempStoreOfs * sizeof(void*));
	free(pTempStore);
	*(HEAP_PTR*)pReturnValue = retArray;
	// Make the strings deletable again
	for (i=0; i<tempStoreOfs; i++) {
		Heap_MakeDeletable(((HEAP_PTR*)arrayElements)[i]);
	}
	return NULL;
}
