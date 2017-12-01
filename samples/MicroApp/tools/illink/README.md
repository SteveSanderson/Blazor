This build of `illink.exe` was created from a patched version of Mono's linker, modified so that it can handle unresolvable methods/types (because the `mscorlib.dll` that we have for the WASM version of Mono does contain some of these). 

To build this patched version,

```
git clone https://github.com/mono/linker.git
cd linker
git checkout af38cba01f5c248b814775d6fb7febbc9bc80d8e
git submodule init
git submodule update
git apply "<path>\Blazor\samples\MicroApp\tools\illink\patches\linker_handle_missing_items.patch"
cd cecil
git apply "<path>\Blazor\samples\MicroApp\tools\illink\patches\cecil_handle_missing_items.patch"
cd ..\corebuild
build.cmd  (note: run this in a VS Command Prompt)
cd ..\linker\bin\illink_Debug\net46
move illink.dll illink.exe
```
