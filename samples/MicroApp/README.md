# Blazor MicroApp

This is an experiment in making a Blazor app as small as possible using code stripping and compression.

To run it,

* Run `build.cmd`
  * Ignore all the *Could not resolve type/assembly...* warnings
* TODO: Add gzip-enabled server and instructions for running it here
* TODO: Fix `ilstrip` so that it doesn't try to use `System.Private.CoreLib` references (although this doesn't cause errors unless you try to invoke a stripped method, in which case you'll get an unrelated-seeming error about this)

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

Ideally, in the future we'd figure out a relatively minimal set of methods to be stripped that would unlink large parts of `mscorlib.dll` from the call graph. Then if a developer chooses to invoke those otherwise-unreachable methods themselves, `illinker` would leave them in, but if they don't, then `illinker` would remove them. This keeps APIs usable without the size penalty for those not using them. Deciding which clusters of methods to forcibly detach (by killing certain entrypoint methods) is subjective and needs more analysis.

