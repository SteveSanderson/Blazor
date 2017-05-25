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
#include "CLIFile.h"
#include "Type.h"
#include "Types.h"

U32 MetaData_CompareNameAndSig(STRING name, BLOB_ sigBlob, tMetaData *pSigMetaData, tMD_TypeDef **ppSigClassTypeArgs, tMD_TypeDef **ppSigMethodTypeArgs, tMD_MethodDef *pMethod, tMD_TypeDef **ppMethodClassTypeArgs, tMD_TypeDef **ppMethodMethodTypeArgs) {
	if (strcmp(name, pMethod->name) == 0) {
		SIG sig, thisSig;
		U32 e, thisE, paramCount, i;

		sig = MetaData_GetBlob(sigBlob, NULL);
		thisSig = MetaData_GetBlob(pMethod->signature, NULL);

		e = MetaData_DecodeSigEntry(&sig);
		thisE = MetaData_DecodeSigEntry(&thisSig);
		// Check method call type (static, etc...)
		if (e != thisE) {
			return 0;
		}

		// If method has generic arguments, check the generic type argument count
		if (e & SIG_METHODDEF_GENERIC) {
			e = MetaData_DecodeSigEntry(&sig);
			thisE = MetaData_DecodeSigEntry(&thisSig);
			// Generic argument count
			if (e != thisE) {
				return 0;
			}
		}

		e = MetaData_DecodeSigEntry(&sig);
		thisE = MetaData_DecodeSigEntry(&thisSig);
		// check parameter count
		if (e != thisE) {
			return 0;
		}
		paramCount = e + 1; // +1 to include the return type

		// check all parameters
		for (i=0; i<paramCount; i++) {
			tMD_TypeDef *pParamType, *pThisParamType;

			pParamType = Type_GetTypeFromSig(pSigMetaData, &sig, ppSigClassTypeArgs, ppSigMethodTypeArgs);
			pThisParamType = Type_GetTypeFromSig(pMethod->pMetaData, &thisSig, ppMethodClassTypeArgs, ppMethodMethodTypeArgs);
			if (pParamType != pThisParamType) {
				return 0;
			}
		}
		// All parameters the same, so found the right method
		return 1;
	}
	return 0;
}

static tMD_MethodDef* FindMethodInType(tMD_TypeDef *pTypeDef, STRING name, tMetaData *pSigMetaData, BLOB_ sigBlob, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	U32 i;
	tMD_TypeDef *pLookInType = pTypeDef;

	do {
		for (i=0; i<pLookInType->numMethods; i++) {
			if (MetaData_CompareNameAndSig(name, sigBlob, pSigMetaData, ppClassTypeArgs, ppMethodTypeArgs, pLookInType->ppMethods[i], pLookInType->ppClassTypeArgs, NULL)) {
				return pLookInType->ppMethods[i];
			}
		}
		pLookInType = pLookInType->pParent;
	} while (pLookInType != NULL);

	{
		// Error reporting!!
		U32 entry, numParams, i;
		SIG sig;
		char *pMsg;
		tMD_TypeDef *pParamTypeDef;

		pMsg = (char*)malloc(2048);
		*pMsg = 0;
		sig = MetaData_GetBlob(sigBlob, &i);
		entry = MetaData_DecodeSigEntry(&sig);
		if ((entry & SIG_METHODDEF_HASTHIS) == 0) {
			sprintf(strchr(pMsg, 0), "static ");
		}
		if (entry & SIG_METHODDEF_GENERIC) {
			// read number of generic type args - don't care what it is
			MetaData_DecodeSigEntry(&sig);
		}
		numParams = MetaData_DecodeSigEntry(&sig);
		pParamTypeDef = Type_GetTypeFromSig(pSigMetaData, &sig, ppClassTypeArgs, ppMethodTypeArgs); // return type
		if (pParamTypeDef != NULL) {
			sprintf(strchr(pMsg, 0), "%s ", pParamTypeDef->name);
		}
		sprintf(strchr(pMsg, 0), "%s.%s.%s(", pTypeDef->nameSpace, pTypeDef->name, name);
		for (i=0; i<numParams; i++) {
			pParamTypeDef = Type_GetTypeFromSig(pSigMetaData, &sig, ppClassTypeArgs, ppMethodTypeArgs);
			if (i > 0) {
				sprintf(strchr(pMsg, 0), ",");
			}
			if (pParamTypeDef != NULL) {
				sprintf(strchr(pMsg, 0), pParamTypeDef->name);
			} else {
				sprintf(strchr(pMsg, 0), "???");
			}
		}
		Crash("FindMethodInType(): Cannot find method %s)", pMsg);
	}
	FAKE_RETURN;
}

