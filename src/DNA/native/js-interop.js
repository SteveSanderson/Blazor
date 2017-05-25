mergeInto(LibraryManager.library, {
  invokeJsFunc: function(libName, funcName, arg0) {
  	// I wanted to implement an arbitrary interop feature here, letting the developer
  	// register arbitrary sets of libName/funcName funcs and dynamically pass the
  	// supplied arguments to that function. But I haven't yet implemented any way for
  	// the C code to supply an arbitrary collection of args (it would need to be able
  	// to cast the "extern invokeJsFunc" func to a function type that takes the right
  	// collection of args, or some sort of data structure that describes all the args)
  	//
  	// So, currently, PInvoke only works for functions of this C# form:
  	//
  	// public static extern int SomeFunction(string singleStringParam); 
  	//
  	// ... because PInvoke.c is hard-coded to assume invokeJsFunc is of the form
  	// void invokeJsFunc(STRING a, STRING b, STRING c)

  	libName = Pointer_stringify(libName);
  	funcName = Pointer_stringify(funcName);
  	arg0 = Pointer_stringify(arg0);

    if (!(libName in window)) {
        throw new Error('No such library \'' + libName + '\'');
    }

    if (!(funcName in window[libName])) {
        throw new Error('No such function \'' + funcName + '\' on library \'' + libName + '\'');
    }

    var result = window[libName][funcName](arg0);
    if (result !== null && result !== undefined) {
      var resultString = result.toString();
      var resultPtr = allocate(intArrayFromString(resultString), 'i8', ALLOC_NORMAL);
      return resultPtr;
    } else {
      return 0;
    }
  },
});
