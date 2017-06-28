using Blazor.Components;
using Blazor.Interop;
using System;
using System.Collections.Generic;

namespace Blazor.VirtualDom
{
    public class VDomBuilder
    {
        // Double-buffered setup so we can diff successive VDoms
        private VDomItem[] prevItems = new VDomItem[100];
        private VDomItem[] items = new VDomItem[100];

        private int itemsInUse = 0;
        private MiniStack<int> openElementIndices = new MiniStack<int>();

        internal VDomItem[] PrevItems => prevItems;
        internal VDomItem[] Items => items;

        internal void Clear()
        {
            itemsInUse = 0;
            openElementIndices.Clear();
        }


        internal void SwapBuffers()
        {
            var otherBuffer = prevItems;
            prevItems = items;
            items = otherBuffer;
        }

        public void OpenElement(int sourceSeq, string tagName)
        {
            openElementIndices.Push(itemsInUse);
            AddItem(VDomItem.Element(sourceSeq, tagName));
        }

        public void OpenComponent(int sourceSeq, string componentName)
        {
            openElementIndices.Push(itemsInUse);
            AddItem(VDomItem.Component(sourceSeq, componentName));
        }

        public void OpenComponent(int sourceSeq, Component componentInstance)
        {
            openElementIndices.Push(itemsInUse);
            AddItem(VDomItem.Component(sourceSeq, componentInstance));
        }

        public void CloseElement()
        {
            var indexOfElementBeingClosed = openElementIndices.Pop();
            items[indexOfElementBeingClosed].DescendantsEndIndex = itemsInUse - 1;
        }

        public void AddAttribute(string name, object value)
        {
            AddItem(VDomItem.Attribute(name, value));
        }

        public void AddAttribute(string name, VEventHandler handler)
        {
            AddAttribute(new VDomAttribute { Name = name, Value = handler });
        }

        public void AddAttribute(string name, VEventAsyncHandler handler)
        {
            AddAttribute(new VDomAttribute { Name = name, Value = handler });
        }

        public void AddAttribute(VDomAttribute attribute)
        {
            var value = attribute.Value;
            if (value is VEventHandler)
            {
                AddItem(VDomItem.Attribute(attribute.Name, (VEventHandler)value));
            }
            else if (value is VEventAsyncHandler)
            {
                AddItem(VDomItem.Attribute(attribute.Name, (VEventAsyncHandler)value));
            }
            else
            {
                AddItem(VDomItem.Attribute(attribute.Name, value));
            }
        }

        public void AddAttribute(VDomElementKey key)
        {
            var indexOfElement = openElementIndices.Peek();
            items[indexOfElement].ElementKey = key.Value;
        }

        public void AddFromExpression(int sourceSeq, VDomComponent component)
        {
            OpenComponent(sourceSeq, component.Component);
            CloseElement();
        }

        public void AddFromExpression(int sourceSeq, object value)
        {
            // For all other value types, we just display it as a text node
            AddTextNode(sourceSeq, value);
        }

        public void AddTextNode(int sourceSeq, object text)
        {
            AddItem(VDomItem.TextNode(sourceSeq, text));
        }

        private void AddItem(VDomItem item)
        {
            // TODO: Also consider shrinking it if, at the end of rendering, we're only using a small
            // fraction of the allocated size.
            if (itemsInUse == items.Length)
            {
                Array.Resize(ref items, items.Length * 2);
            }

            items[itemsInUse++] = item;
        }

        internal IDictionary<string, object> ReadAttributes(int fromItemAtIndex)
        {
            var fromItem = items[fromItemAtIndex];
            switch (fromItem.ItemType)
            {
                case VDomItemType.Element:
                case VDomItemType.Component:
                    var result = new Dictionary<string, object>();
                    var index = fromItemAtIndex;
                    while (++index <= fromItem.DescendantsEndIndex)
                    {
                        var item = items[index];
                        if (item.ItemType != VDomItemType.Attribute)
                        {
                            // Since all the attributes immediately follow the open element/component, if we hit anything
                            // else (e.g., a child element), we know we have them all already.
                            break;
                        }
                        result[item.AttributeName] = item.AttributeObjectValue;
                    }

                    return result;
                default:
                    throw new InvalidOperationException($"Items of type {fromItem.ItemType} cannot have attributes.");
            }
        }
    }
}
