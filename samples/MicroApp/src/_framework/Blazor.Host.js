/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MonoPlatform_1 = __webpack_require__(4);
exports.platform = MonoPlatform_1.monoPlatform;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getAssemblyNameFromUrl(url) {
    var lastSegment = url.substring(url.lastIndexOf('/') + 1);
    var queryStringStartPos = lastSegment.indexOf('?');
    var filename = queryStringStartPos < 0 ? lastSegment : lastSegment.substring(0, queryStringStartPos);
    return filename.replace(/\.dll$/, '');
}
exports.getAssemblyNameFromUrl = getAssemblyNameFromUrl;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
Environment_1.platform.registerCallableMethod('Routing_ResolveRelativeUrl', function (relativeUrl) {
    var a = document.createElement('a');
    a.href = relativeUrl;
    return a.cloneNode(false).href;
});
function initRouter() {
    window.addEventListener('popstate', function (evt) {
        onLocationChanged(window.location.pathname);
    });
    // Trigger initial page load
    onLocationChanged(window.location.pathname);
}
exports.initRouter = initRouter;
function attachLinkClickEventHandler(element, url) {
    element.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        history.pushState(/* state */ null, /* title */ null, url);
        onLocationChanged(url);
    });
}
exports.attachLinkClickEventHandler = attachLinkClickEventHandler;
function onLocationChanged(pathAndQuery) {
    Environment_1.platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Routing', 'Router', 'OnNavigation', JSON.stringify({
        url: pathAndQuery,
        absoluteUrl: location.href
    }));
    highlightLinks(pathAndQuery);
}
function highlightLinks(pathAndQuery) {
    Array.prototype.forEach.call(document.getElementsByClassName('active'), function (elem) {
        if (elem.tagName === 'A') {
            elem.classList.remove('active');
        }
    });
    var escapedPathAndQuery = pathAndQuery.replace(/\//g, '\\\/');
    var elemsToHighlight = document.querySelectorAll('a[href=' + escapedPathAndQuery + ']');
    Array.prototype.forEach.call(elemsToHighlight, function (elem) {
        elem.classList.add('active');
    });
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var DotNet_1 = __webpack_require__(1);
var Routing_1 = __webpack_require__(2);
var LiveReload_1 = __webpack_require__(5);
var ErrorPage_1 = __webpack_require__(6);
__webpack_require__(7);
__webpack_require__(10);
__webpack_require__(11);
function boot() {
    return __awaiter(this, void 0, void 0, function () {
        var allScriptElems, thisScriptElem, entryPoint, referenceAssembliesCommaSeparated, referenceAssemblies, loadAssemblyUrls, entryPointAssemblyName, viewsAssemblyFilename, ex_1, viewsAssemblies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //LiveReload_1.enableLiveReloading();
                    allScriptElems = document.getElementsByTagName('script');
                    thisScriptElem = allScriptElems[allScriptElems.length - 1];
                    entryPoint = thisScriptElem.getAttribute('main');
                    referenceAssembliesCommaSeparated = thisScriptElem.getAttribute('references') || '';
                    referenceAssemblies = referenceAssembliesCommaSeparated.split(',').map(function (s) { return s.trim(); }).filter(function(s) { return !!s;  });
                    loadAssemblyUrls = [entryPoint].concat(referenceAssemblies) // Developer-specified references
                        .concat(['Blazor.Runtime.dll']) // Standard references
                        .map(function (filename) { return "/_bin/" + filename; });
                    entryPointAssemblyName = DotNet_1.getAssemblyNameFromUrl(entryPoint);
                    viewsAssemblyFilename = entryPointAssemblyName + '.Views.dll';
                    loadAssemblyUrls.push("/_bin/" + viewsAssemblyFilename + "?type=razorviews");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Environment_1.platform.start(loadAssemblyUrls)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    ErrorPage_1.displayErrorPage(ex_1);
                    console.error("Failed to start platform. Reason: " + ex_1);
                    return [2 /*return*/];
                case 4:
                    viewsAssemblies = [DotNet_1.getAssemblyNameFromUrl(viewsAssemblyFilename)];
                    Environment_1.platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Routing', 'Router', 'SetViewAssemblies', viewsAssemblies.join(','));
                    // Start up the application
                    Environment_1.platform.callEntryPoint(entryPointAssemblyName, []);
                    Routing_1.initRouter();
                    return [2 /*return*/];
            }
        });
    });
}
boot().catch(function (ex) { throw new Error(ex); });


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DotNet_1 = __webpack_require__(1);
var assembly_load;
var find_class;
var find_method;
var invoke_method;
var mono_string_get_utf8;
var mono_string;
var callableFunctions = {};
exports.monoPlatform = {
    start: function start(loadAssemblyUrls) {
        return new Promise(function (resolve, reject) {
            // mono.js assumes the existence of this
            window['Browser'] = {
                init: function () { },
                asyncLoad: asyncLoad
            };
            // Emscripten works by expecting the module config to be a global
            window['Module'] = createEmscriptenModuleInstance(loadAssemblyUrls, resolve, reject);
            addScriptTagsToDocument();
        });
    },
    findMethod: function findMethod(assemblyName, namespace, className, methodName) {
        // TODO: Cache the assembly_load outputs?
        var assemblyHandle = assembly_load(assemblyName);
        if (!assemblyHandle) {
            throw new Error("Could not find assembly \"" + assemblyName + "\"");
        }
        var typeHandle = find_class(assemblyHandle, namespace, className);
        if (!typeHandle) {
            throw new Error("Could not find type \"" + className + "'\" in namespace \"" + namespace + "\" in assembly \"" + assemblyName + "\"");
        }
        // TODO: What is the '-1' param? Does this identify the overload somehow?
        var methodHandle = find_method(typeHandle, methodName, -1);
        if (!methodHandle) {
            throw new Error("Could not find method \"" + methodName + "\" on type \"" + namespace + "." + className + "\"");
        }
        return methodHandle;
    },
    callEntryPoint: function callEntryPoint(assemblyName, args) {
        // TODO: There should be a proper way of running whatever counts as the entrypoint without
        // having to specify what method it is, but I haven't found it. The code here assumes
        // that the entry point is "<assemblyname>.Program.Main" (i.e., namespace == assembly name).
        var entryPointMethod = exports.monoPlatform.findMethod(assemblyName, assemblyName, 'Program', 'Main');
        exports.monoPlatform.callMethod(entryPointMethod, null, args);
    },
    callMethod: function callMethod(method, target, args) {
        var stack = Module.Runtime.stackSave();
        try {
            var argsBuffer = Module.Runtime.stackAlloc(args.length);
            var exceptionFlagManagedInt = Module.Runtime.stackAlloc(4);
            for (var i = 0; i < args.length; ++i) {
                Module.setValue(argsBuffer + i * 4, args[i], 'i32');
            }
            Module.setValue(exceptionFlagManagedInt, 0, 'i32');
            var res = invoke_method(method, target, argsBuffer, exceptionFlagManagedInt);
            if (Module.getValue(exceptionFlagManagedInt, 'i32') !== 0) {
                // If the exception flag is set, the returned value is exception.ToString()
                throw new Error(exports.monoPlatform.toJavaScriptString(res));
            }
            return res;
        }
        finally {
            Module.Runtime.stackRestore(stack);
        }
    },
    toJavaScriptString: function toJavaScriptString(managedString) {
        // Comments from original Mono sample:
        //FIXME this is wastefull, we could remove the temp malloc by going the UTF16 route
        //FIXME this is unsafe, cuz raw objects could be GC'd.
        if (!managedString) {
            return null;
        }
        var utf8 = mono_string_get_utf8(managedString);
        var res = Module.UTF8ToString(utf8);
        Module._free(utf8);
        return res;
    },
    toDotNetString: function toDotNetString(jsString) {
        return mono_string(jsString);
    },
    invokeSimpleStatic: function invokeSimpleStatic(assemblyName, namespace, className, methodName, stringArg) {
        var method = this.findMethod(assemblyName, namespace, className, methodName);
        var res = this.callMethod(method, null, [this.toDotNetString(stringArg)]);
        return this.toJavaScriptString(res);
    },
    registerCallableMethod: function registerCallableMethod(methodName, implementation) {
        callableFunctions[methodName] = implementation;
    },
    getHeapAddress: function addressOfFirstField(heapObject) {
        return heapObject + 12; // First 3 Int32s (= 12 bytes) are internal Mono stuff
    },
    readHeapInt32: function heapReadI32(address) {
        return Module.getValue(address, 'i32');
    },
    readHeapObject: function heapReadObject(address) {
        return Module.getValue(address, '*');
    }
};
window['__MonoPlatform__invokeJS'] = function __MonoPlatform__invokeJS(methodName, argsArray) {
    var implementation = callableFunctions[methodName];
    if (!implementation) {
        throw new Error("Cannot invoke JS method '" + methodName + "' from .NET because no such method was registered with the platform.");
    }
    var result = implementation.apply(null, argsArray);
    return JSON.stringify(result);
};
function addScriptTagsToDocument() {
    // Load either the wasm or asm.js version of the Mono runtime
    var browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
    var monoRuntimeUrlBase = '/_framework/Mono/dist/' + (browserSupportsNativeWebAssembly ? 'wasm' : 'asmjs');
    var monoRuntimeScriptUrl = monoRuntimeUrlBase + "/mono.js";
    if (!browserSupportsNativeWebAssembly) {
        // In the asmjs case, the initial memory structure is in a separate file we need to download
        var meminitXHR = Module['memoryInitializerRequest'] = new XMLHttpRequest();
        meminitXHR.open('GET', monoRuntimeUrlBase + "/mono.js.mem");
        meminitXHR.responseType = 'arraybuffer';
        meminitXHR.send(null);
    }
    document.write("<script defer src=\"" + monoRuntimeScriptUrl + "\"></script>");
}
function createEmscriptenModuleInstance(loadAssemblyUrls, onReady, onError) {
    var module = {};
    module.print = function (line) { return console.log("WASM: " + line); };
    module.printErr = function (line) { return console.error("WASM: " + line); };
    module.wasmBinaryFile = '/_framework/Mono/dist/wasm/mono.wasm';
    module.asmjsCodeFile = '/_framework/Mono/dist/asmjs/mono.asm.js';
    module.preRun = [];
    module.postRun = [];
    module.preloadPlugins = [];
    module.preRun.push(function () {
        // By now, emscripten should be initialised enough that we can capture these methods for later use
        assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string']);
        find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string']);
        find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number']);
        invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number']);
        mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number']);
        mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string']);
        var loadBclAssemblies = [
            'mscorlib',
            'System',
            'System.Core',
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
            .concat(loadBclAssemblies.map(function (name) { return "_framework/Mono/bcl/" + name + ".dll"; }));
        Module.FS_createPath('/', 'appBinDir', true, true);
        allAssemblyUrls.forEach(function (url) {
            return FS.createPreloadedFile('appBinDir', DotNet_1.getAssemblyNameFromUrl(url) + ".dll", url, true, false, null, onError);
        });
    });
    module.postRun.push(function () {
        // Not 100% certain what this is doing - it appears to load all the assemblies
        // from the specified directory. Should rename this to something more descriptive.
        var load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string']);
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
        }
        else {
            onerror(xhr);
        }
    };
    xhr.onerror = onerror;
    xhr.send(null);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function enableLiveReloading() {
    listenForReload(false);
}
exports.enableLiveReloading = enableLiveReloading;
function listenForReload(reloadOnConnection) {
    var EventSource = window['EventSource'];
    if (typeof EventSource !== 'undefined') {
        var source_1 = new EventSource('/_reload');
        var sourceDidOpen_1;
        source_1.addEventListener('open', function (e) {
            sourceDidOpen_1 = true;
            if (reloadOnConnection) {
                location.reload();
            }
        });
        source_1.addEventListener('message', function (e) {
            if (e.data === 'reload') {
                location.reload();
            }
        });
        source_1.addEventListener('error', function (e) {
            if (source_1.readyState === 0) {
                if (sourceDidOpen_1 || reloadOnConnection) {
                    // Connection was closed either after it was working, or while
                    // we're polling for reconnect. Don't rely on browser's default
                    // reconnection behaviour. Instead close this connection and
                    // start a new one on our desired schedule.
                    source_1.close();
                    setTimeout(function () {
                        listenForReload(/* reloadOnConnection */ true);
                    }, 100);
                }
            }
        });
    }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function displayErrorPage(error) {
    if (error instanceof XMLHttpRequest) {
        var html = getResponseText(error);
        var frame = document.createElement('iframe');
        document.body.appendChild(frame);
        frame.width = frame.height = '100%';
        frame.style.position = 'absolute';
        frame.style.top = '0';
        frame.frameBorder = '0';
        frame.contentDocument.write(html);
    }
    else {
        throw new Error("Can't display error page for unknown error type. Error was: " + error);
    }
}
exports.displayErrorPage = displayErrorPage;
function getResponseText(xhr) {
    switch (xhr.responseType) {
        case 'text':
            return xhr.responseText;
        case 'arraybuffer': {
            var decoder = new TextDecoder('utf-8');
            return decoder.decode(new DataView(xhr.response));
        }
        default:
            throw new Error("Unsupported XHR responseType: '" + xhr.responseType + "'");
    }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Routing_1 = __webpack_require__(2);
var Environment_1 = __webpack_require__(0);
var VDomItemArrayReader_1 = __webpack_require__(8);
var pendingComponentDocFrags = {};
var nextPendingComponentDocFragId = 0;
Environment_1.platform.registerCallableMethod('setElemFromVNode', setElemFromVNode);
function setElemFromVNode(elementRefManagedString, componentRef, oldVDom, newVDom, replaceContainer) {
    var elementRef = Environment_1.platform.toJavaScriptString(elementRefManagedString);
    var elem = pendingComponentDocFrags[elementRef]
        || document.getElementById(elementRef);
    if (!elem) {
        throw new Error("Cannot find element by ID: " + elementRef);
    }
    var oldVDomReader = new VDomItemArrayReader_1.VDomItemArrayReader(componentRef, oldVDom);
    var newVDomReader = new VDomItemArrayReader_1.VDomItemArrayReader(componentRef, newVDom);
    populateOrUpdateElement(componentRef, elem, oldVDomReader, newVDomReader, !!replaceContainer);
}
function populateOrUpdateElement(componentRef, containerElement, oldVDomReader, newVDomReader, replaceContainer) {
    var oldVDomRoot = oldVDomReader.getItem(0);
    var newVDomRoot = newVDomReader.getItem(0);
    if (oldVDomRoot.itemType === 0 /* blank */) {
        // First run - there's no prior vdom to compare against
        var newRootElement = createRealNode(componentRef, newVDomRoot);
        while (containerElement.firstChild) {
            containerElement.removeChild(containerElement.firstChild);
        }
        containerElement.appendChild(newRootElement);
    }
    else {
        var nodeToUpdate = replaceContainer ? containerElement : containerElement.firstChild;
        updateNode(componentRef, nodeToUpdate, oldVDomRoot, newVDomRoot);
    }
}
function createRealNode(componentRef, vdomItem) {
    switch (vdomItem.itemType) {
        case 1:// Element
            var el = document.createElement(vdomItem.elementTagName);
            setAttributesOnRealNode(componentRef, el, vdomItem.readAttributes());
            vdomItem.readChildren()
                .map(function (child) { return createRealNode(componentRef, child); })
                .forEach(el.appendChild.bind(el));
            return el;
        case 2:// Text node
            return document.createTextNode(vdomItem.textNodeContents);
        case 4:// Component
            return instantiateComponent(componentRef, vdomItem);
        default:
            throw new Error('Unexpected item type. Can\'t create real DOM node for item of type ' + vdomItem.itemType);
    }
}
function setAttributesOnRealNode(componentRef, element, attributeItems) {
    var attributesToRemove = {};
    Array.prototype.map.call(element.attributes, function (at) { attributesToRemove[at.name] = true; });
    attributeItems.forEach(function (attributeItem) {
        var attribName = attributeItem.attributeName;
        attributesToRemove[attribName] = false; // Mark this as retained
        switch (attribName) {
            // TODO add more function handlers
            case 'onchange':
            case 'onclick':
            case 'onsubmit':
            case 'onmouseover':
            case 'onabort':
            case 'oncancel':
            case 'ondblclick':
            case 'ondrag':
            case 'ondragend':
            case 'onerror':
            case 'oninput':
            case 'onkeydown':
            case 'onload': {
                var attributeValue = attributeItem.attributeValue;
                if (typeof attributeValue === 'number') {
                    // Event handler
                    element[attribName] = attributeItem.makeEventDispatcher();
                }
                else {
                    // String
                    element.setAttribute(attribName, attributeValue);
                }
                break;
            }
            case 'value':
                element['value'] = attributeItem.attributeValue;
                break;
            case 'checked':
                element['checked'] = attributeItem.attributeStringValue === 'True';
                break;
            case 'href': {
                var attributeValue = attributeItem.attributeStringValue;
                if (element.tagName === 'A') {
                    var pagesPrefix = '~/';
                    if (attributeValue.indexOf(pagesPrefix) === 0) {
                        attributeValue = attributeValue.substring(pagesPrefix.length - 1);
                        attributeValue = attributeValue.replace(/\/Index\.cshtml$/, '/');
                        attributeValue = attributeValue.replace(/\.cshtml$/, '');
                        Routing_1.attachLinkClickEventHandler(element, attributeValue);
                    }
                }
                element.setAttribute(attribName, attributeValue);
                break;
            }
            default:
                element.setAttribute(attribName, attributeItem.attributeStringValue);
                break;
        }
    });
    Object.getOwnPropertyNames(attributesToRemove).forEach(function (attributeName) {
        if (attributesToRemove[attributeName]) {
            element.removeAttribute(attributeName);
        }
    });
}
function changedAttributes(attributes1, attributes2, compareAsObjects) {
    if (attributes1.length !== attributes2.length) {
        return true;
    }
    var attributes2ByName = {};
    attributes2.forEach(function (a) {
        // For a proper .NET-style compare-as-objects, would really have to call back into .NET here
        // so it can account for everything (e.g., two different string refs that hold the same value,
        // or IComparable generally). Not doing that right now but could consider changing the logic
        // so that for child components, we *always* send it the updates params, and let it decide whether
        // there's been a change. Not sure about the perf effects of that though.
        attributes2ByName[a.attributeName] = compareAsObjects ? a.attributeObjectValue : a.attributeValue;
    });
    for (var i = 0; i < attributes1.length; i++) {
        var a = attributes1[i];
        var attribute1Value = compareAsObjects ? a.attributeObjectValue : a.attributeValue;
        if (attributes2ByName[a.attributeName] !== attribute1Value) {
            return true;
        }
    }
    return false;
}
function updateNode(componentRef, targetNode, oldVDomItem, newVDomItem) {
    switch (newVDomItem.itemType) {
        case 1: // Element
        case 4:// Component
            updateElement(componentRef, targetNode, oldVDomItem, newVDomItem);
            break;
        case 2:
            updateTextNode(componentRef, targetNode, oldVDomItem, newVDomItem);
            break;
        default:
            throw new Error('VDom item is of unexpected type: ' + newVDomItem.itemType);
    }
}
function updateTextNode(componentRef, targetTextNode, oldVDomItem, newVDomItem) {
    var newText = newVDomItem.textNodeContents;
    if (oldVDomItem.textNodeContents !== newText) {
        targetTextNode.textContent = newText;
    }
}
function updateElementAttributes(componentRef, targetElement, oldVDomItem, newVDomItem) {
    var oldVDomItemAttributes = oldVDomItem.readAttributes();
    var newVDomItemAttributes = newVDomItem.readAttributes();
    var newVDomItemType = newVDomItem.itemType;
    var compareAsObjects = newVDomItemType == 4;
    if (changedAttributes(newVDomItemAttributes, oldVDomItemAttributes, compareAsObjects)) {
        switch (newVDomItemType) {
            case 1:// Element
                setAttributesOnRealNode(componentRef, targetElement, newVDomItemAttributes);
                break;
            case 4:// Component
                var childComponentRef = parseInt(targetElement.getAttribute('_component_ref'));
                updateComponentParameters(childComponentRef, componentRef, newVDomItem);
                break;
            default:
                throw new Error('Don\'t know how to set attributes for a vdom item of type ' + newVDomItem.itemType);
        }
    }
}
function updateComponentParameters(componentRef, parentComponentRef, vdomItem) {
    Environment_1.platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'UpdateComponentParameters', JSON.stringify({
        componentRef: componentRef,
        parentComponentRef: parentComponentRef,
        vdomItemIndex: vdomItem.index
    }));
}
function updateElement(componentRef, targetElement, oldVDomItem, newVDomItem) {
    updateElementAttributes(componentRef, targetElement, oldVDomItem, newVDomItem);
    // Now do a merge join on the sequence of child nodes
    var oldChildren = oldVDomItem.readChildren();
    var newChildren = newVDomItem.readChildren();
    var oldChildIndex = 0;
    var newChildIndex = 0;
    var realElemIndex = 0;
    var prevOldChildSourceSequence = -1;
    var prevNewChildSourceSequence = -1;
    var oldKeyedElementInfos = {};
    var newKeyedElementInfos = {};
    var seenNewKeys = {};
    while (oldChildIndex < oldChildren.length || newChildIndex < newChildren.length) {
        var oldChild = oldChildren[oldChildIndex];
        var newChild = newChildren[newChildIndex];
        // First, check the keys (if any) are unique and whether they match
        var oldChildKey = oldChild ? oldChild.elementKey : null;
        var newChildKey = newChild ? newChild.elementKey : null;
        if (newChildKey) {
            if (seenNewKeys.hasOwnProperty(newChildKey)) {
                throw new Error("Duplicate key: " + newChildKey + ". Any keys must be unique among sibling elements.");
            }
            else {
                seenNewKeys[newChildKey] = null;
            }
        }
        var isMatch = oldChild && newChild && oldChild.sourceSequence === newChild.sourceSequence;
        if (isMatch) {
            // Both sequences are in sync, so recurse down the element hierarchy here
            var realElem = targetElement.childNodes[realElemIndex];
            if (oldChildKey === newChildKey) {
                // Keys match, or this element doesn't specify a key, so we can use this DOM element
                updateNode(componentRef, realElem, oldChild, newChild);
            }
            else {
                // Keys mismatch, so we can't use this DOM element. Pull it out and leave a placeholder.
                oldKeyedElementInfos[oldChildKey] = {
                    vdom: oldChild,
                    element: realElem
                };
                var placeholder = document.createComment(newChildKey);
                targetElement.replaceChild(placeholder, realElem);
                newKeyedElementInfos[newChildKey] = {
                    vdom: newChild,
                    placeholder: placeholder
                };
            }
            oldChildIndex++;
            newChildIndex++;
            realElemIndex++;
            prevOldChildSourceSequence = oldChild.sourceSequence;
            prevNewChildSourceSequence = newChild.sourceSequence;
        }
        else {
            // The sequences are out of sync, so we need to pick edits that bring them closer to being
            // in sync. This is like a preordered merge join (where you just take from whichever side
            // has the lower sequence number), with the complication that our normally-ascending sequences
            // can jump backwards (i.e., at the end of a loop). When one side does jump backwards, we
            // have to figure out why the other one didn't yet do so, and perform edits until it does.
            // Various bits of this code could be micro-optimised more, e.g., not re-evaluating the
            // '...LoopsBackLater' variables on each iteration, but it should have the correct O(...)
            // performance already in realistic cases.
            var oldSequenceLoopedBack = oldChild && oldChild.sourceSequence <= prevOldChildSourceSequence;
            var newSequenceLoopedBack = newChild && newChild.sourceSequence <= prevNewChildSourceSequence;
            var treatAsInsert = false;
            var treatAsDelete = false;
            if (oldSequenceLoopedBack && !newSequenceLoopedBack) {
                // The new sequence either has some extra trailing elements in the current loop block
                // which we should insert, or omits some old trailing loop blocks which we should delete
                var newChildSourceSequence = newChild && newChild.sourceSequence;
                var newSequenceLoopsBackLater = newChild && trueForAnyAfter(newChildren, newChildIndex, function (laterChild) {
                    return laterChild.sourceSequence < newChildSourceSequence;
                });
                if (newSequenceLoopsBackLater) {
                    // The new sequence has some extra trailing elements we should insert before it loops back
                    treatAsInsert = true;
                }
                else {
                    // The new sequence is missing some trailing loop blocks, so we should delete them
                    treatAsDelete = true;
                }
            }
            else if (newSequenceLoopedBack && !oldSequenceLoopedBack) {
                // The old sequence either has some extra trailing elements in the current loop block
                // which we should delete, or omits some new trailing loop blocks which we should insert
                var oldChildSourceSequence = oldChild && oldChild.sourceSequence;
                var oldSequenceLoopsBackLater = oldChild && trueForAnyAfter(oldChildren, oldChildIndex, function (laterChild) {
                    return laterChild.sourceSequence < oldChildSourceSequence;
                });
                if (oldSequenceLoopsBackLater) {
                    // The old sequence has some extra trailing elements we should delete before it loops back
                    treatAsDelete = true;
                }
                else {
                    // The old sequence is missing some trailing loop blocks, so we should insert them
                    treatAsInsert = true;
                }
            }
            else {
                // We can assume both sequences are proceeding through the same loop block, so just
                // keep inserting/deleting from whichever side brings us closer to being in sync.
                // This is a classic preordered merge join.
                if (oldChild && (!newChild || oldChild.sourceSequence < newChild.sourceSequence)) {
                    // oldChild must have been deleted
                    treatAsDelete = true;
                }
                else {
                    // newChild must have been inserted
                    treatAsInsert = true;
                }
                // If both sequences have now looped back, we can reset their looped-back status until it
                // happens again.
                // Note: we know oldSequenceLoopedBack===newSequenceLoopedBack otherwise we wouldn't be in this code path
                if (oldSequenceLoopedBack) {
                    prevNewChildSourceSequence = prevOldChildSourceSequence = -1;
                }
            }
            if (treatAsInsert) {
                var newRealNode = void 0;
                if (newChildKey === null) {
                    // For unkeyed elements, we can just create new ones, as there's no need to preserve
                    // associations with any earlier real DOM elements
                    newRealNode = createRealNode(componentRef, newChild);
                }
                else {
                    // For keyed elements, leave a placeholder so the correct real DOM element can be
                    // put here later
                    newRealNode = document.createComment(newChildKey);
                    newKeyedElementInfos[newChildKey] = {
                        vdom: newChild,
                        placeholder: newRealNode
                    };
                }
                var realNodeToInsertBefore = targetElement.childNodes[realElemIndex];
                if (realNodeToInsertBefore) {
                    targetElement.insertBefore(newRealNode, realNodeToInsertBefore);
                }
                else {
                    targetElement.appendChild(newRealNode);
                }
                newChildIndex++;
                realElemIndex++;
                prevNewChildSourceSequence = newChild.sourceSequence;
            }
            else if (treatAsDelete) {
                var realElem = targetElement.childNodes[realElemIndex];
                if (oldChildKey !== null) {
                    // We'll dispose realElem later if it's no longer being used
                    oldKeyedElementInfos[oldChildKey] = {
                        vdom: oldChild,
                        element: realElem
                    };
                }
                else {
                    // We can dispose realElem now because it definitely won't be reused later
                    disposeRealElement(realElem);
                }
                targetElement.removeChild(realElem);
                oldChildIndex++;
                prevOldChildSourceSequence = oldChild.sourceSequence;
            }
            else {
                throw new Error('Somehow neither flag was set. Should not be possible.');
            }
        }
    }
    // Finally, fix up any placeholders we left for unmatched keyed elements
    Object.getOwnPropertyNames(newKeyedElementInfos).forEach(function (key) {
        var newInfo = newKeyedElementInfos[key];
        var oldInfo = oldKeyedElementInfos[key];
        if (oldInfo) {
            // We guarantee to preserve the old DOM element's association with this key
            targetElement.replaceChild(oldInfo.element, newInfo.placeholder);
            updateNode(componentRef, oldInfo.element, oldInfo.vdom, newInfo.vdom);
            oldInfo.element = null; // So we don't dispose it below
        }
        else {
            // There's no prior DOM element for this key
            var newRealNode = createRealNode(componentRef, newInfo.vdom);
            targetElement.replaceChild(newRealNode, newInfo.placeholder);
        }
    });
    Object.getOwnPropertyNames(oldKeyedElementInfos).forEach(function (key) {
        var oldInfo = oldKeyedElementInfos[key];
        if (oldInfo.element) {
            disposeRealElement(oldInfo.element);
        }
    });
}
function trueForAnyAfter(array, afterIndex, predicate) {
    for (var i = afterIndex + 1; i < array.length; i++) {
        if (predicate(array[i])) {
            return true;
        }
    }
    return false;
}
function disposeRealElement(element) {
    if (element.nodeType !== 1) {
        return;
    }
    var componentElems = element.querySelectorAll('[_component_ref]');
    if (componentElems && componentElems.length > 0) {
        var componentRefsToDispose = Array.prototype.map.call(componentElems, function (elem) {
            return parseInt(elem.getAttribute('_component_ref'));
        });
        disposeComponents(componentRefsToDispose);
    }
}
function instantiateComponent(parentComponentRef, vdomItem) {
    var newElemId = '_e' + (++nextPendingComponentDocFragId);
    var docFrag = document.createDocumentFragment();
    pendingComponentDocFrags[newElemId] = docFrag;
    var newComponentRef = Environment_1.platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'InstantiateComponent', JSON.stringify({
        parentComponentRef: parentComponentRef,
        vdomItemIndex: vdomItem.index,
        elementRef: newElemId
    }));
    delete pendingComponentDocFrags[newElemId];
    var firstChild = docFrag.firstChild;
    firstChild.id = newElemId;
    firstChild.setAttribute('_component_ref', newComponentRef);
    return firstChild;
}
function disposeComponents(componentRefs) {
    Environment_1.platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'DisposeComponents', JSON.stringify({
        componentRefs: componentRefs
    }));
}
// NEXT:
// Extend to nested components that each refresh when their own props are
// updated. Not sure how this works when a parent refreshes but a child hasn't refreshed.
// I suppose if the props being passed to the child haven't changed, we retain the child
// instance, or something. 


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var VDomItem_1 = __webpack_require__(9);
var vdomStructSizeBytes = 48;
var VDomItemArrayReader = /** @class */ (function () {
    function VDomItemArrayReader(componentRef, vDom) {
        this.componentRef = componentRef;
        this.ptrItem0 = Environment_1.platform.getHeapAddress(vDom)
            + 4; // First Int32 is the array length, which we don't need
    }
    VDomItemArrayReader.prototype.getItem = function (index) {
        return new VDomItem_1.VDomItem(this, index, this.ptrItem0 + vdomStructSizeBytes * index);
    };
    return VDomItemArrayReader;
}());
exports.VDomItemArrayReader = VDomItemArrayReader;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var VDomItem = /** @class */ (function () {
    function VDomItem(reader, index, ptr) {
        this.reader = reader;
        this.index = index;
        this.ptr = ptr;
    }
    VDomItem.prototype._readInt32Property = function (offsetBytes) {
        return Environment_1.platform.readHeapInt32(this.ptr + offsetBytes);
    };
    VDomItem.prototype._readStringProperty = function (offsetBytes) {
        var managedString = Environment_1.platform.readHeapObject(this.ptr + offsetBytes);
        return Environment_1.platform.toJavaScriptString(managedString);
    };
    Object.defineProperty(VDomItem.prototype, "itemType", {
        get: function () { return this._readInt32Property(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "sourceSequence", {
        get: function () { return this._readInt32Property(4); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "elementTagName", {
        get: function () { return this._readStringProperty(8); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "elementKey", {
        get: function () { return this._readStringProperty(12); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "descendantsEndIndex", {
        get: function () { return this._readInt32Property(16); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "textNodeContents", {
        get: function () { return this._readStringProperty(20); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "attributeName", {
        get: function () { return this._readStringProperty(24); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "attributeStringValue", {
        get: function () { return this._readStringProperty(28); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "attributeEventHandlerValue", {
        get: function () { return this._readInt32Property(32); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "attributeObjectValue", {
        get: function () { return this._readInt32Property(36); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "componentName", {
        get: function () { return this._readStringProperty(40); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "componentInstance", {
        get: function () { return this._readInt32Property(44); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VDomItem.prototype, "attributeValue", {
        get: function () {
            // Returns a number if it's an event handler, or a string if it's a string value
            return this.attributeEventHandlerValue || this.attributeStringValue;
        },
        enumerable: true,
        configurable: true
    });
    VDomItem.prototype.readAttributes = function () {
        // Proceed until we find a non-attribute item, or get to the end of our descendants list
        var result = [];
        for (var walkIndex = this.index + 1, stopAfterIndex = this.descendantsEndIndex; walkIndex <= stopAfterIndex; walkIndex++) {
            var descendant = this.reader.getItem(walkIndex);
            if (descendant.itemType === 3) {
                result.push(descendant);
            }
            else {
                break;
            }
        }
        return result;
    };
    ;
    VDomItem.prototype.readChildren = function () {
        // Note: if this turns out to be prohibitively expensive, could switch to a visitor pattern rather than
        // constructing arrays of children
        var walkIndex = this.index + 1;
        var stopAfterIndex = this.descendantsEndIndex;
        var result = [];
        while (walkIndex <= stopAfterIndex) {
            var descendant = this.reader.getItem(walkIndex);
            switch (descendant.itemType) {
                case 1:// Element
                    result.push(descendant);
                    walkIndex = descendant.descendantsEndIndex;
                    break;
                case 2: // Text node
                case 4:// Component
                    result.push(descendant);
                    break;
            }
            walkIndex++;
        }
        return result;
    };
    ;
    VDomItem.prototype.makeEventDispatcher = function () {
        // Capture only what we need for the event dispatcher so we don't pin the VDomItem unnecessarily
        var componentRef = this.reader.componentRef;
        var vdomItemIndex = this.index;
        return function (evt) {
            evt.preventDefault();
            dispatchEvent(evt, componentRef, vdomItemIndex);
        };
    };
    ;
    return VDomItem;
}());
exports.VDomItem = VDomItem;
function dispatchEvent(evt, componentRef, vdomItemIndex) {
    var targetElement = evt.target;
    var isCheckbox = targetElement['type'] === 'checkbox';
    Environment_1.platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Interop', 'Events', 'DispatchIncoming', JSON.stringify({
        componentRef: componentRef,
        vdomItemIndex: vdomItemIndex,
        eventInfo: {
            type: evt.type,
            targetValue: isCheckbox ? targetElement['checked'] : targetElement['value']
        }
    }));
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var notifyRequestCompletedMethod;
Environment_1.platform.registerCallableMethod('HttpClient_IssueRequest', issueRequest);
function issueRequest(request) {
    return __awaiter(this, void 0, void 0, function () {
        var resultDescriptor, response, responseBodyText, ex_1, resultDescriptor_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!notifyRequestCompletedMethod) {
                        notifyRequestCompletedMethod = Environment_1.platform.findMethod('Blazor.Runtime', 'Blazor.Runtime.FakeBcl', 'HttpClient', 'NotifyRequestCompletion');
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(request.url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    responseBodyText = _a.sent();
                    resultDescriptor = JSON.stringify({
                        handle: request.completionHandle,
                        text: responseBodyText,
                        statusCode: response.status
                    });
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _a.sent();
                    resultDescriptor_1 = JSON.stringify({
                        handle: request.completionHandle,
                        error: ex_1.toString()
                    });
                    Environment_1.platform.callMethod(notifyRequestCompletedMethod, null, [Environment_1.platform.toDotNetString(resultDescriptor_1)]);
                    return [2 /*return*/];
                case 5:
                    Environment_1.platform.callMethod(notifyRequestCompletedMethod, null, [Environment_1.platform.toDotNetString(resultDescriptor)]);
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// TODO: Migrate this to saner-looking TypeScript and use the platform.registerCallableMethod API
// instead of defining another global
window['jsobject.js'] = (function () {
    var _nextObjectId = 0;
    var _trackedObjects = {};
    function getObjectFromId(id) {
        return id === 0 ? window : _trackedObjects[id.toString()];
    }
    function toInteropValue(val) {
        switch (typeof val) {
            case 'boolean':
            case 'number':
            case 'string':
                return val;
            case 'object':
            case 'function':
                if (val === null) {
                    return null;
                }
                var id = ++_nextObjectId;
                _trackedObjects[id.toString()] = val;
                return id;
            case 'undefined':
                return null;
        }
    }
    function construct(constructor, args) {
        function F() {
            return constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    }
    function readIncomingArg(suppliedArg) {
        switch (suppliedArg.type) {
            case 'object': return getObjectFromId(suppliedArg.value);
            default: return suppliedArg.value;
        }
    }
    return {
        _ReleaseJSObject: function (descriptor) {
            delete _trackedObjects[descriptor];
        },
        _GetProperty: function (descriptor) {
            var parts = descriptor.split(':');
            var objectId = parseInt(parts[0]);
            var propertyName = parts[1];
            var obj = getObjectFromId(objectId);
            var propValue = obj[propertyName];
            return JSON.stringify({
                type: typeof propValue,
                value: toInteropValue(propValue)
            });
        },
        _SetProperty: function (descriptor) {
            var parsed = descriptor;
            var target = getObjectFromId(parsed.jsObjectId);
            target[parsed.name] = readIncomingArg(parsed.value);
        },
        _InvokeFunction: function (descriptor) {
            var parsed = descriptor;
            var thisValue = getObjectFromId(parsed.thisValueId);
            var functionInstance = parsed.functionId
                ? getObjectFromId(parsed.functionId)
                : thisValue[parsed.functionPropertyName];
            var suppliedArgs = parsed.args.map(readIncomingArg);
            var result = parsed.withNew
                ? construct(functionInstance, suppliedArgs)
                : functionInstance.apply(thisValue, suppliedArgs);
            return JSON.stringify({
                type: typeof result,
                value: toInteropValue(result)
            });
        }
    };
})();


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTljOTRiMjIwNzQ2ODNjYTFhMjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Vudmlyb25tZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9QbGF0Zm9ybS9Eb3ROZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcE1vZGVsL1JvdXRpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXRmb3JtL01vbm9QbGF0Zm9ybS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTGl2ZVJlbG9hZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3JQYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9BcHBNb2RlbC9WaXJ0dWFsRG9tL1ZEb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcE1vZGVsL1ZpcnR1YWxEb20vVkRvbUl0ZW1BcnJheVJlYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwTW9kZWwvVmlydHVhbERvbS9WRG9tSXRlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwTW9kZWwvSHR0cENsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwTW9kZWwvSlNPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNB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QUFFLGNBQWMsQ0FBQyxNQUFNLENBQUM7YUFDaEMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6IkJsYXpvci5Ib3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTljOTRiMjIwNzQ2ODNjYTFhMjUiLCIvLyBFeHBvc2UgYW4gZXhwb3J0IGNhbGxlZCAncGxhdGZvcm0nIG9mIHRoZSBpbnRlcmZhY2UgdHlwZSAnUGxhdGZvcm0nLFxyXG4vLyBzbyB0aGF0IGNvbnN1bWVycyBjYW4gYmUgYWdub3N0aWMgYWJvdXQgd2hpY2ggaW1wbGVtZW50YXRpb24gdGhleSB1c2UuXHJcbi8vIENoZWFwIGFsdGVybmF0aXZlIHRvIGhhdmluZyBhbiBhY3R1YWwgREkgY29udGFpbmVyLlxyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBtb25vUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtL01vbm9QbGF0Zm9ybSc7XHJcbmV4cG9ydCBjb25zdCBwbGF0Zm9ybTogUGxhdGZvcm0gPSBtb25vUGxhdGZvcm07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9FbnZpcm9ubWVudC50cyIsImV4cG9ydCBmdW5jdGlvbiBnZXRBc3NlbWJseU5hbWVGcm9tVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBsYXN0U2VnbWVudCA9IHVybC5zdWJzdHJpbmcodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nU3RhcnRQb3MgPSBsYXN0U2VnbWVudC5pbmRleE9mKCc/Jyk7XHJcbiAgICBjb25zdCBmaWxlbmFtZSA9IHF1ZXJ5U3RyaW5nU3RhcnRQb3MgPCAwID8gbGFzdFNlZ21lbnQgOiBsYXN0U2VnbWVudC5zdWJzdHJpbmcoMCwgcXVlcnlTdHJpbmdTdGFydFBvcyk7XHJcbiAgICByZXR1cm4gZmlsZW5hbWUucmVwbGFjZSgvXFwuZGxsJC8sICcnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUGxhdGZvcm0vRG90TmV0LnRzIiwiaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcblxyXG5wbGF0Zm9ybS5yZWdpc3RlckNhbGxhYmxlTWV0aG9kKCdSb3V0aW5nX1Jlc29sdmVSZWxhdGl2ZVVybCcsIChyZWxhdGl2ZVVybDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgYS5ocmVmID0gcmVsYXRpdmVVcmw7XHJcbiAgICByZXR1cm4gKGEuY2xvbmVOb2RlKGZhbHNlKSBhcyBIVE1MQW5jaG9yRWxlbWVudCkuaHJlZjtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFJvdXRlcigpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGV2dCA9PiB7XHJcbiAgICAgICAgb25Mb2NhdGlvbkNoYW5nZWQod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRyaWdnZXIgaW5pdGlhbCBwYWdlIGxvYWRcclxuICAgIG9uTG9jYXRpb25DaGFuZ2VkKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hMaW5rQ2xpY2tFdmVudEhhbmRsZXIoZWxlbWVudDogRWxlbWVudCwgdXJsOiBzdHJpbmcpIHtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKC8qIHN0YXRlICovIG51bGwsIC8qIHRpdGxlICovIG51bGwsIHVybCk7XHJcbiAgICAgICAgb25Mb2NhdGlvbkNoYW5nZWQodXJsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbkxvY2F0aW9uQ2hhbmdlZChwYXRoQW5kUXVlcnk6IHN0cmluZykge1xyXG4gICAgcGxhdGZvcm0uaW52b2tlU2ltcGxlU3RhdGljKCdCbGF6b3IuUnVudGltZScsICdCbGF6b3IuUm91dGluZycsICdSb3V0ZXInLCAnT25OYXZpZ2F0aW9uJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHVybDogcGF0aEFuZFF1ZXJ5LFxyXG4gICAgICAgIGFic29sdXRlVXJsOiBsb2NhdGlvbi5ocmVmXHJcbiAgICB9KSk7XHJcblxyXG4gICAgaGlnaGxpZ2h0TGlua3MocGF0aEFuZFF1ZXJ5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlnaGxpZ2h0TGlua3MocGF0aEFuZFF1ZXJ5OiBzdHJpbmcpIHtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWN0aXZlJyksIGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgaWYgKGVsZW0udGFnTmFtZSA9PT0gJ0EnKSB7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgZXNjYXBlZFBhdGhBbmRRdWVyeSA9IHBhdGhBbmRRdWVyeS5yZXBsYWNlKC9cXC8vZywgJ1xcXFxcXC8nKTtcclxuICAgIHZhciBlbGVtc1RvSGlnaGxpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmPScgKyBlc2NhcGVkUGF0aEFuZFF1ZXJ5ICsgJ10nKTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWxlbXNUb0hpZ2hsaWdodCwgZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcE1vZGVsL1JvdXRpbmcudHMiLCJpbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBnZXRBc3NlbWJseU5hbWVGcm9tVXJsIH0gZnJvbSAnLi9QbGF0Zm9ybS9Eb3ROZXQnO1xyXG5pbXBvcnQgeyBpbml0Um91dGVyIH0gZnJvbSAnLi9BcHBNb2RlbC9Sb3V0aW5nJztcclxuaW1wb3J0IHsgZW5hYmxlTGl2ZVJlbG9hZGluZyB9IGZyb20gJy4vTGl2ZVJlbG9hZCc7XHJcbmltcG9ydCB7IGRpc3BsYXlFcnJvclBhZ2UgfSBmcm9tICcuL0Vycm9yUGFnZSc7XHJcbmltcG9ydCAnLi9BcHBNb2RlbC9WaXJ0dWFsRG9tL1ZEb20nO1xyXG5pbXBvcnQgJy4vQXBwTW9kZWwvSHR0cENsaWVudCc7XHJcbmltcG9ydCAnLi9BcHBNb2RlbC9KU09iamVjdCc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBib290KCkge1xyXG4gICAgZW5hYmxlTGl2ZVJlbG9hZGluZygpO1xyXG5cclxuICAgIC8vIFJlYWQgc3RhcnR1cCBjb25maWcgZnJvbSB0aGUgPHNjcmlwdD4gZWxlbWVudCB0aGF0J3MgaW1wb3J0aW5nIHRoaXMgZmlsZVxyXG4gICAgY29uc3QgYWxsU2NyaXB0RWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XHJcbiAgICBjb25zdCB0aGlzU2NyaXB0RWxlbSA9IGFsbFNjcmlwdEVsZW1zW2FsbFNjcmlwdEVsZW1zLmxlbmd0aCAtIDFdO1xyXG4gICAgY29uc3QgZW50cnlQb2ludCA9IHRoaXNTY3JpcHRFbGVtLmdldEF0dHJpYnV0ZSgnbWFpbicpO1xyXG4gICAgY29uc3QgcmVmZXJlbmNlQXNzZW1ibGllc0NvbW1hU2VwYXJhdGVkID0gdGhpc1NjcmlwdEVsZW0uZ2V0QXR0cmlidXRlKCdyZWZlcmVuY2VzJykgfHwgJyc7XHJcbiAgICBjb25zdCByZWZlcmVuY2VBc3NlbWJsaWVzID0gcmVmZXJlbmNlQXNzZW1ibGllc0NvbW1hU2VwYXJhdGVkLnNwbGl0KCcsJykubWFwKHMgPT4gcy50cmltKCkpO1xyXG5cclxuICAgIC8vIERldGVybWluZSB0aGUgVVJMcyBvZiB0aGUgYXNzZW1ibGllcyB3ZSB3YW50IHRvIGxvYWRcclxuICAgIGNvbnN0IGxvYWRBc3NlbWJseVVybHMgPVxyXG4gICAgICAgIFtlbnRyeVBvaW50XS5jb25jYXQocmVmZXJlbmNlQXNzZW1ibGllcykgICAgLy8gRGV2ZWxvcGVyLXNwZWNpZmllZCByZWZlcmVuY2VzXHJcbiAgICAgICAgLmNvbmNhdChbJ0JsYXpvci5SdW50aW1lLmRsbCddKSAgICAgICAgICAgICAvLyBTdGFuZGFyZCByZWZlcmVuY2VzXHJcbiAgICAgICAgLm1hcChmaWxlbmFtZSA9PiBgL19iaW4vJHtmaWxlbmFtZX1gKVxyXG5cclxuICAgIC8vIEFsc28gaW5mZXIgdGhlIG5hbWUgb2YgdGhlIHZpZXdzIGFzc2VtYmx5IGZyb20gdGhlIGVudHJ5cG9pbnQuIFdlIGhhdmUgdG8gcGFzcyBhIHNwZWNpYWwgcXVlcnlzdHJpbmdcclxuICAgIC8vIHZhbHVlIHdpdGggdGhpcyBzbyB0aGF0IHRoZSBkZXYtdGltZSBob3N0IGFwcCBrbm93cyB0byBjb21waWxlIHRoZSBSYXpvciBmaWxlcyBkeW5hbWljYWxseS4gSW4gYSBwcm9kdWN0aW9uXHJcbiAgICAvLyBidWlsZCwgdGhlIGFjdHVhbCB2aWV3cyBhc3NlbWJseSBmaWxlIHdvdWxkIGJlIG9uIGRpc2sgYW5kIHRoZSBxdWVyeXN0cmluZyB3b3VsZCBiZSBpZ25vcmVkLlxyXG4gICAgY29uc3QgZW50cnlQb2ludEFzc2VtYmx5TmFtZSA9IGdldEFzc2VtYmx5TmFtZUZyb21VcmwoZW50cnlQb2ludCk7XHJcbiAgICBjb25zdCB2aWV3c0Fzc2VtYmx5RmlsZW5hbWUgPSBlbnRyeVBvaW50QXNzZW1ibHlOYW1lICsgJy5WaWV3cy5kbGwnO1xyXG4gICAgbG9hZEFzc2VtYmx5VXJscy5wdXNoKGAvX2Jpbi8ke3ZpZXdzQXNzZW1ibHlGaWxlbmFtZX0/dHlwZT1yYXpvcnZpZXdzYCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBwbGF0Zm9ybS5zdGFydChsb2FkQXNzZW1ibHlVcmxzKTtcclxuICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgZGlzcGxheUVycm9yUGFnZShleCk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHN0YXJ0IHBsYXRmb3JtLiBSZWFzb246ICR7ZXh9YClcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVnaXN0ZXIgdmlld3MgYXNzZW1ibGllcyBzbyB3ZSBrbm93IHdoZXJlIHRvIGxvb2sgZm9yIHRoZSBjb21waWxlZCByYXpvciBjb21wb25lbnRzXHJcbiAgICBjb25zdCB2aWV3c0Fzc2VtYmxpZXMgPSBbZ2V0QXNzZW1ibHlOYW1lRnJvbVVybCh2aWV3c0Fzc2VtYmx5RmlsZW5hbWUpXTtcclxuICAgIHBsYXRmb3JtLmludm9rZVNpbXBsZVN0YXRpYygnQmxhem9yLlJ1bnRpbWUnLCAnQmxhem9yLlJvdXRpbmcnLCAnUm91dGVyJywgJ1NldFZpZXdBc3NlbWJsaWVzJywgdmlld3NBc3NlbWJsaWVzLmpvaW4oJywnKSk7XHJcblxyXG4gICAgLy8gU3RhcnQgdXAgdGhlIGFwcGxpY2F0aW9uXHJcbiAgICBwbGF0Zm9ybS5jYWxsRW50cnlQb2ludChlbnRyeVBvaW50QXNzZW1ibHlOYW1lLCBbXSk7XHJcbiAgICBpbml0Um91dGVyKCk7XHJcbn1cclxuXHJcbmJvb3QoKS5jYXRjaChleCA9PiB7IHRocm93IG5ldyBFcnJvcihleCk7IH0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQm9vdC50cyIsImltcG9ydCB7IE1ldGhvZEhhbmRsZSwgU3lzdGVtX09iamVjdCwgU3lzdGVtX1N0cmluZywgUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgZ2V0QXNzZW1ibHlOYW1lRnJvbVVybCB9IGZyb20gJy4vRG90TmV0JztcclxuXHJcbnZhciBhc3NlbWJseV9sb2FkO1xyXG52YXIgZmluZF9jbGFzcztcclxudmFyIGZpbmRfbWV0aG9kO1xyXG52YXIgaW52b2tlX21ldGhvZDtcclxudmFyIG1vbm9fc3RyaW5nX2dldF91dGY4O1xyXG52YXIgbW9ub19zdHJpbmc7XHJcbmNvbnN0IGNhbGxhYmxlRnVuY3Rpb25zOiB7IFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbn0gPSB7IH07XHJcblxyXG5leHBvcnQgY29uc3QgbW9ub1BsYXRmb3JtOiBQbGF0Zm9ybSA9IHtcclxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChsb2FkQXNzZW1ibHlVcmxzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIG1vbm8uanMgYXNzdW1lcyB0aGUgZXhpc3RlbmNlIG9mIHRoaXNcclxuICAgICAgICAgICAgd2luZG93WydCcm93c2VyJ10gPSB7XHJcbiAgICAgICAgICAgICAgICBpbml0OiAoKSA9PiB7IH0sXHJcbiAgICAgICAgICAgICAgICBhc3luY0xvYWQ6IGFzeW5jTG9hZFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gRW1zY3JpcHRlbiB3b3JrcyBieSBleHBlY3RpbmcgdGhlIG1vZHVsZSBjb25maWcgdG8gYmUgYSBnbG9iYWxcclxuICAgICAgICAgICAgd2luZG93WydNb2R1bGUnXSA9IGNyZWF0ZUVtc2NyaXB0ZW5Nb2R1bGVJbnN0YW5jZShsb2FkQXNzZW1ibHlVcmxzLCByZXNvbHZlLCByZWplY3QpO1xyXG5cclxuICAgICAgICAgICAgYWRkU2NyaXB0VGFnc1RvRG9jdW1lbnQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZmluZE1ldGhvZDogZnVuY3Rpb24gZmluZE1ldGhvZChhc3NlbWJseU5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcpOiBNZXRob2RIYW5kbGUge1xyXG4gICAgICAgIC8vIFRPRE86IENhY2hlIHRoZSBhc3NlbWJseV9sb2FkIG91dHB1dHM/XHJcbiAgICAgICAgY29uc3QgYXNzZW1ibHlIYW5kbGUgPSBhc3NlbWJseV9sb2FkKGFzc2VtYmx5TmFtZSk7XHJcbiAgICAgICAgaWYoIWFzc2VtYmx5SGFuZGxlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYXNzZW1ibHkgXCIke2Fzc2VtYmx5TmFtZX1cImApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdHlwZUhhbmRsZSA9IGZpbmRfY2xhc3MoYXNzZW1ibHlIYW5kbGUsIG5hbWVzcGFjZSwgY2xhc3NOYW1lKTtcclxuICAgICAgICBpZiAoIXR5cGVIYW5kbGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0eXBlIFwiJHtjbGFzc05hbWV9J1wiIGluIG5hbWVzcGFjZSBcIiR7bmFtZXNwYWNlfVwiIGluIGFzc2VtYmx5IFwiJHthc3NlbWJseU5hbWV9XCJgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRPRE86IFdoYXQgaXMgdGhlICctMScgcGFyYW0/IERvZXMgdGhpcyBpZGVudGlmeSB0aGUgb3ZlcmxvYWQgc29tZWhvdz9cclxuICAgICAgICBjb25zdCBtZXRob2RIYW5kbGUgPSBmaW5kX21ldGhvZCh0eXBlSGFuZGxlLCBtZXRob2ROYW1lLCAtMSk7XHJcbiAgICAgICAgaWYgKCFtZXRob2RIYW5kbGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBtZXRob2QgXCIke21ldGhvZE5hbWV9XCIgb24gdHlwZSBcIiR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX1cImApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDxNZXRob2RIYW5kbGU+bWV0aG9kSGFuZGxlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWxsRW50cnlQb2ludDogZnVuY3Rpb24gY2FsbEVudHJ5UG9pbnQoYXNzZW1ibHlOYW1lOiBzdHJpbmcsIGFyZ3M6IFN5c3RlbV9PYmplY3RbXSk6IHZvaWQge1xyXG4gICAgICAgIC8vIFRPRE86IFRoZXJlIHNob3VsZCBiZSBhIHByb3BlciB3YXkgb2YgcnVubmluZyB3aGF0ZXZlciBjb3VudHMgYXMgdGhlIGVudHJ5cG9pbnQgd2l0aG91dFxyXG4gICAgICAgIC8vIGhhdmluZyB0byBzcGVjaWZ5IHdoYXQgbWV0aG9kIGl0IGlzLCBidXQgSSBoYXZlbid0IGZvdW5kIGl0LiBUaGUgY29kZSBoZXJlIGFzc3VtZXNcclxuICAgICAgICAvLyB0aGF0IHRoZSBlbnRyeSBwb2ludCBpcyBcIjxhc3NlbWJseW5hbWU+LlByb2dyYW0uTWFpblwiIChpLmUuLCBuYW1lc3BhY2UgPT0gYXNzZW1ibHkgbmFtZSkuXHJcbiAgICAgICAgY29uc3QgZW50cnlQb2ludE1ldGhvZCA9IG1vbm9QbGF0Zm9ybS5maW5kTWV0aG9kKGFzc2VtYmx5TmFtZSwgYXNzZW1ibHlOYW1lLCAnUHJvZ3JhbScsICdNYWluJyk7XHJcbiAgICAgICAgbW9ub1BsYXRmb3JtLmNhbGxNZXRob2QoZW50cnlQb2ludE1ldGhvZCwgbnVsbCwgYXJncyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGxNZXRob2Q6IGZ1bmN0aW9uIGNhbGxNZXRob2QobWV0aG9kOiBNZXRob2RIYW5kbGUsIHRhcmdldDogU3lzdGVtX09iamVjdCwgYXJnczogU3lzdGVtX09iamVjdFtdKTogU3lzdGVtX09iamVjdCB7XHJcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBNb2R1bGUuUnVudGltZS5zdGFja1NhdmUoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgYXJnc0J1ZmZlciA9IE1vZHVsZS5SdW50aW1lLnN0YWNrQWxsb2MoYXJncy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zdCBleGNlcHRpb25GbGFnTWFuYWdlZEludCA9IE1vZHVsZS5SdW50aW1lLnN0YWNrQWxsb2MoNCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgTW9kdWxlLnNldFZhbHVlKGFyZ3NCdWZmZXIgKyBpICogNCwgYXJnc1tpXSwgJ2kzMicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE1vZHVsZS5zZXRWYWx1ZShleGNlcHRpb25GbGFnTWFuYWdlZEludCwgMCwgJ2kzMicpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzOiBTeXN0ZW1fT2JqZWN0ID0gaW52b2tlX21ldGhvZChtZXRob2QsIHRhcmdldCwgYXJnc0J1ZmZlciwgZXhjZXB0aW9uRmxhZ01hbmFnZWRJbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKE1vZHVsZS5nZXRWYWx1ZShleGNlcHRpb25GbGFnTWFuYWdlZEludCwgJ2kzMicpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZXhjZXB0aW9uIGZsYWcgaXMgc2V0LCB0aGUgcmV0dXJuZWQgdmFsdWUgaXMgZXhjZXB0aW9uLlRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtb25vUGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKDxTeXN0ZW1fU3RyaW5nPnJlcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIE1vZHVsZS5SdW50aW1lLnN0YWNrUmVzdG9yZShzdGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0b0phdmFTY3JpcHRTdHJpbmc6IGZ1bmN0aW9uIHRvSmF2YVNjcmlwdFN0cmluZyhtYW5hZ2VkU3RyaW5nOiBTeXN0ZW1fU3RyaW5nKSB7XHJcbiAgICAgICAgLy8gQ29tbWVudHMgZnJvbSBvcmlnaW5hbCBNb25vIHNhbXBsZTpcclxuICAgICAgICAvL0ZJWE1FIHRoaXMgaXMgd2FzdGVmdWxsLCB3ZSBjb3VsZCByZW1vdmUgdGhlIHRlbXAgbWFsbG9jIGJ5IGdvaW5nIHRoZSBVVEYxNiByb3V0ZVxyXG4gICAgICAgIC8vRklYTUUgdGhpcyBpcyB1bnNhZmUsIGN1eiByYXcgb2JqZWN0cyBjb3VsZCBiZSBHQydkLlxyXG5cclxuICAgICAgICBpZiAoIW1hbmFnZWRTdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1dGY4ID0gbW9ub19zdHJpbmdfZ2V0X3V0ZjgobWFuYWdlZFN0cmluZyk7XHJcbiAgICAgICAgY29uc3QgcmVzID0gTW9kdWxlLlVURjhUb1N0cmluZyh1dGY4KTtcclxuICAgICAgICBNb2R1bGUuX2ZyZWUodXRmOCk7XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH0sXHJcblxyXG4gICAgdG9Eb3ROZXRTdHJpbmc6IGZ1bmN0aW9uIHRvRG90TmV0U3RyaW5nKGpzU3RyaW5nOiBzdHJpbmcpOiBTeXN0ZW1fU3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gbW9ub19zdHJpbmcoanNTdHJpbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbnZva2VTaW1wbGVTdGF0aWM6IGZ1bmN0aW9uIGludm9rZVNpbXBsZVN0YXRpYyhhc3NlbWJseU5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcsIHN0cmluZ0FyZzogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIG1ldGhvZCA9IHRoaXMuZmluZE1ldGhvZChhc3NlbWJseU5hbWUsIG5hbWVzcGFjZSwgY2xhc3NOYW1lLCBtZXRob2ROYW1lKTtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5jYWxsTWV0aG9kKG1ldGhvZCwgbnVsbCwgW3RoaXMudG9Eb3ROZXRTdHJpbmcoc3RyaW5nQXJnKV0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvSmF2YVNjcmlwdFN0cmluZyg8U3lzdGVtX1N0cmluZz5yZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWdpc3RlckNhbGxhYmxlTWV0aG9kOiBmdW5jdGlvbiByZWdpc3RlckNhbGxhYmxlTWV0aG9kKG1ldGhvZE5hbWU6IHN0cmluZywgaW1wbGVtZW50YXRpb246IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2FsbGFibGVGdW5jdGlvbnNbbWV0aG9kTmFtZV0gPSBpbXBsZW1lbnRhdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0SGVhcEFkZHJlc3M6IGZ1bmN0aW9uIGFkZHJlc3NPZkZpcnN0RmllbGQoaGVhcE9iamVjdDogU3lzdGVtX09iamVjdCkge1xyXG4gICAgICAgIHJldHVybiAoaGVhcE9iamVjdCBhcyBhbnkgYXMgbnVtYmVyKSArIDEyOyAvLyBGaXJzdCAzIEludDMycyAoPSAxMiBieXRlcykgYXJlIGludGVybmFsIE1vbm8gc3R1ZmZcclxuICAgIH0sXHJcblxyXG4gICAgcmVhZEhlYXBJbnQzMjogZnVuY3Rpb24gaGVhcFJlYWRJMzIoYWRkcmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1vZHVsZS5nZXRWYWx1ZShhZGRyZXNzLCAnaTMyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlYWRIZWFwT2JqZWN0OiBmdW5jdGlvbiBoZWFwUmVhZE9iamVjdChhZGRyZXNzOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTW9kdWxlLmdldFZhbHVlKGFkZHJlc3MsICcqJykgYXMgYW55IGFzIFN5c3RlbV9PYmplY3Q7XHJcbiAgICB9XHJcbn07XHJcblxyXG53aW5kb3dbJ19fTW9ub1BsYXRmb3JtX19pbnZva2VKUyddID0gZnVuY3Rpb24gX19Nb25vUGxhdGZvcm1fX2ludm9rZUpTKG1ldGhvZE5hbWU6IHN0cmluZywgYXJnc0FycmF5OiBhbnlbXSkge1xyXG4gICAgY29uc3QgaW1wbGVtZW50YXRpb24gPSBjYWxsYWJsZUZ1bmN0aW9uc1ttZXRob2ROYW1lXTtcclxuICAgIGlmICghaW1wbGVtZW50YXRpb24pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBpbnZva2UgSlMgbWV0aG9kICcke21ldGhvZE5hbWV9JyBmcm9tIC5ORVQgYmVjYXVzZSBubyBzdWNoIG1ldGhvZCB3YXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBwbGF0Zm9ybS5gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBpbXBsZW1lbnRhdGlvbi5hcHBseShudWxsLCBhcmdzQXJyYXkpO1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhZGRTY3JpcHRUYWdzVG9Eb2N1bWVudCgpIHtcclxuICAgIC8vIExvYWQgZWl0aGVyIHRoZSB3YXNtIG9yIGFzbS5qcyB2ZXJzaW9uIG9mIHRoZSBNb25vIHJ1bnRpbWVcclxuICAgIGNvbnN0IGJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5ID0gdHlwZW9mIFdlYkFzc2VtYmx5ICE9PSAndW5kZWZpbmVkJyAmJiBXZWJBc3NlbWJseS52YWxpZGF0ZTtcclxuICAgIGNvbnN0IG1vbm9SdW50aW1lVXJsQmFzZSA9ICcvX2ZyYW1ld29yay9Nb25vL2Rpc3QvJyArIChicm93c2VyU3VwcG9ydHNOYXRpdmVXZWJBc3NlbWJseSA/ICd3YXNtJyA6ICdhc21qcycpO1xyXG4gICAgY29uc3QgbW9ub1J1bnRpbWVTY3JpcHRVcmwgPSBgJHttb25vUnVudGltZVVybEJhc2V9L21vbm8uanNgO1xyXG5cclxuICAgIGlmICghYnJvd3NlclN1cHBvcnRzTmF0aXZlV2ViQXNzZW1ibHkpIHtcclxuICAgICAgICAvLyBJbiB0aGUgYXNtanMgY2FzZSwgdGhlIGluaXRpYWwgbWVtb3J5IHN0cnVjdHVyZSBpcyBpbiBhIHNlcGFyYXRlIGZpbGUgd2UgbmVlZCB0byBkb3dubG9hZFxyXG4gICAgICAgIGNvbnN0IG1lbWluaXRYSFIgPSBNb2R1bGVbJ21lbW9yeUluaXRpYWxpemVyUmVxdWVzdCddID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgbWVtaW5pdFhIUi5vcGVuKCdHRVQnLCBgJHttb25vUnVudGltZVVybEJhc2V9L21vbm8uanMubWVtYCk7XHJcbiAgICAgICAgbWVtaW5pdFhIUi5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG4gICAgICAgIG1lbWluaXRYSFIuc2VuZChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC53cml0ZShgPHNjcmlwdCBkZWZlciBzcmM9XCIke21vbm9SdW50aW1lU2NyaXB0VXJsfVwiPjwvc2NyaXB0PmApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbXNjcmlwdGVuTW9kdWxlSW5zdGFuY2UobG9hZEFzc2VtYmx5VXJsczogc3RyaW5nW10sIG9uUmVhZHk6ICgpID0+IHZvaWQsIG9uRXJyb3I6IChyZWFzb246IGFueSkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbW9kdWxlID0ge30gYXMgdHlwZW9mIE1vZHVsZTtcclxuXHJcbiAgICBtb2R1bGUucHJpbnQgPSBsaW5lID0+IGNvbnNvbGUubG9nKGBXQVNNOiAke2xpbmV9YCk7XHJcbiAgICBtb2R1bGUucHJpbnRFcnIgPSBsaW5lID0+IGNvbnNvbGUuZXJyb3IoYFdBU006ICR7bGluZX1gKTtcclxuICAgIG1vZHVsZS53YXNtQmluYXJ5RmlsZSA9ICcvX2ZyYW1ld29yay9Nb25vL2Rpc3Qvd2FzbS9tb25vLndhc20nO1xyXG4gICAgbW9kdWxlLmFzbWpzQ29kZUZpbGUgPSAnL19mcmFtZXdvcmsvTW9uby9kaXN0L2FzbWpzL21vbm8uYXNtLmpzJztcclxuICAgIG1vZHVsZS5wcmVSdW4gPSBbXTtcclxuICAgIG1vZHVsZS5wb3N0UnVuID0gW107XHJcbiAgICBtb2R1bGUucHJlbG9hZFBsdWdpbnMgPSBbXTtcclxuXHJcbiAgICBtb2R1bGUucHJlUnVuLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIC8vIEJ5IG5vdywgZW1zY3JpcHRlbiBzaG91bGQgYmUgaW5pdGlhbGlzZWQgZW5vdWdoIHRoYXQgd2UgY2FuIGNhcHR1cmUgdGhlc2UgbWV0aG9kcyBmb3IgbGF0ZXIgdXNlXHJcbiAgICAgICAgYXNzZW1ibHlfbG9hZCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2Fzc2VtYmx5X2xvYWQnLCAnbnVtYmVyJywgWydzdHJpbmcnXSk7XHJcbiAgICAgICAgZmluZF9jbGFzcyA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2Fzc2VtYmx5X2ZpbmRfY2xhc3MnLCAnbnVtYmVyJywgWydudW1iZXInLCAnc3RyaW5nJywgJ3N0cmluZyddKTtcclxuICAgICAgICBmaW5kX21ldGhvZCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2Fzc2VtYmx5X2ZpbmRfbWV0aG9kJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ3N0cmluZycsICdudW1iZXInXSk7XHJcbiAgICAgICAgaW52b2tlX21ldGhvZCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2ludm9rZV9tZXRob2QnLCAnbnVtYmVyJywgWydudW1iZXInLCAnbnVtYmVyJywgJ251bWJlciddKTtcclxuICAgICAgICBtb25vX3N0cmluZ19nZXRfdXRmOCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX3N0cmluZ19nZXRfdXRmOCcsICdudW1iZXInLCBbJ251bWJlciddKTtcclxuICAgICAgICBtb25vX3N0cmluZyA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX3N0cmluZ19mcm9tX2pzJywgJ251bWJlcicsIFsnc3RyaW5nJ10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGxvYWRCY2xBc3NlbWJsaWVzID0gW1xyXG4gICAgICAgICAgICAnbXNjb3JsaWInLFxyXG4gICAgICAgICAgICAnU3lzdGVtJyxcclxuICAgICAgICAgICAgJ1N5c3RlbS5Db3JlJyxcclxuICAgICAgICAgICAgJ0ZhY2FkZXMvbmV0c3RhbmRhcmQnLFxyXG4gICAgICAgICAgICAnRmFjYWRlcy9TeXN0ZW0uQ29uc29sZScsXHJcbiAgICAgICAgICAgICdGYWNhZGVzL1N5c3RlbS5Db2xsZWN0aW9ucycsXHJcbiAgICAgICAgICAgICdGYWNhZGVzL1N5c3RlbS5EaWFnbm9zdGljcy5EZWJ1ZycsXHJcbiAgICAgICAgICAgICdGYWNhZGVzL1N5c3RlbS5JTycsXHJcbiAgICAgICAgICAgICdGYWNhZGVzL1N5c3RlbS5MaW5xJyxcclxuICAgICAgICAgICAgJ0ZhY2FkZXMvU3lzdGVtLlJlZmxlY3Rpb24nLFxyXG4gICAgICAgICAgICAnRmFjYWRlcy9TeXN0ZW0uUmVmbGVjdGlvbi5FeHRlbnNpb25zJyxcclxuICAgICAgICAgICAgJ0ZhY2FkZXMvU3lzdGVtLlJ1bnRpbWUnLFxyXG4gICAgICAgICAgICAnRmFjYWRlcy9TeXN0ZW0uUnVudGltZS5FeHRlbnNpb25zJyxcclxuICAgICAgICAgICAgJ0ZhY2FkZXMvU3lzdGVtLlJ1bnRpbWUuSW50ZXJvcFNlcnZpY2VzJyxcclxuICAgICAgICAgICAgJ0ZhY2FkZXMvU3lzdGVtLlRocmVhZGluZycsXHJcbiAgICAgICAgICAgICdGYWNhZGVzL1N5c3RlbS5UaHJlYWRpbmcuVGFza3MnXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdmFyIGFsbEFzc2VtYmx5VXJscyA9IGxvYWRBc3NlbWJseVVybHNcclxuICAgICAgICAgICAgLmNvbmNhdChsb2FkQmNsQXNzZW1ibGllcy5tYXAobmFtZSA9PiBgX2ZyYW1ld29yay9Nb25vL2JjbC8ke25hbWV9LmRsbGApKTtcclxuXHJcbiAgICAgICAgTW9kdWxlLkZTX2NyZWF0ZVBhdGgoJy8nLCAnYXBwQmluRGlyJywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgYWxsQXNzZW1ibHlVcmxzLmZvckVhY2godXJsID0+XHJcbiAgICAgICAgICAgIEZTLmNyZWF0ZVByZWxvYWRlZEZpbGUoJ2FwcEJpbkRpcicsIGAke2dldEFzc2VtYmx5TmFtZUZyb21VcmwodXJsKX0uZGxsYCwgdXJsLCB0cnVlLCBmYWxzZSwgbnVsbCwgPGFueT5vbkVycm9yKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb2R1bGUucG9zdFJ1bi5wdXNoKCgpID0+IHtcclxuICAgICAgICAvLyBOb3QgMTAwJSBjZXJ0YWluIHdoYXQgdGhpcyBpcyBkb2luZyAtIGl0IGFwcGVhcnMgdG8gbG9hZCBhbGwgdGhlIGFzc2VtYmxpZXNcclxuICAgICAgICAvLyBmcm9tIHRoZSBzcGVjaWZpZWQgZGlyZWN0b3J5LiBTaG91bGQgcmVuYW1lIHRoaXMgdG8gc29tZXRoaW5nIG1vcmUgZGVzY3JpcHRpdmUuXHJcbiAgICAgICAgY29uc3QgbG9hZF9ydW50aW1lID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fbG9hZF9ydW50aW1lJywgbnVsbCwgWydzdHJpbmcnXSk7XHJcbiAgICAgICAgbG9hZF9ydW50aW1lKCdhcHBCaW5EaXInKTtcclxuICAgICAgICBvblJlYWR5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbW9kdWxlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhc3luY0xvYWQodXJsLCBvbmxvYWQsIG9uZXJyb3IpIHtcclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XHJcbiAgICB4aHIub3BlbignR0VUJywgdXJsLCAvKiBhc3luYzogKi8gdHJ1ZSk7XHJcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiB4aHJfb25sb2FkKCkge1xyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCB8fCB4aHIuc3RhdHVzID09IDAgJiYgeGhyLnJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHZhciBhc20gPSBuZXcgVWludDhBcnJheSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBvbmxvYWQoYXNtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvbmVycm9yKHhocik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhoci5vbmVycm9yID0gb25lcnJvcjtcclxuICAgIHhoci5zZW5kKG51bGwpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9QbGF0Zm9ybS9Nb25vUGxhdGZvcm0udHMiLCJleHBvcnQgZnVuY3Rpb24gZW5hYmxlTGl2ZVJlbG9hZGluZygpIHtcclxuICAgIGxpc3RlbkZvclJlbG9hZChmYWxzZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RlbkZvclJlbG9hZChyZWxvYWRPbkNvbm5lY3Rpb246IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IEV2ZW50U291cmNlID0gd2luZG93WydFdmVudFNvdXJjZSddO1xyXG4gICAgaWYgKHR5cGVvZiBFdmVudFNvdXJjZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9fcmVsb2FkJyk7XHJcbiAgICAgICAgbGV0IHNvdXJjZURpZE9wZW47XHJcbiAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCBlID0+IHtcclxuICAgICAgICAgICAgc291cmNlRGlkT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChyZWxvYWRPbkNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gJ3JlbG9hZCcpIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2UucmVhZHlTdGF0ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZURpZE9wZW4gfHwgcmVsb2FkT25Db25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29ubmVjdGlvbiB3YXMgY2xvc2VkIGVpdGhlciBhZnRlciBpdCB3YXMgd29ya2luZywgb3Igd2hpbGVcclxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBwb2xsaW5nIGZvciByZWNvbm5lY3QuIERvbid0IHJlbHkgb24gYnJvd3NlcidzIGRlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWNvbm5lY3Rpb24gYmVoYXZpb3VyLiBJbnN0ZWFkIGNsb3NlIHRoaXMgY29ubmVjdGlvbiBhbmRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBhIG5ldyBvbmUgb24gb3VyIGRlc2lyZWQgc2NoZWR1bGUuXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbkZvclJlbG9hZCgvKiByZWxvYWRPbkNvbm5lY3Rpb24gKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9MaXZlUmVsb2FkLnRzIiwiZGVjbGFyZSB2YXIgVGV4dERlY29kZXI7IC8vIFRPRE86IExvYWQgcG9seWZpbGwgd2hlbiBuZWVkZWRcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5RXJyb3JQYWdlKGVycm9yOiBhbnkpIHtcclxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFhNTEh0dHBSZXF1ZXN0KSB7XHJcbiAgICAgICAgY29uc3QgaHRtbCA9IGdldFJlc3BvbnNlVGV4dChlcnJvcik7XHJcbiAgICAgICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZyYW1lKTtcclxuICAgICAgICBmcmFtZS53aWR0aCA9IGZyYW1lLmhlaWdodCA9ICcxMDAlJztcclxuICAgICAgICBmcmFtZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgZnJhbWUuc3R5bGUudG9wID0gJzAnO1xyXG4gICAgICAgIGZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xyXG4gICAgICAgIGZyYW1lLmNvbnRlbnREb2N1bWVudC53cml0ZShodG1sKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBkaXNwbGF5IGVycm9yIHBhZ2UgZm9yIHVua25vd24gZXJyb3IgdHlwZS4gRXJyb3Igd2FzOiAke2Vycm9yfWApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSZXNwb25zZVRleHQoeGhyOiBYTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgc3dpdGNoICh4aHIucmVzcG9uc2VUeXBlKSB7XHJcbiAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgIGNhc2UgJ2FycmF5YnVmZmVyJzoge1xyXG4gICAgICAgICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVjb2Rlci5kZWNvZGUobmV3IERhdGFWaWV3KHhoci5yZXNwb25zZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIFhIUiByZXNwb25zZVR5cGU6ICcke3hoci5yZXNwb25zZVR5cGV9J2ApO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9FcnJvclBhZ2UudHMiLCJpbXBvcnQgeyBTeXN0ZW1fT2JqZWN0LCBTeXN0ZW1fU3RyaW5nIH0gZnJvbSAnLi4vLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBhdHRhY2hMaW5rQ2xpY2tFdmVudEhhbmRsZXIgfSBmcm9tICcuLi9Sb3V0aW5nJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi8uLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IFZEb21JdGVtIH0gZnJvbSAnLi9WRG9tSXRlbSc7XHJcbmltcG9ydCB7IFZEb21JdGVtQXJyYXlSZWFkZXIgfSBmcm9tICcuL1ZEb21JdGVtQXJyYXlSZWFkZXInO1xyXG5cclxuY29uc3QgcGVuZGluZ0NvbXBvbmVudERvY0ZyYWdzOiB7IFtlbGVtZW50UmVmOiBzdHJpbmddOiBEb2N1bWVudEZyYWdtZW50IH0gPSB7fTtcclxubGV0IG5leHRQZW5kaW5nQ29tcG9uZW50RG9jRnJhZ0lkID0gMDtcclxuXHJcbnBsYXRmb3JtLnJlZ2lzdGVyQ2FsbGFibGVNZXRob2QoJ3NldEVsZW1Gcm9tVk5vZGUnLCBzZXRFbGVtRnJvbVZOb2RlKTtcclxuXHJcbmZ1bmN0aW9uIHNldEVsZW1Gcm9tVk5vZGUoZWxlbWVudFJlZk1hbmFnZWRTdHJpbmc6IFN5c3RlbV9TdHJpbmcsIGNvbXBvbmVudFJlZjogbnVtYmVyLCBvbGRWRG9tOiBTeXN0ZW1fT2JqZWN0LCBuZXdWRG9tOiBTeXN0ZW1fT2JqZWN0LCByZXBsYWNlQ29udGFpbmVyOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRSZWYgPSBwbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoZWxlbWVudFJlZk1hbmFnZWRTdHJpbmcpO1xyXG4gICAgY29uc3QgZWxlbSA9IHBlbmRpbmdDb21wb25lbnREb2NGcmFnc1tlbGVtZW50UmVmXVxyXG4gICAgICAgIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRSZWYpO1xyXG4gICAgaWYgKCFlbGVtKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IGJ5IElEOiAke2VsZW1lbnRSZWZ9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9sZFZEb21SZWFkZXIgPSBuZXcgVkRvbUl0ZW1BcnJheVJlYWRlcihjb21wb25lbnRSZWYsIG9sZFZEb20pO1xyXG4gICAgdmFyIG5ld1ZEb21SZWFkZXIgPSBuZXcgVkRvbUl0ZW1BcnJheVJlYWRlcihjb21wb25lbnRSZWYsIG5ld1ZEb20pO1xyXG5cclxuICAgIHBvcHVsYXRlT3JVcGRhdGVFbGVtZW50KGNvbXBvbmVudFJlZiwgZWxlbSwgb2xkVkRvbVJlYWRlciwgbmV3VkRvbVJlYWRlciwgISFyZXBsYWNlQ29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVPclVwZGF0ZUVsZW1lbnQoY29tcG9uZW50UmVmOiBudW1iZXIsIGNvbnRhaW5lckVsZW1lbnQ6IERvY3VtZW50RnJhZ21lbnQgfCBIVE1MRWxlbWVudCwgb2xkVkRvbVJlYWRlcjogVkRvbUl0ZW1BcnJheVJlYWRlciwgbmV3VkRvbVJlYWRlcjogVkRvbUl0ZW1BcnJheVJlYWRlciwgcmVwbGFjZUNvbnRhaW5lcjogYm9vbGVhbikge1xyXG4gICAgY29uc3Qgb2xkVkRvbVJvb3QgPSBvbGRWRG9tUmVhZGVyLmdldEl0ZW0oMCk7XHJcbiAgICBjb25zdCBuZXdWRG9tUm9vdCA9IG5ld1ZEb21SZWFkZXIuZ2V0SXRlbSgwKTtcclxuICAgIGlmIChvbGRWRG9tUm9vdC5pdGVtVHlwZSA9PT0gMCAvKiBibGFuayAqLykge1xyXG4gICAgICAgIC8vIEZpcnN0IHJ1biAtIHRoZXJlJ3Mgbm8gcHJpb3IgdmRvbSB0byBjb21wYXJlIGFnYWluc3RcclxuICAgICAgICBjb25zdCBuZXdSb290RWxlbWVudCA9IGNyZWF0ZVJlYWxOb2RlKGNvbXBvbmVudFJlZiwgbmV3VkRvbVJvb3QpO1xyXG4gICAgICAgIHdoaWxlIChjb250YWluZXJFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyRWxlbWVudC5yZW1vdmVDaGlsZChjb250YWluZXJFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Jvb3RFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZVRvVXBkYXRlID0gcmVwbGFjZUNvbnRhaW5lciA/IGNvbnRhaW5lckVsZW1lbnQgOiBjb250YWluZXJFbGVtZW50LmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgdXBkYXRlTm9kZShjb21wb25lbnRSZWYsIG5vZGVUb1VwZGF0ZSwgb2xkVkRvbVJvb3QsIG5ld1ZEb21Sb290KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmVhbE5vZGUoY29tcG9uZW50UmVmOiBudW1iZXIsIHZkb21JdGVtOiBWRG9tSXRlbSk6IE5vZGUge1xyXG4gICAgc3dpdGNoICh2ZG9tSXRlbS5pdGVtVHlwZSkge1xyXG4gICAgICAgIGNhc2UgMTogLy8gRWxlbWVudFxyXG4gICAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodmRvbUl0ZW0uZWxlbWVudFRhZ05hbWUpO1xyXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGVzT25SZWFsTm9kZShjb21wb25lbnRSZWYsIGVsLCB2ZG9tSXRlbS5yZWFkQXR0cmlidXRlcygpKTtcclxuICAgICAgICAgICAgdmRvbUl0ZW0ucmVhZENoaWxkcmVuKClcclxuICAgICAgICAgICAgICAgIC5tYXAoY2hpbGQgPT4gY3JlYXRlUmVhbE5vZGUoY29tcG9uZW50UmVmLCBjaGlsZCkpXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChlbC5hcHBlbmRDaGlsZC5iaW5kKGVsKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICBjYXNlIDI6IC8vIFRleHQgbm9kZVxyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmRvbUl0ZW0udGV4dE5vZGVDb250ZW50cyk7XHJcbiAgICAgICAgY2FzZSA0OiAvLyBDb21wb25lbnRcclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbnRpYXRlQ29tcG9uZW50KGNvbXBvbmVudFJlZiwgdmRvbUl0ZW0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBpdGVtIHR5cGUuIENhblxcJ3QgY3JlYXRlIHJlYWwgRE9NIG5vZGUgZm9yIGl0ZW0gb2YgdHlwZSAnICsgdmRvbUl0ZW0uaXRlbVR5cGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzT25SZWFsTm9kZShjb21wb25lbnRSZWY6IG51bWJlciwgZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlSXRlbXM6IFZEb21JdGVtW10pIHtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZXNUb1JlbW92ZSA9IHt9O1xyXG4gICAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXQgPT4geyBhdHRyaWJ1dGVzVG9SZW1vdmVbYXQubmFtZV0gPSB0cnVlOyB9KTtcclxuXHJcbiAgICBhdHRyaWJ1dGVJdGVtcy5mb3JFYWNoKGF0dHJpYnV0ZUl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IGF0dHJpYk5hbWUgPSBhdHRyaWJ1dGVJdGVtLmF0dHJpYnV0ZU5hbWU7XHJcbiAgICAgICAgYXR0cmlidXRlc1RvUmVtb3ZlW2F0dHJpYk5hbWVdID0gZmFsc2U7IC8vIE1hcmsgdGhpcyBhcyByZXRhaW5lZFxyXG4gICAgICAgIHN3aXRjaCAoYXR0cmliTmFtZSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGFkZCBtb3JlIGZ1bmN0aW9uIGhhbmRsZXJzXHJcbiAgICAgICAgICAgIGNhc2UgJ29uY2hhbmdlJzpcclxuICAgICAgICAgICAgY2FzZSAnb25jbGljayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ29uc3VibWl0JzpcclxuICAgICAgICAgICAgY2FzZSAnb25tb3VzZW92ZXInOlxyXG4gICAgICAgICAgICBjYXNlICdvbmFib3J0JzpcclxuICAgICAgICAgICAgY2FzZSAnb25jYW5jZWwnOlxyXG4gICAgICAgICAgICBjYXNlICdvbmRibGNsaWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnb25kcmFnJzpcclxuICAgICAgICAgICAgY2FzZSAnb25kcmFnZW5kJzpcclxuICAgICAgICAgICAgY2FzZSAnb25lcnJvcic6XHJcbiAgICAgICAgICAgIGNhc2UgJ29uaW5wdXQnOlxyXG4gICAgICAgICAgICBjYXNlICdvbmtleWRvd24nOlxyXG4gICAgICAgICAgICBjYXNlICdvbmxvYWQnOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZUl0ZW0uYXR0cmlidXRlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZVZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEV2ZW50IGhhbmRsZXJcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50W2F0dHJpYk5hbWVdID0gYXR0cmlidXRlSXRlbS5tYWtlRXZlbnREaXNwYXRjaGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYk5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZhbHVlJzpcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRbJ3ZhbHVlJ10gPSBhdHRyaWJ1dGVJdGVtLmF0dHJpYnV0ZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2NoZWNrZWQnOlxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFsnY2hlY2tlZCddID0gYXR0cmlidXRlSXRlbS5hdHRyaWJ1dGVTdHJpbmdWYWx1ZSA9PT0gJ1RydWUnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hyZWYnOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVJdGVtLmF0dHJpYnV0ZVN0cmluZ1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0EnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZXNQcmVmaXggPSAnfi8nO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZS5pbmRleE9mKHBhZ2VzUHJlZml4KSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZVZhbHVlLnN1YnN0cmluZyhwYWdlc1ByZWZpeC5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVWYWx1ZS5yZXBsYWNlKC9cXC9JbmRleFxcLmNzaHRtbCQvLCAnLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZVZhbHVlLnJlcGxhY2UoL1xcLmNzaHRtbCQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaExpbmtDbGlja0V2ZW50SGFuZGxlcihlbGVtZW50LCBhdHRyaWJ1dGVWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmliTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYk5hbWUsIGF0dHJpYnV0ZUl0ZW0uYXR0cmlidXRlU3RyaW5nVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXR0cmlidXRlc1RvUmVtb3ZlKS5mb3JFYWNoKGF0dHJpYnV0ZU5hbWUgPT4ge1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzVG9SZW1vdmVbYXR0cmlidXRlTmFtZV0pIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZWRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMxOiBWRG9tSXRlbVtdLCBhdHRyaWJ1dGVzMjogVkRvbUl0ZW1bXSwgY29tcGFyZUFzT2JqZWN0czogYm9vbGVhbikge1xyXG4gICAgaWYgKGF0dHJpYnV0ZXMxLmxlbmd0aCAhPT0gYXR0cmlidXRlczIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXR0cmlidXRlczJCeU5hbWUgPSB7fTtcclxuICAgIGF0dHJpYnV0ZXMyLmZvckVhY2goYSA9PiB7XHJcbiAgICAgICAgLy8gRm9yIGEgcHJvcGVyIC5ORVQtc3R5bGUgY29tcGFyZS1hcy1vYmplY3RzLCB3b3VsZCByZWFsbHkgaGF2ZSB0byBjYWxsIGJhY2sgaW50byAuTkVUIGhlcmVcclxuICAgICAgICAvLyBzbyBpdCBjYW4gYWNjb3VudCBmb3IgZXZlcnl0aGluZyAoZS5nLiwgdHdvIGRpZmZlcmVudCBzdHJpbmcgcmVmcyB0aGF0IGhvbGQgdGhlIHNhbWUgdmFsdWUsXHJcbiAgICAgICAgLy8gb3IgSUNvbXBhcmFibGUgZ2VuZXJhbGx5KS4gTm90IGRvaW5nIHRoYXQgcmlnaHQgbm93IGJ1dCBjb3VsZCBjb25zaWRlciBjaGFuZ2luZyB0aGUgbG9naWNcclxuICAgICAgICAvLyBzbyB0aGF0IGZvciBjaGlsZCBjb21wb25lbnRzLCB3ZSAqYWx3YXlzKiBzZW5kIGl0IHRoZSB1cGRhdGVzIHBhcmFtcywgYW5kIGxldCBpdCBkZWNpZGUgd2hldGhlclxyXG4gICAgICAgIC8vIHRoZXJlJ3MgYmVlbiBhIGNoYW5nZS4gTm90IHN1cmUgYWJvdXQgdGhlIHBlcmYgZWZmZWN0cyBvZiB0aGF0IHRob3VnaC5cclxuICAgICAgICBhdHRyaWJ1dGVzMkJ5TmFtZVthLmF0dHJpYnV0ZU5hbWVdID0gY29tcGFyZUFzT2JqZWN0cyA/IGEuYXR0cmlidXRlT2JqZWN0VmFsdWUgOiBhLmF0dHJpYnV0ZVZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGEgPSBhdHRyaWJ1dGVzMVtpXTtcclxuICAgICAgICBjb25zdCBhdHRyaWJ1dGUxVmFsdWUgPSBjb21wYXJlQXNPYmplY3RzID8gYS5hdHRyaWJ1dGVPYmplY3RWYWx1ZSA6IGEuYXR0cmlidXRlVmFsdWU7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMyQnlOYW1lW2EuYXR0cmlidXRlTmFtZV0gIT09IGF0dHJpYnV0ZTFWYWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVOb2RlKGNvbXBvbmVudFJlZjogbnVtYmVyLCB0YXJnZXROb2RlOiBOb2RlLCBvbGRWRG9tSXRlbTogVkRvbUl0ZW0sIG5ld1ZEb21JdGVtOiBWRG9tSXRlbSkge1xyXG4gICAgc3dpdGNoIChuZXdWRG9tSXRlbS5pdGVtVHlwZSkge1xyXG4gICAgICAgIGNhc2UgMTogLy8gRWxlbWVudFxyXG4gICAgICAgIGNhc2UgNDogLy8gQ29tcG9uZW50XHJcbiAgICAgICAgICAgIHVwZGF0ZUVsZW1lbnQoY29tcG9uZW50UmVmLCB0YXJnZXROb2RlIGFzIEVsZW1lbnQsIG9sZFZEb21JdGVtLCBuZXdWRG9tSXRlbSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgdXBkYXRlVGV4dE5vZGUoY29tcG9uZW50UmVmLCB0YXJnZXROb2RlLCBvbGRWRG9tSXRlbSwgbmV3VkRvbUl0ZW0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZEb20gaXRlbSBpcyBvZiB1bmV4cGVjdGVkIHR5cGU6ICcgKyBuZXdWRG9tSXRlbS5pdGVtVHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRleHROb2RlKGNvbXBvbmVudFJlZjogbnVtYmVyLCB0YXJnZXRUZXh0Tm9kZTogTm9kZSwgb2xkVkRvbUl0ZW06IFZEb21JdGVtLCBuZXdWRG9tSXRlbTogVkRvbUl0ZW0pIHtcclxuICAgIGNvbnN0IG5ld1RleHQgPSBuZXdWRG9tSXRlbS50ZXh0Tm9kZUNvbnRlbnRzO1xyXG4gICAgaWYgKG9sZFZEb21JdGVtLnRleHROb2RlQ29udGVudHMgIT09IG5ld1RleHQpIHtcclxuICAgICAgICB0YXJnZXRUZXh0Tm9kZS50ZXh0Q29udGVudCA9IG5ld1RleHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnRBdHRyaWJ1dGVzKGNvbXBvbmVudFJlZjogbnVtYmVyLCB0YXJnZXRFbGVtZW50OiBFbGVtZW50LCBvbGRWRG9tSXRlbTogVkRvbUl0ZW0sIG5ld1ZEb21JdGVtOiBWRG9tSXRlbSkge1xyXG4gICAgY29uc3Qgb2xkVkRvbUl0ZW1BdHRyaWJ1dGVzID0gb2xkVkRvbUl0ZW0ucmVhZEF0dHJpYnV0ZXMoKTtcclxuICAgIGNvbnN0IG5ld1ZEb21JdGVtQXR0cmlidXRlcyA9IG5ld1ZEb21JdGVtLnJlYWRBdHRyaWJ1dGVzKCk7XHJcbiAgICBjb25zdCBuZXdWRG9tSXRlbVR5cGUgPSBuZXdWRG9tSXRlbS5pdGVtVHlwZTtcclxuICAgIGNvbnN0IGNvbXBhcmVBc09iamVjdHMgPSBuZXdWRG9tSXRlbVR5cGUgPT0gNDtcclxuICAgIGlmIChjaGFuZ2VkQXR0cmlidXRlcyhuZXdWRG9tSXRlbUF0dHJpYnV0ZXMsIG9sZFZEb21JdGVtQXR0cmlidXRlcywgY29tcGFyZUFzT2JqZWN0cykpIHtcclxuICAgICAgICBzd2l0Y2ggKG5ld1ZEb21JdGVtVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6IC8vIEVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZXNPblJlYWxOb2RlKGNvbXBvbmVudFJlZiwgdGFyZ2V0RWxlbWVudCwgbmV3VkRvbUl0ZW1BdHRyaWJ1dGVzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6IC8vIENvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkQ29tcG9uZW50UmVmID0gcGFyc2VJbnQodGFyZ2V0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ19jb21wb25lbnRfcmVmJykpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ29tcG9uZW50UGFyYW1ldGVycyhjaGlsZENvbXBvbmVudFJlZiwgY29tcG9uZW50UmVmLCBuZXdWRG9tSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRG9uXFwndCBrbm93IGhvdyB0byBzZXQgYXR0cmlidXRlcyBmb3IgYSB2ZG9tIGl0ZW0gb2YgdHlwZSAnICsgbmV3VkRvbUl0ZW0uaXRlbVR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50UGFyYW1ldGVycyhjb21wb25lbnRSZWY6IG51bWJlciwgcGFyZW50Q29tcG9uZW50UmVmOiBudW1iZXIsIHZkb21JdGVtOiBWRG9tSXRlbSkge1xyXG4gICAgcGxhdGZvcm0uaW52b2tlU2ltcGxlU3RhdGljKCdCbGF6b3IuUnVudGltZScsICdCbGF6b3IuSW50ZXJvcCcsICdDb21wb25lbnRzJywgJ1VwZGF0ZUNvbXBvbmVudFBhcmFtZXRlcnMnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgY29tcG9uZW50UmVmOiBjb21wb25lbnRSZWYsXHJcbiAgICAgICAgcGFyZW50Q29tcG9uZW50UmVmOiBwYXJlbnRDb21wb25lbnRSZWYsXHJcbiAgICAgICAgdmRvbUl0ZW1JbmRleDogdmRvbUl0ZW0uaW5kZXhcclxuICAgIH0pKTtcclxufVxyXG5cclxuaW50ZXJmYWNlIEtleWVkRWxlbWVudEluZm8ge1xyXG4gICAgdmRvbTogVkRvbUl0ZW07XHJcbiAgICBwbGFjZWhvbGRlcj86IE5vZGU7XHJcbiAgICBlbGVtZW50PzogTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlRWxlbWVudChjb21wb25lbnRSZWY6IG51bWJlciwgdGFyZ2V0RWxlbWVudDogRWxlbWVudCwgb2xkVkRvbUl0ZW06IFZEb21JdGVtLCBuZXdWRG9tSXRlbTogVkRvbUl0ZW0pIHtcclxuICAgIHVwZGF0ZUVsZW1lbnRBdHRyaWJ1dGVzKGNvbXBvbmVudFJlZiwgdGFyZ2V0RWxlbWVudCwgb2xkVkRvbUl0ZW0sIG5ld1ZEb21JdGVtKTtcclxuXHJcbiAgICAvLyBOb3cgZG8gYSBtZXJnZSBqb2luIG9uIHRoZSBzZXF1ZW5jZSBvZiBjaGlsZCBub2Rlc1xyXG4gICAgY29uc3Qgb2xkQ2hpbGRyZW4gPSBvbGRWRG9tSXRlbS5yZWFkQ2hpbGRyZW4oKTtcclxuICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gbmV3VkRvbUl0ZW0ucmVhZENoaWxkcmVuKCk7XHJcbiAgICBsZXQgb2xkQ2hpbGRJbmRleCA9IDA7XHJcbiAgICBsZXQgbmV3Q2hpbGRJbmRleCA9IDA7XHJcbiAgICBsZXQgcmVhbEVsZW1JbmRleCA9IDA7XHJcbiAgICBsZXQgcHJldk9sZENoaWxkU291cmNlU2VxdWVuY2UgPSAtMTtcclxuICAgIGxldCBwcmV2TmV3Q2hpbGRTb3VyY2VTZXF1ZW5jZSA9IC0xO1xyXG4gICAgY29uc3Qgb2xkS2V5ZWRFbGVtZW50SW5mb3M6IHsgW2tleTogc3RyaW5nXTogS2V5ZWRFbGVtZW50SW5mbyB9ID0ge307XHJcbiAgICBjb25zdCBuZXdLZXllZEVsZW1lbnRJbmZvczogeyBba2V5OiBzdHJpbmddOiBLZXllZEVsZW1lbnRJbmZvIH0gPSB7fTtcclxuICAgIGNvbnN0IHNlZW5OZXdLZXlzID0ge307XHJcbiAgICB3aGlsZSAob2xkQ2hpbGRJbmRleCA8IG9sZENoaWxkcmVuLmxlbmd0aCB8fCBuZXdDaGlsZEluZGV4IDwgbmV3Q2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkQ2hpbGQgPSBvbGRDaGlsZHJlbltvbGRDaGlsZEluZGV4XTtcclxuICAgICAgICBjb25zdCBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW25ld0NoaWxkSW5kZXhdO1xyXG5cclxuICAgICAgICAvLyBGaXJzdCwgY2hlY2sgdGhlIGtleXMgKGlmIGFueSkgYXJlIHVuaXF1ZSBhbmQgd2hldGhlciB0aGV5IG1hdGNoXHJcbiAgICAgICAgY29uc3Qgb2xkQ2hpbGRLZXkgPSBvbGRDaGlsZCA/IG9sZENoaWxkLmVsZW1lbnRLZXkgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5ld0NoaWxkS2V5ID0gbmV3Q2hpbGQgPyBuZXdDaGlsZC5lbGVtZW50S2V5IDogbnVsbDtcclxuICAgICAgICBpZiAobmV3Q2hpbGRLZXkpIHtcclxuICAgICAgICAgICAgaWYgKHNlZW5OZXdLZXlzLmhhc093blByb3BlcnR5KG5ld0NoaWxkS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGUga2V5OiAke25ld0NoaWxkS2V5fS4gQW55IGtleXMgbXVzdCBiZSB1bmlxdWUgYW1vbmcgc2libGluZyBlbGVtZW50cy5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlZW5OZXdLZXlzW25ld0NoaWxkS2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzTWF0Y2ggPSBvbGRDaGlsZCAmJiBuZXdDaGlsZCAmJiBvbGRDaGlsZC5zb3VyY2VTZXF1ZW5jZSA9PT0gbmV3Q2hpbGQuc291cmNlU2VxdWVuY2U7XHJcbiAgICAgICAgaWYgKGlzTWF0Y2gpIHtcclxuICAgICAgICAgICAgLy8gQm90aCBzZXF1ZW5jZXMgYXJlIGluIHN5bmMsIHNvIHJlY3Vyc2UgZG93biB0aGUgZWxlbWVudCBoaWVyYXJjaHkgaGVyZVxyXG4gICAgICAgICAgICBjb25zdCByZWFsRWxlbSA9IHRhcmdldEVsZW1lbnQuY2hpbGROb2Rlc1tyZWFsRWxlbUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKG9sZENoaWxkS2V5ID09PSBuZXdDaGlsZEtleSkge1xyXG4gICAgICAgICAgICAgICAgLy8gS2V5cyBtYXRjaCwgb3IgdGhpcyBlbGVtZW50IGRvZXNuJ3Qgc3BlY2lmeSBhIGtleSwgc28gd2UgY2FuIHVzZSB0aGlzIERPTSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVOb2RlKGNvbXBvbmVudFJlZiwgcmVhbEVsZW0sIG9sZENoaWxkLCBuZXdDaGlsZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBLZXlzIG1pc21hdGNoLCBzbyB3ZSBjYW4ndCB1c2UgdGhpcyBET00gZWxlbWVudC4gUHVsbCBpdCBvdXQgYW5kIGxlYXZlIGEgcGxhY2Vob2xkZXIuXHJcbiAgICAgICAgICAgICAgICBvbGRLZXllZEVsZW1lbnRJbmZvc1tvbGRDaGlsZEtleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmRvbTogb2xkQ2hpbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogcmVhbEVsZW1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQobmV3Q2hpbGRLZXkpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5yZXBsYWNlQ2hpbGQocGxhY2Vob2xkZXIsIHJlYWxFbGVtKTtcclxuICAgICAgICAgICAgICAgIG5ld0tleWVkRWxlbWVudEluZm9zW25ld0NoaWxkS2V5XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB2ZG9tOiBuZXdDaGlsZCxcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2xkQ2hpbGRJbmRleCsrO1xyXG4gICAgICAgICAgICBuZXdDaGlsZEluZGV4Kys7XHJcbiAgICAgICAgICAgIHJlYWxFbGVtSW5kZXgrKztcclxuICAgICAgICAgICAgcHJldk9sZENoaWxkU291cmNlU2VxdWVuY2UgPSBvbGRDaGlsZC5zb3VyY2VTZXF1ZW5jZTtcclxuICAgICAgICAgICAgcHJldk5ld0NoaWxkU291cmNlU2VxdWVuY2UgPSBuZXdDaGlsZC5zb3VyY2VTZXF1ZW5jZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUaGUgc2VxdWVuY2VzIGFyZSBvdXQgb2Ygc3luYywgc28gd2UgbmVlZCB0byBwaWNrIGVkaXRzIHRoYXQgYnJpbmcgdGhlbSBjbG9zZXIgdG8gYmVpbmdcclxuICAgICAgICAgICAgLy8gaW4gc3luYy4gVGhpcyBpcyBsaWtlIGEgcHJlb3JkZXJlZCBtZXJnZSBqb2luICh3aGVyZSB5b3UganVzdCB0YWtlIGZyb20gd2hpY2hldmVyIHNpZGVcclxuICAgICAgICAgICAgLy8gaGFzIHRoZSBsb3dlciBzZXF1ZW5jZSBudW1iZXIpLCB3aXRoIHRoZSBjb21wbGljYXRpb24gdGhhdCBvdXIgbm9ybWFsbHktYXNjZW5kaW5nIHNlcXVlbmNlc1xyXG4gICAgICAgICAgICAvLyBjYW4ganVtcCBiYWNrd2FyZHMgKGkuZS4sIGF0IHRoZSBlbmQgb2YgYSBsb29wKS4gV2hlbiBvbmUgc2lkZSBkb2VzIGp1bXAgYmFja3dhcmRzLCB3ZVxyXG4gICAgICAgICAgICAvLyBoYXZlIHRvIGZpZ3VyZSBvdXQgd2h5IHRoZSBvdGhlciBvbmUgZGlkbid0IHlldCBkbyBzbywgYW5kIHBlcmZvcm0gZWRpdHMgdW50aWwgaXQgZG9lcy5cclxuICAgICAgICAgICAgLy8gVmFyaW91cyBiaXRzIG9mIHRoaXMgY29kZSBjb3VsZCBiZSBtaWNyby1vcHRpbWlzZWQgbW9yZSwgZS5nLiwgbm90IHJlLWV2YWx1YXRpbmcgdGhlXHJcbiAgICAgICAgICAgIC8vICcuLi5Mb29wc0JhY2tMYXRlcicgdmFyaWFibGVzIG9uIGVhY2ggaXRlcmF0aW9uLCBidXQgaXQgc2hvdWxkIGhhdmUgdGhlIGNvcnJlY3QgTyguLi4pXHJcbiAgICAgICAgICAgIC8vIHBlcmZvcm1hbmNlIGFscmVhZHkgaW4gcmVhbGlzdGljIGNhc2VzLlxyXG4gICAgICAgICAgICBjb25zdCBvbGRTZXF1ZW5jZUxvb3BlZEJhY2sgPSBvbGRDaGlsZCAmJiBvbGRDaGlsZC5zb3VyY2VTZXF1ZW5jZSA8PSBwcmV2T2xkQ2hpbGRTb3VyY2VTZXF1ZW5jZTtcclxuICAgICAgICAgICAgY29uc3QgbmV3U2VxdWVuY2VMb29wZWRCYWNrID0gbmV3Q2hpbGQgJiYgbmV3Q2hpbGQuc291cmNlU2VxdWVuY2UgPD0gcHJldk5ld0NoaWxkU291cmNlU2VxdWVuY2U7XHJcbiAgICAgICAgICAgIGxldCB0cmVhdEFzSW5zZXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB0cmVhdEFzRGVsZXRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAob2xkU2VxdWVuY2VMb29wZWRCYWNrICYmICFuZXdTZXF1ZW5jZUxvb3BlZEJhY2spIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBuZXcgc2VxdWVuY2UgZWl0aGVyIGhhcyBzb21lIGV4dHJhIHRyYWlsaW5nIGVsZW1lbnRzIGluIHRoZSBjdXJyZW50IGxvb3AgYmxvY2tcclxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIHdlIHNob3VsZCBpbnNlcnQsIG9yIG9taXRzIHNvbWUgb2xkIHRyYWlsaW5nIGxvb3AgYmxvY2tzIHdoaWNoIHdlIHNob3VsZCBkZWxldGVcclxuICAgICAgICAgICAgICAgIHZhciBuZXdDaGlsZFNvdXJjZVNlcXVlbmNlID0gbmV3Q2hpbGQgJiYgbmV3Q2hpbGQuc291cmNlU2VxdWVuY2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3U2VxdWVuY2VMb29wc0JhY2tMYXRlciA9IG5ld0NoaWxkICYmIHRydWVGb3JBbnlBZnRlcihuZXdDaGlsZHJlbiwgbmV3Q2hpbGRJbmRleCwgbGF0ZXJDaGlsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhdGVyQ2hpbGQuc291cmNlU2VxdWVuY2UgPCBuZXdDaGlsZFNvdXJjZVNlcXVlbmNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3U2VxdWVuY2VMb29wc0JhY2tMYXRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBuZXcgc2VxdWVuY2UgaGFzIHNvbWUgZXh0cmEgdHJhaWxpbmcgZWxlbWVudHMgd2Ugc2hvdWxkIGluc2VydCBiZWZvcmUgaXQgbG9vcHMgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWF0QXNJbnNlcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbmV3IHNlcXVlbmNlIGlzIG1pc3Npbmcgc29tZSB0cmFpbGluZyBsb29wIGJsb2Nrcywgc28gd2Ugc2hvdWxkIGRlbGV0ZSB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgdHJlYXRBc0RlbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3U2VxdWVuY2VMb29wZWRCYWNrICYmICFvbGRTZXF1ZW5jZUxvb3BlZEJhY2spIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBvbGQgc2VxdWVuY2UgZWl0aGVyIGhhcyBzb21lIGV4dHJhIHRyYWlsaW5nIGVsZW1lbnRzIGluIHRoZSBjdXJyZW50IGxvb3AgYmxvY2tcclxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIHdlIHNob3VsZCBkZWxldGUsIG9yIG9taXRzIHNvbWUgbmV3IHRyYWlsaW5nIGxvb3AgYmxvY2tzIHdoaWNoIHdlIHNob3VsZCBpbnNlcnRcclxuICAgICAgICAgICAgICAgIHZhciBvbGRDaGlsZFNvdXJjZVNlcXVlbmNlID0gb2xkQ2hpbGQgJiYgb2xkQ2hpbGQuc291cmNlU2VxdWVuY2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkU2VxdWVuY2VMb29wc0JhY2tMYXRlciA9IG9sZENoaWxkICYmIHRydWVGb3JBbnlBZnRlcihvbGRDaGlsZHJlbiwgb2xkQ2hpbGRJbmRleCwgbGF0ZXJDaGlsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhdGVyQ2hpbGQuc291cmNlU2VxdWVuY2UgPCBvbGRDaGlsZFNvdXJjZVNlcXVlbmNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkU2VxdWVuY2VMb29wc0JhY2tMYXRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBvbGQgc2VxdWVuY2UgaGFzIHNvbWUgZXh0cmEgdHJhaWxpbmcgZWxlbWVudHMgd2Ugc2hvdWxkIGRlbGV0ZSBiZWZvcmUgaXQgbG9vcHMgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWF0QXNEZWxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgb2xkIHNlcXVlbmNlIGlzIG1pc3Npbmcgc29tZSB0cmFpbGluZyBsb29wIGJsb2Nrcywgc28gd2Ugc2hvdWxkIGluc2VydCB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgdHJlYXRBc0luc2VydCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4gYXNzdW1lIGJvdGggc2VxdWVuY2VzIGFyZSBwcm9jZWVkaW5nIHRocm91Z2ggdGhlIHNhbWUgbG9vcCBibG9jaywgc28ganVzdFxyXG4gICAgICAgICAgICAgICAgLy8ga2VlcCBpbnNlcnRpbmcvZGVsZXRpbmcgZnJvbSB3aGljaGV2ZXIgc2lkZSBicmluZ3MgdXMgY2xvc2VyIHRvIGJlaW5nIGluIHN5bmMuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgY2xhc3NpYyBwcmVvcmRlcmVkIG1lcmdlIGpvaW4uXHJcbiAgICAgICAgICAgICAgICBpZiAob2xkQ2hpbGQgJiYgKCFuZXdDaGlsZCB8fCBvbGRDaGlsZC5zb3VyY2VTZXF1ZW5jZSA8IG5ld0NoaWxkLnNvdXJjZVNlcXVlbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9sZENoaWxkIG11c3QgaGF2ZSBiZWVuIGRlbGV0ZWRcclxuICAgICAgICAgICAgICAgICAgICB0cmVhdEFzRGVsZXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV3Q2hpbGQgbXVzdCBoYXZlIGJlZW4gaW5zZXJ0ZWRcclxuICAgICAgICAgICAgICAgICAgICB0cmVhdEFzSW5zZXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBib3RoIHNlcXVlbmNlcyBoYXZlIG5vdyBsb29wZWQgYmFjaywgd2UgY2FuIHJlc2V0IHRoZWlyIGxvb3BlZC1iYWNrIHN0YXR1cyB1bnRpbCBpdFxyXG4gICAgICAgICAgICAgICAgLy8gaGFwcGVucyBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgIC8vIE5vdGU6IHdlIGtub3cgb2xkU2VxdWVuY2VMb29wZWRCYWNrPT09bmV3U2VxdWVuY2VMb29wZWRCYWNrIG90aGVyd2lzZSB3ZSB3b3VsZG4ndCBiZSBpbiB0aGlzIGNvZGUgcGF0aFxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFNlcXVlbmNlTG9vcGVkQmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZOZXdDaGlsZFNvdXJjZVNlcXVlbmNlID0gcHJldk9sZENoaWxkU291cmNlU2VxdWVuY2UgPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRyZWF0QXNJbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdSZWFsTm9kZTogTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdDaGlsZEtleSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciB1bmtleWVkIGVsZW1lbnRzLCB3ZSBjYW4ganVzdCBjcmVhdGUgbmV3IG9uZXMsIGFzIHRoZXJlJ3Mgbm8gbmVlZCB0byBwcmVzZXJ2ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzc29jaWF0aW9ucyB3aXRoIGFueSBlYXJsaWVyIHJlYWwgRE9NIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVhbE5vZGUgPSBjcmVhdGVSZWFsTm9kZShjb21wb25lbnRSZWYsIG5ld0NoaWxkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIGtleWVkIGVsZW1lbnRzLCBsZWF2ZSBhIHBsYWNlaG9sZGVyIHNvIHRoZSBjb3JyZWN0IHJlYWwgRE9NIGVsZW1lbnQgY2FuIGJlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHV0IGhlcmUgbGF0ZXJcclxuICAgICAgICAgICAgICAgICAgICBuZXdSZWFsTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQobmV3Q2hpbGRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0tleWVkRWxlbWVudEluZm9zW25ld0NoaWxkS2V5XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmRvbTogbmV3Q2hpbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBuZXdSZWFsTm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbE5vZGVUb0luc2VydEJlZm9yZSA9IHRhcmdldEVsZW1lbnQuY2hpbGROb2Rlc1tyZWFsRWxlbUluZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWFsTm9kZVRvSW5zZXJ0QmVmb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5pbnNlcnRCZWZvcmUobmV3UmVhbE5vZGUsIHJlYWxOb2RlVG9JbnNlcnRCZWZvcmUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKG5ld1JlYWxOb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ld0NoaWxkSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIHJlYWxFbGVtSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIHByZXZOZXdDaGlsZFNvdXJjZVNlcXVlbmNlID0gbmV3Q2hpbGQuc291cmNlU2VxdWVuY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJlYXRBc0RlbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbEVsZW0gPSB0YXJnZXRFbGVtZW50LmNoaWxkTm9kZXNbcmVhbEVsZW1JbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkQ2hpbGRLZXkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZSdsbCBkaXNwb3NlIHJlYWxFbGVtIGxhdGVyIGlmIGl0J3Mgbm8gbG9uZ2VyIGJlaW5nIHVzZWRcclxuICAgICAgICAgICAgICAgICAgICBvbGRLZXllZEVsZW1lbnRJbmZvc1tvbGRDaGlsZEtleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZkb206IG9sZENoaWxkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiByZWFsRWxlbVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbiBkaXNwb3NlIHJlYWxFbGVtIG5vdyBiZWNhdXNlIGl0IGRlZmluaXRlbHkgd29uJ3QgYmUgcmV1c2VkIGxhdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZVJlYWxFbGVtZW50KHJlYWxFbGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQucmVtb3ZlQ2hpbGQocmVhbEVsZW0pO1xyXG4gICAgICAgICAgICAgICAgb2xkQ2hpbGRJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgcHJldk9sZENoaWxkU291cmNlU2VxdWVuY2UgPSBvbGRDaGlsZC5zb3VyY2VTZXF1ZW5jZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29tZWhvdyBuZWl0aGVyIGZsYWcgd2FzIHNldC4gU2hvdWxkIG5vdCBiZSBwb3NzaWJsZS4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBGaW5hbGx5LCBmaXggdXAgYW55IHBsYWNlaG9sZGVycyB3ZSBsZWZ0IGZvciB1bm1hdGNoZWQga2V5ZWQgZWxlbWVudHNcclxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5ld0tleWVkRWxlbWVudEluZm9zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3SW5mbyA9IG5ld0tleWVkRWxlbWVudEluZm9zW2tleV07XHJcbiAgICAgICAgY29uc3Qgb2xkSW5mbyA9IG9sZEtleWVkRWxlbWVudEluZm9zW2tleV07XHJcbiAgICAgICAgaWYgKG9sZEluZm8pIHtcclxuICAgICAgICAgICAgLy8gV2UgZ3VhcmFudGVlIHRvIHByZXNlcnZlIHRoZSBvbGQgRE9NIGVsZW1lbnQncyBhc3NvY2lhdGlvbiB3aXRoIHRoaXMga2V5XHJcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQucmVwbGFjZUNoaWxkKG9sZEluZm8uZWxlbWVudCwgbmV3SW5mby5wbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgIHVwZGF0ZU5vZGUoY29tcG9uZW50UmVmLCBvbGRJbmZvLmVsZW1lbnQsIG9sZEluZm8udmRvbSwgbmV3SW5mby52ZG9tKTtcclxuICAgICAgICAgICAgb2xkSW5mby5lbGVtZW50ID0gbnVsbDsgLy8gU28gd2UgZG9uJ3QgZGlzcG9zZSBpdCBiZWxvd1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRoZXJlJ3Mgbm8gcHJpb3IgRE9NIGVsZW1lbnQgZm9yIHRoaXMga2V5XHJcbiAgICAgICAgICAgIHZhciBuZXdSZWFsTm9kZSA9IGNyZWF0ZVJlYWxOb2RlKGNvbXBvbmVudFJlZiwgbmV3SW5mby52ZG9tKTtcclxuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5yZXBsYWNlQ2hpbGQobmV3UmVhbE5vZGUsIG5ld0luZm8ucGxhY2Vob2xkZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2xkS2V5ZWRFbGVtZW50SW5mb3MpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICB2YXIgb2xkSW5mbyA9IG9sZEtleWVkRWxlbWVudEluZm9zW2tleV07XHJcbiAgICAgICAgaWYgKG9sZEluZm8uZWxlbWVudCkge1xyXG4gICAgICAgICAgICBkaXNwb3NlUmVhbEVsZW1lbnQob2xkSW5mby5lbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdHJ1ZUZvckFueUFmdGVyPFQ+KGFycmF5OiBUW10sIGFmdGVySW5kZXg6IG51bWJlciwgcHJlZGljYXRlOiAoaXRlbTogVCkgPT4gYm9vbGVhbikge1xyXG4gICAgZm9yIChsZXQgaSA9IGFmdGVySW5kZXggKyAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocHJlZGljYXRlKGFycmF5W2ldKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3Bvc2VSZWFsRWxlbWVudChlbGVtZW50OiBOb2RlKSB7XHJcbiAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRFbGVtcyA9IChlbGVtZW50IGFzIEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tfY29tcG9uZW50X3JlZl0nKTtcclxuICAgIGlmIChjb21wb25lbnRFbGVtcyAmJiBjb21wb25lbnRFbGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudFJlZnNUb0Rpc3Bvc2U6IG51bWJlcltdID0gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGNvbXBvbmVudEVsZW1zLCBlbGVtID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGVsZW0uZ2V0QXR0cmlidXRlKCdfY29tcG9uZW50X3JlZicpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwb3NlQ29tcG9uZW50cyhjb21wb25lbnRSZWZzVG9EaXNwb3NlKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5zdGFudGlhdGVDb21wb25lbnQocGFyZW50Q29tcG9uZW50UmVmOiBudW1iZXIsIHZkb21JdGVtOiBWRG9tSXRlbSkge1xyXG4gICAgY29uc3QgbmV3RWxlbUlkID0gJ19lJyArICgrK25leHRQZW5kaW5nQ29tcG9uZW50RG9jRnJhZ0lkKTtcclxuICAgIGNvbnN0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBwZW5kaW5nQ29tcG9uZW50RG9jRnJhZ3NbbmV3RWxlbUlkXSA9IGRvY0ZyYWc7XHJcblxyXG4gICAgY29uc3QgbmV3Q29tcG9uZW50UmVmID0gcGxhdGZvcm0uaW52b2tlU2ltcGxlU3RhdGljKCdCbGF6b3IuUnVudGltZScsICdCbGF6b3IuSW50ZXJvcCcsICdDb21wb25lbnRzJywgJ0luc3RhbnRpYXRlQ29tcG9uZW50JywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHBhcmVudENvbXBvbmVudFJlZjogcGFyZW50Q29tcG9uZW50UmVmLFxyXG4gICAgICAgIHZkb21JdGVtSW5kZXg6IHZkb21JdGVtLmluZGV4LFxyXG4gICAgICAgIGVsZW1lbnRSZWY6IG5ld0VsZW1JZFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlbGV0ZSBwZW5kaW5nQ29tcG9uZW50RG9jRnJhZ3NbbmV3RWxlbUlkXTtcclxuICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBkb2NGcmFnLmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBmaXJzdENoaWxkLmlkID0gbmV3RWxlbUlkO1xyXG4gICAgZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoJ19jb21wb25lbnRfcmVmJywgbmV3Q29tcG9uZW50UmVmKTtcclxuICAgIHJldHVybiBmaXJzdENoaWxkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwb3NlQ29tcG9uZW50cyhjb21wb25lbnRSZWZzOiBudW1iZXJbXSkge1xyXG4gICAgcGxhdGZvcm0uaW52b2tlU2ltcGxlU3RhdGljKCdCbGF6b3IuUnVudGltZScsICdCbGF6b3IuSW50ZXJvcCcsICdDb21wb25lbnRzJywgJ0Rpc3Bvc2VDb21wb25lbnRzJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGNvbXBvbmVudFJlZnM6IGNvbXBvbmVudFJlZnNcclxuICAgIH0pKTtcclxufVxyXG5cclxuLy8gTkVYVDpcclxuLy8gRXh0ZW5kIHRvIG5lc3RlZCBjb21wb25lbnRzIHRoYXQgZWFjaCByZWZyZXNoIHdoZW4gdGhlaXIgb3duIHByb3BzIGFyZVxyXG4vLyB1cGRhdGVkLiBOb3Qgc3VyZSBob3cgdGhpcyB3b3JrcyB3aGVuIGEgcGFyZW50IHJlZnJlc2hlcyBidXQgYSBjaGlsZCBoYXNuJ3QgcmVmcmVzaGVkLlxyXG4vLyBJIHN1cHBvc2UgaWYgdGhlIHByb3BzIGJlaW5nIHBhc3NlZCB0byB0aGUgY2hpbGQgaGF2ZW4ndCBjaGFuZ2VkLCB3ZSByZXRhaW4gdGhlIGNoaWxkXHJcbi8vIGluc3RhbmNlLCBvciBzb21ldGhpbmcuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcE1vZGVsL1ZpcnR1YWxEb20vVkRvbS50cyIsImltcG9ydCB7IFN5c3RlbV9PYmplY3QgfSBmcm9tICcuLi8uLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBWRG9tSXRlbSB9IGZyb20gJy4vVkRvbUl0ZW0nO1xyXG5cclxuY29uc3QgdmRvbVN0cnVjdFNpemVCeXRlcyA9IDQ4O1xyXG5cclxuZXhwb3J0IGNsYXNzIFZEb21JdGVtQXJyYXlSZWFkZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwdHJJdGVtMDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjb21wb25lbnRSZWY6IG51bWJlciwgdkRvbTogU3lzdGVtX09iamVjdCkge1xyXG4gICAgICAgIHRoaXMucHRySXRlbTAgPSBwbGF0Zm9ybS5nZXRIZWFwQWRkcmVzcyh2RG9tKVxyXG4gICAgICAgICAgICArIDQ7IC8vIEZpcnN0IEludDMyIGlzIHRoZSBhcnJheSBsZW5ndGgsIHdoaWNoIHdlIGRvbid0IG5lZWRcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbShpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWRG9tSXRlbSh0aGlzLCBpbmRleCwgdGhpcy5wdHJJdGVtMCArIHZkb21TdHJ1Y3RTaXplQnl0ZXMgKiBpbmRleCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcE1vZGVsL1ZpcnR1YWxEb20vVkRvbUl0ZW1BcnJheVJlYWRlci50cyIsImltcG9ydCB7IFZEb21JdGVtQXJyYXlSZWFkZXIgfSBmcm9tICcuL1ZEb21JdGVtQXJyYXlSZWFkZXInO1xyXG5pbXBvcnQgeyBTeXN0ZW1fU3RyaW5nIH0gZnJvbSAnLi4vLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uLy4uL0Vudmlyb25tZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBWRG9tSXRlbSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRlcjogVkRvbUl0ZW1BcnJheVJlYWRlciwgcHVibGljIHJlYWRvbmx5IGluZGV4OiBudW1iZXIsIHByaXZhdGUgcHRyOiBudW1iZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZWFkSW50MzJQcm9wZXJ0eShvZmZzZXRCeXRlczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHBsYXRmb3JtLnJlYWRIZWFwSW50MzIodGhpcy5wdHIgKyBvZmZzZXRCeXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVhZFN0cmluZ1Byb3BlcnR5KG9mZnNldEJ5dGVzOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgbWFuYWdlZFN0cmluZyA9IHBsYXRmb3JtLnJlYWRIZWFwT2JqZWN0KHRoaXMucHRyICsgb2Zmc2V0Qnl0ZXMpIGFzIFN5c3RlbV9TdHJpbmc7XHJcbiAgICAgICAgcmV0dXJuIHBsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyhtYW5hZ2VkU3RyaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1UeXBlKCkgeyByZXR1cm4gdGhpcy5fcmVhZEludDMyUHJvcGVydHkoMCk7IH1cclxuICAgIHB1YmxpYyBnZXQgc291cmNlU2VxdWVuY2UoKSB7IHJldHVybiB0aGlzLl9yZWFkSW50MzJQcm9wZXJ0eSg0KTsgfVxyXG4gICAgcHVibGljIGdldCBlbGVtZW50VGFnTmFtZSgpIHsgcmV0dXJuIHRoaXMuX3JlYWRTdHJpbmdQcm9wZXJ0eSg4KTsgfVxyXG4gICAgcHVibGljIGdldCBlbGVtZW50S2V5KCkgeyByZXR1cm4gdGhpcy5fcmVhZFN0cmluZ1Byb3BlcnR5KDEyKTsgfVxyXG4gICAgcHVibGljIGdldCBkZXNjZW5kYW50c0VuZEluZGV4KCkgeyByZXR1cm4gdGhpcy5fcmVhZEludDMyUHJvcGVydHkoMTYpOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHRleHROb2RlQ29udGVudHMoKSB7IHJldHVybiB0aGlzLl9yZWFkU3RyaW5nUHJvcGVydHkoMjApOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGF0dHJpYnV0ZU5hbWUoKSB7IHJldHVybiB0aGlzLl9yZWFkU3RyaW5nUHJvcGVydHkoMjQpOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGF0dHJpYnV0ZVN0cmluZ1ZhbHVlKCkgeyByZXR1cm4gdGhpcy5fcmVhZFN0cmluZ1Byb3BlcnR5KDI4KTsgfVxyXG4gICAgcHVibGljIGdldCBhdHRyaWJ1dGVFdmVudEhhbmRsZXJWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3JlYWRJbnQzMlByb3BlcnR5KDMyKTsgfVxyXG4gICAgcHVibGljIGdldCBhdHRyaWJ1dGVPYmplY3RWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3JlYWRJbnQzMlByb3BlcnR5KDM2KTsgfVxyXG4gICAgcHVibGljIGdldCBjb21wb25lbnROYW1lKCkgeyByZXR1cm4gdGhpcy5fcmVhZFN0cmluZ1Byb3BlcnR5KDQwKTsgfVxyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRJbnN0YW5jZSgpIHsgcmV0dXJuIHRoaXMuX3JlYWRJbnQzMlByb3BlcnR5KDQ0KTsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYXR0cmlidXRlVmFsdWUoKSB7XHJcbiAgICAgICAgLy8gUmV0dXJucyBhIG51bWJlciBpZiBpdCdzIGFuIGV2ZW50IGhhbmRsZXIsIG9yIGEgc3RyaW5nIGlmIGl0J3MgYSBzdHJpbmcgdmFsdWVcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVFdmVudEhhbmRsZXJWYWx1ZSB8fCB0aGlzLmF0dHJpYnV0ZVN0cmluZ1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkQXR0cmlidXRlcygpIHtcclxuICAgICAgICAvLyBQcm9jZWVkIHVudGlsIHdlIGZpbmQgYSBub24tYXR0cmlidXRlIGl0ZW0sIG9yIGdldCB0byB0aGUgZW5kIG9mIG91ciBkZXNjZW5kYW50cyBsaXN0XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBWRG9tSXRlbVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgd2Fsa0luZGV4ID0gdGhpcy5pbmRleCArIDEsIHN0b3BBZnRlckluZGV4ID0gdGhpcy5kZXNjZW5kYW50c0VuZEluZGV4OyB3YWxrSW5kZXggPD0gc3RvcEFmdGVySW5kZXg7IHdhbGtJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkZXNjZW5kYW50ID0gdGhpcy5yZWFkZXIuZ2V0SXRlbSh3YWxrSW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoZGVzY2VuZGFudC5pdGVtVHlwZSA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZGVzY2VuZGFudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlYWRDaGlsZHJlbigpIHtcclxuICAgICAgICAvLyBOb3RlOiBpZiB0aGlzIHR1cm5zIG91dCB0byBiZSBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSwgY291bGQgc3dpdGNoIHRvIGEgdmlzaXRvciBwYXR0ZXJuIHJhdGhlciB0aGFuXHJcbiAgICAgICAgLy8gY29uc3RydWN0aW5nIGFycmF5cyBvZiBjaGlsZHJlblxyXG4gICAgICAgIGxldCB3YWxrSW5kZXggPSB0aGlzLmluZGV4ICsgMTtcclxuICAgICAgICBjb25zdCBzdG9wQWZ0ZXJJbmRleCA9IHRoaXMuZGVzY2VuZGFudHNFbmRJbmRleDtcclxuICAgICAgICBsZXQgcmVzdWx0OiBWRG9tSXRlbVtdID0gW107XHJcbiAgICAgICAgd2hpbGUgKHdhbGtJbmRleCA8PSBzdG9wQWZ0ZXJJbmRleCkge1xyXG4gICAgICAgICAgICBjb25zdCBkZXNjZW5kYW50ID0gdGhpcy5yZWFkZXIuZ2V0SXRlbSh3YWxrSW5kZXgpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGRlc2NlbmRhbnQuaXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gRWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRlc2NlbmRhbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdhbGtJbmRleCA9IGRlc2NlbmRhbnQuZGVzY2VuZGFudHNFbmRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjogLy8gVGV4dCBub2RlXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IC8vIENvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRlc2NlbmRhbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3YWxrSW5kZXgrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBtYWtlRXZlbnREaXNwYXRjaGVyKCkge1xyXG4gICAgICAgIC8vIENhcHR1cmUgb25seSB3aGF0IHdlIG5lZWQgZm9yIHRoZSBldmVudCBkaXNwYXRjaGVyIHNvIHdlIGRvbid0IHBpbiB0aGUgVkRvbUl0ZW0gdW5uZWNlc3NhcmlseVxyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucmVhZGVyLmNvbXBvbmVudFJlZjtcclxuICAgICAgICBjb25zdCB2ZG9tSXRlbUluZGV4ID0gdGhpcy5pbmRleDtcclxuICAgICAgICByZXR1cm4gKGV2dDogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQoZXZ0LCBjb21wb25lbnRSZWYsIHZkb21JdGVtSW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2dDogRXZlbnQsIGNvbXBvbmVudFJlZjogbnVtYmVyLCB2ZG9tSXRlbUluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBldnQudGFyZ2V0O1xyXG4gICAgY29uc3QgaXNDaGVja2JveCA9IHRhcmdldEVsZW1lbnRbJ3R5cGUnXSA9PT0gJ2NoZWNrYm94JztcclxuICAgIHBsYXRmb3JtLmludm9rZVNpbXBsZVN0YXRpYygnQmxhem9yLlJ1bnRpbWUnLCAnQmxhem9yLkludGVyb3AnLCAnRXZlbnRzJywgJ0Rpc3BhdGNoSW5jb21pbmcnLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgY29tcG9uZW50UmVmOiBjb21wb25lbnRSZWYsXHJcbiAgICAgICAgdmRvbUl0ZW1JbmRleDogdmRvbUl0ZW1JbmRleCxcclxuICAgICAgICBldmVudEluZm86IHtcclxuICAgICAgICAgICAgdHlwZTogZXZ0LnR5cGUsXHJcbiAgICAgICAgICAgIHRhcmdldFZhbHVlOiBpc0NoZWNrYm94ID8gdGFyZ2V0RWxlbWVudFsnY2hlY2tlZCddIDogdGFyZ2V0RWxlbWVudFsndmFsdWUnXVxyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwTW9kZWwvVmlydHVhbERvbS9WRG9tSXRlbS50cyIsImltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBTeXN0ZW1fT2JqZWN0LCBNZXRob2RIYW5kbGUgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcblxyXG5sZXQgbm90aWZ5UmVxdWVzdENvbXBsZXRlZE1ldGhvZDogTWV0aG9kSGFuZGxlO1xyXG5cclxucGxhdGZvcm0ucmVnaXN0ZXJDYWxsYWJsZU1ldGhvZCgnSHR0cENsaWVudF9Jc3N1ZVJlcXVlc3QnLCBpc3N1ZVJlcXVlc3QpO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gaXNzdWVSZXF1ZXN0KHJlcXVlc3Q6IFJlcXVlc3RNZXNzYWdlKSB7XHJcbiAgICBpZiAoIW5vdGlmeVJlcXVlc3RDb21wbGV0ZWRNZXRob2QpIHtcclxuICAgICAgICBub3RpZnlSZXF1ZXN0Q29tcGxldGVkTWV0aG9kID0gcGxhdGZvcm0uZmluZE1ldGhvZCgnQmxhem9yLlJ1bnRpbWUnLCAnQmxhem9yLlJ1bnRpbWUuRmFrZUJjbCcsICdIdHRwQ2xpZW50JywgJ05vdGlmeVJlcXVlc3RDb21wbGV0aW9uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdERlc2NyaXB0b3I6IHN0cmluZztcclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gVE9ETzogVXNlIFhIUiBzbyBhcyB0byBzdXBwb3J0IG9sZCBicm93c2Vyc1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdC51cmwpO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlQm9keVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgcmVzdWx0RGVzY3JpcHRvciA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgaGFuZGxlOiByZXF1ZXN0LmNvbXBsZXRpb25IYW5kbGUsXHJcbiAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlQm9keVRleHQsXHJcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICBjb25zdCByZXN1bHREZXNjcmlwdG9yID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBoYW5kbGU6IHJlcXVlc3QuY29tcGxldGlvbkhhbmRsZSxcclxuICAgICAgICAgICAgZXJyb3I6IGV4LnRvU3RyaW5nKClcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF0Zm9ybS5jYWxsTWV0aG9kKG5vdGlmeVJlcXVlc3RDb21wbGV0ZWRNZXRob2QsIG51bGwsIFtwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhyZXN1bHREZXNjcmlwdG9yKV0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwbGF0Zm9ybS5jYWxsTWV0aG9kKG5vdGlmeVJlcXVlc3RDb21wbGV0ZWRNZXRob2QsIG51bGwsIFtwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhyZXN1bHREZXNjcmlwdG9yKV0pO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdE1lc3NhZ2Uge1xyXG4gICAgY29tcGxldGlvbkhhbmRsZTogc3RyaW5nO1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcE1vZGVsL0h0dHBDbGllbnQudHMiLCIvLyBUT0RPOiBNaWdyYXRlIHRoaXMgdG8gc2FuZXItbG9va2luZyBUeXBlU2NyaXB0IGFuZCB1c2UgdGhlIHBsYXRmb3JtLnJlZ2lzdGVyQ2FsbGFibGVNZXRob2QgQVBJXHJcbi8vIGluc3RlYWQgb2YgZGVmaW5pbmcgYW5vdGhlciBnbG9iYWxcclxuXHJcbndpbmRvd1snanNvYmplY3QuanMnXSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX25leHRPYmplY3RJZCA9IDA7XHJcbiAgICB2YXIgX3RyYWNrZWRPYmplY3RzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0T2JqZWN0RnJvbUlkKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGlkID09PSAwID8gd2luZG93IDogX3RyYWNrZWRPYmplY3RzW2lkLnRvU3RyaW5nKCldO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvSW50ZXJvcFZhbHVlKHZhbCkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbCkge1xyXG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpZCA9ICsrX25leHRPYmplY3RJZDtcclxuICAgICAgICAgICAgICAgIF90cmFja2VkT2JqZWN0c1tpZC50b1N0cmluZygpXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3QoY29uc3RydWN0b3IsIGFyZ3MpIHtcclxuICAgICAgICBmdW5jdGlvbiBGKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEYucHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xyXG4gICAgICAgIHJldHVybiBuZXcgKEYgYXMgYW55KSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRJbmNvbWluZ0FyZyhzdXBwbGllZEFyZykge1xyXG4gICAgICAgIHN3aXRjaCAoc3VwcGxpZWRBcmcudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOiByZXR1cm4gZ2V0T2JqZWN0RnJvbUlkKHN1cHBsaWVkQXJnLnZhbHVlKTtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHN1cHBsaWVkQXJnLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIF9SZWxlYXNlSlNPYmplY3Q6IGZ1bmN0aW9uIChkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBfdHJhY2tlZE9iamVjdHNbZGVzY3JpcHRvcl07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX0dldFByb3BlcnR5OiBmdW5jdGlvbiAoZGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBkZXNjcmlwdG9yLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RJZCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcclxuICAgICAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IHBhcnRzWzFdO1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gZ2V0T2JqZWN0RnJvbUlkKG9iamVjdElkKTtcclxuICAgICAgICAgICAgdmFyIHByb3BWYWx1ZSA9IG9ialtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZW9mIHByb3BWYWx1ZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0b0ludGVyb3BWYWx1ZShwcm9wVmFsdWUpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9TZXRQcm9wZXJ0eTogZnVuY3Rpb24gKGRlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IGRlc2NyaXB0b3I7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBnZXRPYmplY3RGcm9tSWQocGFyc2VkLmpzT2JqZWN0SWQpO1xyXG4gICAgICAgICAgICB0YXJnZXRbcGFyc2VkLm5hbWVdID0gcmVhZEluY29taW5nQXJnKHBhcnNlZC52YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX0ludm9rZUZ1bmN0aW9uOiBmdW5jdGlvbiAoZGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICB2YXIgcGFyc2VkID0gZGVzY3JpcHRvcjtcclxuICAgICAgICAgICAgdmFyIHRoaXNWYWx1ZSA9IGdldE9iamVjdEZyb21JZChwYXJzZWQudGhpc1ZhbHVlSWQpO1xyXG4gICAgICAgICAgICB2YXIgZnVuY3Rpb25JbnN0YW5jZSA9IHBhcnNlZC5mdW5jdGlvbklkXHJcbiAgICAgICAgICAgICAgICA/IGdldE9iamVjdEZyb21JZChwYXJzZWQuZnVuY3Rpb25JZClcclxuICAgICAgICAgICAgICAgIDogdGhpc1ZhbHVlW3BhcnNlZC5mdW5jdGlvblByb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgIHZhciBzdXBwbGllZEFyZ3MgPSBwYXJzZWQuYXJncy5tYXAocmVhZEluY29taW5nQXJnKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHBhcnNlZC53aXRoTmV3XHJcbiAgICAgICAgICAgICAgICA/IGNvbnN0cnVjdChmdW5jdGlvbkluc3RhbmNlLCBzdXBwbGllZEFyZ3MpXHJcbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uSW5zdGFuY2UuYXBwbHkodGhpc1ZhbHVlLCBzdXBwbGllZEFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZW9mIHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0b0ludGVyb3BWYWx1ZShyZXN1bHQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBNb2RlbC9KU09iamVjdC50cyJdLCJzb3VyY2VSb290IjoiIn0=