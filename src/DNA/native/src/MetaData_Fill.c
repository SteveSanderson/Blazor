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
#include "EvalStack.h"

void MetaData_Fill_FieldDef(tMD_TypeDef *pParentType, tMD_FieldDef *pFieldDef, U32 memOffset, tMD_TypeDef **ppClassTypeArgs) {
	U32 sigLength;
	PTR sig;
	tMetaData *pMetaData;

	pFieldDef->pParentType = pParentType;

	sig = MetaData_GetBlob(pFieldDef->signature, &sigLength);

	MetaData_DecodeSigEntry(&sig); // First entry always 0x06
	pFieldDef->pType = Type_GetTypeFromSig(pFieldDef->pMetaData, &sig, ppClassTypeArgs, NULL);
	if (pFieldDef->pType == NULL) {
		// If the field is a core generic type definition, then we can't do anything more
		return;
	}
	MetaData_Fill_TypeDef(pFieldDef->pType, NULL, NULL);
	// A check for 0 is done so if a type has a field of it's own type it is handled correctly.
	pFieldDef->memSize = (pFieldDef->pType->stackSize>0)?pFieldDef->pType->stackSize:sizeof(void*);
	pFieldDef->memOffset = memOffset;
	pFieldDef->pFieldDef = pFieldDef;

	pMetaData = pFieldDef->pMetaData;
	if (FIELD_HASFIELDRVA(pFieldDef)) {
		U32 i, top;

		// Field has RVA, so load it from FieldRVA
		top = pMetaData->tables.numRows[MD_TABLE_FIELDRVA];
		for (i=1; i<=top; i++) {
			tMD_FieldRVA *pFieldRVA;

			pFieldRVA = (tMD_FieldRVA*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_FIELDRVA, i));
			if (pFieldRVA->field == pFieldDef->tableIndex) {
				pFieldDef->pMemory = (PTR)pFieldRVA->rva;
				break;
			}
		}
	} else if (FIELD_ISLITERAL(pFieldDef)) {
		// Field is literal, so make pMemory point to the value signature
		U32 i, top;

		top = pMetaData->tables.numRows[MD_TABLE_CONSTANT];
		for (i=1; i<=top; i++) {
			tMD_Constant *pConst;
			pConst = (tMD_Constant*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_CONSTANT, i));
			if (pConst->parent == pFieldDef->tableIndex) {
				// Found the field
				pFieldDef->pMemory = (PTR)pConst;
				break;
			}
		}
	}
}

void MetaData_Fill_MethodDef(tMD_TypeDef *pParentType, tMD_MethodDef *pMethodDef, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	SIG sig;
	U32 i, entry, totalSize;

	pMethodDef->pParentType = pParentType;
	pMethodDef->pMethodDef = pMethodDef;
	pMethodDef->isFilled = 1;

	if (pMethodDef->isGenericDefinition) {
		// Generic definition method, so can't do any more.
		//log_f("Method<>: %s.%s.%s()\n", pParentType->nameSpace, pParentType->name, pMethodDef->name);
		return;
	}

	sig = MetaData_GetBlob(pMethodDef->signature, NULL);
	entry = MetaData_DecodeSigEntry(&sig);
	if (entry & SIG_METHODDEF_GENERIC) {
		// Has generic parameters. Read how many, but don't care about the answer
		MetaData_DecodeSigEntry(&sig);
	}
	pMethodDef->numberOfParameters = MetaData_DecodeSigEntry(&sig) + (METHOD_ISSTATIC(pMethodDef)?0:1);
	pMethodDef->pReturnType = Type_GetTypeFromSig(pMethodDef->pMetaData, &sig, ppClassTypeArgs, ppMethodTypeArgs);
	if (pMethodDef->pReturnType != NULL) {
		MetaData_Fill_TypeDef(pMethodDef->pReturnType, NULL, NULL);
	}
	pMethodDef->pParams = (tParameter*)malloc(pMethodDef->numberOfParameters * sizeof(tParameter));
	totalSize = 0;
	if (!METHOD_ISSTATIC(pMethodDef)) {
		// Fill in parameter info for the 'this' pointer
		pMethodDef->pParams->offset = 0;
		if (pParentType->isValueType) {
			// If this is a value-type then the 'this' pointer is actually an IntPtr to the value-type's location
			pMethodDef->pParams->size = 4;
			pMethodDef->pParams->pTypeDef = types[TYPE_SYSTEM_INTPTR];
		} else {
			pMethodDef->pParams->size = 4;
			pMethodDef->pParams->pTypeDef = pParentType;
		}
		totalSize = 4;
	}
	for (i=totalSize>>2; i<pMethodDef->numberOfParameters; i++) {
		tMD_TypeDef *pTypeDef;
		U32 size;

		pTypeDef = Type_GetTypeFromSig(pMethodDef->pMetaData, &sig, ppClassTypeArgs, ppMethodTypeArgs);
		//if (pTypeDef != NULL) {
			MetaData_Fill_TypeDef(pTypeDef, NULL, NULL);
			size = pTypeDef->stackSize;
		//} else {
		//	// If this method has generic-type-argument arguments, then we can't do anything very sensible yet
		//	size = 0;
		//}
		pMethodDef->pParams[i].pTypeDef = pTypeDef;
		pMethodDef->pParams[i].offset = totalSize;
		pMethodDef->pParams[i].size = size;
		totalSize += size;
	}
	pMethodDef->parameterStackSize = totalSize;
}

