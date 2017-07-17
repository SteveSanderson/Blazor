(function() {
	var nextElemId = 0;

	window['browser.js'] = {
		JSEval: function(code) {
			return eval(code);
		},

		Alert: function(message) {
			alert(message);
        },

        ResolveRelativeUrl: function (url) {
            var a = document.createElement('a');
            a.href = url;
            return a.cloneNode(false).href;
        },

		RenderComponent: function(descriptor) {
			var item = JSON.parse(descriptor);
			var elem = document.getElementById(item.elementId);
			if (!elem) {
				throw new Error('Cannot find element by ID: ' + item.elementId);
			}
			renderIntoElement(elem, item.html);
		},

		CreateElem: function(descriptor) {
			var item = JSON.parse(descriptor);
			var elem = document.createElement(item.tagName);
			if (item.populateElementId) {
				var parentElem = document.getElementById(item.populateElementId);
				if (!parentElem) {
					throw new Error('Cannot find element by ID: ' + item.populateElementId);
				}
				parentElem.innerHTML = '';
				parentElem.appendChild(elem);
				return assignUniqueElementId(elem);
			} else {
				throw new Error('Did not specify where the created element should be placed');
			}
		},

		SetElemHtml: function(descriptor) {
			var item = JSON.parse(descriptor);
			var elem = document.getElementById(item.ref);
			if (!elem) {
				throw new Error('Cannot find element by ID: ' + item.ref);
			}
			elem.innerHTML = item.html;
		},

		SetElemFromVNode: function(descriptor) {
			var parsed = JSON.parse(descriptor);
			var componentRef = parsed.componentRef;
			var replaceContainer = parsed.replaceContainer;

			var elem = pendingComponentDocFrags[parsed.elementRef]
			        || document.getElementById(parsed.elementRef);
			if (!elem) {
				throw new Error('Cannot find element by ID: ' + parsed.elementRef);
			}

			var oldVDomArrayAddress = Module.getValue(parsed.oldVDom + 4, 'i32'); // Read the pointer at offset 4 from the ManagedGCHandle
			var newVDomArrayAddress = Module.getValue(parsed.newVDom + 4, 'i32'); // Read the pointer at offset 4 from the ManagedGCHandle
			var oldVDomReader = new VDomItemArrayReader(componentRef, oldVDomArrayAddress);
			var newVDomReader = new VDomItemArrayReader(componentRef, newVDomArrayAddress);

			vdomUtil.populateOrUpdateElement(componentRef, elem, oldVDomReader, newVDomReader, replaceContainer);
		},

		BeginFetch: function(descriptor) {
			var parsed = JSON.parse(descriptor);
			var url = parsed.url;

            var xhr = new XMLHttpRequest;
            xhr.open("GET", url);
            xhr.onreadystatechange = function xhrOnReadyStateChange (evt) {
                if (xhr.readyState === 4) {
                    InvokeStatic('corlib', 'System.Net.Http', 'HttpClient', 'OnFetchCompleted', JSON.stringify({
                        asyncResultAddress: parsed.asyncResultAddress,
                        response: { statusCode: xhr.status, bodyText: xhr.response }
                    }));
                }
            };

            xhr.send(null);
		}
	};

	function renderIntoElement(elem, html) {
		elem.innerHTML = html;
	}

	function assignUniqueElementId(elem) {
		var id = 'el_' + (++nextElemId);
		elem.id = id;
		return id;
	}

	var vdomUtil = {
		createRealNode: function(componentRef, vdomItem) {
			switch (vdomItem.itemType) {
				case 1: // Element
					var el = document.createElement(vdomItem.elementTagName);
					vdomUtil.setAttributesOnRealNode(componentRef, el, vdomItem.readAttributes());
					vdomItem.readChildren()
                        .map(function (c) { return vdomUtil.createRealNode(componentRef, c); })
						.forEach(el.appendChild.bind(el));
					return el;
				case 2: // Text node
					return document.createTextNode(vdomItem.textNodeContents);
				case 4: // Component
					return InstantiateComponent(componentRef, vdomItem);
				default:
					throw new Error('Unexpected item type. Can\'t create real DOM node for item of type ' + vdomItem.itemType);
			}
		},

		setAttributesOnRealNode: function (componentRef, el, attributeItems) {
            var attributesToRemove = {};
            Array.prototype.map.call(el.attributes, function (at) { attributesToRemove[at.name] = true; });

			attributeItems.forEach(function(attributeItem) {
                var attribName = attributeItem.attributeName;
                attributesToRemove[attribName] = false; // Mark this as retained
				switch (attribName) {
					case 'onchange':
					case 'onclick':
					case 'onsubmit':
						var attributeValue = attributeItem.attributeValue;
						if (typeof attributeValue === 'number') {
							// Event handler
							el[attribName] = attributeItem.makeEventDispatcher();
						} else {
							// String
							el.setAttribute(attribName, attributeValue);
						}
						break;
					case 'value':
						el.value = attributeItem.attributeValue;
                        break;
                    case 'checked':
                        el.checked = attributeItem.attributeStringValue === 'True';
                        break;
					case 'href':
						var attributeValue = attributeItem.attributeValue;
						if (el.tagName == 'A') {
							var pagesPrefix = '~/';
							if (attributeValue.indexOf(pagesPrefix) === 0) {
								attributeValue = attributeValue.substring(pagesPrefix.length - 1);
								attributeValue = attributeValue.replace(/\/Index\.cshtml$/, '/');
								attributeValue = attributeValue.replace(/\.cshtml$/, '');

								el.addEventListener('click', function(evt) {
									return HandleInternalLinkClick(evt, attributeValue);
								});
							}
						}
						el.setAttribute(attribName, attributeValue);
						break;
					default:
						el.setAttribute(attribName, attributeItem.attributeValue);
						break;
				}
            });

            Object.getOwnPropertyNames(attributesToRemove).forEach(function (attributeName) {
                if (attributesToRemove[attributeName]) {
                    el.removeAttribute(attributeName);
                }
            });
		},

		changedAttributes: function(attributes1, attributes2, compareAsObjects) {
			if (attributes1.length !== attributes2.length) {
				return true;
			}

			var attributes2ByName = {};
			attributes2.forEach(function(a) {
				// For a proper .NET-style compare-as-objects, would really have to call back into .NET here
				// so it can account for everything (e.g., two different string refs that hold the same value,
				// or IComparable generally). Not doing that right now but could consider changing the logic
				// so that for child components, we *always* send it the updates params, and let it decide whether
				// there's been a change. Not sure about the perf effects of that though.
				attributes2ByName[a.attributeName] = compareAsObjects ? a.attributeObjectValue : a.attributeValue;
			});

			for (var i = 0; i < attributes1.length; i++) {
				var a = attributes1[i];
				var attribute1Value = compareAsObjects ? a.attributeObjectValue : a.attributeValue;
				if (attributes2ByName[a.attributeName] !== attribute1Value) {
					return true;
				}
			}
			return false;
		},

		populateOrUpdateElement: function(componentRef, containerElement, oldVDomReader, newVDomReader, replaceContainer) {
			var oldVDomRoot = oldVDomReader.getItem(0);
			var newVDomRoot = newVDomReader.getItem(0);
			if (oldVDomRoot.itemType === 0 /* blank */) {
				// First run - there's no prior vdom to compare against
				var newRootElement = vdomUtil.createRealNode(componentRef, newVDomRoot);
				while (containerElement.firstChild) {
					containerElement.removeChild(containerElement.firstChild);
				}
				containerElement.appendChild(newRootElement);
			} else {
				var nodeToUpdate = replaceContainer ? containerElement : containerElement.firstChild;
				vdomUtil.updateNode(componentRef, nodeToUpdate, oldVDomRoot, newVDomRoot);
			}
		},

		updateNode: function(componentRef, targetNode, oldVDomItem, newVDomItem) {
			switch (newVDomItem.itemType) {
				case 1: // Element
				case 4: // Component
					vdomUtil.updateElement(componentRef, targetNode, oldVDomItem, newVDomItem);
					break;
				case 2:
					vdomUtil.updateTextNode(componentRef, targetNode, oldVDomItem, newVDomItem);
					break;
				default:
					throw new Error('VDom item is of unexpected type: ' + newVDomItem.itemType);
			}
		},

		updateTextNode: function(componentRef, targetTextNode, oldVDomItem, newVDomItem) {
			var newText = newVDomItem.textNodeContents;
 			if (oldVDomItem.textNodeContents !== newText) {
 				targetTextNode.textContent = newText;
 			}
		},

		updateElementAttributes: function(componentRef, targetElement, oldVDomItem, newVDomItem) {
			var oldVDomItemAttributes = oldVDomItem.readAttributes();
	    	var newVDomItemAttributes = newVDomItem.readAttributes();
	    	var newVDomItemType = newVDomItem.itemType;
	    	var compareAsObjects = newVDomItemType == 4;
	    	if (vdomUtil.changedAttributes(newVDomItemAttributes, oldVDomItemAttributes, compareAsObjects)) {
	    		switch (newVDomItemType) {
	    			case 1: // Element
				    	vdomUtil.setAttributesOnRealNode(componentRef, targetElement, newVDomItemAttributes);
				    	break;
				    case 4: // Component
				    	var childComponentRef = parseInt(targetElement.getAttribute('_component_ref'));
				    	UpdateComponentParameters(childComponentRef, componentRef, newVDomItem);
				    	break;
				    default:
				    	throw new Error('Don\'t know how to set attributes for a vdom item of type ' + newVDomItem.itemType);
	    		}
		  	}
		},

		updateElement: function(componentRef, targetElement, oldVDomItem, newVDomItem) {
 			vdomUtil.updateElementAttributes(componentRef, targetElement, oldVDomItem, newVDomItem);

		  	// Now do a merge join on the sequence of child nodes
			var oldChildren = oldVDomItem.readChildren();
		  	var newChildren = newVDomItem.readChildren();
			var oldChildIndex = 0;
			var newChildIndex = 0;
			var realElemIndex = 0;
			var prevOldChildSourceSequence = -1;
			var prevNewChildSourceSequence = -1;
			var oldKeyedElementInfos = {};
			var newKeyedElementInfos = {};
			var seenNewKeys = {};
			while (oldChildIndex < oldChildren.length || newChildIndex < newChildren.length) {
				var oldChild = oldChildren[oldChildIndex];
				var newChild = newChildren[newChildIndex];

				// First, check the keys (if any) are unique and whether they match
				var oldChildKey = oldChild ? oldChild.elementKey : null;
				var newChildKey = newChild ? newChild.elementKey : null;
				if (newChildKey) {
					if (seenNewKeys.hasOwnProperty(newChildKey)) {
						throw new Error('Duplicate key: ' + newChildKey + '. Any keys must be unique among sibling elements.');
					} else {
						seenNewKeys[newChildKey] = null;
					}
				}

				var isMatch = oldChild && newChild && oldChild.sourceSequence === newChild.sourceSequence;
				if (isMatch) {
					// Both sequences are in sync, so recurse down the element hierarchy here
					var realElem = targetElement.childNodes[realElemIndex];
					if (oldChildKey === newChildKey) {
						// Keys match, or this element doesn't specify a key, so we can use this DOM element
						vdomUtil.updateNode(componentRef, realElem, oldChild, newChild);
					} else {
						// Keys mismatch, so we can't use this DOM element. Pull it out and leave a placeholder.
						oldKeyedElementInfos[oldChildKey] = {
							vdom: oldChild,
							element: realElem
						};
						var placeholder = document.createComment(newChildKey);
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
					var oldSequenceLoopedBack = oldChild && oldChild.sourceSequence <= prevOldChildSourceSequence;
					var newSequenceLoopedBack = newChild && newChild.sourceSequence <= prevNewChildSourceSequence;
					var treatAsInsert = false;
					var treatAsDelete = false;

					if (oldSequenceLoopedBack && !newSequenceLoopedBack) {
						// The new sequence either has some extra trailing elements in the current loop block
						// which we should insert, or omits some old trailing loop blocks which we should delete
						var newChildSourceSequence = newChild && newChild.sourceSequence;
						var newSequenceLoopsBackLater = newChild && vdomUtil.trueForAnyAfter(newChildren, newChildIndex, function(laterChild) {
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
						var oldSequenceLoopsBackLater = oldChild && vdomUtil.trueForAnyAfter(oldChildren, oldChildIndex, function(laterChild) {
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
						var newRealNode;
						if (newChildKey === null) {
							// For unkeyed elements, we can just create new ones, as there's no need to preserve
							// associations with any earlier real DOM elements
							newRealNode = vdomUtil.createRealNode(componentRef, newChild);
						} else {
							// For keyed elements, leave a placeholder so the correct real DOM element can be
							// put here later
							newRealNode = document.createComment(newChildKey);
							newKeyedElementInfos[newChildKey] = {
								vdom: newChild,
								placeholder: newRealNode
							};
						}

						var realNodeToInsertBefore = targetElement.childNodes[realElemIndex];
						if (realNodeToInsertBefore) {
							targetElement.insertBefore(newRealNode, realNodeToInsertBefore);
						} else {
							targetElement.appendChild(newRealNode);
						}
						newChildIndex++;
						realElemIndex++;
						prevNewChildSourceSequence = newChild.sourceSequence;
					} else if (treatAsDelete) {
						var realElem = targetElement.childNodes[realElemIndex];
						if (oldChildKey !== null) {
							// We'll dispose realElem later if it's no longer being used
							oldKeyedElementInfos[oldChildKey] = {
								vdom: oldChild,
								element: realElem
							};
						} else {
							// We can dispose realElem now because it definitely won't be reused later
							vdomUtil.disposeRealElement(realElem);
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
			Object.getOwnPropertyNames(newKeyedElementInfos).forEach(function(key) {
				var newInfo = newKeyedElementInfos[key];
				var oldInfo = oldKeyedElementInfos[key];
				if (oldInfo) {
					// We guarantee to preserve the old DOM element's association with this key
					targetElement.replaceChild(oldInfo.element, newInfo.placeholder);
					vdomUtil.updateNode(componentRef, oldInfo.element, oldInfo.vdom, newInfo.vdom);
					oldInfo.element = null; // So we don't dispose it below
				} else {
					// There's no prior DOM element for this key
					var newRealNode = vdomUtil.createRealNode(componentRef, newInfo.vdom);
					targetElement.replaceChild(newRealNode, newInfo.placeholder);
				}
			});
			Object.getOwnPropertyNames(oldKeyedElementInfos).forEach(function(key) {
				var oldInfo = oldKeyedElementInfos[key];
				if (oldInfo.element) {
					vdomUtil.disposeRealElement(oldInfo.element);
				}
			});
		},

		trueForAnyAfter: function(array, afterIndex, predicate) {
			for (var i = afterIndex + 1; i < array.length; i++) {
				if (predicate(array[i])) {
					return true;
				}
			}
			return false;
		},

		disposeRealElement: function(element) {
			if (element.nodeType !== 1) {
				return;
			}

			var componentElems = element.querySelectorAll("[_component_ref]");
			if (componentElems && componentElems.length > 0) {
				var componentRefsToDispose = Array.prototype.map.call(componentElems, function(elem) {
					return parseInt(elem.getAttribute('_component_ref'));
				});
				DisposeComponents(componentRefsToDispose);
			}
		}

		// NEXT:
		// [3] Extend to nested components that each refresh when their own props are
		//     updated. Not sure how this works when a parent refreshes but a child hasn't refreshed.
		//     I suppose if the props being passed to the child haven't changed, we retain the child
		//     instance, or something.
	};
})();

var dotNetStringDecoder;
function readDotNetString(ptrString) {
    dotNetStringDecoder = dotNetStringDecoder || new TextDecoder("utf-16le"); // Lazy-initialised because we have to wait for loading the polyfill on some browsers

	if (ptrString === 0)
		return null;
	var numBytes = Module.HEAP32[ptrString >> 2] * 2;
	var ptrChar0 = ptrString + 4;
	var subarray = Module.HEAP8.subarray(ptrChar0, ptrChar0 + numBytes);
	return dotNetStringDecoder.decode(subarray);
}

function VDomItemArrayReader(componentRef, ptrArray) {
	this._componentRef = componentRef;
	this._ptrItem0 = ptrArray + 4; // First U32 is array length, which we don't need
	this._structSizeBytes = 48;
}

VDomItemArrayReader.prototype.getItem = function(index) {
	return new VDomItem(this, index, this._ptrItem0 + this._structSizeBytes*index);
};

function VDomItem(reader, index, ptr) {
	this._reader = reader;
	this._index = index;
	this._ptr = ptr;
}

VDomItem.prototype._readInt32Property = function(offsetBytes) {
	return Module.getValue(this._ptr + offsetBytes, 'i32');
};

VDomItem.prototype._readStringProperty = function(offsetBytes) {
	var ptrString = Module.getValue(this._ptr + offsetBytes, '*');
	return readDotNetString(ptrString);
};

Object.defineProperty(VDomItem.prototype, 'itemType', 				{ get: function() { return this._readInt32Property(0); } });
Object.defineProperty(VDomItem.prototype, 'sourceSequence', 		{ get: function() { return this._readInt32Property(4); } });
Object.defineProperty(VDomItem.prototype, 'elementTagName', 		    { get: function() { return this._readStringProperty(8); } });
Object.defineProperty(VDomItem.prototype, 'elementKey', 		    { get: function() { return this._readStringProperty(12); } });
Object.defineProperty(VDomItem.prototype, 'descendantsEndIndex',	    { get: function() { return this._readInt32Property(16); } });
Object.defineProperty(VDomItem.prototype, 'textNodeContents', 		{ get: function() { return this._readStringProperty(20); } });
Object.defineProperty(VDomItem.prototype, 'attributeName', 			{ get: function() { return this._readStringProperty(24); } });
Object.defineProperty(VDomItem.prototype, 'attributeStringValue',	{ get: function() { return this._readStringProperty(28); } });
Object.defineProperty(VDomItem.prototype, 'attributeEventHandlerValue',	    { get: function() { return this._readInt32Property(32); } });
Object.defineProperty(VDomItem.prototype, 'attributeObjectValue',	{ get: function() { return this._readInt32Property(36); } });
Object.defineProperty(VDomItem.prototype, 'componentName',	{ get: function() { return this._readStringProperty(40); } });
Object.defineProperty(VDomItem.prototype, 'componentInstance',	{ get: function() { return this._readInt32Property(44); } });

Object.defineProperty(VDomItem.prototype, 'attributeValue',	{
	get: function() {
		// Returns a number if it's an event handler, or a string if it's a string value
		return this.attributeEventHandlerValue || this.attributeStringValue;
	}
});

VDomItem.prototype.readAttributes = function() {
	// Proceed until we find a non-attribute item, or get to the end of our descendants list
	var result = [];
	for (var walkIndex = this._index + 1, stopAfterIndex = this.descendantsEndIndex; walkIndex <= stopAfterIndex; walkIndex++) {
		var descendant = this._reader.getItem(walkIndex);
		if (descendant.itemType === 3) {
			result.push(descendant);
		} else {
			break;
		}
	}
	return result;
};

VDomItem.prototype.readChildren = function() {
	// Note: if this turns out to be prohibitively expensive, could switch to a visitor pattern rather than
	// constructing arrays of children
	var walkIndex = this._index + 1;
	var stopAfterIndex = this.descendantsEndIndex;
	var result = [];
	while (walkIndex <= stopAfterIndex) {
		var descendant = this._reader.getItem(walkIndex);
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

VDomItem.prototype.makeEventDispatcher = function() {
	// Capture only what we need for the event dispatcher so we don't pin the VDomItem unnecessarily
	var componentRef = this._reader._componentRef;
	var vdomItemIndex = this._index;
	return function(evt) {
		evt.preventDefault();
		DispatchEvent(evt, componentRef, vdomItemIndex);
	};
};

var pendingComponentDocFrags = {};
var nextPendingComponentDocFragId = 0;

function InstantiateComponent(parentComponentRef, vdomItem) {
	var newElemId = '_e' + (++nextPendingComponentDocFragId);
	var docFrag = document.createDocumentFragment();
	pendingComponentDocFrags[newElemId] = docFrag;

    var newComponentRef = InvokeStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'InstantiateComponent', JSON.stringify({
		parentComponentRef: parentComponentRef,
		vdomItemIndex: vdomItem._index,
		elementRef: newElemId
	}));

	delete pendingComponentDocFrags[newElemId];
	docFrag.firstChild.id = newElemId;
	docFrag.firstChild.setAttribute('_component_ref', newComponentRef);
	return docFrag.firstChild;
}

function UpdateComponentParameters(componentRef, parentComponentRef, vdomItem) {
    InvokeStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'UpdateComponentParameters', JSON.stringify({
		componentRef: componentRef,
		parentComponentRef: parentComponentRef,
		vdomItemIndex: vdomItem._index
	}));
}

function DisposeComponents(componentRefs) {
    InvokeStatic('Blazor.Runtime', 'Blazor.Interop', 'Components', 'DisposeComponents', JSON.stringify({
		componentRefs: componentRefs
	}));
}

function HandleInternalLinkClick(evt, url) {
	evt.preventDefault();
	evt.stopPropagation();
	history.pushState(/* state */ null, /* title */ null, url);
	OnLocationChanged(url);
}

function InvokeStatic(assemblyName, namespace, className, methodName, stringArg) {
	return Module.ccall('JSInterop_CallDotNet', // name of C function
		  'number', // return type
		  ['string', 'string', 'string', 'string', 'string'], // argument types
		  [assemblyName, namespace, className, methodName, stringArg]); // arguments
}

function DispatchEvent(evt, componentRef, vdomItemIndex) {
    var targetElement = evt.target;
    var isCheckbox = targetElement.type === 'checkbox';
    InvokeStatic('Blazor.Runtime', 'Blazor.Interop', 'Events', 'DispatchIncoming', JSON.stringify({
		componentRef: componentRef,
		vdomItemIndex: vdomItemIndex,
		eventInfo: {
			type: evt.type,
			targetValue: isCheckbox ? targetElement.checked : targetElement.value
		}
	}));
}

function OnLocationChanged(pathAndQuery) {
    InvokeStatic('Blazor.Runtime', 'Blazor.Routing', 'Router', 'OnNavigation', JSON.stringify({
        url: pathAndQuery,
        absoluteUrl: location.href
    }));

    // Highlight links to this location
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

window.addEventListener('popstate', function(evt) {
	OnLocationChanged(window.location.pathname);
});

window['jsobject.js'] = (function () {
    var _nextObjectId = 0;
    var _trackedObjects = {};

    function getObjectFromId(id) {
        return id === 0 ? window : _trackedObjects[id.toString()];
    }

    function toInteropValue(val) {
        switch (typeof val) {
            case 'boolean':
            case 'number':
            case 'string':
                return val;
            case 'object':
            case 'function':
                if (val === null) {
                    return null;
                }
                var id = ++_nextObjectId;
                _trackedObjects[id.toString()] = val;
                return id;
            case 'undefined':
                return null;
        }
    }

    function construct(constructor, args) {
        function F() {
            return constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    }

    function readIncomingArg(suppliedArg) {
        switch (suppliedArg.type) {
            case 'object': return getObjectFromId(suppliedArg.value);
            default: return suppliedArg.value;
        }
    }

    return {
        _ReleaseJSObject: function (descriptor) {
            delete _trackedObjects[descriptor];
        },

        _GetProperty: function (descriptor) {
            var parts = descriptor.split(':');
            var objectId = parseInt(parts[0]);
            var propertyName = parts[1];
            var obj = getObjectFromId(objectId);
            var propValue = obj[propertyName];
            return JSON.stringify({
                type: typeof propValue,
                value: toInteropValue(propValue)
            });
        },

        _SetProperty: function (descriptor) {
            var parsed = JSON.parse(descriptor);
            var target = getObjectFromId(parsed.jsObjectId);
            target[parsed.name] = readIncomingArg(parsed.value);
        },

        _InvokeFunction: function (descriptor) {
            var parsed = JSON.parse(descriptor);
            var thisValue = getObjectFromId(parsed.thisValueId);
            var functionInstance = parsed.functionId
                ? getObjectFromId(parsed.functionId)
                : thisValue[parsed.functionPropertyName];
            var suppliedArgs = parsed.args.map(readIncomingArg);
            var result = parsed.withNew
                ? construct(functionInstance, suppliedArgs)
                : functionInstance.apply(thisValue, suppliedArgs);
            return JSON.stringify({
                type: typeof result,
                value: toInteropValue(result)
            });
        }
    };
})();

(function () {
    function ListenForReload(reloadOnConnection) {
        if (window.EventSource) {
            var source = new EventSource('/_reload');
            var sourceDidOpen;
            source.addEventListener('open', function (e) {
                sourceDidOpen = true;
                if (reloadOnConnection) {
                    location.reload();
                }
            });
            source.addEventListener('message', function (e) {
                if (e.data === 'reload') {
                    location.reload();
                }
            });
            source.addEventListener('error', function (e) {
                if (source.readyState === 0) {
                    if (sourceDidOpen || reloadOnConnection) {
                        // Connection was closed either after it was working, or while
                        // we're polling for reconnect. Don't rely on browser's default
                        // reconnection behaviour. Instead close this connection and
                        // start a new one on our desired schedule.
                        source.close();
                        setTimeout(function () {
                            ListenForReload(/* reloadOnConnection */ true);
                        }, 100);
                    }
                }
            });
        }
    }

    ListenForReload();

    function DisplayErrorPage(html) {
        var frame = document.createElement('iframe');
        document.body.appendChild(frame);
        frame.width = frame.height = '100%';
        frame.style.position = 'absolute';
        frame.style.top = 0;
        frame.frameBorder = 0;
        frame.contentDocument.write(html);
    }

    function FetchArrayBuffer(url, onload, onerror) {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function xhr_onload() {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                onload(xhr.response)
            } else {
                var decoder = new TextDecoder('utf-8');
                var responseBodyText = decoder.decode(new DataView(xhr.response));
                DisplayErrorPage(responseBodyText);
                onerror();
            }
        };
        xhr.onerror = onerror;
        xhr.send(null);
    }

    function StartApplication(entryPoint, referenceAssemblies) {
        var preloadAssemblies = [entryPoint].concat(referenceAssemblies).map(function (assemblyName) {
            return { assemblyName: assemblyName, url: '/_bin/' + assemblyName };
        });
        preloadAssemblies.push({ assemblyName: 'Blazor.Runtime.dll', url: '/_framework/Blazor.Runtime.dll' });

        // Also infer the name of the views assembly from the entrypoint. We have to pass a special querystring
        // value with this so that the dev-time host app knows to compile the Razor files dynamically. In a production
        // build, the actual views assembly file would be on disk and the querystring would be ignored.
        var viewsAssemblyFilename = entryPoint.replace(/\.dll$/, '.Views.dll');
        var referencesQueryStringSegments = referenceAssemblies.map(function (r) { return "reference=" + encodeURIComponent(r); }).join('&');
        preloadAssemblies.push({
            assemblyName: viewsAssemblyFilename,
            url: '/_bin/' + viewsAssemblyFilename + '?type=razorviews&' + referencesQueryStringSegments
        });

        window.Module = {
            wasmBinaryFile: '/_framework/wasm/dna.wasm',
            asmjsCodeFile: '/_framework/asmjs/dna.asm.js',
            arguments: [entryPoint],
            preRun: function () {
                // Preload corlib.dll and other assemblies
                Module.readAsync = FetchArrayBuffer;
                Module.FS_createPreloadedFile('/', 'corlib.dll', '/_framework/corlib.dll', true, false);
                preloadAssemblies.forEach(function (assemblyInfo) {
                    Module.FS_createPreloadedFile('/', assemblyInfo.assemblyName, assemblyInfo.url, true, false);
                });
            },
            postRun: function () {
                InvokeStatic('Blazor.Runtime', 'Blazor.Runtime.Interop', 'Startup', 'EnsureAssembliesLoaded', JSON.stringify(
                    preloadAssemblies.map(function (assemblyInfo) {
                        var name = assemblyInfo.assemblyName;
                        var isDll = name.substring(name.length - 4) === '.dll';
                        return isDll ? name.substring(0, name.length - 4) : null;
                    })
                ));
                OnLocationChanged(window.location.pathname);
            }
        };

        var browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
        var dnaJsUrl = browserSupportsNativeWebAssembly
            ? '/_framework/wasm/dna.js'
            : '/_framework/asmjs/dna.js';

        if (!browserSupportsNativeWebAssembly) {
            // In the asmjs case, the initial memory structure is in a separate file we need to download
            var meminitXHR = Module['memoryInitializerRequest'] = new XMLHttpRequest();
            meminitXHR.open('GET', '/_framework/asmjs/dna.js.mem');
            meminitXHR.responseType = 'arraybuffer';
            meminitXHR.send(null);
        }

        // Can't load dna.js until Module is configured
        document.write("<script defer src=\"/_framework/emsdk-browser.js\"></script>");
        document.write("<script defer src=\"" + dnaJsUrl + "\"></script>");
    }

    // Find own <script> tag
    var allScriptElems = document.getElementsByTagName('script');
    var thisScriptElem = allScriptElems[allScriptElems.length - 1];

    // If necessary on this browser, polyfill TextDecoder
    if (typeof TextDecoder === 'undefined') {
        document.write("<script defer src=\"/_framework/encoding.js\"></script>");
    }

    // Read attributes from own <script> tag and then start the application
    var entrypoint = thisScriptElem.getAttribute('main');
    var referenceAssembliesCombined = thisScriptElem.getAttribute('references');
    var referenceAssemblies = referenceAssembliesCombined ? referenceAssembliesCombined.split(',').map(function (s) { return s.trim() }) : [];
    StartApplication(entrypoint, referenceAssemblies);
})();
