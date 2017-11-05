@echo off

setlocal
for /f %%a in ('wmic os get LocalDateTime ^| findstr \.') do set tmp=%%a
set timestamp=%tmp:~0,14%
endlocal & set versionsuffix=t-%timestamp%

echo Building packages with version suffix %versionsuffix%...
dotnet pack Blazor.Core.sln /property:VersionSuffix=%versionsuffix%
