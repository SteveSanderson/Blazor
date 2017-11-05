@rem Build WASM version of Mono
emcc -g4 -Os -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s BINARYEN=1 -s "BINARYEN_TRAP_MODE='clamp'" -s "BINARYEN_METHOD='native-wasm'"  -s TOTAL_MEMORY=134217728 -s ALIASING_FUNCTION_POINTERS=0 --js-library library_mono.js driver.c libmonosgen-2.0.a -o dist/wasm/mono.js

@rem Build asm.js version of Mono
@rem It works better to build the different formats separately intead of defining multiple BINARYEN_METHOD entries,
@rem because we want different selection and fallback logic than Emscripten generates on its own
emcc -Os -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s BINARYEN=1 -s "BINARYEN_TRAP_MODE='clamp'" -s "BINARYEN_METHOD='asmjs'"  -s TOTAL_MEMORY=134217728 -s ALIASING_FUNCTION_POINTERS=0 --js-library library_mono.js driver.c libmonosgen-2.0.a -o dist/asmjs/mono.js
