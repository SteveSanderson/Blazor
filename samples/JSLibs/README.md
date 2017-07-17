# JS interop notes

This class library is an experiment in a different way to interop between C# and JS, specifically
for the case where you want to wrap an existing third-party JS library so it can called from C#.

The `JSObject` and `JSObjectHandle` classes give you project objects for invoking parts of the JS
API surface from C#. But rather than use these directly, the idea is that you'd have a set of C#
classes that encapsulate them, producing clean intellisense for consumers.

The Bootstrap `Modal.cs` is an example of this, in that it makes it possible to do:

    new Modal(elem).Show();

... which is directly equivalent to what you'd write in JS/TS.

### Generating the wrapper classes

Rather than hand-authoring the wrapper classes such as `Modal.cs` (etc.), it would be great if
they could be auto-generated from TypeScript .d.ts declaration files. Then all APIs accessible
to TypeScript would be equally convenient to reach from C#. This could even be done from tooling
(e.g., click some "Add JS library types" option, type in the package name for the @types definitions,
and we generate it for you).
