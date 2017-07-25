import * as ts from "ntypescript";
import * as fs from "fs";

var fileName;
for (var i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === "--") {
        fileName = process.argv[i + 1];
        break;
    }
}

if (i === process.argv.length) {
    throw "Could not find parameter delimiter";
}

fs.readFile(fileName, (error, data) => {
    if (error) {
        return console.error(error);
    }
    var sourceCode = data.toString();
    var sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.ES6, true);

    // console.log(JSON.stringify(sourceFile)) 

    // Note: cache should not be re-used by repeated calls to JSON.stringify.
    var cache = [];
    console.log(JSON.stringify(sourceFile, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    }));
    cache = null; // Enable garbage collection
});