import { System_Object } from '../../Platform/Platform';
import { platform } from '../../Environment';
import { VDomItem } from './VDomItem';

const vdomStructSizeBytes = 48;

export class VDomItemArrayReader {
    private readonly ptrItem0: number;

    constructor(public readonly componentRef: number, vDom: System_Object) {
        this.ptrItem0 = platform.getHeapAddress(vDom)
            + 4; // First Int32 is the array length, which we don't need
    }

    public getItem(index: number) {
        return new VDomItem(this, index, this.ptrItem0 + vdomStructSizeBytes * index);
    }
}
