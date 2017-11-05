import { System_Object, System_String } from '../../Platform/Platform';
import { attachLinkClickEventHandler } from '../Routing';
import { platform } from '../../Environment';
import { VDomItem } from './VDomItem';
import { VDomItemArrayReader } from './VDomItemArrayReader';

const pendingComponentDocFrags: { [elementRef: string]: DocumentFragment } = {};
let nextPendingComponentDocFragId = 0;

platform.registerCallableMethod('setElemFromVNode', setElemFromVNode);

function setElemFromVNode(elementRefManagedString: System_String, componentRef: number, oldVDom: System_Object, newVDom: System_Object, replaceContainer: number) {
    const elementRef = platform.toJavaScriptString(elementRefManagedString);
    const elem = pendingComponentDocFrags[elementRef]
        || document.getElementById(elementRef);
    if (!elem) {
        throw new Error(`Cannot find element by ID: ${elementRef}`);
    }

    var oldVDomReader = new VDomItemArrayReader(componentRef, oldVDom);
    var newVDomReader = new VDomItemArrayReader(componentRef, newVDom);

    populateOrUpdateElement(componentRef, elem, oldVDomReader, newVDomReader, !!replaceContainer);
}

function populateOrUpdateElement(componentRef: number, containerElement: DocumentFragment | HTMLElement, oldVDomReader: VDomItemArrayReader, newVDomReader: VDomItemArrayReader, replaceContainer: boolean) {
    const oldVDomRoot = oldVDomReader.getItem(0);
    const newVDomRoot = newVDomReader.getItem(0);
    if (oldVDomRoot.itemType === 0 /* blank */) {
        // First run - there's no prior vdom to compare against
        const newRootElement = createRealNode(componentRef, newVDomRoot);
        while (containerElement.firstChild) {
            containerElement.removeChild(containerElement.firstChild);
        }
        containerElement.appendChild(newRootElement);
    } else {
        const nodeToUpdate = replaceContainer ? containerElement : containerElement.firstChild;
        updateNode(componentRef, nodeToUpdate, oldVDomRoot, newVDomRoot);
    }
}

function createRealNode(componentRef: number, vdomItem: VDomItem): Node {
    switch (vdomItem.itemType) {
        case 1: // Element
            const el = document.createElement(vdomItem.elementTagName);
            setAttributesOnRealNode(componentRef, el, vdomItem.readAttributes());
            vdomItem.readChildren()
                .map(child => createRealNode(componentRef, child))
                .forEach(el.appendChild.bind(el));
            return el;
        case 2: // Text node
            return document.createTextNode(vdomItem.textNodeContents);
        case 4: // Component
            return instantiateComponent(componentRef, vdomItem);
        default:
            throw new Error('Unexpected item type. Can\'t create real DOM node for item of type ' + vdomItem.itemType);
    }
}

function setAttributesOnRealNode(componentRef: number, element: Element, attributeItems: VDomItem[]) {
    const attributesToRemove = {};
    Array.prototype.map.call(element.attributes, at => { attributesToRemove[at.name] = true; });

    attributeItems.forEach(attributeItem => {
        const attribName = attributeItem.attributeName;
        attributesToRemove[attribName] = false; // Mark this as retained
        switch (attribName) {
            // TODO add more function handlers
            case 'onchange':
            case 'onclick':
            case 'onsubmit':
            case 'onmouseover':
            case 'onabort':
            case 'oncancel':
            case 'ondblclick':
            case 'ondrag':
            case 'ondragend':
            case 'onerror':
            case 'oninput':
            case 'onkeydown':
            case 'onload': {
                const attributeValue = attributeItem.attributeValue;
                if (typeof attributeValue === 'number') {
                    // Event handler
                    element[attribName] = attributeItem.makeEventDispatcher();
                } else {
                    // String
                    element.setAttribute(attribName, attributeValue);
                }
                break;
            }
            case 'value':
                element['value'] = attributeItem.attributeValue;
                break;
            case 'checked':
                element['checked'] = attributeItem.attributeStringValue === 'True';
                break;
            case 'href': {
                let attributeValue = attributeItem.attributeStringValue;
                if (element.tagName === 'A') {
                    const pagesPrefix = '~/';
                    if (attributeValue.indexOf(pagesPrefix) === 0) {
                        attributeValue = attributeValue.substring(pagesPrefix.length - 1);
                        attributeValue = attributeValue.replace(/\/Index\.cshtml$/, '/');
                        attributeValue = attributeValue.replace(/\.cshtml$/, '');
                        attachLinkClickEventHandler(element, attributeValue);
                    }
                }
                element.setAttribute(attribName, attributeValue);
                break;
            }
            default:
                element.setAttribute(attribName, attributeItem.attributeStringValue);
                break;
        }
    });

    Object.getOwnPropertyNames(attributesToRemove).forEach(attributeName => {
        if (attributesToRemove[attributeName]) {
            element.removeAttribute(attributeName);
        }
    });
}

