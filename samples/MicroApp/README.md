# Blazor MicroApp

This is an experiment in making a Blazor app as small as possible using code stripping and compression.

The resulting application is 781KB (for the wasm version, fractionally more for the asm.js version).

To run it,

* Run `build.cmd`
  * Ignore all the *Could not resolve type/assembly...* warnings
* Run `serve.cmd`
  * This is a simple file server with gzip compression enabled. It doesn't have any runtime functionality beside just serving files from disk. It's *not* the Blazor host server.
  * This will produce an app whose tranferred size is ~800KB. If you want to reduce it to 781KB, see the instructions under *Compression* below.

TODO: Fix `ilstrip` so that it doesn't try to use `System.Private.CoreLib` references (although this doesn't cause errors unless you try to invoke a stripped method, in which case you'll get an unrelated-seeming error about this)

## .NET assembly trimming

To make the .NET assemblies as small as possible, there are several phases of size reduction.

### 1. IL stripping

In the next phase, Mono's `illinker` performs static analysis on the .NET assemblies and will remove unused methods. But on its own, that won't produce a great result, because so many methods are theoretically reachable at runtime even though in practice they won't be called.

To improve this, as first phase, the build process for `Blazor.Host` runs the internal tool `ilstrip` to remove the method bodies from many parts of `mscorlib.dll` that aren't required at runtime even though a static analyzer would think they might be. This doesn't make make `mscorlib.dll` much smaller on its own (because all the method metadata is still there), but it means that `illinker` will see that many more methods are orphaned and will remove them completely.

It's beneficial not to remove the actual methods at this stage (and only remove their bodies) so that
during development time, if there were any calls to the stripped methods, then the developer would
get a clear error message saying which method they are calling that has been stripped.

#### How we know which methods to strip

In this prototype there's nothing to stop too many methods being removed (leading to runtime errors), or too few (leading to size inefficency). Currently there's just a large hardcoded list of types and methods to preserve in `ilstrip-spec.txt`, with everything else being removed.

### 2. IL linker

Next, `build.cmd` uses the Mono `illink` tool to statically analyze the app's DLLs and remove unreachable methods. The commands we pass whitelist everything in the app itself, including its views assembly (which in a real implementation would have to get generated at publish time, if not on every build) and the Blazor runtime DLL since much of it is reached from JS calls that aren't visible to the static analyzer.

The resulting `mscorlib.dll` is about 598KB, which can gzip down to 210KB (under 7zip's "Ultra" compression level).

### 3. Copying facades

For uninvestigated reasons, the runtime still needs to be able to find the facade assemblies. This shouldn't be necessary. With more investigation, it should be possible to eliminate all these since `illink` is meant to have removed all references to them.

## WASM stripping

The original `mono.wasm` is 2.17MB uncompressed, and was reduced to 987KB uncompressed == 328KB under gzip 'ultra' compression, by removing uncalled functions.

To see how this was done, look at comments in `tools\WasmStrip\wasm-strip.js`. The basic approach was to log which WASM functions were actually invoked during a particular usage of the app (logged by instrumenting the WASM to call a 'log' function on each such invocation), then to remove all the other WASM functions from the source.

The edits were performed on a temporary WAST representation of the WASM file. This is much easier to work with than either the asm.js intermediate representation produced during the emscripten build process and of course the binary WASM file.

NOTE: The `build.cmd` in this directory does not automate the process of WASM stripping. It was done manually on a one-time basis.

## ASM.JS stripping

The original `mono.asm.js` is 6.4MB uncompressed, and was reduced to 926KB after code stripping and minification uncompressed == 198KB under gzip 'ultra' compression. Note that the asm.js version also needs to load `mono.js.mem` which makes up the size difference vs the wasm build.

To see how this was done, look at  `tools\AsmJsStrip\asmjs-strip.js`. It's the same approach used for the WASM stripping, but applied to the asmjs source file. This is a little easier than doing it for WASM because fewer file type conversions are involved, plus you can directly call a JS function from asm.js to log function usage without having to go through emscripten APIs.

NOTE: The `build.cmd` in this directory does not automate the process of ASM.JS stripping. It was done manually on a one-time basis.

### JS minification

The `mono.js` and `Blazor.Host.js` files were minified using a regular JS minifier.

NOTE: The `build.cmd` in this directory does not automate the process of JS minification. It was done manually on a one-time basis.

## Compression

The demo server enables gzip compression, which greatly reduces the transferred app size.

However, .NET Core's gzip compression doesn't produce results as small as 7zip's 'ultra' compression level, so if you want to see the smallest possible transferred app size, pick any of the bigger uncompressed files and put a .gz file with the same name alongside it on disk. The demo server will use that as the compressed response. Doing this for `mscorlib.dll` and `mono.wasm` reduces the transferred app size from 828KB to 781KB.

## Realistic plan

* For the .NET assembly stripping, instead of having a massive list of methods to preserve, it would be better to figure out a relatively minimal set of methods to be stripped that would unlink large parts of `mscorlib.dll` from the call graph. Then if a developer chooses to invoke those otherwise-unreachable methods themselves, `illinker` would leave them in, but if they don't, then `illinker` would remove them. This keeps APIs usable without the size penalty for those not using them. Deciding which clusters of methods to forcibly detach (by killing certain entrypoint methods) is subjective and needs more analysis. This would all be much safer and easier to understand.
* For the WASM/ASM.JS stripping, it should be possible to use the same approach of logging function usage. This should be an automated part of the Blazor framework build process, in that it can automate a browser running through a fairly comprehensive set of test pages, determining with high confidence the full extent of WASM functions reachable using Blazor APIs. The `mono.wasm`/`mono.asm.js` files can then be distributed pre-stripped without needing any further stripping during application builds.
