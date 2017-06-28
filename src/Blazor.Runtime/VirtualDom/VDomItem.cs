using System;
using System.Collections.Generic;
using Blazor.Components;

namespace Blazor.VirtualDom
{
    public struct VDomItem
    {
        public VDomItemType ItemType;
        public int SourceSequence;
        public string ElementTagName;
        public string ElementKey;
        public int DescendantsEndIndex;
        public string TextNodeContents;
        public string AttributeName;
        public string AttributeStringValue;
        public object AttributeEventHandlerValue;
        public object AttributeObjectValue;
        public string ComponentName;
        public Component ComponentInstance;

        public static VDomItem Element(int sourceSeq, string tagName)
        {
            return new VDomItem
            {
                ItemType = VDomItemType.Element,
                SourceSequence = sourceSeq,
                ElementTagName = tagName
            };
        }

        internal static VDomItem Component(int sourceSeq, string componentName)
        {
            return new VDomItem
            {
                ItemType = VDomItemType.Component,
                SourceSequence = sourceSeq,
                ComponentName = componentName
            };
        }

        internal static VDomItem Component(int sourceSeq, Component componentInstance)
        {
            return new VDomItem
            {
                ItemType = VDomItemType.Component,
                SourceSequence = sourceSeq,
                ComponentInstance = componentInstance
            };
        }

        public static VDomItem TextNode(int sourceSeq, object text)
        {
            return new VDomItem
            {
                ItemType = VDomItemType.TextNode,
                SourceSequence = sourceSeq,
                TextNodeContents = text == null ? string.Empty : text.ToString()
            };
        }

        internal string ToDebugString()
        {
            var result = $"Type:{ItemType.ToString()}";

            switch (ItemType)
            {
                case VDomItemType.Element:
                    result += "; TagName:" + ElementTagName + "; DescendantsEndIndex:" + DescendantsEndIndex;
                    break;
                case VDomItemType.TextNode:
                    result += "; Text:" + TextNodeContents;
                    break;
            }

            return result;
        }

        internal static VDomItem Attribute(string name, object value)
        {
            return new VDomItem
            {
                ItemType = VDomItemType.Attribute,
                AttributeName = name,
                AttributeStringValue = value == null ? string.Empty : value.ToString(),
                AttributeObjectValue = value
            };
        }

        internal static VDomItem Attribute(string name, VEventHandler value)
        {
            return new VDomItem
            {
                ItemType = VDomItemType.Attribute,
                AttributeName = name,
                AttributeEventHandlerValue = value
            };
        }

        internal static VDomItem Attribute(string name, VEventAsyncHandler value)
        {
            return new VDomItem
            {
                ItemType = VDomItemType.Attribute,
                AttributeName = name,
                AttributeEventHandlerValue = value
            };
        }
    }
}
