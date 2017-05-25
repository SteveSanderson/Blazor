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

#include "MetaData.h"

#include "Types.h"
#include "Type.h"
#include "RVA.h"

unsigned int MetaData_DecodeSigEntry(SIG *pSig) {
	unsigned char a,b,c,d;
	a = *((unsigned char*)*pSig)++;
	if ((a & 0x80) == 0) {
		// 1-byte entry
		return a;
	}
	// Special case
	if (a == 0xff) {
		return 0;
	}

	b = *((unsigned char*)*pSig)++;
	if ((a & 0xc0) == 0x80) {
		// 2-byte entry
		return ((int)(a & 0x3f)) << 8 | b;
	}
	// 4-byte entry
	c = *((unsigned char*)*pSig)++;
	d = *((unsigned char*)*pSig)++;
	return ((int)(a & 0x1f)) << 24 | ((int)b) << 16 | ((int)c) << 8 | d;
}

IDX_TABLE MetaData_DecodeSigEntryToken(SIG *pSig) {
	static U8 tableID[4] = {MD_TABLE_TYPEDEF, MD_TABLE_TYPEREF, MD_TABLE_TYPESPEC, 0};

	U32 entry = MetaData_DecodeSigEntry(pSig);
	return MAKE_TABLE_INDEX(tableID[entry & 0x3], entry >> 2);
}

tMetaData* MetaData() {
	tMetaData *pRet = TMALLOC(tMetaData);
	memset(pRet, 0, sizeof(tMetaData));
	return pRet;
}

void MetaData_LoadStrings(tMetaData *pThis, void *pStream, unsigned int streamLen) {
	pThis->strings.pStart = (unsigned char*)pStream;

	log_f(1, "Loaded strings\n");
}

unsigned int MetaData_DecodeHeapEntryLength(unsigned char **ppHeapEntry) {
	return MetaData_DecodeSigEntry((SIG*)ppHeapEntry);
}

void MetaData_LoadBlobs(tMetaData *pThis, void *pStream, unsigned int streamLen) {
	pThis->blobs.pStart = (unsigned char*)pStream;

	log_f(1, "Loaded blobs\n");

}

void MetaData_LoadUserStrings(tMetaData *pThis, void *pStream, unsigned int streamLen) {
	pThis->userStrings.pStart = (unsigned char*)pStream;

	log_f(1, "Loaded User Strings\n");

}

void MetaData_LoadGUIDs(tMetaData *pThis, void *pStream, unsigned int streamLen) {
	pThis->GUIDs.numGUIDs = streamLen / 16;

	// This is stored -16 because numbering starts from 1. This means that a simple indexing calculation
	// can be used, as if it started from 0
	pThis->GUIDs.pGUID1 = (unsigned char*)pStream;

	log_f(1, "Read %d GUIDs\n", pThis->GUIDs.numGUIDs);
}

/*
Format of definition strings:
Always 2 characters to togther. 1st character defines source, 2nd defines destination.
Sources:
	c: 8-bit value
	s: 16-bit short
	i: 32-bit int
	S: Index into string heap
	G: Index into GUID heap
	B: Index into BLOB heap
	0: Coded index: TypeDefOrRef
	1: Coded index: HasConstant
	2: Coded index: HasCustomAttribute
	3: Coded index: HasFieldMarshall
	4: Coded index: HasDeclSecurity
	5: Coded index: MemberRefParent
	6: Coded index: HasSemantics
	7: Coded index: MethodDefOrRef
	8: Coded index: MemberForwarded
	9: Coded index: Implementation
	:: Coded index: CustomAttributeType
	;: Coded index: ResolutionScope
	<: Coded index: TypeOrMethodDef
	\x00 - \x2c: Simple indexes into the respective table
	^: RVA: Convert to pointer
	x: Nothing, use 0
	m: This metadata pointer
	l: (lower case L) Boolean, is this the last entry in this table?
	I: The original table index for this table item
Destination:
	x: nowhere, ignore
	*: 32-bit index into relevant heap;
		Or coded index - MSB = which table, other 3 bytes = table index
		Or 32-bit int
		Or pointer (also RVA)
	s: 16-bit value
	c: 8-bit value
*/
static char* tableDefs[] = {
	// 0x00
	"sxS*G*GxGx",
	// 0x01
	"x*;*S*S*",
	// 0x02
	"x*m*i*S*S*0*\x04*\x06*xclcxcxcx*x*x*x*x*x*x*x*x*x*x*I*x*x*x*x*x*x*x*x*x*x*x*x*",
	// 0x03
	NULL,
	// 0x04
	"x*m*ssxsS*B*x*x*x*x*I*x*",
	// 0x05
	NULL,
	// 0x06
	"x*m*^*ssssS*B*\x08*x*x*x*x*x*x*I*x*x*x*"
#ifdef GEN_COMBINED_OPCODES
	"x*x*x*x*x*x*"
#endif
#ifdef DIAG_METHOD_CALLS
	"x*x*x*"
#endif
	,
	// 0x07
	NULL,
	// 0x08
	"ssssS*",
	// 0x09
	"\x02*0*",
	// 0x0A
	"x*5*S*B*",
	// 0x0B
	"ccccxs1*B*",
	// 0x0C
	"2*:*B*",
	// 0x0D
	NULL,
	// 0x0E
	"ssxs4*B*",
	// 0x0F
	"ssxsi*\x02*",
	// 0x10
	NULL,
	// 0x11
	"B*",
	// 0x12
	"\x02*\x14*",
	// 0x13
	NULL,
	// 0x14
	"ssxsS*0*",
	// 0x15
	"\x02*\x17*",
	// 0x16
	NULL,
	// 0x17
	"ssxsS*B*",
	// 0x18
	"ssxs\06*6*",
	// 0x19
	"\x02*7*7*",
	// 0x1A
	"S*",
	// 0x1B
	"x*m*B*",
	// 0x1C
	"ssxs8*S*\x1a*",
	// 0x1D
	"^*\x04*",
	// 0x1E
	NULL,
	// 0x1F
	NULL,
	// 0x20
	"i*ssssssssi*B*S*S*",
	// 0x21
	NULL,
	// 0x22
	NULL,
	// 0x23
	"ssssssssi*B*S*S*B*",
	// 0x24
	NULL,
	// 0x25
	NULL,
	// 0x26
	NULL,
	// 0x27
	NULL,
	// 0x28
	NULL,
	// 0x29
	"\x02*\x02*",
	// 0x2A
	"ssss<*S*",
	// 0x2B
	"x*m*7*B*",
	// 0x2C
	"\x2a*0*",
};