static tMD_FieldDef* FindFieldInType(tMD_TypeDef *pTypeDef, STRING name) {
	U32 i;

	MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);

	for (i=0; i<pTypeDef->numFields; i++) {
		if (strcmp(pTypeDef->ppFields[i]->name, name) == 0) {
			return pTypeDef->ppFields[i];
		}
	}

	Crash("FindFieldInType(): Cannot find field '%s' in type %s.%s", name, pTypeDef->nameSpace, pTypeDef->name);
	FAKE_RETURN;
}

tMetaData* MetaData_GetResolutionScopeMetaData(tMetaData *pMetaData, IDX_TABLE resolutionScopeToken, tMD_TypeDef **ppInNestedType) {
	switch (TABLE_ID(resolutionScopeToken)) {
		case MD_TABLE_ASSEMBLYREF:
			{
				tMD_AssemblyRef *pAssemblyRef;

				pAssemblyRef = (tMD_AssemblyRef*)MetaData_GetTableRow(pMetaData, resolutionScopeToken);
				*ppInNestedType = NULL;
				return CLIFile_GetMetaDataForAssembly(pAssemblyRef->name);
			}
		case MD_TABLE_TYPEREF:
			{
				tMD_TypeDef *pTypeDef;

				pTypeDef = MetaData_GetTypeDefFromDefRefOrSpec(pMetaData, resolutionScopeToken, NULL, NULL);
				*ppInNestedType = pTypeDef;
				return pTypeDef->pMetaData;
			}
		default:
			Crash("MetaData_GetResolutionScopeMetaData(): Cannot resolve token: 0x%08x", resolutionScopeToken);
			FAKE_RETURN;
	}
}

tMD_TypeDef* MetaData_GetTypeDefFromName(tMetaData *pMetaData, STRING nameSpace, STRING name, tMD_TypeDef *pInNestedClass, U8 assertExists) {
	U32 i;

	for (i=1; i<=pMetaData->tables.numRows[MD_TABLE_TYPEDEF]; i++) {
		tMD_TypeDef *pTypeDef;

		pTypeDef = (tMD_TypeDef*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_TYPEDEF, i));
		if (pInNestedClass == pTypeDef->pNestedIn &&
			strcmp(name, pTypeDef->name) == 0 &&
			(pInNestedClass != NULL || strcmp(nameSpace, pTypeDef->nameSpace) == 0)) {
			return pTypeDef;
		}
	}

	if (assertExists) {
		Crash("MetaData_GetTypeDefFromName(): Cannot find type %s.%s", nameSpace, name);
		FAKE_RETURN;
	} else {
		return NULL;
	}
}

tMD_TypeDef* MetaData_GetTypeDefFromFullName(STRING assemblyName, STRING nameSpace, STRING name) {
	tMetaData *pTypeMetaData;

	pTypeMetaData = CLIFile_GetMetaDataForAssembly(assemblyName);

	// Note that this cannot get a nested class, as this final parameter is always NULL
	return MetaData_GetTypeDefFromName(pTypeMetaData, nameSpace, name, NULL, /* assertExists */ 1);
}

