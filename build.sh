#!/usr/bin/env bash

set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

__machine_has() {
    hash "$1" > /dev/null 2>&1
    return $?
}

__fatal() {
    echo "$@" 1>&2
    exit 1
}

#
# Main
#

if ! __machine_has 'curl'; then __fatal 'Missing required command: curl'; fi
if ! __machine_has 'cmake'; then __fatal 'Missing required command: cmake'; fi
if ! __machine_has 'dotnet'; then __fatal 'Missing required command: dotnet'; fi

if [ ! -d "$DIR/.emsdk/" ]; then
    mkdir -p "$DIR/.emsdk/"
    if [ ! -f "$DIR/.emsdk/emsdk.tar.gz" ]; then
        curl -o "$DIR/.emsdk/emsdk.tar.gz" \
            -# \
            https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz
    fi

    tar -C .emsdk/ -xzvf "$DIR/.emsdk/emsdk.tar.gz"

    source "$DIR/.emsdk/emsdk-portable/emsdk_env.sh"
    emsdk update
    emsdk install latest
fi

source "$DIR/.emsdk/emsdk-portable/emsdk_env.sh"
emsdk activate latest
source "$DIR/.emsdk/emsdk-portable/emsdk_env.sh"

mkdir -p "$DIR/src/DNA/obj"
pushd "$DIR/src/DNA/obj/"
cmake ../native
make
popd

dotnet build $DIR/Blazor.Core.sln

