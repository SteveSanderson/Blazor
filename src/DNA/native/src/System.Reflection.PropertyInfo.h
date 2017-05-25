#if !defined(__SYSTEM_REFLECTION_PROPERTYINFO_H)
#define __SYSTEM_REFLECTION_PROPERTYINFO_H

typedef struct tPropertyInfo_ tPropertyInfo;
struct tPropertyInfo_ {
    // Keep in sync with System.Reflection.PropertyInfo.cs
    HEAP_PTR ownerType;
    HEAP_PTR name;
    HEAP_PTR propertyType;
};

#endif