// Coded indexes use this lookup table.
// Note that the extra 'z' characters are important!
// (Because of how the lookup works each string must be a power of 2 in length)
static unsigned char* codedTags[] = {
	// TypeDefOrRef
	"\x02\x01\x1Bz",
	// HasConstant
	"\x04\x08\x17z",
	// HasCustomAttribute
	"\x06\x04\x01\x02\x08\x09\x0A\x00\x0E\x17\x14\x11\x1A\x1B\x20\x23\x26\x27\x28zzzzzzzzzzzzz",
	// HasFieldMarshall
	"\x04\x08",
	// HasDeclSecurity
	"\x02\x06\x20z",
	// MemberRefParent
	"z\x01\x1A\x06\x1Bzzz",
	// HasSemantics
	"\x14\x17",
	// MethodDefOrRef
	"\x06\x0A",
	// MemberForwarded
	"\x04\x06",
	// Implementation
	"\x26\x23\x27z",
	// CustomAttributeType
	"zz\x06\x0Azzzz",
	// ResolutionScope
	"\x00\x1A\x23\x01",
	// TypeOrMethodDef
	"\x02\x06",
};

static unsigned char codedTagBits[] = {
	2, 2, 5, 1, 2, 3, 1, 1, 1, 2, 3, 2, 1
};

static unsigned char tableRowSize[MAX_TABLES];

void MetaData_Init() {
	U32 i;
	for (i=0; i<MAX_TABLES; i++) {
		tableRowSize[i] = 0;
	}
}

static unsigned int GetU16(unsigned char *pSource) {
	unsigned int a,b;

	a = pSource[0];
	b = pSource[1];
	return a | (b << 8);
}

static unsigned int GetU32(unsigned char *pSource) {
	unsigned int a,b,c,d;

	a = pSource[0];
	b = pSource[1];
	c = pSource[2];
	d = pSource[3];
	return a | (b << 8) | (c << 16) | (d << 24);
}

