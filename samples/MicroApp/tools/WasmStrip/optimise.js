const fs = require('fs');
const path = require('path');
const Binaryen = require('./binaryen');
const wasmPath = process.argv[2];

var module = Binaryen.readBinary(fs.readFileSync(wasmPath));
module.optimize();
fs.writeFileSync(wasmPath + '.optimised.wasm', new Buffer(module.emitBinary()));
