var Browser = (typeof Browser === "object") ? Browser : {
  init: (function () { }),
  asyncLoad: (function (url, onload, onerror, noRunDep) {
    var dep = !noRunDep ? getUniqueRunDependency('al ' + url) : '';
    Module['readAsync'](url,
      function (arrayBuffer) {
        assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
        onload(new Uint8Array(arrayBuffer));
        if (dep) { removeRunDependency(dep); }
      },
      function (event) {
        if (onerror) { onerror(); }
        else { throw 'Loading data file "' + url + '" failed.'; }
      });
    if (dep) { addRunDependency(dep); }
  })
};