@echo off

@rem -- Restoring/building corlib first because of this issue: https://github.com/Microsoft/msbuild/issues/2065
@rem --
@rem -- Other projects have to be built in a specific order, because they mostly consume each other via package
@rem -- references rather than project references. This is necessary because regular project references aren't
@rem -- included transitively for things shipped as packages (i.e., it's not clear what the .NET Core MSBuild
@rem -- equivalent to IncludeReferencedProjects is), and also because the template app can only obtain the
@rem -- dotnet custom tool and MSBuild targets by consuming the framework projects as actual packages.
@rem --
@rem -- Unfortunately this also means that whenever you edit and rebuild a framework project, you have to manually
@rem -- "dotnet restore" in any other projects that consume it.
for %%s in (
    "src\DNA\corlib"
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
