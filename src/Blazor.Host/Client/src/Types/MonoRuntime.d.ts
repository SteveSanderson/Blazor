declare namespace Module {
    function UTF8ToString(utf8: any): string; // TODO: Type the UTF8
    var preloadPlugins: any[];

    // These should probably be in @types/emscripten
    var wasmBinaryFile: string;
    var asmjsCodeFile: string;
    function FS_createPath(parent, path, canRead, canWrite);
    function FS_createDataFile(parent, name, data, canRead, canWrite, canOwn);
}
