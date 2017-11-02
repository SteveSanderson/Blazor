onmessage = function(evt) {
    console.log('Worker received: ' + evt.data);
};

function load(url) {
    self.importScripts(url);
}

function print(text) {
    console.log(text);
}

function read(url, resultType) {
    var xhr = new XMLHttpRequest();
    switch (resultType) {
        case 'binary':
            xhr.responseType = 'arraybuffer';
            break;
        default:
            throw new Error('Not implemented: result type ' + resultType);
    }
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.response;
}

self.importScripts('test.js');
