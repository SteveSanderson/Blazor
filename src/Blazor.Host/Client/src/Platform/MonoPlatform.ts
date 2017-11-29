import { MethodHandle, System_Object, System_String, Platform } from './Platform';
import { getAssemblyNameFromUrl } from './DotNet';

var assembly_load;
var find_class;
var find_method;
var invoke_method;
var mono_string_get_utf8;
var mono_string;
const callableFunctions: { [name: string]: Function} = { };

export const monoPlatform: Platform = {
    start: function start(loadAssemblyUrls: string[]) {
        return new Promise<void>((resolve, reject) => {
            // mono.js assumes the existence of this
            window['Browser'] = {
                init: () => { },
                asyncLoad: asyncLoad
            };

            // Emscripten works by expecting the module config to be a global
            window['Module'] = createEmscriptenModuleInstance(loadAssemblyUrls, resolve, reject);

            addScriptTagsToDocument();
        });
    },

    findMethod: function findMethod(assemblyName: string, namespace: string, className: string, methodName: string): MethodHandle {
        // TODO: Cache the assembly_load outputs?
        const assemblyHandle = assembly_load(assemblyName);
        if(!assemblyHandle) {
            throw new Error(`Could not find assembly "${assemblyName}"`);
        }

        const typeHandle = find_class(assemblyHandle, namespace, className);
        if (!typeHandle) {
            throw new Error(`Could not find type "${className}'" in namespace "${namespace}" in assembly "${assemblyName}"`);
        }

        // TODO: What is the '-1' param? Does this identify the overload somehow?
        const methodHandle = find_method(typeHandle, methodName, -1);
        if (!methodHandle) {
            throw new Error(`Could not find method "${methodName}" on type "${namespace}.${className}"`);
        }

        return <MethodHandle>methodHandle;
    },

    callEntryPoint: function callEntryPoint(assemblyName: string, args: System_Object[]): void {
        // TODO: There should be a proper way of running whatever counts as the entrypoint without
        // having to specify what method it is, but I haven't found it. The code here assumes
        // that the entry point is "<assemblyname>.Program.Main" (i.e., namespace == assembly name).
        const entryPointMethod = monoPlatform.findMethod(assemblyName, assemblyName, 'Program', 'Main');
        monoPlatform.callMethod(entryPointMethod, null, args);
    },

    callMethod: function callMethod(method: MethodHandle, target: System_Object, args: System_Object[]): System_Object {
        const stack = Module.Runtime.stackSave();

        try {
            const argsBuffer = Module.Runtime.stackAlloc(args.length);
            const exceptionFlagManagedInt = Module.Runtime.stackAlloc(4);
            for (var i = 0; i < args.length; ++i) {
                Module.setValue(argsBuffer + i * 4, args[i], 'i32');
            }
            Module.setValue(exceptionFlagManagedInt, 0, 'i32');

            const res: System_Object = invoke_method(method, target, argsBuffer, exceptionFlagManagedInt);

            if (Module.getValue(exceptionFlagManagedInt, 'i32') !== 0) {
                // If the exception flag is set, the returned value is exception.ToString()
                throw new Error(monoPlatform.toJavaScriptString(<System_String>res));
            }

            return res;
        } finally {
            Module.Runtime.stackRestore(stack);
        }
    },

    toJavaScriptString: function toJavaScriptString(managedString: System_String) {
        // Comments from original Mono sample:
        //FIXME this is wastefull, we could remove the temp malloc by going the UTF16 route
        //FIXME this is unsafe, cuz raw objects could be GC'd.

        if (!managedString) {
            return null;
        }

        const utf8 = mono_string_get_utf8(managedString);
        const res = Module.UTF8ToString(utf8);
        Module._free(utf8);
        return res;
    },

    toDotNetString: function toDotNetString(jsString: string): System_String {
        return mono_string(jsString);
    },

    invokeSimpleStatic: function invokeSimpleStatic(assemblyName: string, namespace: string, className: string, methodName: string, stringArg: string) {
        var method = this.findMethod(assemblyName, namespace, className, methodName);
        var res = this.callMethod(method, null, [this.toDotNetString(stringArg)]);
        return this.toJavaScriptString(<System_String>res);
    },

    registerCallableMethod: function registerCallableMethod(methodName: string, implementation: Function) {
        callableFunctions[methodName] = implementation;
    },

    getHeapAddress: function addressOfFirstField(heapObject: System_Object) {
        return (heapObject as any as number) + 12; // First 3 Int32s (= 12 bytes) are internal Mono stuff
    },

    readHeapInt32: function heapReadI32(address: number) {
        return Module.getValue(address, 'i32');
    },

    readHeapObject: function heapReadObject(address: number) {
        return Module.getValue(address, '*') as any as System_Object;
    }
};

