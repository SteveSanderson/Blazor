@echo off

@rem -- Building corlib using .NETFramework/mono tools (not .NET Core) because it needs to use NoStdLib option, and
@rem -- I haven't figured out how to configure the equivalent to that with .NET Core build tools.
SET msbuildExePath="C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\MSBuild.exe"
%msbuildExePath% src\DNA\corlib\corlib.csproj

@rem -- Other projects have to be built in a specific order, because they mostly consume each other via package
@rem -- references rather than project references. This is necessary because regular project references aren't
@rem -- included transitively for things shipped as packages (i.e., it's not clear what the .NET Core MSBuild
@rem -- equivalent to IncludeReferencedProjects is), and also because the template app can only obtain the
@rem -- dotnet custom tool and MSBuild targets by consuming the framework projects as actual packages.
@rem --
@rem -- Unfortunately this also means that whenever you edit and rebuild a framework project, you have to manually
@rem -- "dotnet restore" in any other projects that consume it.
for %%s in (
    "src\AngleSharp"
    "src\Blazor.Runtime"
    "src\Blazor.Compiler"
    "src\Blazor.Host"
    "template\MyApplication"
) do (
    dotnet restore %%s
    if ERRORLEVEL 1 goto :fail

    dotnet build %%s
    if ERRORLEVEL 1 goto :fail
)

:done
@echo ---
@echo Build succeeded
@exit /b 0

:fail
@echo ---
@echo Build failed
@exit /b %ERRORLEVEL%
