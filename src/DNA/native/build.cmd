@echo off
setlocal enabledelayedexpansion
cd /d %~dp0

set sourceFiles=
for /f "delims=" %%a in ('dir /b src\*.c') do set sourceFiles=!sourceFiles! src\%%a

set emccOptions= %sourceFiles% ^
	-Wno-pointer-sign ^
	-Oz ^
	-s NO_EXIT_RUNTIME=1 ^
	-s RESERVED_FUNCTION_POINTERS=20 ^
	-s ASSERTIONS=1 ^
	-s EXPORTED_FUNCTIONS="['_main', '_JSInterop_CallDotNet']" ^
	-s WASM=1 ^
	--js-library js-interop.js

set outputRoot=..\..\Blazor.Host\wwwroot\_framework

echo -------------------------------------------
echo --- Starting native web assembly build
call emcc %emccOptions% -s "BINARYEN_METHOD='native-wasm'" -o %outputRoot%\wasm\dna.js

echo -------------------------------------------
echo --- Starting asm.js build
call emcc %emccOptions% -s "BINARYEN_METHOD='asmjs'" -o %outputRoot%\asmjs\dna.js
