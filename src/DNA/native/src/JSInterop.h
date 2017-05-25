#if !defined (__JSINTEROP_H)
#define __JSINTEROP_H
	#include "CLIFile.h"
	#include "System.RuntimeType.h"

	tAsyncCall* Framework_JSInterop_ToHeapRef(PTR pThis_, PTR pParams, PTR pReturnValue);
	tAsyncCall* Framework_JSInterop_FromHeapRefImpl(PTR pThis_, PTR pParams, PTR pReturnValue);
	tAsyncCall* Framework_JSInterop_Activator_CreateInstance(PTR pThis_, PTR pParams, PTR pReturnValue);
#endif