window['__MonoPlatform__invokeJS'] = function __MonoPlatform__invokeJS(methodName: string, argsArray: any[]) {
    const implementation = callableFunctions[methodName];
    if (!implementation) {
        throw new Error(`Cannot invoke JS method '${methodName}' from .NET because no such method was registered with the platform.`);
    }

    const result = implementation.apply(null, argsArray);
    return JSON.stringify(result);
};

function addScriptTagsToDocument() {
    // Load either the wasm or asm.js version of the Mono runtime
    const browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
    const monoRuntimeUrlBase = '/_framework/Mono/dist/' + (browserSupportsNativeWebAssembly ? 'wasm' : 'asmjs');
    const monoRuntimeScriptUrl = `${monoRuntimeUrlBase}/mono.js`;

    if (!browserSupportsNativeWebAssembly) {
        // In the asmjs case, the initial memory structure is in a separate file we need to download
        const meminitXHR = Module['memoryInitializerRequest'] = new XMLHttpRequest();
        meminitXHR.open('GET', `${monoRuntimeUrlBase}/mono.js.mem`);
        meminitXHR.responseType = 'arraybuffer';
        meminitXHR.send(null);
    }

    document.write(`<script defer src="${monoRuntimeScriptUrl}"></script>`);
}

function createEmscriptenModuleInstance(loadAssemblyUrls: string[], onReady: () => void, onError: (reason: any) => void) {
    const module = {} as typeof Module;

    module.print = line => console.log(`WASM: ${line}`);
    module.printErr = line => console.error(`WASM: ${line}`);
    module.wasmBinaryFile = '/_framework/Mono/dist/wasm/mono.wasm';
    module.asmjsCodeFile = '/_framework/Mono/dist/asmjs/mono.asm.js';
    module.preRun = [];
    module.postRun = [];
    module.preloadPlugins = [];

    module.preRun.push(() => {
        // By now, emscripten should be initialised enough that we can capture these methods for later use
        assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string']);
        find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string']);
        find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number']);
        invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number']);
        mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number']);
        mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string']);
        
        const loadBclAssemblies = [
            'mscorlib',
            'System',
            'System.Core',
            'Facades/netstandard',
            'Facades/System.Console',
            'Facades/System.Collections',
            'Facades/System.Diagnostics.Debug',
            'Facades/System.IO',
            'Facades/System.Linq',
            'Facades/System.Reflection',
            'Facades/System.Reflection.Extensions',
            'Facades/System.Runtime',
            'Facades/System.Runtime.Extensions',
            'Facades/System.Runtime.InteropServices',
            'Facades/System.Threading',
            'Facades/System.Threading.Tasks'
        ];

        var allAssemblyUrls = loadAssemblyUrls
            .concat(loadBclAssemblies.map(name => `_framework/Mono/bclTrimmed/dist/${name}.dll`));

        Module.FS_createPath('/', 'appBinDir', true, true);
        allAssemblyUrls.forEach(url =>
            FS.createPreloadedFile('appBinDir', `${getAssemblyNameFromUrl(url)}.dll`, url, true, false, null, <any>onError));
    });

    module.postRun.push(() => {
        // Not 100% certain what this is doing - it appears to load all the assemblies
        // from the specified directory. Should rename this to something more descriptive.
        const load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string']);
        load_runtime('appBinDir');
        onReady();
    });

    return module;
}

function asyncLoad(url, onload, onerror) {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', url, /* async: */ true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
            var asm = new Uint8Array(xhr.response);
            onload(asm);
        } else {
            onerror(xhr);
        }
    };
    xhr.onerror = onerror;
    xhr.send(null);
}
