#if !defined(__SYSTEM_ATTRIBUTE_H)
#define __SYSTEM_ATTRIBUTE_H

typedef struct tSystemAttribute_ tSystemAttribute;
struct tSystemAttribute_ {
	int fake;
};

typedef struct tInternalCustomAttributeInfo_ tInternalCustomAttributeInfo;
struct tInternalCustomAttributeInfo_ {
	// Keep in sync with InternalCustomAttributeInfo struct in corlib C# code
	HEAP_PTR pUninitializedInstance;
	HEAP_PTR pConstructorMethodBase;
	HEAP_PTR pConstructorParams;
};

#endif