// Find the method that has been overridden by pMethodDef.
// This is to get the correct vTable offset for the method.
// This must search the MethodImpl table to see if the default inheritence rules are being overridden.
// Return NULL if this method does not override anything.
static tMD_MethodDef* FindVirtualOverriddenMethod(tMD_TypeDef *pTypeDef, tMD_MethodDef *pMethodDef) {
	U32 i;

	do {
		// Search MethodImpl table
		for (i=pTypeDef->pMetaData->tables.numRows[MD_TABLE_METHODIMPL]; i>0; i--) {
			tMD_MethodImpl *pMethodImpl;

			pMethodImpl = (tMD_MethodImpl*)MetaData_GetTableRow(pTypeDef->pMetaData, MAKE_TABLE_INDEX(MD_TABLE_METHODIMPL, i));
			if (pMethodImpl->class_ == pTypeDef->tableIndex) {
				tMD_MethodDef *pMethodDeclDef;

				pMethodDeclDef = MetaData_GetMethodDefFromDefRefOrSpec(pTypeDef->pMetaData, pMethodImpl->methodDeclaration, pTypeDef->ppClassTypeArgs, pMethodDef->ppMethodTypeArgs);
				if (pMethodDeclDef->tableIndex == pMethodDef->tableIndex) {
					IDX_TABLE methodToken;
					tMD_MethodDef *pMethod;

					methodToken = pMethodImpl->methodBody;
					pMethod = (tMD_MethodDef*)MetaData_GetTableRow(pTypeDef->pMetaData, methodToken);
					return pMethod;
				}
			}
		}

		// Use normal inheritence rules
		// It must be a virtual method that's being overridden.
		for (i=pTypeDef->numVirtualMethods - 1; i != 0xffffffff; i--) {
			if (MetaData_CompareNameAndSig(pMethodDef->name, pMethodDef->signature, pMethodDef->pMetaData, pMethodDef->pParentType->ppClassTypeArgs, pMethodDef->ppMethodTypeArgs, pTypeDef->pVTable[i], pTypeDef->ppClassTypeArgs, NULL)) {
				return pTypeDef->pVTable[i];
			}
		}
		pTypeDef = pTypeDef->pParent;
	} while (pTypeDef != NULL);

	return NULL;
}