function changedAttributes(attributes1: VDomItem[], attributes2: VDomItem[], compareAsObjects: boolean) {
    if (attributes1.length !== attributes2.length) {
        return true;
    }

    const attributes2ByName = {};
    attributes2.forEach(a => {
        // For a proper .NET-style compare-as-objects, would really have to call back into .NET here
        // so it can account for everything (e.g., two different string refs that hold the same value,
        // or IComparable generally). Not doing that right now but could consider changing the logic
        // so that for child components, we *always* send it the updates params, and let it decide whether
        // there's been a change. Not sure about the perf effects of that though.
        attributes2ByName[a.attributeName] = compareAsObjects ? a.attributeObjectValue : a.attributeValue;
    });

    for (let i = 0; i < attributes1.length; i++) {
        const a = attributes1[i];
        const attribute1Value = compareAsObjects ? a.attributeObjectValue : a.attributeValue;
        if (attributes2ByName[a.attributeName] !== attribute1Value) {
            return true;
        }
    }

    return false;
}

function updateNode(componentRef: number, targetNode: Node, oldVDomItem: VDomItem, newVDomItem: VDomItem) {
    switch (newVDomItem.itemType) {
        case 1: // Element
        case 4: // Component
            updateElement(componentRef, targetNode as Element, oldVDomItem, newVDomItem);
            break;
        case 2:
            updateTextNode(componentRef, targetNode, oldVDomItem, newVDomItem);
            break;
        default:
            throw new Error('VDom item is of unexpected type: ' + newVDomItem.itemType);
    }
}

function updateTextNode(componentRef: number, targetTextNode: Node, oldVDomItem: VDomItem, newVDomItem: VDomItem) {
    const newText = newVDomItem.textNodeContents;
    if (oldVDomItem.textNodeContents !== newText) {
        targetTextNode.textContent = newText;
    }
}

function updateElementAttributes(componentRef: number, targetElement: Element, oldVDomItem: VDomItem, newVDomItem: VDomItem) {
    const oldVDomItemAttributes = oldVDomItem.readAttributes();
    const newVDomItemAttributes = newVDomItem.readAttributes();
    const newVDomItemType = newVDomItem.itemType;
    const compareAsObjects = newVDomItemType == 4;
    if (changedAttributes(newVDomItemAttributes, oldVDomItemAttributes, compareAsObjects)) {
        switch (newVDomItemType) {
            case 1: // Element
                setAttributesOnRealNode(componentRef, targetElement, newVDomItemAttributes);
                break;
            case 4: // Component
                var childComponentRef = parseInt(targetElement.getAttribute('_component_ref'));
                updateComponentParameters(childComponentRef, componentRef, newVDomItem);
                break;
            default:
                throw new Error('Don\'t know how to set attributes for a vdom item of type ' + newVDomItem.itemType);
        }
    }
}

function updateComponentParameters(componentRef: number, parentComponentRef: number, vdomItem: VDomItem) {
    platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'UpdateComponentParameters', JSON.stringify({
        componentRef: componentRef,
        parentComponentRef: parentComponentRef,
        vdomItemIndex: vdomItem.index
    }));
}

interface KeyedElementInfo {
    vdom: VDomItem;
    placeholder?: Node;
    element?: Node;
}