tMD_TypeDef* MetaData_GetTypeDefFromDefRefOrSpec(tMetaData *pMetaData, IDX_TABLE token, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	void *pTableEntry;

	pTableEntry = MetaData_GetTableRow(pMetaData, token);
	if (pTableEntry == NULL) {
		return NULL;
	}
	if (((tMDC_ToTypeDef*)pTableEntry)->pTypeDef != NULL) {
		return ((tMDC_ToTypeDef*)pTableEntry)->pTypeDef;
	}

	switch (TABLE_ID(token)) {
		case MD_TABLE_TYPEDEF:
			((tMDC_ToTypeDef*)pTableEntry)->pTypeDef = (tMD_TypeDef*)pTableEntry;
			return (tMD_TypeDef*)pTableEntry;
		case MD_TABLE_TYPEREF:
			{
				tMetaData *pTypeDefMetaData;
				tMD_TypeRef *pTypeRef;
				tMD_TypeDef *pTypeDef;
				tMD_TypeDef *pInNestedClass;

				pTypeRef = (tMD_TypeRef*)pTableEntry;
				pTypeDefMetaData = MetaData_GetResolutionScopeMetaData(pMetaData, pTypeRef->resolutionScope, &pInNestedClass);
				pTypeDef = MetaData_GetTypeDefFromName(pTypeDefMetaData, pTypeRef->nameSpace, pTypeRef->name, pInNestedClass, /* assertExists */ 1);
				pTypeRef->pTypeDef = pTypeDef;
				return pTypeDef;
			}
		case MD_TABLE_TYPESPEC:
			{
				tMD_TypeSpec *pTypeSpec;
				tMD_TypeDef *pTypeDef;
				SIG sig;

				pTypeSpec = (tMD_TypeSpec*)pTableEntry;
				sig = MetaData_GetBlob(pTypeSpec->signature, NULL);
				pTypeDef = Type_GetTypeFromSig(pTypeSpec->pMetaData, &sig, ppClassTypeArgs, ppMethodTypeArgs);
				// Note: Cannot cache the TypeDef for this TypeSpec because it
				// can change depending on class arguemnts given.

				return pTypeDef;
			}
			return NULL;
		default:
			Crash("MetaData_GetTypeDefFromDefRefOrSpec(): Cannot handle token: 0x%08x", token);
			FAKE_RETURN;
	}
}

tMD_TypeDef* MetaData_GetTypeDefFromMethodDef(tMD_MethodDef *pMethodDef) {
	tMetaData *pMetaData;
	U32 i;

	pMetaData = pMethodDef->pMetaData;
	for (i=pMetaData->tables.numRows[MD_TABLE_TYPEDEF]; i>0; i--) {
		tMD_TypeDef *pTypeDef;

		pTypeDef = (tMD_TypeDef*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_TYPEDEF, i));
		if (pTypeDef->methodList <= pMethodDef->tableIndex) {
			return pTypeDef;
		}
	}

	Crash("MetaData_GetTypeDefFromMethodDef(): Cannot find type for method: %s", pMethodDef->name);
	FAKE_RETURN;
}

tMD_TypeDef* MetaData_GetTypeDefFromFieldDef(tMD_FieldDef *pFieldDef) {
	tMetaData *pMetaData;
	U32 i;

	pMetaData = pFieldDef->pMetaData;
	for (i=pMetaData->tables.numRows[MD_TABLE_TYPEDEF]; i>0; i--) {
		tMD_TypeDef *pTypeDef;

		pTypeDef = (tMD_TypeDef*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_TYPEDEF, i));
		if (pTypeDef->fieldList <= pFieldDef->tableIndex) {
			return pTypeDef;
		}
	}

	Crash("MetaData_GetTypeDefFromFieldDef(): Cannot find type for field: %s", pFieldDef->name);
	FAKE_RETURN;
}

