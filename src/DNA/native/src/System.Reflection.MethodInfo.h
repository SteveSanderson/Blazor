#if !defined(__SYSTEM_REFLECTION_METHODINFO_H)
#define __SYSTEM_REFLECTION_METHODINFO_H

#include "System.Reflection.MethodBase.h"

typedef struct tMethodInfo_ tMethodInfo;
struct tMethodInfo_ {
    tMethodBase methodBase;
};

tAsyncCall* System_Reflection_MethodInfo_MakeGenericMethod(PTR pThis_, PTR pParams, PTR pReturnValue);

#endif