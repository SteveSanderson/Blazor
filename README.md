# Blazor

**An experimental web UI framework using C#/Razor and HTML, running client-side via WebAssembly**

The arrival of WebAssembly creates the possibility of building client-side web applications using languages and runtimes that are more typically used for native app development. Blazor runs .NET code in the browser via a small, portable .NET runtime called DotNetAnywhere (DNA) compiled to WebAssembly.

The programming model will be familiar to anyone who's worked with Razor (the C#/HTML page format used by ASP.NET MVC and ASP.NET Pages).

To get started building an app or working on Blazor itself, see [Getting Started](#getting-started).

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

## Getting started

You can either [build an app with Blazor](#building-an-app-with-blazor), or you can [hack on Blazor itself](#hacking-on-blazor-itself).

### Building an app with Blazor

Install [the VS extension](https://github.com/SteveSanderson/Blazor/releases/download/v0.2.1/Blazor.VSExtension.vsix), then use *File->New project*, and choose *Blazor Application* from the *Web* category.

To start the application in VS, just press F5 or Ctrl+F5 as usual.

To start the application on the command line, run `dotnet blazor serve`.

Once your app is running, you can edit its `cshtml` files, and the application will update automatically.

This project template gives you a standalone Blazor application. That is, it's not hosted on an ASP.NET server (at least, not one you can see). The idea is that ultimately you could deploy your client-side Blazor app as a set of purely static files that could be served from any web technology (Rails, PHP, a static file host, etc.). Therefore, server-side prerendering is not supported in this mode.

If you want to see a Blazor app hosted within an ASP.NET server, with server-side prerendering support, see the `ClientServerApp` sample mentioned in the next section.

**What about cross-platform CLI developers?**

This should all work on Linux/macOS since .NET Core is cross platform, but I just haven't made a `dotnet new` template for it yet.

### Hacking on Blazor itself

If you want to extend Blazor itself, the setup is a bit more involved.

#### Prerequisites

* **.NET Core 2.0 preview 3** or later. I've been using [SDK build 6764](https://dotnetcli.azureedge.net/dotnet/Sdk/2.0.0-preview3-006764/dotnet-sdk-2.0.0-preview3-006764-win-x64.exe).
* **Visual Studio 2017.3** or later. I've been using VS2017.3 Preview 3 and Preview 4. Older preview versions don't work.

#### Instructions

* Clone this repo
* In a command prompt at the root of the repo, run `dotnet restore Blazor.Core.sln`
* Now open `Blazor.Core.sln` in VS2017.3
* Expand `samples`, then `ClientServerApp`, then right click on `ClientServerApp.Server` and choose "*Set as StartUp Project*".
* Launch the application using Ctrl+F5

You can now work on the sample application, or modify the Blazor runtime, compiler, host, or the `corlib` project. You can also debug into any of these projects when they executing on the server (e.g., during runtime Razor compilation or server-side prerendering).

**Warning:** For some reason it seems necessary to use *Rebuild all* after making changes to the Blazor projects: just building the sample application alone doesn't get the changes, even though it has a project reference to the Blazor library projects. Let me know if you can solve this!

#### Hacking on the DNA runtime

If you want to make changes to the DNA runtime itself, which is written in C and compiled with Emscripten (for example, to support new corlib features), see [these instructions](https://github.com/SteveSanderson/Blazor/blob/master/src/DNA/native/README.md).

#### Working on the project template and Visual Studio extension

The project template and VS extension are in a different solution, `Blazor.ProjectTemplate.sln`. This is because the project template project needs to reference the Blazor libraries via NuGet package references, *not* project references, because it depends on `<DotNetCliToolReference>`. So, it can only be compiled once you've built the `*.nupkg` files for the Blazor packages. To do this:

* At the project root, run `dotnet restore Blazor.Core.sln` if you didn't already
* Run `build-packages.cmd` to create a set of NuGet package files in your local `artifacts` dir
* Run `dotnet restore Blazor.ProjectTemplate.sln` so it picks up your new `nupkg` files
* Optionally, if you want a `.vsix` file you could redistribute, run `build-vsextension.cmd`. The `.vsix` file will appear in your `artifacts` directory.

Now you can open `Blazor.ProjectTemplate.sln` in Visual Studio. If your VS instance doesn't already have the *Visual Studio extension development* toolset installed, it will prompt you to install that. And yes, you do actually need to do that.

Finally, you can either:

* Set the `MyApplication` project as the startup project and launch it (Ctrl+F5) as a standalone app. This is equivalent to what a developer will get when they create a project with the template.
* Or, set the `Blazor.VSExtension` project as the startup project and launch it (Ctrl+F5). This will launch the Visual Studio Experimental instance with the project template installed into it, so you can create a new project with it.

