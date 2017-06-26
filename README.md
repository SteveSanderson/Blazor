# Blazor

**An experimental web UI framework using C#/Razor and HTML, running client-side via WebAssembly**

The arrival of WebAssembly creates the possibility of building client-side web applications using languages and runtimes that are more typically used for native app development. Blazor runs .NET code in the browser via a small, portable .NET runtime called DotNetAnywhere (DNA) compiled to WebAssembly.

The programming model will be familiar to anyone who's worked with Razor (the C#/HTML page format used by ASP.NET MVC and ASP.NET Pages).

## Getting started

**VS2017 users**: Install [the VS extension](https://github.com/SteveSanderson/Blazor/releases/download/v0.2.0/Blazor.VSExtension.vsix), then use *File->New project*, and choose *Blazor Application* from the *Web* category.

To start the application in VS, just press F5 or Ctrl+F5 as usual.

**Cross-platform CLI users**: I haven't yet published a template package for CLI, so you'd have to clone this repo and run the *MyApplication* template app directly. But it would be easier for you to use VS2017 if you can.

To start the application on the command line in development mode, run `dotnet blazor serve`.

## Questions

### Could something like this really be practical? How big would the apps be to download?

Yes, it could be practical. A "hello world" app that runs Razor in the browser with this template is around 300KB, which is smaller than typical apps from some other single-page-app (SPA) frameworks. That 300KB includes everything: the small .NET runtime, core libraries, application code, and wrapper libraries needed to bootstrap and interop with the WebAssembly code.

That's before any real optimisation attempt. If there was a proper attempt at code stripping to remove all non-called corlib code, it could get smaller.

### What about browsers that don't support WebAssembly?

It still works fine there too. WebAssembly is designed to fall back on a JavaScript polyfill easily. The template in this repo automatically detects if the browser doesn't support WebAssembly, and loads an asm.js version instead. Performance is still surprisingly good.

### Is this actually .NET in the browser?

It's not the regular .NET Framework or .NET Core runtime. It's a third-party .NET runtime called DotNetAnywhere, which has been updated and extended in various ways to support being compiled to WebAssembly, to load and run .NET Core assemblies, and with some additional functionality such as basic reflection and so on.

### Can I build a real production app with this?

No. It's incredibly incomplete. For example, many of the .NET APIs you would expect to be able to use are not implemented.

### Why isn't there an issue tracker? How do I file issues?

You don't file issues. There's no support for this. It's experimental.

If you would like to contribute, you can submit a pull request though.

### Why does this exist?

To see how well such a framework might work, and how much anyone would care. Note that it's a personal project rather than an official Microsoft project.
