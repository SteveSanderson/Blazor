#if !defined(__SYSTEM_REFLECTION_PROPERTYINFO_H)
#define __SYSTEM_REFLECTION_PROPERTYINFO_H

typedef struct tPropertyInfo_ tPropertyInfo;
struct tPropertyInfo_ {
    // Keep in sync with System.Reflection.PropertyInfo.cs in .NET corlib code
    HEAP_PTR ownerType;
    HEAP_PTR name;
    HEAP_PTR propertyType;

	tMD_Property* pMetaData;
	IDX_TABLE index;
};

#endif