cmake_minimum_required (VERSION 3.6)

set (CMAKE_C_COMPILER emcc)
set (CMAKE_CXX_COMPILER emcc)

set (CMAKE_INSTALL_PREFIX ${CMAKE_CURRENT_SOURCE_DIR}/../../Blazor.Host/wwwroot/_framework)
set (CMAKE_CXX_FLAGS "-Wno-pointer-sign")
set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Oz")
set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s NO_EXIT_RUNTIME=1")
set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s RESERVED_FUNCTION_POINTERS=20")
set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ASSERTIONS=1")
set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s EXPORTED_FUNCTIONS=\"['_main', '_JSInterop_CallDotNet', '_Debugger_Continue', '_Debugger_SetBreakPoint', '_Debugger_Step', '_Debugger_Reset', '_Debugger_Clear_BreakPoints']\"")
set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s WASM=1")
set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --js-library js-interop.js")

file(GLOB SOURCES src/*.c)

add_executable(wasm ${SOURCES})
set_target_properties(wasm PROPERTIES OUTPUT_NAME "dna.js")
target_compile_options(wasm PRIVATE -s BINARYEN_METHOD='native-wasm')
install(TARGETS wasm
DESTINATION ./wasm/)

add_executable(asmjs ${SOURCES})
set_target_properties(asmjs PROPERTIES OUTPUT_NAME "dna.js")
target_compile_options(asmjs PRIVATE -s BINARYEN_METHOD='asmjs')
install(TARGETS asmjs
        DESTINATION ./asmjs/)