tMD_MethodDef* MetaData_GetMethodDefFromDefRefOrSpec(tMetaData *pMetaData, IDX_TABLE token, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	void *pTableEntry;

	pTableEntry = MetaData_GetTableRow(pMetaData, token);
	if (((tMDC_ToMethodDef*)pTableEntry)->pMethodDef != NULL) {
		return ((tMDC_ToMethodDef*)pTableEntry)->pMethodDef;
	}

	switch (TABLE_ID(token)) {
		case MD_TABLE_METHODDEF:
			((tMDC_ToMethodDef*)pTableEntry)->pMethodDef = (tMD_MethodDef*)pTableEntry;
			return (tMD_MethodDef*)pTableEntry;
		case MD_TABLE_MEMBERREF:
			{
				tMD_MemberRef *pMemberRef;

				pMemberRef = (tMD_MemberRef*)pTableEntry;
				switch (TABLE_ID(pMemberRef->class_))
				{
				case MD_TABLE_TYPEREF:
				case MD_TABLE_TYPESPEC:
					{
						tMD_TypeDef *pTypeDef;
						tMD_MethodDef *pMethodDef;

						pTypeDef = MetaData_GetTypeDefFromDefRefOrSpec(pMetaData, pMemberRef->class_, ppClassTypeArgs, ppMethodTypeArgs);
						MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
						pMethodDef = FindMethodInType(pTypeDef, pMemberRef->name, pMetaData, pMemberRef->signature, pTypeDef->ppClassTypeArgs, ppMethodTypeArgs);
						//pMethodDef->pMethodDef = pMethodDef;
						return pMethodDef;
					}
				default:
					Crash("MetaData_GetMethodDefFromMethodDefOrRef(): Cannot handle pMemberRef->class_=0x%08x", pMemberRef->class_);
				}
			}
		case MD_TABLE_METHODSPEC:
			{
				tMD_MethodSpec *pMethodSpec;
				tMD_MethodDef *pMethodDef;

				pMethodSpec = (tMD_MethodSpec*)pTableEntry;
				pMethodDef = Generics_GetMethodDefFromSpec(pMethodSpec, ppClassTypeArgs, ppMethodTypeArgs);

				// Note: Cannot cache the MethodDef from the MethodSpec, as class generic arguments
				// may be different.
				
				return pMethodDef;
			}
	}

	Crash("MetaData_GetMethodDefFromMethodDefOrRef(): Cannot handle token: 0x%08x", token);
	FAKE_RETURN;
}

tMD_FieldDef* MetaData_GetFieldDefFromDefOrRef(tMetaData *pMetaData, IDX_TABLE token, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	void *pTableEntry;

	pTableEntry = MetaData_GetTableRow(pMetaData, token);
	if (((tMDC_ToFieldDef*)pTableEntry)->pFieldDef != NULL) {
		return ((tMDC_ToFieldDef*)pTableEntry)->pFieldDef;
	}

	switch (TABLE_ID(token)) {
		case MD_TABLE_FIELDDEF:
			((tMDC_ToFieldDef*)pTableEntry)->pFieldDef = (tMD_FieldDef*)pTableEntry;
			return (tMD_FieldDef*)pTableEntry;
		case MD_TABLE_MEMBERREF:
			{
				tMD_MemberRef *pMemberRef;

				pMemberRef = (tMD_MemberRef*)pTableEntry;
				switch (TABLE_ID(pMemberRef->class_))
				{
				case MD_TABLE_TYPEREF:
				case MD_TABLE_TYPESPEC:
					{
						tMD_TypeDef *pTypeDef;
						tMD_FieldDef *pFieldDef;

						pTypeDef = MetaData_GetTypeDefFromDefRefOrSpec(pMetaData, pMemberRef->class_, ppClassTypeArgs, ppMethodTypeArgs);
						pFieldDef = FindFieldInType(pTypeDef, pMemberRef->name);
						if (TABLE_ID(pMemberRef->class_) == MD_TABLE_TYPEREF) {
							// Can't do this for TypeSpec because the resulting TypeDef will change
							// depending on what the class type arguments are.
							((tMDC_ToFieldDef*)pTableEntry)->pFieldDef = pFieldDef;
						}
						return pFieldDef;
					}
				default:
					Crash("MetaData_GetMethodDefFromMethodDefOrRef(): Cannot handle pMemberRef->class_=0x%08x", pMemberRef->class_);
				}
			}
	}

	Crash("MetaData_GetFieldDefFromDefOrRef(): Cannot handle token: 0x%08x", token);
	FAKE_RETURN;
}

