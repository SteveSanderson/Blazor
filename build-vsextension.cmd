@echo off

rem It's important to clean the template dir first, otherwise we'll include things like bin and obj in the template
git clean -xdf .\template

rem Restore NuGet packages for SideWaffle so it can build the template
build\nuget.exe restore template\Blazor.VSExtension\ -SolutionDirectory .

rem Actually build the VSIX
SET msbuildExePath="C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\MSBuild.exe"
%msbuildExePath% template\Blazor.VSExtension\Blazor.VSExtension.csproj