// Loads a single table, returns pointer to table in memory.
static void* LoadSingleTable(tMetaData *pThis, tRVA *pRVA, int tableID, void **ppTable) {
	int numRows = pThis->tables.numRows[tableID];
	int rowLen = 0; // Number of bytes taken by each row in memory.
	int i, row;
	char *pDef = tableDefs[tableID];
	int defLen = (int)strlen(pDef);
	void *pRet;
	unsigned char *pSource = *ppTable;
	unsigned char *pDest;
	unsigned int v;

	// Calculate the destination row size from table definition, if it hasn't already been calculated
	if (tableRowSize[tableID] == 0) {
		for (i=0; i<defLen; i += 2) {
			switch (pDef[i+1]) {
				case '*':
					rowLen += 4;
					break;
				case 's':
					rowLen += 2;
					break;
				case 'c':
					rowLen++;
					break;
				case 'x':
					// Do nothing
					break;
				default:
					Crash("Cannot determine length of MetaData destination definition character '%c'\n", pDef[i+1]);
			}
		}
		tableRowSize[tableID] = rowLen;
	} else {
		rowLen = tableRowSize[tableID];
	}

	// Allocate memory for destination table
	pDest = pRet = malloc(numRows * rowLen);

	// Load table
	for (row=0; row<numRows; row++) {
		for (i=0; i<defLen; i += 2) {
			unsigned char d = pDef[i];
			if (d < MAX_TABLES) {
				if (pThis->tables.numRows[d] < 0x10000) {
					// Use 16-bit offset
					v = GetU16(pSource);
					pSource += 2;
				} else {
					// Use 32-bit offset
					v = GetU32(pSource);
					pSource += 4;
				}
				v |= d << 24;
			} else {
				switch (d) {
					case 'c': // 8-bit value
						v = *(U8*)pSource;
						pSource++;
						break;
					case 's': // 16-bit short
						v = GetU16(pSource);
						pSource += 2;
						break;
					case 'i': // 32-bit int
						v = GetU32(pSource);
						pSource += 4;
						break;
					case '0':
					case '1':
					case '2':
					case '3':
					case '4':
					case '5':
					case '6':
					case '7':
					case '8':
					case '9':
					case ':':
					case ';':
					case '<':
						{
							int ofs = pDef[i] - '0';
							char* pCoding = codedTags[ofs];
							int tagBits = codedTagBits[ofs];
							unsigned char tag = *pSource & ((1 << tagBits) - 1);
							int idxIntoTableID = pCoding[tag]; // The actual table index that we're looking for
							if (idxIntoTableID < 0 || idxIntoTableID > MAX_TABLES) {
								printf("Error: Bad table index: 0x%02x\n", idxIntoTableID);
								exit(1);
							}
							if (pThis->tables.codedIndex32Bit[ofs]) {
								// Use 32-bit number
								v = GetU32(pSource) >> tagBits;
								pSource += 4;
							} else {
								// Use 16-bit number
								v = GetU16(pSource) >> tagBits;
								pSource += 2;
							}
							v |= idxIntoTableID << 24;
						}
						break;
					case 'S': // index into string heap
						if (pThis->index32BitString) {
							v = GetU32(pSource);
							pSource += 4;
						} else {
							v = GetU16(pSource);
							pSource += 2;
						}
						v = (unsigned int)(pThis->strings.pStart + v);
						break;
					case 'G': // index into GUID heap
						if (pThis->index32BitGUID) {
							v = GetU32(pSource);
							pSource += 4;
						} else {
							v = GetU16(pSource);
							pSource += 2;
						}
						v = (unsigned int)(pThis->GUIDs.pGUID1 + ((v-1) * 16));
						break;
					case 'B': // index into BLOB heap
						if (pThis->index32BitBlob) {
							v = GetU32(pSource);
							pSource += 4;
						} else {
							v = GetU16(pSource);
							pSource += 2;
						}
						v = (unsigned int)(pThis->blobs.pStart + v);
						break;
					case '^': // RVA to convert to pointer
						v = GetU32(pSource);
						pSource += 4;
						v = (unsigned int)RVA_FindData(pRVA, v);
						break;
					case 'm': // Pointer to this metadata
						v = (unsigned int)pThis;
						break;
					case 'l': // Is this the last table entry?
						v = (row == numRows - 1);
						break;
					case 'I': // Original table index
						v = MAKE_TABLE_INDEX(tableID, row + 1);
						break;
					case 'x': // Nothing, use 0
						v = 0;
						break;
					default:
						Crash("Cannot handle MetaData source definition character '%c' (0x%02X)\n", d, d);
				}
			}
			switch (pDef[i+1]) {
				case '*':
					*(unsigned int*)pDest = v;
					pDest += 4;
					break;
				case 's':
					*(unsigned short*)pDest = (unsigned short)v;
					pDest += 2;
					break;
				case 'c':
					*(unsigned char*)pDest = (unsigned char)v;
					pDest++;
					break;
				case 'x':
					// Do nothing
					break;
				default:
					Crash("Cannot handle MetaData destination definition character '%c'\n", pDef[i+1]);
			}
		}
	}

	log_f(1, "Loaded MetaData table 0x%02X; %d rows\n", tableID, numRows);

	// Update the parameter to the position after this table
	*ppTable = pSource;
	// Return new table information
	return pRet;
}

