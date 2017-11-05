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
        return new (F as any)();
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
