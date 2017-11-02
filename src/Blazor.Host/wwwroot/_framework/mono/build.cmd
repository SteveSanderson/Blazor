@rem If you want to add other binaryen modes (e.g., asm.js), you will need to
@rem remove the "-g4" (makes it crash otherwise)
emcc -g4 -Os -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s BINARYEN=1 -s "BINARYEN_TRAP_MODE='clamp'" -s "BINARYEN_METHOD='native-wasm'"  -s TOTAL_MEMORY=134217728 -s ALIASING_FUNCTION_POINTERS=0 --js-library library_mono.js driver.c libmonosgen-2.0.a -o mono.js