// Return pointer to the relevant Def structure.
// pObjectType returns:
// 0 - tMD_TypeDef
// 1 - tMD_MethodDef
// 2 - tMD_FieldDef
// (These link up with the JIT_LOADTOKEN_* opcodes)
PTR MetaData_GetTypeMethodField(tMetaData *pMetaData, IDX_TABLE token, U32 *pObjectType, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	switch (TABLE_ID(token)) {
		case MD_TABLE_TYPEDEF:
		case MD_TABLE_TYPEREF:
		case MD_TABLE_TYPESPEC:
			{
				tMD_TypeDef *pTypeDef;

				pTypeDef = MetaData_GetTypeDefFromDefRefOrSpec(pMetaData, token, ppClassTypeArgs, ppMethodTypeArgs);
				MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
				*pObjectType = 0;
				return (PTR)pTypeDef;
			}
		case MD_TABLE_METHODDEF:
method:
			{
				tMD_MethodDef *pMethodDef;

				pMethodDef = MetaData_GetMethodDefFromDefRefOrSpec(pMetaData, token, ppClassTypeArgs, ppMethodTypeArgs);
				if (pMethodDef->isFilled == 0) {
					tMD_TypeDef *pTypeDef;

					pTypeDef = MetaData_GetTypeDefFromMethodDef(pMethodDef);
					MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
				}
				*pObjectType = 1;
				return (PTR)pMethodDef;
			}
		case MD_TABLE_FIELDDEF:
field:
			{
				tMD_FieldDef *pFieldDef;

				pFieldDef = MetaData_GetFieldDefFromDefOrRef(pMetaData, token, ppClassTypeArgs, ppMethodTypeArgs);
				if (pFieldDef->pParentType == NULL) {
					tMD_TypeDef *pTypeDef;

					pTypeDef = MetaData_GetTypeDefFromFieldDef(pFieldDef);
					MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
				}
				*pObjectType = 2;
				return (PTR)pFieldDef;
			}
		case MD_TABLE_MEMBERREF:
			{
				tMD_MemberRef *pMemberRef;
				SIG sig;

				pMemberRef = (tMD_MemberRef*)MetaData_GetTableRow(pMetaData, token);
				sig = MetaData_GetBlob(pMemberRef->signature, NULL);
				if (*(U8*)sig == 0x06) {
					// Field
					goto field;
				} else {
					// Method
					goto method;
				}
			}
	}

	Crash("MetaData_GetTypeMethodField(): Cannot handle token: 0x%08x", token);
	FAKE_RETURN;
}

tMD_ImplMap* MetaData_GetImplMap(tMetaData *pMetaData, IDX_TABLE memberForwardedToken) {
	U32 i;

	for (i=pMetaData->tables.numRows[MD_TABLE_IMPLMAP]; i >= 1; i--) {
		tMD_ImplMap *pImplMap = (tMD_ImplMap*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_IMPLMAP, i));
		if (pImplMap->memberForwarded == memberForwardedToken) {
			return pImplMap;
		}
	}

	Crash("MetaData_GetImplMap() Cannot find mapping for token: 0x%08x", memberForwardedToken);
	FAKE_RETURN;
}

STRING MetaData_GetModuleRefName(tMetaData *pMetaData, IDX_TABLE memberRefToken) {
	tMD_ModuleRef *pModRef = (tMD_ModuleRef*)MetaData_GetTableRow(pMetaData, memberRefToken);
	return pModRef->name;
}