void MetaData_Fill_TypeDef_(tMD_TypeDef *pTypeDef, tMD_TypeDef **ppClassTypeArgs, tMD_TypeDef **ppMethodTypeArgs) {
	IDX_TABLE firstIdx, lastIdx, token;
	U32 instanceMemSize, staticMemSize, virtualOfs, i, j;
	tMetaData *pMetaData;
	tMD_TypeDef *pParent;

	pMetaData = pTypeDef->pMetaData;
	pTypeDef->isFilled = 1;
	pTypeDef->pTypeDef = pTypeDef;

	pTypeDef->pParent = MetaData_GetTypeDefFromDefRefOrSpec(pMetaData, pTypeDef->extends, ppClassTypeArgs, ppMethodTypeArgs);
	pParent = pTypeDef->pParent;

	if (pParent != NULL) {
		MetaData_Fill_TypeDef(pParent, NULL, NULL);
		virtualOfs = pParent->numVirtualMethods;
	} else {
		virtualOfs = 0;
	}
	pTypeDef->isValueType = (U8)Type_IsValueType(pTypeDef);

	// If not primed, then work out how many methods & fields there are.
	if (!pTypeDef->isPrimed) {
		// Methods
		lastIdx = (pTypeDef->isLast)?
			MAKE_TABLE_INDEX(MD_TABLE_METHODDEF, pTypeDef->pMetaData->tables.numRows[MD_TABLE_METHODDEF]):
			(pTypeDef[1].methodList - 1);
		pTypeDef->numMethods = lastIdx - pTypeDef->methodList + 1;
		// Fields
		lastIdx = (pTypeDef->isLast)?
			MAKE_TABLE_INDEX(MD_TABLE_FIELDDEF, pTypeDef->pMetaData->tables.numRows[MD_TABLE_FIELDDEF]):
			(pTypeDef[1].fieldList - 1);
		pTypeDef->numFields = lastIdx - pTypeDef->fieldList + 1;
	}

	// Must create the virtual method table BEFORE any other type resolution is done
	// Note that this must not do ANY filling of types or methods.
	// This is to ensure that the parent object(s) in any type inheritance hierachy are allocated
	// their virtual method offset before derived types.
	firstIdx = pTypeDef->methodList;
	lastIdx = firstIdx + pTypeDef->numMethods - 1;
	// This only needs to be done for non-generic types, or for generic types that are not a definition
	// I.e. Fully instantiated generic types
	if (!pTypeDef->isGenericDefinition) {
		for (token = firstIdx; token <= lastIdx; token++) {
			tMD_MethodDef *pMethodDef;

			pMethodDef = MetaData_GetMethodDefFromDefRefOrSpec(pMetaData, token, ppClassTypeArgs, ppMethodTypeArgs);

			// This is needed, so array resolution can work correctly and FindVirtualOverriddenMethod() can work.
			pMethodDef->pParentType = pTypeDef;

			if (METHOD_ISVIRTUAL(pMethodDef)) {
				if (METHOD_ISNEWSLOT(pMethodDef) || pTypeDef->pParent == NULL) {
					// Allocate a new vTable slot if method is explicitly marked as NewSlot, or
					// this is of type Object.
					pMethodDef->vTableOfs = virtualOfs++;
				} else {
					tMD_MethodDef *pVirtualOveriddenMethod;

					pVirtualOveriddenMethod = FindVirtualOverriddenMethod(pTypeDef->pParent, pMethodDef);
					Assert(pVirtualOveriddenMethod != NULL);
					pMethodDef->vTableOfs = pVirtualOveriddenMethod->vTableOfs;
				}
			} else {
				// Dummy value - make it obvious it's not valid!
				pMethodDef->vTableOfs = 0xffffffff;
			}

		}
		// Create the virtual method table
		pTypeDef->numVirtualMethods = virtualOfs;

		// Resolve fields, members, interfaces.
		// Only needs to be done if it's not a generic definition type

		// It it's not a value-type and the stack-size is not preset, then set it up now.
		// It needs to be done here as non-static fields in non-value types can point to the containing type
		if (pTypeDef->stackSize == 0 && !pTypeDef->isValueType) {
			pTypeDef->stackType = EVALSTACK_O;
			pTypeDef->stackSize = sizeof(void*);
		}
		// Resolve all fields - instance ONLY at this point,
		// because static fields in value-types can be of the containing type, and the size is not yet known.
		firstIdx = pTypeDef->fieldList;
		lastIdx = firstIdx + pTypeDef->numFields - 1;
		staticMemSize = 0;
		if (pTypeDef->numFields > 0) {
			pTypeDef->ppFields = mallocForever(pTypeDef->numFields * sizeof(tMD_FieldDef*));
		}
		instanceMemSize = (pTypeDef->pParent == NULL)?0:pTypeDef->pParent->instanceMemSize;
		for (token = firstIdx, i=0; token <= lastIdx; token++, i++) {
			tMD_FieldDef *pFieldDef;

			pFieldDef = MetaData_GetFieldDefFromDefOrRef(pMetaData, token, ppClassTypeArgs, ppMethodTypeArgs);
			if (!FIELD_ISSTATIC(pFieldDef)) {
				// Only handle non-static fields at the moment
				if (pTypeDef->pGenericDefinition != NULL) {
					// If this is a generic instantiation type, then all field defs need to be copied,
					// as there will be lots of different instantiations.
					tMD_FieldDef *pFieldCopy = TMALLOCFOREVER(tMD_FieldDef);
					memcpy(pFieldCopy, pFieldDef, sizeof(tMD_FieldDef));
					pFieldDef = pFieldCopy;
				}
				if (FIELD_ISLITERAL(pFieldDef) || FIELD_HASFIELDRVA(pFieldDef)) {
					// If it's a literal, then analyse the field, but don't include it in any memory allocation
					// If is has an RVA, then analyse the field, but don't include it in any memory allocation
					MetaData_Fill_FieldDef(pTypeDef, pFieldDef, 0, ppClassTypeArgs);
				} else {
					MetaData_Fill_FieldDef(pTypeDef, pFieldDef, instanceMemSize, ppClassTypeArgs);
					instanceMemSize += pFieldDef->memSize;
				}
				pTypeDef->ppFields[i] = pFieldDef;
			}
		}
		if (pTypeDef->instanceMemSize == 0) {
			pTypeDef->instanceMemSize = instanceMemSize;
		}

		// Sort out stack type and size.
		// Note that this may already be set, as some basic types have this preset;
		// or if it's not a value-type it'll already be set
		if (pTypeDef->stackSize == 0) {
			// if it gets here then it must be a value type
			pTypeDef->stackType = EVALSTACK_VALUETYPE;
			pTypeDef->stackSize = pTypeDef->instanceMemSize;
		}
		// Sort out array element size. Note that some basic types will have this preset.
		if (pTypeDef->arrayElementSize == 0) {
			pTypeDef->arrayElementSize = pTypeDef->stackSize;
		}

		// Handle static fields
		for (token = firstIdx, i=0; token <= lastIdx; token++, i++) {
			tMD_FieldDef *pFieldDef;

			pFieldDef = MetaData_GetFieldDefFromDefOrRef(pMetaData, token, ppClassTypeArgs, ppMethodTypeArgs);
			if (FIELD_ISSTATIC(pFieldDef)) {
				// Only handle static fields here
				if (pTypeDef->pGenericDefinition != NULL) {
					// If this is a generic instantiation type, then all field defs need to be copied,
					// as there will be lots of different instantiations.
					tMD_FieldDef *pFieldCopy = TMALLOCFOREVER(tMD_FieldDef);
					memcpy(pFieldCopy, pFieldDef, sizeof(tMD_FieldDef));
					pFieldDef = pFieldCopy;
				}
				if (FIELD_ISLITERAL(pFieldDef) || FIELD_HASFIELDRVA(pFieldDef)) {
					// If it's a literal, then analyse the field, but don't include it in any memory allocation
					// If is has an RVA, then analyse the field, but don't include it in any memory allocation
					MetaData_Fill_FieldDef(pTypeDef, pFieldDef, 0, ppClassTypeArgs);
				} else {
					MetaData_Fill_FieldDef(pTypeDef, pFieldDef, staticMemSize, ppClassTypeArgs);
					staticMemSize += pFieldDef->memSize;
				}
				pTypeDef->ppFields[i] = pFieldDef;
			}
		}
		if (staticMemSize > 0) {
			pTypeDef->pStaticFields = mallocForever(staticMemSize);
			memset(pTypeDef->pStaticFields, 0, staticMemSize);
			// Set the field addresses (->pMemory) of all static fields
			for (i = 0; i<pTypeDef->numFields; i++) {
				tMD_FieldDef *pFieldDef;

				pFieldDef = pTypeDef->ppFields[i];
				if (FIELD_ISSTATIC(pFieldDef) && pFieldDef->pMemory == NULL) {
					// Only set it if it isn't already set. It will be already set if this field has an RVA
					pFieldDef->pMemory = pTypeDef->pStaticFields + pFieldDef->memOffset;
				}
			}
			pTypeDef->staticFieldSize = staticMemSize;
		}

		// Resolve all members
		firstIdx = pTypeDef->methodList;
		lastIdx = firstIdx + pTypeDef->numMethods - 1;
		pTypeDef->ppMethods = mallocForever(pTypeDef->numMethods * sizeof(tMD_MethodDef*));
		pTypeDef->pVTable = mallocForever(pTypeDef->numVirtualMethods * sizeof(tMD_MethodDef*));
		// Copy initial vTable from parent
		if (pTypeDef->pParent != NULL) {
			memcpy(pTypeDef->pVTable, pTypeDef->pParent->pVTable, pTypeDef->pParent->numVirtualMethods * sizeof(tMD_MethodDef*));
		}
		for (token = firstIdx, i = 0; token <= lastIdx; token++, i++) {
			tMD_MethodDef *pMethodDef;

			pMethodDef = MetaData_GetMethodDefFromDefRefOrSpec(pMetaData, token, ppClassTypeArgs, ppMethodTypeArgs);
			if (pTypeDef->pGenericDefinition != NULL) {
				// If this is a generic instantiation type, then all method defs need to be copied,
				// as there will be lots of different instantiations.
				tMD_MethodDef *pMethodCopy = TMALLOCFOREVER(tMD_MethodDef);
				memcpy(pMethodCopy, pMethodDef, sizeof(tMD_MethodDef));
				pMethodDef = pMethodCopy;
			}
			if (METHOD_ISSTATIC(pMethodDef) && strcmp(pMethodDef->name, ".cctor") == 0) {
				// This is a static constructor
				pTypeDef->pStaticConstructor = pMethodDef;
			}
			if (!METHOD_ISSTATIC(pMethodDef) && pTypeDef->pParent != NULL &&
				strcmp(pMethodDef->name, "Finalize") == 0) {
				// This is a Finalizer method, but not for Object.
				// Delibrately miss out Object's Finalizer because it's empty and will cause every object
				// of any type to have a Finalizer which will be terrible for performance.
				pTypeDef->pFinalizer = pMethodDef;
			}
			if (METHOD_ISVIRTUAL(pMethodDef)) {
				// This is a virtual method, so enter it in the vTable
				pTypeDef->pVTable[pMethodDef->vTableOfs] = pMethodDef;
			}
			pTypeDef->ppMethods[i] = pMethodDef;
		}
		// Find inherited Finalizer, if this type doesn't have an explicit Finalizer, and if there is one
		if (pTypeDef->pFinalizer == NULL) {
			tMD_TypeDef *pInheritedType = pTypeDef->pParent;
			while (pInheritedType != NULL) {
				if (pInheritedType->pFinalizer != NULL) {
					pTypeDef->pFinalizer = pInheritedType->pFinalizer;
					break;
				}
				pInheritedType = pInheritedType->pParent;
			}
		}
		// Fill all method definitions for this type
		for (i=0; i<pTypeDef->numMethods; i++) {
			MetaData_Fill_MethodDef(pTypeDef, pTypeDef->ppMethods[i], ppClassTypeArgs, ppMethodTypeArgs);
		}

		// Map all interface method calls. This only needs to be done for Classes, not Interfaces
		// And is not done for generic definitions.
		if (!TYPE_ISINTERFACE(pTypeDef)) {
			firstIdx = 0;
			if (pTypeDef->pParent != NULL) {
				j = pTypeDef->numInterfaces = pTypeDef->pParent->numInterfaces;
			} else {
				j = 0;
			}
			// TODO: Better to do this once during file load (the bit in this for loop)
			for (i=1; i<=pMetaData->tables.numRows[MD_TABLE_INTERFACEIMPL]; i++) {
				tMD_InterfaceImpl *pInterfaceImpl;

				pInterfaceImpl = (tMD_InterfaceImpl*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_INTERFACEIMPL, i));
				if (pInterfaceImpl->class_ == pTypeDef->tableIndex) {
					// count how many interfaces are implemented
					pTypeDef->numInterfaces++;
					if (firstIdx == 0) {
						firstIdx = MAKE_TABLE_INDEX(MD_TABLE_INTERFACEIMPL, i);
					}
					lastIdx = MAKE_TABLE_INDEX(MD_TABLE_INTERFACEIMPL, i);
				}
			}
			if (pTypeDef->numInterfaces > 0 && !pTypeDef->isGenericDefinition) {
				U32 mapNum;

				pTypeDef->pInterfaceMaps = (tInterfaceMap*)mallocForever(pTypeDef->numInterfaces * sizeof(tInterfaceMap));
				// Copy interface maps from parent type
				if (j > 0) {
					memcpy(pTypeDef->pInterfaceMaps, pTypeDef->pParent->pInterfaceMaps, j * sizeof(tInterfaceMap));
				}
				mapNum = j;
				if (firstIdx > 0) {
					for (token=firstIdx; token<=lastIdx; token++, mapNum++) {
						tMD_InterfaceImpl *pInterfaceImpl;

						pInterfaceImpl = (tMD_InterfaceImpl*)MetaData_GetTableRow(pMetaData, token);
						if (pInterfaceImpl->class_ == pTypeDef->tableIndex) {
							tMD_TypeDef *pInterface;
							tInterfaceMap *pMap;

							// Get the interface that this type implements
							pInterface = MetaData_GetTypeDefFromDefRefOrSpec(pMetaData, pInterfaceImpl->interface_, ppClassTypeArgs, ppMethodTypeArgs);
							MetaData_Fill_TypeDef(pInterface, NULL, NULL);
							pMap = &pTypeDef->pInterfaceMaps[mapNum];
							pMap->pInterface = pInterface;
							pMap->pVTableLookup = (U32*)mallocForever(pInterface->numVirtualMethods * sizeof(U32));
							pMap->ppMethodVLookup = NULL;
							// Discover interface mapping for each interface method
							for (i=0; i<pInterface->numVirtualMethods; i++) {
								tMD_MethodDef *pInterfaceMethod, *pOverriddenMethod;

								pInterfaceMethod = pInterface->pVTable[i];
								pOverriddenMethod = FindVirtualOverriddenMethod(pTypeDef, pInterfaceMethod);
								Assert(pOverriddenMethod != NULL);
								pMap->pVTableLookup[i] = pOverriddenMethod->vTableOfs;
							}
						} else {
							Crash("Problem with interface class");
						}
					}
				}
			}
		}

		// If this is an enum type, then pretend its stack type is its underlying type
		if (pTypeDef->pParent == types[TYPE_SYSTEM_ENUM]) {
			pTypeDef->stackType = EVALSTACK_INT32;
		}
	}

	// If this is a nested type, then find the namespace of it
	if (pTypeDef->pNestedIn != NULL) {
		tMD_TypeDef *pRootTypeDef = pTypeDef->pNestedIn;
		while (pRootTypeDef->pNestedIn != NULL) {
			pRootTypeDef = pRootTypeDef->pNestedIn;
		}
		pTypeDef->nameSpace = pRootTypeDef->nameSpace;
	}

	log_f(2, "Type:  %s.%s\n", pTypeDef->nameSpace, pTypeDef->name);
}