void MetaData_LoadTables(tMetaData *pThis, tRVA *pRVA, void *pStream, unsigned int streamLen) {
	U64 valid, j;
	unsigned char c;
	int i, k, numTables;
	void *pTable;

	c = *(unsigned char*)&((char*)pStream)[6];
	pThis->index32BitString = (c & 1) > 0;
	pThis->index32BitGUID = (c & 2) > 0;
	pThis->index32BitBlob = (c & 4) > 0;

	valid = *(U64*)&((char*)pStream)[8];

	// Count how many tables there are, and read in all the number of rows of each table.
	numTables = 0;
	for (i=0, j=1; i<MAX_TABLES; i++, j <<= 1) {
		if (valid & j) {
			pThis->tables.numRows[i] = *(unsigned int*)&((char*)pStream)[24 + numTables * 4];
			numTables++;
		} else {
			pThis->tables.numRows[i] = 0;
			pThis->tables.data[i] = NULL;
		}
	}

	// Determine if each coded index lookup type needs to use 16 or 32 bit indexes
	for (i=0; i<13; i++) {
		char* pCoding = codedTags[i];
		int tagBits = codedTagBits[i];
		// Discover max table size
		unsigned int maxTableLen = 0;
		for (k=0; k < (1<<tagBits); k++) {
			unsigned char t = pCoding[k];
			if (t != 'z') {
				if (pThis->tables.numRows[t] > maxTableLen) {
					maxTableLen = pThis->tables.numRows[t];
				}
			}
		}
		if (maxTableLen < (unsigned)(1 << (16 - tagBits))) {
			// Use 16-bit number
			pThis->tables.codedIndex32Bit[i] = 0;
		} else {
			// Use 32-bit number
			pThis->tables.codedIndex32Bit[i] = 1;
		}
	}

	pTable = &((char*)pStream)[24 + numTables * 4];

	for (i=0; i<MAX_TABLES; i++) {
		if (pThis->tables.numRows[i] > 0) {
			if (i*4 >= sizeof(tableDefs) || tableDefs[i] == NULL) {
				printf("No table definition for MetaData table 0x%02x\n", i);
				exit(1);
			}
			pThis->tables.data[i] = LoadSingleTable(pThis, pRVA, i, &pTable);
		}
	}
}

PTR MetaData_GetBlob(BLOB_ blob, U32 *pBlobLength) {
	unsigned int len = MetaData_DecodeHeapEntryLength(&blob);
	if (pBlobLength != NULL) {
		*pBlobLength = len;
	}
	return blob;
}

// Returns length in bytes, not characters
STRING2 MetaData_GetUserString(tMetaData *pThis, IDX_USERSTRINGS index, unsigned int *pStringLength) {
	unsigned char *pString = pThis->userStrings.pStart + (index & 0x00ffffff);
	unsigned int len = MetaData_DecodeHeapEntryLength(&pString);
	if (pStringLength != NULL) {
		// -1 because of extra terminating character in the heap
		*pStringLength = len - 1;
	}
	return (STRING2)pString;
}

void* MetaData_GetTableRow(tMetaData *pThis, IDX_TABLE index) {
	char *pData;
	
	if (TABLE_OFS(index) == 0) {
		return NULL;
	}
	pData = (char*)pThis->tables.data[TABLE_ID(index)];
	// Table indexes start at one, hence the -1 here.
	return pData + (TABLE_OFS(index) - 1) * tableRowSize[TABLE_ID(index)];
}

void MetaData_GetConstant(tMetaData *pThis, IDX_TABLE idx, PTR pResultMem) {
	tMD_Constant *pConst;

	switch (TABLE_ID(idx)) {
	case MD_TABLE_FIELDDEF:
		{
			tMD_FieldDef *pField = (tMD_FieldDef*)MetaData_GetTableRow(pThis, idx);
			pConst = (tMD_Constant*)pField->pMemory;
		}
		break;
	default:
		Crash("MetaData_GetConstant() Cannot handle idx: 0x%08x", idx);
	}

	switch (pConst->type) {
	case ELEMENT_TYPE_I4:
		//*(U32*)pReturnMem = MetaData_DecodeSigEntry(
		memcpy(pResultMem, pConst->value+1, 4);
		return;
	default:
		Crash("MetaData_GetConstant() Cannot handle value type: 0x%02x", pConst->type);
	}

}

void MetaData_GetHeapRoots(tHeapRoots *pHeapRoots, tMetaData *pMetaData) {
	U32 i, top;
	// Go through all types, getting their static variables.

	top = pMetaData->tables.numRows[MD_TABLE_TYPEDEF];
	for (i=1; i<=top; i++) {
		tMD_TypeDef *pTypeDef;

		pTypeDef = (tMD_TypeDef*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_TYPEDEF, i));
		if (pTypeDef->isGenericDefinition) {
			Generic_GetHeapRoots(pHeapRoots, pTypeDef);
		} else {
			if (pTypeDef->staticFieldSize > 0) {
				Heap_SetRoots(pHeapRoots, pTypeDef->pStaticFields, pTypeDef->staticFieldSize);
			}
		}
	}
}