function updateElement(componentRef: number, targetElement: Element, oldVDomItem: VDomItem, newVDomItem: VDomItem) {
    updateElementAttributes(componentRef, targetElement, oldVDomItem, newVDomItem);

    // Now do a merge join on the sequence of child nodes
    const oldChildren = oldVDomItem.readChildren();
    const newChildren = newVDomItem.readChildren();
    let oldChildIndex = 0;
    let newChildIndex = 0;
    let realElemIndex = 0;
    let prevOldChildSourceSequence = -1;
    let prevNewChildSourceSequence = -1;
    const oldKeyedElementInfos: { [key: string]: KeyedElementInfo } = {};
    const newKeyedElementInfos: { [key: string]: KeyedElementInfo } = {};
    const seenNewKeys = {};
    while (oldChildIndex < oldChildren.length || newChildIndex < newChildren.length) {
        const oldChild = oldChildren[oldChildIndex];
        const newChild = newChildren[newChildIndex];

        // First, check the keys (if any) are unique and whether they match
        const oldChildKey = oldChild ? oldChild.elementKey : null;
        const newChildKey = newChild ? newChild.elementKey : null;
        if (newChildKey) {
            if (seenNewKeys.hasOwnProperty(newChildKey)) {
                throw new Error(`Duplicate key: ${newChildKey}. Any keys must be unique among sibling elements.`);
            } else {
                seenNewKeys[newChildKey] = null;
            }
        }

        const isMatch = oldChild && newChild && oldChild.sourceSequence === newChild.sourceSequence;
        if (isMatch) {
            // Both sequences are in sync, so recurse down the element hierarchy here
            const realElem = targetElement.childNodes[realElemIndex];
            if (oldChildKey === newChildKey) {
                // Keys match, or this element doesn't specify a key, so we can use this DOM element
                updateNode(componentRef, realElem, oldChild, newChild);
            } else {
                // Keys mismatch, so we can't use this DOM element. Pull it out and leave a placeholder.
                oldKeyedElementInfos[oldChildKey] = {
                    vdom: oldChild,
                    element: realElem
                };
                const placeholder = document.createComment(newChildKey);
                targetElement.replaceChild(placeholder, realElem);
                newKeyedElementInfos[newChildKey] = {
                    vdom: newChild,
                    placeholder: placeholder
                };
            }
            oldChildIndex++;
            newChildIndex++;
            realElemIndex++;
            prevOldChildSourceSequence = oldChild.sourceSequence;
            prevNewChildSourceSequence = newChild.sourceSequence;
        } else {
            // The sequences are out of sync, so we need to pick edits that bring them closer to being
            // in sync. This is like a preordered merge join (where you just take from whichever side
            // has the lower sequence number), with the complication that our normally-ascending sequences
            // can jump backwards (i.e., at the end of a loop). When one side does jump backwards, we
            // have to figure out why the other one didn't yet do so, and perform edits until it does.
            // Various bits of this code could be micro-optimised more, e.g., not re-evaluating the
            // '...LoopsBackLater' variables on each iteration, but it should have the correct O(...)
            // performance already in realistic cases.
            const oldSequenceLoopedBack = oldChild && oldChild.sourceSequence <= prevOldChildSourceSequence;
            const newSequenceLoopedBack = newChild && newChild.sourceSequence <= prevNewChildSourceSequence;
            let treatAsInsert = false;
            let treatAsDelete = false;

            if (oldSequenceLoopedBack && !newSequenceLoopedBack) {
                // The new sequence either has some extra trailing elements in the current loop block
                // which we should insert, or omits some old trailing loop blocks which we should delete
                var newChildSourceSequence = newChild && newChild.sourceSequence;
                var newSequenceLoopsBackLater = newChild && trueForAnyAfter(newChildren, newChildIndex, laterChild => {
                    return laterChild.sourceSequence < newChildSourceSequence;
                });
                if (newSequenceLoopsBackLater) {
                    // The new sequence has some extra trailing elements we should insert before it loops back
                    treatAsInsert = true;
                } else {
                    // The new sequence is missing some trailing loop blocks, so we should delete them
                    treatAsDelete = true;
                }
            } else if (newSequenceLoopedBack && !oldSequenceLoopedBack) {
                // The old sequence either has some extra trailing elements in the current loop block
                // which we should delete, or omits some new trailing loop blocks which we should insert
                var oldChildSourceSequence = oldChild && oldChild.sourceSequence;
                var oldSequenceLoopsBackLater = oldChild && trueForAnyAfter(oldChildren, oldChildIndex, laterChild => {
                    return laterChild.sourceSequence < oldChildSourceSequence;
                });
                if (oldSequenceLoopsBackLater) {
                    // The old sequence has some extra trailing elements we should delete before it loops back
                    treatAsDelete = true;
                } else {
                    // The old sequence is missing some trailing loop blocks, so we should insert them
                    treatAsInsert = true;
                }
            } else {
                // We can assume both sequences are proceeding through the same loop block, so just
                // keep inserting/deleting from whichever side brings us closer to being in sync.
                // This is a classic preordered merge join.
                if (oldChild && (!newChild || oldChild.sourceSequence < newChild.sourceSequence)) {
                    // oldChild must have been deleted
                    treatAsDelete = true;
                } else {
                    // newChild must have been inserted
                    treatAsInsert = true;
                }

                // If both sequences have now looped back, we can reset their looped-back status until it
                // happens again.
                // Note: we know oldSequenceLoopedBack===newSequenceLoopedBack otherwise we wouldn't be in this code path
                if (oldSequenceLoopedBack) {
                    prevNewChildSourceSequence = prevOldChildSourceSequence = -1;
                }
            }

            if (treatAsInsert) {
                let newRealNode: Node;
                if (newChildKey === null) {
                    // For unkeyed elements, we can just create new ones, as there's no need to preserve
                    // associations with any earlier real DOM elements
                    newRealNode = createRealNode(componentRef, newChild);
                } else {
                    // For keyed elements, leave a placeholder so the correct real DOM element can be
                    // put here later
                    newRealNode = document.createComment(newChildKey);
                    newKeyedElementInfos[newChildKey] = {
                        vdom: newChild,
                        placeholder: newRealNode
                    };
                }

                const realNodeToInsertBefore = targetElement.childNodes[realElemIndex];
                if (realNodeToInsertBefore) {
                    targetElement.insertBefore(newRealNode, realNodeToInsertBefore);
                } else {
                    targetElement.appendChild(newRealNode);
                }
                newChildIndex++;
                realElemIndex++;
                prevNewChildSourceSequence = newChild.sourceSequence;
            } else if (treatAsDelete) {
                const realElem = targetElement.childNodes[realElemIndex];
                if (oldChildKey !== null) {
                    // We'll dispose realElem later if it's no longer being used
                    oldKeyedElementInfos[oldChildKey] = {
                        vdom: oldChild,
                        element: realElem
                    };
                } else {
                    // We can dispose realElem now because it definitely won't be reused later
                    disposeRealElement(realElem);
                }
                targetElement.removeChild(realElem);
                oldChildIndex++;
                prevOldChildSourceSequence = oldChild.sourceSequence;
            } else {
                throw new Error('Somehow neither flag was set. Should not be possible.');
            }
        }
    }

    // Finally, fix up any placeholders we left for unmatched keyed elements
    Object.getOwnPropertyNames(newKeyedElementInfos).forEach(key => {
        const newInfo = newKeyedElementInfos[key];
        const oldInfo = oldKeyedElementInfos[key];
        if (oldInfo) {
            // We guarantee to preserve the old DOM element's association with this key
            targetElement.replaceChild(oldInfo.element, newInfo.placeholder);
            updateNode(componentRef, oldInfo.element, oldInfo.vdom, newInfo.vdom);
            oldInfo.element = null; // So we don't dispose it below
        } else {
            // There's no prior DOM element for this key
            var newRealNode = createRealNode(componentRef, newInfo.vdom);
            targetElement.replaceChild(newRealNode, newInfo.placeholder);
        }
    });
    Object.getOwnPropertyNames(oldKeyedElementInfos).forEach(key => {
        var oldInfo = oldKeyedElementInfos[key];
        if (oldInfo.element) {
            disposeRealElement(oldInfo.element);
        }
    });
}

