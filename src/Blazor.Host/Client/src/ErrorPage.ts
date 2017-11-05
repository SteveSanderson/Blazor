declare var TextDecoder; // TODO: Load polyfill when needed

export function displayErrorPage(error: any) {
    if (error instanceof XMLHttpRequest) {
        const html = getResponseText(error);
        const frame = document.createElement('iframe');
        document.body.appendChild(frame);
        frame.width = frame.height = '100%';
        frame.style.position = 'absolute';
        frame.style.top = '0';
        frame.frameBorder = '0';
        frame.contentDocument.write(html);
    } else {
        throw new Error(`Can't display error page for unknown error type. Error was: ${error}`);
    }
}

function getResponseText(xhr: XMLHttpRequest) {
    switch (xhr.responseType) {
        case 'text':
            return xhr.responseText;
        case 'arraybuffer': {
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(new DataView(xhr.response));
        }
        default:
            throw new Error(`Unsupported XHR responseType: '${xhr.responseType}'`);
    }
}
