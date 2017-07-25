#if !defined(__SYSTEM_REFLECTION_MEMBERINFO_H)
#define __SYSTEM_REFLECTION_MEMBERINFO_H


typedef struct tMemberInfo_ tMemberInfo;
struct tMemberInfo_ {
	// Keep in sync with System.Reflection.MemberInfo.cs
	HEAP_PTR ownerType;
	HEAP_PTR name;
};

#endif