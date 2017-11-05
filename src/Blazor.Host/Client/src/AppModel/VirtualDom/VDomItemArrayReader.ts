import { System_Object } from '../../Platform/Platform';
import { VDomItem } from './VDomItem';

const vdomStructSizeBytes = 48;

export class VDomItemArrayReader {
    private readonly ptrItem0: number;

    constructor(public readonly componentRef: number, vDom: System_Object) {
        this.ptrItem0 = (vDom as any as number) + 16; // First 3 U32s are internal Mono stuff, then 4th is array length, which we don't need
    }

    public getItem(index: number) {
        return new VDomItem(this, index, this.ptrItem0 + vdomStructSizeBytes * index);
    }
}
