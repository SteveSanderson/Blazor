import { platform } from '../Environment';

platform.registerCallableMethod('Routing_ResolveRelativeUrl', (relativeUrl: string) => {
    const a = document.createElement('a');
    a.href = relativeUrl;
    return (a.cloneNode(false) as HTMLAnchorElement).href;
});

export function initRouter() {
    window.addEventListener('popstate', evt => {
        onLocationChanged(window.location.pathname);
    });

    // Trigger initial page load
    onLocationChanged(window.location.pathname);
}

export function attachLinkClickEventHandler(element: Element, url: string) {
    element.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        history.pushState(/* state */ null, /* title */ null, url);
        onLocationChanged(url);
    });
}

function onLocationChanged(pathAndQuery: string) {
    platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Routing', 'Router', 'OnNavigation', JSON.stringify({
        url: pathAndQuery,
        absoluteUrl: location.href
    }));

    highlightLinks(pathAndQuery);
}

function highlightLinks(pathAndQuery: string) {
    Array.prototype.forEach.call(document.getElementsByClassName('active'), function (elem) {
        if (elem.tagName === 'A') {
            elem.classList.remove('active');
        }
    });
    var escapedPathAndQuery = pathAndQuery.replace(/\//g, '\\\/');
    var elemsToHighlight = document.querySelectorAll('a[href=' + escapedPathAndQuery + ']');
    Array.prototype.forEach.call(elemsToHighlight, function (elem) {
        elem.classList.add('active');
    });
}