function trueForAnyAfter<T>(array: T[], afterIndex: number, predicate: (item: T) => boolean) {
    for (let i = afterIndex + 1; i < array.length; i++) {
        if (predicate(array[i])) {
            return true;
        }
    }
    return false;
}

function disposeRealElement(element: Node) {
    if (element.nodeType !== 1) {
        return;
    }

    const componentElems = (element as Element).querySelectorAll('[_component_ref]');
    if (componentElems && componentElems.length > 0) {
        var componentRefsToDispose: number[] = Array.prototype.map.call(componentElems, elem => {
            return parseInt(elem.getAttribute('_component_ref'));
        });
        disposeComponents(componentRefsToDispose);
    }
}

function instantiateComponent(parentComponentRef: number, vdomItem: VDomItem) {
    const newElemId = '_e' + (++nextPendingComponentDocFragId);
    const docFrag = document.createDocumentFragment();
    pendingComponentDocFrags[newElemId] = docFrag;

    const newComponentRef = platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'InstantiateComponent', JSON.stringify({
        parentComponentRef: parentComponentRef,
        vdomItemIndex: vdomItem.index,
        elementRef: newElemId
    }));

    delete pendingComponentDocFrags[newElemId];
    const firstChild = docFrag.firstChild as HTMLElement;
    firstChild.id = newElemId;
    firstChild.setAttribute('_component_ref', newComponentRef);
    return firstChild;
}

function disposeComponents(componentRefs: number[]) {
    platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'DisposeComponents', JSON.stringify({
        componentRefs: componentRefs
    }));
}

// NEXT:
// Extend to nested components that each refresh when their own props are
// updated. Not sure how this works when a parent refreshes but a child hasn't refreshed.
// I suppose if the props being passed to the child haven't changed, we retain the child
// instance, or something.