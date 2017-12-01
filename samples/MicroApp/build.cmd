cd %~dp0
robocopy /mir /ndl /nfl /njh src dist
tools\illink\illink.exe -a src\_bin\MicroApp.dll -a src\_bin\MicroApp.Views.dll -a src\_bin\Blazor.Runtime.dll -d ..\..\src\Blazor.Host\Mono\bclTrimmed\dist\ -d ..\..\src\Blazor.Host\Mono\bclTrimmed\dist\Facades -c link -out dist\_framework\Mono\bcl --skip-unresolved true
robocopy /mir /ndl /nfl /njh ..\..\src\Blazor.Host\Mono\bclTrimmed\dist\Facades dist\_framework\Mono\bcl\Facades
