The DNA project is originally at https://github.com/chrisdunelm/DotNetAnywhere, though
has not recently been maintained (~ 5 years). See the 'src' directory for license info.

In this copy of the DNA code, various changes have been made, e.g.:
 - To support building with Emscripten
 - To support p/invoke calls from .NET to JavaScript
 - To add other interop primitives, e.g., GCHandle
 - To receive inbound calls from JavaScript to .NET
 - To fix some bugs
 - To support loading .NET Core-style assemblies

Likewise, the corlib.csproj project has been extended to support extra APIs.

HOW TO BUILD
============

1. Install the Emscripten SDK. I've verified it works with emscripten-1.37.9.
   Newer SDKs should also work.
2. In the command prompt you'll build from, activate that SDK
   (e.g., in your emscripten SDK directory, run "emsdk activate")
3. Run build.cmd

If the build succeeds, it will write updated .js/.wasm files to the Blazor.Host
directory. You can then rebuild that package and dependent packages (e.g., the sample
application).
