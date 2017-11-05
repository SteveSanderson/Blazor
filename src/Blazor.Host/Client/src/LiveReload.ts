export function enableLiveReloading() {
    listenForReload(false);
}

function listenForReload(reloadOnConnection: boolean) {
    const EventSource = window['EventSource'];
    if (typeof EventSource !== 'undefined') {
        const source = new EventSource('/_reload');
        let sourceDidOpen;
        source.addEventListener('open', e => {
            sourceDidOpen = true;
            if (reloadOnConnection) {
                location.reload();
            }
        });
        source.addEventListener('message', e => {
            if (e.data === 'reload') {
                location.reload();
            }
        });
        source.addEventListener('error', e => {
            if (source.readyState === 0) {
                if (sourceDidOpen || reloadOnConnection) {
                    // Connection was closed either after it was working, or while
                    // we're polling for reconnect. Don't rely on browser's default
                    // reconnection behaviour. Instead close this connection and
                    // start a new one on our desired schedule.
                    source.close();
                    setTimeout(function () {
                        listenForReload(/* reloadOnConnection */ true);
                    }, 100);
                }
            }
        });
    }
}
