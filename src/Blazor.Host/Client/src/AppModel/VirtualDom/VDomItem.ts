import { VDomItemArrayReader } from './VDomItemArrayReader';
import { System_String } from '../../Platform/Platform';
import { platform } from '../../Environment';

export class VDomItem {
    constructor(private reader: VDomItemArrayReader, public readonly index: number, private ptr: number) {
    }

    private _readInt32Property(offsetBytes: number) {
        return platform.readHeapInt32(this.ptr + offsetBytes);
    }

    private _readStringProperty(offsetBytes: number) {
        var managedString = platform.readHeapObject(this.ptr + offsetBytes) as System_String;
        return platform.toJavaScriptString(managedString);
    }

    public get itemType() { return this._readInt32Property(0); }
    public get sourceSequence() { return this._readInt32Property(4); }
    public get elementTagName() { return this._readStringProperty(8); }
    public get elementKey() { return this._readStringProperty(12); }
    public get descendantsEndIndex() { return this._readInt32Property(16); }
    public get textNodeContents() { return this._readStringProperty(20); }
    public get attributeName() { return this._readStringProperty(24); }
    public get attributeStringValue() { return this._readStringProperty(28); }
    public get attributeEventHandlerValue() { return this._readInt32Property(32); }
    public get attributeObjectValue() { return this._readInt32Property(36); }
    public get componentName() { return this._readStringProperty(40); }
    public get componentInstance() { return this._readInt32Property(44); }

    public get attributeValue() {
        // Returns a number if it's an event handler, or a string if it's a string value
        return this.attributeEventHandlerValue || this.attributeStringValue;
    }

    public readAttributes() {
        // Proceed until we find a non-attribute item, or get to the end of our descendants list
        const result: VDomItem[] = [];
        for (let walkIndex = this.index + 1, stopAfterIndex = this.descendantsEndIndex; walkIndex <= stopAfterIndex; walkIndex++) {
            let descendant = this.reader.getItem(walkIndex);
            if (descendant.itemType === 3) {
                result.push(descendant);
            } else {
                break;
            }
        }

        return result;
    };

    public readChildren() {
        // Note: if this turns out to be prohibitively expensive, could switch to a visitor pattern rather than
        // constructing arrays of children
        let walkIndex = this.index + 1;
        const stopAfterIndex = this.descendantsEndIndex;
        let result: VDomItem[] = [];
        while (walkIndex <= stopAfterIndex) {
            const descendant = this.reader.getItem(walkIndex);
            switch (descendant.itemType) {
                case 1: // Element
                    result.push(descendant);
                    walkIndex = descendant.descendantsEndIndex;
                    break;
                case 2: // Text node
                case 4: // Component
                    result.push(descendant);
                    break;
            }

            walkIndex++;
        }

        return result;
    };

    public makeEventDispatcher() {
        // Capture only what we need for the event dispatcher so we don't pin the VDomItem unnecessarily
        const componentRef = this.reader.componentRef;
        const vdomItemIndex = this.index;
        return (evt: Event) => {
            evt.preventDefault();
            dispatchEvent(evt, componentRef, vdomItemIndex);
        };
    };
}

function dispatchEvent(evt: Event, componentRef: number, vdomItemIndex: number) {
    const targetElement = evt.target;
    const isCheckbox = targetElement['type'] === 'checkbox';
    platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Interop', 'Events', 'DispatchIncoming', JSON.stringify({
        componentRef: componentRef,
        vdomItemIndex: vdomItemIndex,
        eventInfo: {
            type: evt.type,
            targetValue: isCheckbox ? targetElement['checked'] : targetElement['value']
        }
    }));
}
