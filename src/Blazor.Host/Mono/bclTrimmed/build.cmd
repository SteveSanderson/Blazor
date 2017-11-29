cd %~dp0
robocopy /mir /ndl /nfl /njh ..\bcl .\dist
dotnet ..\..\..\BuildUtils\ILStrip\bin\Debug\netcoreapp2.0\ilstrip.dll strip -a dist\mscorlib.dll -o dist\mscorlib.stripped.dll -s ilstrip-spec.txt
move /y dist\mscorlib.stripped.dll dist\mscorlib.dll
