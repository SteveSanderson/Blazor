#include "Compat.h"
#include "Sys.h"
#include "Reflection.h"
#include "Type.h"
#include "System.Attribute.h"
#include "System.Array.h"
#include "System.Reflection.PropertyInfo.h"
#include "System.Reflection.MemberInfo.h"
#include "System.Reflection.MethodBase.h"
#include "System.Reflection.MethodInfo.h"
#include "System.RuntimeType.h"
#include "System.String.h"

tAsyncCall* Reflection_MemberInfo_GetCustomAttributes(PTR pThis_, PTR pParams, PTR pReturnValue)
{
	tMemberInfo *pMemberInfo = (tMemberInfo*)pThis_;
	tRuntimeType *pMemberOwnerRuntimeType = (tRuntimeType*)pMemberInfo->ownerType;
	tMD_TypeDef *pMemberOwnerTypeDef = pMemberOwnerRuntimeType->pTypeDef;

	tMD_TypeDef* thisType = Heap_GetType((HEAP_PTR)pThis_);
	tMetaData *pMetaData = pMemberOwnerTypeDef->pMetaData;
	tTables tables = pMetaData->tables;
	U32 numCustomAttributeRows = tables.numRows[MD_TABLE_CUSTOMATTRIBUTE];

	// Figure out what metadata entry we're looking for custom attributes on
	IDX_TABLE searchForAttributesOnMemberIndex;
	if (strcmp(thisType->name, "TypeInfo") == 0) {
		searchForAttributesOnMemberIndex = pMemberOwnerTypeDef->tableIndex;
	} else if (strcmp(thisType->name, "PropertyInfo") == 0) {
		tPropertyInfo *pPropertyInfo = (tPropertyInfo *)pMemberInfo;
		searchForAttributesOnMemberIndex = pPropertyInfo->index;
	} else {
		Crash("Not implemented: Getting custom attributes for a %s\n", thisType->name);
		return NULL;
	}

	// First just count how many custom attributes there are so we know how big an array to allocate
	U32 numCustomAttributes = 0;
	for (U32 i = 1; i <= numCustomAttributeRows; i++) {
		tMD_CustomAttribute *pCustomAttribute = (tMD_CustomAttribute*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_CUSTOMATTRIBUTE, i));
		if (pCustomAttribute->parent == searchForAttributesOnMemberIndex) {
			numCustomAttributes++;
		}
	}

	// Allocate an array to use as the return value
	tMD_TypeDef *pArrayType = Type_GetArrayTypeDef(types[TYPE_SYSTEM_REFLECTION_INTERNALCUSTOMATTRIBUTEINFO], NULL, NULL);
	HEAP_PTR ret = SystemArray_NewVector(pArrayType, numCustomAttributes);

	// Assign to return value straight away, so it cannot be GCed
	*(HEAP_PTR*)pReturnValue = ret;

	// Now iterate over the custom attributes again, populating the result array
	U32 insertionIndex = 0;
	for (U32 i = 1; i <= numCustomAttributeRows; i++) {
		tMD_CustomAttribute *pCustomAttribute = (tMD_CustomAttribute*)MetaData_GetTableRow(pMetaData, MAKE_TABLE_INDEX(MD_TABLE_CUSTOMATTRIBUTE, i));
		if (pCustomAttribute->parent == searchForAttributesOnMemberIndex) {
			// The 'type' value references the constructor method
			tMD_MethodDef* pCtorMethodDef = MetaData_GetMethodDefFromDefRefOrSpec(pMetaData, pCustomAttribute->type, NULL, NULL);
			tMD_TypeDef* pCtorTypeDef = MetaData_GetTypeDefFromMethodDef(pCtorMethodDef);
			if (pCtorMethodDef->isFilled == 0) {
				MetaData_Fill_MethodDef(pCtorTypeDef, pCtorMethodDef, NULL, NULL);
			}

			// Create a InternalCustomAttributeInfo 
			PTR arrayEntryPtr = SystemArray_LoadElementAddress(ret, insertionIndex++);
			tInternalCustomAttributeInfo *pInternalCustomAttributeInfo = (tInternalCustomAttributeInfo*)arrayEntryPtr;
			
			// Actually instantiate the attribute
			HEAP_PTR customAttributeInstance = Heap_AllocType(pCtorTypeDef);
			pInternalCustomAttributeInfo->pUninitializedInstance = customAttributeInstance;

			// Supply info about the constructor back to the calling .NET code
			HEAP_PTR customAttributeConstructorMethodBase = Heap_AllocType(types[TYPE_SYSTEM_REFLECTION_METHODBASE]);
			tMethodBase *pMethodBase = (tMethodBase*)customAttributeConstructorMethodBase;
			pMethodBase->name = SystemString_FromCharPtrASCII(pCtorMethodDef->name);
			pMethodBase->ownerType = Type_GetTypeObject(pCtorTypeDef);
			pMethodBase->methodDef = pCtorMethodDef;
			pInternalCustomAttributeInfo->pConstructorMethodBase = customAttributeConstructorMethodBase;

			// Construct an array of constructor args
			U32 numCtorArgs = pCtorMethodDef->numberOfParameters;
			tMD_TypeDef *pObjectArrayType = Type_GetArrayTypeDef(types[TYPE_SYSTEM_OBJECT], NULL, NULL);
			HEAP_PTR pConstructorArgsArray = SystemArray_NewVector(pObjectArrayType, numCtorArgs - 1);
			pInternalCustomAttributeInfo->pConstructorParams = pConstructorArgsArray;

			// The info is in the 'value' blob from metadata
			U32 blobLength;
			PTR blob = MetaData_GetBlob(pCustomAttribute->value, &blobLength);
			MetaData_DecodeSigEntry(&blob);

			for (U32 argIndex = 0; argIndex < numCtorArgs; argIndex++) {
				tParameter param = pCtorMethodDef->pParams[argIndex];

				if (argIndex == 0) {
					// Skip the 'this' param
					MetaData_DecodeSigEntry(&blob);
				} else { 
					if (param.pTypeDef->isValueType) {
						HEAP_PTR boxed = Heap_Box(param.pTypeDef, blob);
						blob += param.pTypeDef->instanceMemSize;
						SystemArray_StoreElement(pConstructorArgsArray, argIndex - 1, (PTR)&boxed);
					} else if (param.pTypeDef == types[TYPE_SYSTEM_STRING]) {
						HEAP_PTR dotNetString;
						unsigned int numUtf8Bytes = MetaData_DecodeSigEntryExt(&blob, 0);
						if (numUtf8Bytes == 0xffffffff) {
							// Null
							dotNetString = NULL;
						} else {
							// Not null (but maybe empty)
							char* buf = malloc(numUtf8Bytes + 1);
							for (U32 byteIndex = 0; byteIndex < numUtf8Bytes; byteIndex++) {
								buf[byteIndex] = *((char*)blob);
								blob += sizeof(char);
							}
							buf[numUtf8Bytes] = 0;
							dotNetString = SystemString_FromCharPtrASCII(buf); // TODO: Handle non-ASCII UTF8, probably by converting the raw UTF8 data to UTF16
							free(buf);
						}
						SystemArray_StoreElement(pConstructorArgsArray, argIndex - 1, (PTR)&dotNetString);
					} else {
						Crash("GetCustomAttributes: Unsupported attribute parameter of type %s\n", param.pTypeDef->name);
						return NULL;
					}
				}
			}

			unsigned int numNamedParams = MetaData_DecodeSigEntry(&blob);
			if (numNamedParams > 0) {
				Crash("GetCustomAttributes: Unsupported attributes with named params on attribute %s\n", pCtorTypeDef->name);
				return NULL;
			}
		}
	}

	return NULL;
}

