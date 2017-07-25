#include "Compat.h"
#include "Sys.h"
#include "Reflection.h"
#include "Type.h"
#include "System.Array.h"
#include "System.Reflection.PropertyInfo.h"
#include "System.Reflection.MemberInfo.h"
#include "System.RuntimeType.h"

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
	tMD_TypeDef *pArrayType = Type_GetArrayTypeDef(types[TYPE_SYSTEM_ATTRIBUTE], NULL, NULL);
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
			
			// Actually instantiate the attribute
			// TODO: Call the real constructor, pass constructor params, set properties, etc.
			HEAP_PTR customAttributeInstance = Heap_AllocType(pCtorTypeDef);
			SystemArray_StoreElement(ret, insertionIndex++, (PTR)&customAttributeInstance);
		}
	}

	return NULL;
}