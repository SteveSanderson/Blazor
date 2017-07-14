@echo off

rem It's important to clean the template dir first, otherwise we'll include things like bin and obj in the template
git clean -xdf .\template

rem Restore NuGet packages for SideWaffle so it can build the template
build\nuget.exe restore template\Blazor.VSExtension\ -SolutionDirectory .

rem Replace launchSettings.json (which VS keeps editing) with sw-launchSettings.json (which remains clean)
rem Note that file whose name starts "sw-" are automatically omitted from the project template
copy /y .\template\MyApplication\Properties\sw-launchSettings.json .\template\MyApplication\Properties\launchSettings.json

rem Actually build the VSIX
SET msbuildExePath="C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\MSBuild.exe"
%msbuildExePath% template\Blazor.VSExtension\Blazor.VSExtension.csproj

rem Move launchSettings.json back to clean state
git checkout .\template\MyApplication\Properties\launchSettings.json