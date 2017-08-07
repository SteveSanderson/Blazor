#if !defined(__SYSTEM_REFLECTION_METHODBASE_H)
#define __SYSTEM_REFLECTION_METHODBASE_H

typedef struct tMethodBase_ tMethodBase;
struct tMethodBase_ {
    // Keep in sync with System.Reflection.MethodBase.cs class in .NET corlib code
    HEAP_PTR ownerType;
    HEAP_PTR name;
	U32 flags;
	tMD_MethodDef *methodDef; // Not accessed from .NET code
};

#endif