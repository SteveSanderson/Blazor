@echo off

setlocal
for /f %%a in ('wmic os get LocalDateTime ^| findstr \.') do set tmp=%%a
set timestamp=%tmp:~0,14%
endlocal & set versionsuffix=t-%timestamp%

echo Building packages with version suffix %versionsuffix%...
dotnet build --no-restore ^
       src\Blazor.Host\Blazor.Host.csproj ^
       /property:GeneratePackageOnBuild=true ^
       /property:VersionSuffix=%versionsuffix%
