#if !defined(__REFLECTION_H)
#define __REFLECTION_H

#include "Types.h"

tAsyncCall* Reflection_MemberInfo_GetCustomAttributes(PTR pThis_, PTR pParams, PTR pReturnValue);
tAsyncCall* Reflection_MethodInfo_MakeGenericMethod(PTR pThis_, PTR pParams, PTR pReturnValue);

#endif