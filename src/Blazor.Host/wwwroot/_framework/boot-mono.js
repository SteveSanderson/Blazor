window.Module = {
    print: function (x) { console.log("WASM: " + x) },
    printErr: function (x) { console.log("WASM-ERR: " + x) },
    wasmBinaryFile: '/_framework/mono/mono.wasm',

    totalDependencies: 0,
    monitorRunDependencies: function (left) {
        this.totalDependencies = Math.max(this.totalDependencies, left);
        console.log("STATUS: " + (left ? 'Preparing... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'All downloads complete.'));
    },
    onRuntimeInitialized: function () {
        Module.FS_createPath("/", "managed", true, true);

        var assemblies = [
            "_framework/mono/managed/mscorlib.dll",
            "_framework/mono/managed/System.dll",
            "_framework/mono/managed/System.Core.dll",
            "_bin/Blazor.Runtime.dll",
            "_bin/JSLibs.dll",
            "_bin/ClientServerApp.Shared.dll",
            "_bin/ClientServerApp.Client.Views.dll?type=razorviews&reference=ClientServerApp.Shared.dll&reference=JSLibs.dll",
            "_bin/ClientServerApp.Client.dll",
            "_framework/mono/managed/dotnetapp.dll"];

        assemblies.push(
            "_framework/mono/managed/Facades/System.Console.dll",
            "_framework/mono/managed/Facades/System.Collections.dll",
            "_framework/mono/managed/Facades/System.IO.dll",
            "_framework/mono/managed/Facades/System.Linq.dll",
            "_framework/mono/managed/Facades/System.Reflection.dll",
            "_framework/mono/managed/Facades/System.Runtime.dll",
            "_framework/mono/managed/Facades/System.Runtime.Extensions.dll",
            "_framework/mono/managed/Facades/System.Runtime.InteropServices.dll",
            "_framework/mono/managed/Facades/System.Threading.dll",
            "_framework/mono/managed/Facades/System.Threading.Tasks.dll",
        );

        var pending = 0;
        assemblies.forEach(function (assemblyUrl) {
            var asm_name = assemblyUrl.substring(assemblyUrl.lastIndexOf('/') + 1);
            asm_name = asm_name.split('?')[0];

            console.log("loading " + asm_name);
            ++pending;
            fetch(assemblyUrl, { credentials: 'same-origin' }).then(function (response) {
                if (!response.ok)
                    throw "failed to load Assembly '" + asm_name + "'";
                return response['arrayBuffer']();
            }).then(function (blob) {
                console.log(blob);
                console.log(typeof blob);
                var asm = new Uint8Array(blob);
                Module.FS_createDataFile("managed/" + asm_name, null, asm, true, true, true);

                console.log("LOADED: " + asm_name);
                --pending;
                if (pending == 0)
                    Module.bclLoadingDone();
            });
        });
    },
    bclLoadingDone: function () {
        console.log("Done loading the BCL");

        var load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string'])
        var assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string'])
        var find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string'])
        var find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number'])
        var invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number'])
        var mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number'])
        var mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string'])

        function call_method(method, this_arg, args) {
            var stack = Module.Runtime.stackSave();
            var args_mem = Runtime.stackAlloc(args.length);
            var eh_throw = Runtime.stackAlloc(4);
            for (var i = 0; i < args.length; ++i)
                Module.setValue(args_mem + i * 4, args[i], "i32");
            Module.setValue(eh_throw, 0, "i32");

            var res = invoke_method(method, this_arg, args_mem, eh_throw);

            if (Module.getValue(eh_throw, "i32") != 0) {
                Module.Runtime.stackRestore(stack);
                throw new Error(conv_string(res)); //the convention is that invoke_method ToString () any outgoing exception
            }

            Module.Runtime.stackRestore(stack);
            return res;
        }

        //FIXME this is wastefull, we could remove the temp malloc by going the UTF16 route
        //FIXME this is unsafe, cuz raw objects could be GC'd.
        function conv_string(mono_obj) {
            if (mono_obj == 0)
                return null;
            var raw = mono_string_get_utf8(mono_obj);
            var res = Module.UTF8ToString(raw);
            Module._free(raw);

            return res;
        }

        load_runtime("managed");

        function InvokeStatic(assemblyName, namespace, className, methodName, stringArg) {
            // TODO: Cache the assembly_load outputs?
            var main_module = assembly_load(assemblyName)
            if (!main_module)
                throw new Error('Could not find assembly "' + assemblyName + '"');

            var driver_class = find_class(main_module, namespace, className)
            if (!driver_class)
                throw new Error('Could not find class "' + className + '" in namespace "' + namespace + '" in assembly "' + assemblyName + '"');

            // TODO: What is the '-1' param? Does this identify the overload somehow?
            var method = find_method(driver_class, methodName, -1)
            if (!method)
                throw new Error('Could not find method "' + methodName + '" on type "' + namespace + '.' + className + '"');

            var res = call_method(method, null, [mono_string(stringArg)]);
            return res ? conv_string(res) : null;
        }

        console.log(InvokeStatic('Blazor.Runtime', 'Blazor.Routing', 'Router', 'OnNavigation', JSON.stringify({
            url: '/', //pathAndQuery,
            absoluteUrl: location.href
        })));
    },
	
	receiveInvocationFromDotNet: function (callInfo) {
        switch (callInfo.method) {
            case 'mymethod':
                return JSON.stringify('done');
            case 'checkMemory':
                debugger;
                return '0';
        }
    }
};