tAsyncCall* Reflection_MethodInfo_MakeGenericMethod(PTR pThis_, PTR pParams, PTR pReturnValue)
{
	// get type arguments
	HEAP_PTR pTypeArgs = ((HEAP_PTR*)pParams)[0];
	U32 argCount = SystemArray_GetLength(pTypeArgs);
	HEAP_PTR* pArray = (HEAP_PTR*)SystemArray_GetElements(pTypeArgs);

	// Get metadata for the 'this' type
	tMethodInfo *pMethodInfoThis = (tMethodInfo*)pThis_;
	tMD_MethodDef *pCoreMethod = pMethodInfoThis->methodBase.methodDef;

	// get arg types
	tMD_TypeDef **ppTypeArgs = TMALLOC(argCount, tMD_TypeDef*);
	for (U32 i = 0; i < argCount; i++) {
		ppTypeArgs[i] = RuntimeType_DeRef(pArray[i]);
	}

	// specialize generic method
	tMD_MethodDef *pMethodDef = Generics_GetMethodDefFromCoreMethod(pCoreMethod, pCoreMethod->pParentType, argCount, ppTypeArgs);
	free(ppTypeArgs);

	// Instantiate a MethodInfo
	tMethodInfo *pMethodInfo = (tMethodInfo*)Heap_AllocType(types[TYPE_SYSTEM_REFLECTION_METHODINFO]);

	// Assign ownerType, name and flags
	pMethodInfo->methodBase.ownerType = pThis_;
	pMethodInfo->methodBase.name = SystemString_FromCharPtrASCII(pMethodDef->name);
	pMethodInfo->methodBase.flags = pMethodDef->flags;

	// Assign method def
	pMethodInfo->methodBase.methodDef = pMethodDef;

	*(HEAP_PTR*)pReturnValue = (HEAP_PTR)pMethodInfo;
	return NULL;
}
