/**
Walking the DOM model starting with [IWindow]
Mapped [51] types
**/

using System;
using Blazor.Runtime.Interop;

namespace Blazor.Dom {

public partial class Window : JSObject {
  // AngSharp Type: AngleSharp.Dom.IWindow
  // DOM IDL Type: Window

  internal Window(JSObjectHandle handle) : base(handle) { }

  /** TODO: Method with non-DOM params is not yet supported **/
  // GetComputedStyle:
  //    element : IElement
  //    pseudo : String
  public void Close() {
    Call("close");
  }
  public void Stop() {
    Call("stop");
  }
  public void Focus() {
    Call("focus");
  }
  public void Blur() {
    Call("blur");
  }
  public void Alert(string message) {
    Call("alert", message);
  }
  public bool Confirm(string message) {
    var ret = (bool)Call("confirm", message);
    return ret;
  }
  public void Print() {
    Call("print");
  }
  public MediaQueryList MatchMedia(string media) {
    var ret = (JSObjectHandle)Call("matchMedia", media);
    return ret == null ? default(MediaQueryList) : new MediaQueryList(ret);
  }
  public Document Document => (Document)GetProperty("document");
  public Location Location => (Location)GetProperty("location");
  public bool Closed => (bool)GetProperty("closed");
  public string Status => (string)GetProperty("status");
  public string Name => (string)GetProperty("name");
  public int OuterHeight => (int)GetProperty("outerHeight");
  public int OuterWidth => (int)GetProperty("outerWidth");
  public int ScreenX => (int)GetProperty("screenX");
  public int ScreenY => (int)GetProperty("screenY");
  public Window WindowProperty => (Window)GetProperty("window");
  public Navigator Navigator => (Navigator)GetProperty("navigator");
  public History History => (History)GetProperty("history");
} // Window

public partial class CSSStyleDeclaration : JSObject {
  // AngSharp Type: AngleSharp.Dom.Css.ICssStyleDeclaration
  // DOM IDL Type: CSSStyleDeclaration

  internal CSSStyleDeclaration(JSObjectHandle handle) : base(handle) { }

  public string Item => (string)GetProperty("item");
  public string CssText => (string)GetProperty("cssText");
  public CSSRule ParentRule => (CSSRule)GetProperty("parentRule");
  public string Accelerator => (string)GetProperty("accelerator");
  public string AlignContent => (string)GetProperty("alignContent");
  public string AlignItems => (string)GetProperty("alignItems");
  public string AlignmentBaseline => (string)GetProperty("alignmentBaseline");
  public string AlignSelf => (string)GetProperty("alignSelf");
  public string Animation => (string)GetProperty("animation");
  public string AnimationDelay => (string)GetProperty("animationDelay");
  public string AnimationDirection => (string)GetProperty("animationDirection");
  public string AnimationDuration => (string)GetProperty("animationDuration");
  public string AnimationFillMode => (string)GetProperty("animationFillMode");
  public string AnimationIterationCount => (string)GetProperty("animationIterationCount");
  public string AnimationName => (string)GetProperty("animationName");
  public string AnimationPlayState => (string)GetProperty("animationPlayState");
  public string AnimationTimingFunction => (string)GetProperty("animationTimingFunction");
  public string BackfaceVisibility => (string)GetProperty("backfaceVisibility");
  public string Background => (string)GetProperty("background");
  public string BackgroundAttachment => (string)GetProperty("backgroundAttachment");
  public string BackgroundClip => (string)GetProperty("backgroundClip");
  public string BackgroundColor => (string)GetProperty("backgroundColor");
  public string BackgroundImage => (string)GetProperty("backgroundImage");
  public string BackgroundOrigin => (string)GetProperty("backgroundOrigin");
  public string BackgroundPosition => (string)GetProperty("backgroundPosition");
  public string BackgroundPositionX => (string)GetProperty("backgroundPositionX");
  public string BackgroundPositionY => (string)GetProperty("backgroundPositionY");
  public string BackgroundRepeat => (string)GetProperty("backgroundRepeat");
  public string BackgroundSize => (string)GetProperty("backgroundSize");
  public string BaselineShift => (string)GetProperty("baselineShift");
  public string Behavior => (string)GetProperty("behavior");
  public string Border => (string)GetProperty("border");
  public string Bottom => (string)GetProperty("bottom");
  public string BorderBottom => (string)GetProperty("borderBottom");
  public string BorderBottomColor => (string)GetProperty("borderBottomColor");
  public string BorderBottomLeftRadius => (string)GetProperty("borderBottomLeftRadius");
  public string BorderBottomRightRadius => (string)GetProperty("borderBottomRightRadius");
  public string BorderBottomStyle => (string)GetProperty("borderBottomStyle");
  public string BorderBottomWidth => (string)GetProperty("borderBottomWidth");
  public string BorderCollapse => (string)GetProperty("borderCollapse");
  public string BorderColor => (string)GetProperty("borderColor");
  public string BorderImage => (string)GetProperty("borderImage");
  public string BorderImageOutset => (string)GetProperty("borderImageOutset");
  public string BorderImageRepeat => (string)GetProperty("borderImageRepeat");
  public string BorderImageSlice => (string)GetProperty("borderImageSlice");
  public string BorderImageSource => (string)GetProperty("borderImageSource");
  public string BorderImageWidth => (string)GetProperty("borderImageWidth");
  public string BorderLeft => (string)GetProperty("borderLeft");
  public string BorderLeftColor => (string)GetProperty("borderLeftColor");
  public string BorderLeftStyle => (string)GetProperty("borderLeftStyle");
  public string BorderLeftWidth => (string)GetProperty("borderLeftWidth");
  public string BorderRadius => (string)GetProperty("borderRadius");
  public string BorderRight => (string)GetProperty("borderRight");
  public string BorderRightColor => (string)GetProperty("borderRightColor");
  public string BorderRightStyle => (string)GetProperty("borderRightStyle");
  public string BorderRightWidth => (string)GetProperty("borderRightWidth");
  public string BorderSpacing => (string)GetProperty("borderSpacing");
  public string BorderStyle => (string)GetProperty("borderStyle");
  public string BorderTop => (string)GetProperty("borderTop");
  public string BorderTopColor => (string)GetProperty("borderTopColor");
  public string BorderTopLeftRadius => (string)GetProperty("borderTopLeftRadius");
  public string BorderTopRightRadius => (string)GetProperty("borderTopRightRadius");
  public string BorderTopStyle => (string)GetProperty("borderTopStyle");
  public string BorderTopWidth => (string)GetProperty("borderTopWidth");
  public string BorderWidth => (string)GetProperty("borderWidth");
  public string BoxShadow => (string)GetProperty("boxShadow");
  public string BoxSizing => (string)GetProperty("boxSizing");
  public string BreakAfter => (string)GetProperty("breakAfter");
  public string BreakBefore => (string)GetProperty("breakBefore");
  public string BreakInside => (string)GetProperty("breakInside");
  public string CaptionSide => (string)GetProperty("captionSide");
  public string Clear => (string)GetProperty("clear");
  public string Clip => (string)GetProperty("clip");
  public string ClipBottom => (string)GetProperty("clipBottom");
  public string ClipLeft => (string)GetProperty("clipLeft");
  public string ClipPath => (string)GetProperty("clipPath");
  public string ClipRight => (string)GetProperty("clipRight");
  public string ClipRule => (string)GetProperty("clipRule");
  public string ClipTop => (string)GetProperty("clipTop");
  public string Color => (string)GetProperty("color");
  public string ColorInterpolationFilters => (string)GetProperty("colorInterpolationFilters");
  public string ColumnCount => (string)GetProperty("columnCount");
  public string ColumnFill => (string)GetProperty("columnFill");
  public string ColumnGap => (string)GetProperty("columnGap");
  public string ColumnRule => (string)GetProperty("columnRule");
  public string ColumnRuleColor => (string)GetProperty("columnRuleColor");
  public string ColumnRuleStyle => (string)GetProperty("columnRuleStyle");
  public string ColumnRuleWidth => (string)GetProperty("columnRuleWidth");
  public string Columns => (string)GetProperty("columns");
  public string ColumnSpan => (string)GetProperty("columnSpan");
  public string ColumnWidth => (string)GetProperty("columnWidth");
  public string Content => (string)GetProperty("content");
  public string CounterIncrement => (string)GetProperty("counterIncrement");
  public string CounterReset => (string)GetProperty("counterReset");
  public string Cursor => (string)GetProperty("cursor");
  public string Direction => (string)GetProperty("direction");
  public string Display => (string)GetProperty("display");
  public string DominantBaseline => (string)GetProperty("dominantBaseline");
  public string EmptyCells => (string)GetProperty("emptyCells");
  public string EnableBackground => (string)GetProperty("enableBackground");
  public string Fill => (string)GetProperty("fill");
  public string FillOpacity => (string)GetProperty("fillOpacity");
  public string FillRule => (string)GetProperty("fillRule");
  public string Filter => (string)GetProperty("filter");
  public string Flex => (string)GetProperty("flex");
  public string FlexBasis => (string)GetProperty("flexBasis");
  public string FlexDirection => (string)GetProperty("flexDirection");
  public string FlexFlow => (string)GetProperty("flexFlow");
  public string FlexGrow => (string)GetProperty("flexGrow");
  public string FlexShrink => (string)GetProperty("flexShrink");
  public string FlexWrap => (string)GetProperty("flexWrap");
  public string CssFloat => (string)GetProperty("cssFloat");
  public string Font => (string)GetProperty("font");
  public string FontFamily => (string)GetProperty("fontFamily");
  public string FontFeatureSettings => (string)GetProperty("fontFeatureSettings");
  public string FontSize => (string)GetProperty("fontSize");
  public string FontSizeAdjust => (string)GetProperty("fontSizeAdjust");
  public string FontStretch => (string)GetProperty("fontStretch");
  public string FontStyle => (string)GetProperty("fontStyle");
  public string FontVariant => (string)GetProperty("fontVariant");
  public string FontWeight => (string)GetProperty("fontWeight");
  public string GlyphOrientationHorizontal => (string)GetProperty("glyphOrientationHorizontal");
  public string GlyphOrientationVertical => (string)GetProperty("glyphOrientationVertical");
  public string Height => (string)GetProperty("height");
  public string ImeMode => (string)GetProperty("imeMode");
  public string JustifyContent => (string)GetProperty("justifyContent");
  public string LayoutGrid => (string)GetProperty("layoutGrid");
  public string LayoutGridChar => (string)GetProperty("layoutGridChar");
  public string LayoutGridLine => (string)GetProperty("layoutGridLine");
  public string LayoutGridMode => (string)GetProperty("layoutGridMode");
  public string LayoutGridType => (string)GetProperty("layoutGridType");
  public string Left => (string)GetProperty("left");
  public string LetterSpacing => (string)GetProperty("letterSpacing");
  public string LineHeight => (string)GetProperty("lineHeight");
  public string ListStyle => (string)GetProperty("listStyle");
  public string ListStyleImage => (string)GetProperty("listStyleImage");
  public string ListStylePosition => (string)GetProperty("listStylePosition");
  public string ListStyleType => (string)GetProperty("listStyleType");
  public string Margin => (string)GetProperty("margin");
  public string MarginBottom => (string)GetProperty("marginBottom");
  public string MarginLeft => (string)GetProperty("marginLeft");
  public string MarginRight => (string)GetProperty("marginRight");
  public string MarginTop => (string)GetProperty("marginTop");
  public string Marker => (string)GetProperty("marker");
  public string MarkerEnd => (string)GetProperty("markerEnd");
  public string MarkerMid => (string)GetProperty("markerMid");
  public string MarkerStart => (string)GetProperty("markerStart");
  public string Mask => (string)GetProperty("mask");
  public string MaxHeight => (string)GetProperty("maxHeight");
  public string MaxWidth => (string)GetProperty("maxWidth");
  public string MinHeight => (string)GetProperty("minHeight");
  public string MinWidth => (string)GetProperty("minWidth");
  public string Opacity => (string)GetProperty("opacity");
  public string Order => (string)GetProperty("order");
  public string Orphans => (string)GetProperty("orphans");
  public string Outline => (string)GetProperty("outline");
  public string OutlineColor => (string)GetProperty("outlineColor");
  public string OutlineStyle => (string)GetProperty("outlineStyle");
  public string OutlineWidth => (string)GetProperty("outlineWidth");
  public string Overflow => (string)GetProperty("overflow");
  public string OverflowX => (string)GetProperty("overflowX");
  public string OverflowY => (string)GetProperty("overflowY");
  public string OverflowWrap => (string)GetProperty("overflowWrap");
  public string Padding => (string)GetProperty("padding");
  public string PaddingBottom => (string)GetProperty("paddingBottom");
  public string PaddingLeft => (string)GetProperty("paddingLeft");
  public string PaddingRight => (string)GetProperty("paddingRight");
  public string PaddingTop => (string)GetProperty("paddingTop");
  public string PageBreakAfter => (string)GetProperty("pageBreakAfter");
  public string PageBreakBefore => (string)GetProperty("pageBreakBefore");
  public string PageBreakInside => (string)GetProperty("pageBreakInside");
  public string Perspective => (string)GetProperty("perspective");
  public string PerspectiveOrigin => (string)GetProperty("perspectiveOrigin");
  public string PointerEvents => (string)GetProperty("pointerEvents");
  public string Position => (string)GetProperty("position");
  public string Quotes => (string)GetProperty("quotes");
  public string Right => (string)GetProperty("right");
  public string RubyAlign => (string)GetProperty("rubyAlign");
  public string RubyOverhang => (string)GetProperty("rubyOverhang");
  public string RubyPosition => (string)GetProperty("rubyPosition");
  public string Scrollbar3dLightColor => (string)GetProperty("scrollbar3dLightColor");
  public string ScrollbarArrowColor => (string)GetProperty("scrollbarArrowColor");
  public string ScrollbarDarkShadowColor => (string)GetProperty("scrollbarDarkShadowColor");
  public string ScrollbarFaceColor => (string)GetProperty("scrollbarFaceColor");
  public string ScrollbarHighlightColor => (string)GetProperty("scrollbarHighlightColor");
  public string ScrollbarShadowColor => (string)GetProperty("scrollbarShadowColor");
  public string ScrollbarTrackColor => (string)GetProperty("scrollbarTrackColor");
  public string Stroke => (string)GetProperty("stroke");
  public string StrokeDasharray => (string)GetProperty("strokeDasharray");
  public string StrokeDashoffset => (string)GetProperty("strokeDashoffset");
  public string StrokeLinecap => (string)GetProperty("strokeLinecap");
  public string StrokeLinejoin => (string)GetProperty("strokeLinejoin");
  public string StrokeMiterlimit => (string)GetProperty("strokeMiterlimit");
  public string StrokeOpacity => (string)GetProperty("strokeOpacity");
  public string StrokeWidth => (string)GetProperty("strokeWidth");
  public string TableLayout => (string)GetProperty("tableLayout");
  public string TextAlign => (string)GetProperty("textAlign");
  public string TextAlignLast => (string)GetProperty("textAlignLast");
  public string TextAnchor => (string)GetProperty("textAnchor");
  public string TextAutospace => (string)GetProperty("textAutospace");
  public string TextDecoration => (string)GetProperty("textDecoration");
  public string TextIndent => (string)GetProperty("textIndent");
  public string TextJustify => (string)GetProperty("textJustify");
  public string TextOverflow => (string)GetProperty("textOverflow");
  public string TextShadow => (string)GetProperty("textShadow");
  public string TextTransform => (string)GetProperty("textTransform");
  public string TextUnderlinePosition => (string)GetProperty("textUnderlinePosition");
  public string Top => (string)GetProperty("top");
  public string Transform => (string)GetProperty("transform");
  public string TransformOrigin => (string)GetProperty("transformOrigin");
  public string TransformStyle => (string)GetProperty("transformStyle");
  public string Transition => (string)GetProperty("transition");
  public string TransitionDelay => (string)GetProperty("transitionDelay");
  public string TransitionDuration => (string)GetProperty("transitionDuration");
  public string TransitionProperty => (string)GetProperty("transitionProperty");
  public string TransitionTimingFunction => (string)GetProperty("transitionTimingFunction");
  public string UnicodeBidi => (string)GetProperty("unicodeBidi");
  public string VerticalAlign => (string)GetProperty("verticalAlign");
  public string Visibility => (string)GetProperty("visibility");
  public string WhiteSpace => (string)GetProperty("whiteSpace");
  public string Widows => (string)GetProperty("widows");
  public string Width => (string)GetProperty("width");
  public string WordBreak => (string)GetProperty("wordBreak");
  public string WordSpacing => (string)GetProperty("wordSpacing");
  public string WritingMode => (string)GetProperty("writingMode");
  public string ZIndex => (string)GetProperty("zIndex");
  public string Zoom => (string)GetProperty("zoom");
} // CSSStyleDeclaration

public partial class CSSRule : JSObject {
  // AngSharp Type: AngleSharp.Dom.Css.ICssRule
  // DOM IDL Type: CSSRule

  internal CSSRule(JSObjectHandle handle) : base(handle) { }

  public CSSRule Type => (CSSRule)GetProperty("type");
  public string CssText => (string)GetProperty("cssText");
  public CSSRule ParentRule => (CSSRule)GetProperty("parentRule");
  public CSSStyleSheet ParentStyleSheet => (CSSStyleSheet)GetProperty("parentStyleSheet");
} // CSSRule

/** WARNING:  Duplicate DOM name -- class name incremented **/
public partial class CSSRule_2 : JSObject {
  // AngSharp Type: AngleSharp.Dom.Css.CssRuleType
  // DOM IDL Type: CSSRule

  internal CSSRule_2(JSObjectHandle handle) : base(handle) { }

  /** TODO: Enum is not supported yet **/
} // CSSRule_2

public partial class CSSStyleSheet : JSObject {
  // AngSharp Type: AngleSharp.Dom.Css.ICssStyleSheet
  // DOM IDL Type: CSSStyleSheet

  internal CSSStyleSheet(JSObjectHandle handle) : base(handle) { }

  public int InsertRule(string rule, int index) {
    var ret = (int)Call("insertRule", rule, index);
    return ret;
  }
  public void DeleteRule(int index) {
    Call("deleteRule", index);
  }
  public CSSRule OwnerRule => (CSSRule)GetProperty("ownerRule");
  public CSSRuleList CssRules => (CSSRuleList)GetProperty("cssRules");
  public CSSStyleSheet ParentStyleSheet => (CSSStyleSheet)GetProperty("parentStyleSheet");
} // CSSStyleSheet

public partial class CSSRuleList : JSObject {
  // AngSharp Type: AngleSharp.Dom.Css.ICssRuleList
  // DOM IDL Type: CSSRuleList

  internal CSSRuleList(JSObjectHandle handle) : base(handle) { }

  public CSSRule Item => (CSSRule)GetProperty("item");
  public int Length => (int)GetProperty("length");
} // CSSRuleList

public partial class MediaQueryList : JSObject {
  // AngSharp Type: AngleSharp.Dom.Css.IMediaQueryList
  // DOM IDL Type: MediaQueryList

  internal MediaQueryList(JSObjectHandle handle) : base(handle) { }

  public string Media => (string)GetProperty("media");
  public bool Matches => (bool)GetProperty("matches");
  /** TODO: Event is not yet supported **/
  // Changed
} // MediaQueryList

public partial class Document : JSObject {
  // AngSharp Type: AngleSharp.Dom.IDocument
  // DOM IDL Type: Document

  internal Document(JSObjectHandle handle) : base(handle) { }

  public Document Open(string type, string replace) {
    var ret = (JSObjectHandle)Call("open", type, replace);
    return ret == null ? default(Document) : new Document(ret);
  }
  public void Close() {
    Call("close");
  }
  public void Write(string content) {
    Call("write", content);
  }
  public void Writeln(string content) {
    Call("writeln", content);
  }
  public void Load(string url) {
    Call("load", url);
  }
  public HTMLCollection<Element> GetElementsByName(string name) {
    var ret = (JSObjectHandle)Call("getElementsByName", name);
    return ret == null ? default(HTMLCollection<Element>) : new HTMLCollection<Element>(ret);
  }
  public HTMLCollection<Element> GetElementsByClassName(string classNames) {
    var ret = (JSObjectHandle)Call("getElementsByClassName", classNames);
    return ret == null ? default(HTMLCollection<Element>) : new HTMLCollection<Element>(ret);
  }
  public HTMLCollection<Element> GetElementsByTagName(string tagName) {
    var ret = (JSObjectHandle)Call("getElementsByTagName", tagName);
    return ret == null ? default(HTMLCollection<Element>) : new HTMLCollection<Element>(ret);
  }
  public HTMLCollection<Element> GetElementsByTagNameNS(string namespaceUri, string tagName) {
    var ret = (JSObjectHandle)Call("getElementsByTagNameNS", namespaceUri, tagName);
    return ret == null ? default(HTMLCollection<Element>) : new HTMLCollection<Element>(ret);
  }
  public Event CreateEvent(string type) {
    var ret = (JSObjectHandle)Call("createEvent", type);
    return ret == null ? default(Event) : new Event(ret);
  }
  public Range CreateRange() {
    var ret = (JSObjectHandle)Call("createRange");
    return ret == null ? default(Range) : new Range(ret);
  }
  public Comment CreateComment(string data) {
    var ret = (JSObjectHandle)Call("createComment", data);
    return ret == null ? default(Comment) : new Comment(ret);
  }
  public DocumentFragment CreateDocumentFragment() {
    var ret = (JSObjectHandle)Call("createDocumentFragment");
    return ret == null ? default(DocumentFragment) : new DocumentFragment(ret);
  }
  public Element CreateElement(string name) {
    var ret = (JSObjectHandle)Call("createElement", name);
    return ret == null ? default(Element) : new Element(ret);
  }
  public Element CreateElementNS(string namespaceUri, string name) {
    var ret = (JSObjectHandle)Call("createElementNS", namespaceUri, name);
    return ret == null ? default(Element) : new Element(ret);
  }
  public Attr CreateAttribute(string name) {
    var ret = (JSObjectHandle)Call("createAttribute", name);
    return ret == null ? default(Attr) : new Attr(ret);
  }
  public Attr CreateAttributeNS(string namespaceUri, string name) {
    var ret = (JSObjectHandle)Call("createAttributeNS", namespaceUri, name);
    return ret == null ? default(Attr) : new Attr(ret);
  }
  public ProcessingInstruction CreateProcessingInstruction(string target, string data) {
    var ret = (JSObjectHandle)Call("createProcessingInstruction", target, data);
    return ret == null ? default(ProcessingInstruction) : new ProcessingInstruction(ret);
  }
  public Text CreateTextNode(string data) {
    var ret = (JSObjectHandle)Call("createTextNode", data);
    return ret == null ? default(Text) : new Text(ret);
  }
  /** TODO: Method with non-DOM params is not yet supported **/
  // CreateNodeIterator:
  //    root : INode
  //    settings : FilterSettings
  //    filter : NodeFilter
  /** TODO: Method with non-DOM params is not yet supported **/
  // CreateTreeWalker:
  //    root : INode
  //    settings : FilterSettings
  //    filter : NodeFilter
  public Node ImportNode(Node externalNode, bool deep) {
    var ret = (JSObjectHandle)Call("importNode", externalNode, deep);
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node AdoptNode(Node externalNode) {
    var ret = (JSObjectHandle)Call("adoptNode", externalNode);
    return ret == null ? default(Node) : new Node(ret);
  }
  public bool HasFocus() {
    var ret = (bool)Call("hasFocus");
    return ret;
  }
  public bool ExecCommand(string commandId, bool showUserInterface, string value) {
    var ret = (bool)Call("execCommand", commandId, showUserInterface, value);
    return ret;
  }
  public bool QueryCommandEnabled(string commandId) {
    var ret = (bool)Call("queryCommandEnabled", commandId);
    return ret;
  }
  public bool QueryCommandIndeterm(string commandId) {
    var ret = (bool)Call("queryCommandIndeterm", commandId);
    return ret;
  }
  public bool QueryCommandState(string commandId) {
    var ret = (bool)Call("queryCommandState", commandId);
    return ret;
  }
  public bool QueryCommandSupported(string commandId) {
    var ret = (bool)Call("queryCommandSupported", commandId);
    return ret;
  }
  public string QueryCommandValue(string commandId) {
    var ret = (string)Call("queryCommandValue", commandId);
    return ret;
  }
  public HTMLAllCollection All => (HTMLAllCollection)GetProperty("all");
  public HTMLCollection<HTMLAnchorElement> Anchors => (HTMLCollection<HTMLAnchorElement>)GetProperty("anchors");
  public DOMImplementation Implementation => (DOMImplementation)GetProperty("implementation");
  public string DesignMode => (string)GetProperty("designMode");
  public string Dir => (string)GetProperty("dir");
  public string DocumentURI => (string)GetProperty("documentURI");
  public string CharacterSet => (string)GetProperty("characterSet");
  public string CompatMode => (string)GetProperty("compatMode");
  public string URL => (string)GetProperty("URL");
  public string ContentType => (string)GetProperty("contentType");
  public DocumentType Doctype => (DocumentType)GetProperty("doctype");
  public Element DocumentElement => (Element)GetProperty("documentElement");
  public string LastModified => (string)GetProperty("lastModified");
  public AngleSharp.Dom.DocumentReadyState ReadyState => (AngleSharp.Dom.DocumentReadyState)GetProperty("readyState");
  public Location Location => (Location)GetProperty("location");
  public HTMLCollection<HTMLFormElement> Forms => (HTMLCollection<HTMLFormElement>)GetProperty("forms");
  public HTMLCollection<HTMLImageElement> Images => (HTMLCollection<HTMLImageElement>)GetProperty("images");
  public HTMLCollection<HTMLScriptElement> Scripts => (HTMLCollection<HTMLScriptElement>)GetProperty("scripts");
  public HTMLCollection<HTMLEmbedElement> Embeds => (HTMLCollection<HTMLEmbedElement>)GetProperty("embeds");
  public HTMLCollection<Element> Commands => (HTMLCollection<Element>)GetProperty("commands");
  public HTMLCollection<Element> Links => (HTMLCollection<Element>)GetProperty("links");
  public string Title => (string)GetProperty("title");
  public HTMLHeadElement Head => (HTMLHeadElement)GetProperty("head");
  public HTMLElement Body => (HTMLElement)GetProperty("body");
  public string Cookie => (string)GetProperty("cookie");
  public string Origin => (string)GetProperty("origin");
  public string Domain => (string)GetProperty("domain");
  public string Referrer => (string)GetProperty("referrer");
  public Element ActiveElement => (Element)GetProperty("activeElement");
  public HTMLScriptElement CurrentScript => (HTMLScriptElement)GetProperty("currentScript");
  public Window DefaultView => (Window)GetProperty("defaultView");
  /** TODO: Event is not yet supported **/
  // ReadyStateChanged
} // Document

public partial class HTMLCollection<T0> : JSObject {
  // AngSharp Type: AngleSharp.Dom.IHtmlCollection`1[[AngleSharp.Dom.IElement, AngleSharp, Version=0.9.9.0, Culture=neutral, PublicKeyToken=e83494dcdc6d31ea]]
  // DOM IDL Type: HTMLCollection

  internal HTMLCollection(JSObjectHandle handle) : base(handle) { }

  public int Length => (int)GetProperty("length");
  public Element Item => (Element)GetProperty("item");
  public Element NamedItem => (Element)GetProperty("namedItem");
} // HTMLCollection<T0>

public partial class Element : JSObject {
  // AngSharp Type: AngleSharp.Dom.IElement
  // DOM IDL Type: Element

  internal Element(JSObjectHandle handle) : base(handle) { }

  /** TODO: Method with non-DOM params is not yet supported **/
  // Insert:
  //    position : AdjacentPosition
  //    html : String
  public bool HasAttribute(string name) {
    var ret = (bool)Call("hasAttribute", name);
    return ret;
  }
  public bool HasAttributeNS(string namespaceUri, string localName) {
    var ret = (bool)Call("hasAttributeNS", namespaceUri, localName);
    return ret;
  }
  public string GetAttribute(string name) {
    var ret = (string)Call("getAttribute", name);
    return ret;
  }
  public string GetAttributeNS(string namespaceUri, string localName) {
    var ret = (string)Call("getAttributeNS", namespaceUri, localName);
    return ret;
  }
  public void SetAttribute(string name, string value) {
    Call("setAttribute", name, value);
  }
  public void SetAttributeNS(string namespaceUri, string name, string value) {
    Call("setAttributeNS", namespaceUri, name, value);
  }
  public bool RemoveAttribute(string name) {
    var ret = (bool)Call("removeAttribute", name);
    return ret;
  }
  public bool RemoveAttributeNS(string namespaceUri, string localName) {
    var ret = (bool)Call("removeAttributeNS", namespaceUri, localName);
    return ret;
  }
  public HTMLCollection<Element> GetElementsByClassName(string classNames) {
    var ret = (JSObjectHandle)Call("getElementsByClassName", classNames);
    return ret == null ? default(HTMLCollection<Element>) : new HTMLCollection<Element>(ret);
  }
  public HTMLCollection<Element> GetElementsByTagName(string tagName) {
    var ret = (JSObjectHandle)Call("getElementsByTagName", tagName);
    return ret == null ? default(HTMLCollection<Element>) : new HTMLCollection<Element>(ret);
  }
  public HTMLCollection<Element> GetElementsByTagNameNS(string namespaceUri, string tagName) {
    var ret = (JSObjectHandle)Call("getElementsByTagNameNS", namespaceUri, tagName);
    return ret == null ? default(HTMLCollection<Element>) : new HTMLCollection<Element>(ret);
  }
  public bool Matches(string selectors) {
    var ret = (bool)Call("matches", selectors);
    return ret;
  }
  public PseudoElement Pseudo(string pseudoElement) {
    var ret = (JSObjectHandle)Call("pseudo", pseudoElement);
    return ret == null ? default(PseudoElement) : new PseudoElement(ret);
  }
  /** TODO: Method with non-DOM params is not yet supported **/
  // AttachShadow:
  //    mode : ShadowRootMode
  public string Prefix => (string)GetProperty("prefix");
  public string LocalName => (string)GetProperty("localName");
  public string NamespaceURI => (string)GetProperty("namespaceURI");
  public NamedNodeMap Attributes => (NamedNodeMap)GetProperty("attributes");
  public DOMTokenList ClassList => (DOMTokenList)GetProperty("classList");
  public string ClassName => (string)GetProperty("className");
  public string Id => (string)GetProperty("id");
  public string InnerHTML => (string)GetProperty("innerHTML");
  public string OuterHTML => (string)GetProperty("outerHTML");
  public string TagName => (string)GetProperty("tagName");
  public Element AssignedSlot => (Element)GetProperty("assignedSlot");
  public string Slot => (string)GetProperty("slot");
  public ShadowRoot ShadowRoot => (ShadowRoot)GetProperty("shadowRoot");
} // Element

public partial class PseudoElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.IPseudoElement
  // DOM IDL Type: PseudoElement

  internal PseudoElement(JSObjectHandle handle) : base(handle) { }

} // PseudoElement

public partial class ShadowRoot : JSObject {
  // AngSharp Type: AngleSharp.Dom.IShadowRoot
  // DOM IDL Type: ShadowRoot

  internal ShadowRoot(JSObjectHandle handle) : base(handle) { }

  public Element ActiveElement => (Element)GetProperty("activeElement");
  public Element Host => (Element)GetProperty("host");
  public string InnerHTML => (string)GetProperty("innerHTML");
  public StyleSheetList StyleSheets => (StyleSheetList)GetProperty("styleSheets");
} // ShadowRoot

public partial class StyleSheetList : JSObject {
  // AngSharp Type: AngleSharp.Dom.IStyleSheetList
  // DOM IDL Type: StyleSheetList

  internal StyleSheetList(JSObjectHandle handle) : base(handle) { }

  public StyleSheet Item => (StyleSheet)GetProperty("item");
  public int Length => (int)GetProperty("length");
} // StyleSheetList

public partial class StyleSheet : JSObject {
  // AngSharp Type: AngleSharp.Dom.IStyleSheet
  // DOM IDL Type: StyleSheet

  internal StyleSheet(JSObjectHandle handle) : base(handle) { }

  public string Type => (string)GetProperty("type");
  public string Href => (string)GetProperty("href");
  public Element OwnerNode => (Element)GetProperty("ownerNode");
  public string Title => (string)GetProperty("title");
  public MediaList Media => (MediaList)GetProperty("media");
  public bool Disabled => (bool)GetProperty("disabled");
} // StyleSheet

public partial class MediaList : JSObject {
  // AngSharp Type: AngleSharp.Dom.Css.IMediaList
  // DOM IDL Type: MediaList

  internal MediaList(JSObjectHandle handle) : base(handle) { }

  public void AppendMedium(string medium) {
    Call("appendMedium", medium);
  }
  public void RemoveMedium(string medium) {
    Call("removeMedium", medium);
  }
  public string MediaText => (string)GetProperty("mediaText");
  public int Length => (int)GetProperty("length");
  public string Item => (string)GetProperty("item");
} // MediaList

public partial class NamedNodeMap : JSObject {
  // AngSharp Type: AngleSharp.Dom.INamedNodeMap
  // DOM IDL Type: NamedNodeMap

  internal NamedNodeMap(JSObjectHandle handle) : base(handle) { }

  public Attr GetNamedItem(string name) {
    var ret = (JSObjectHandle)Call("getNamedItem", name);
    return ret == null ? default(Attr) : new Attr(ret);
  }
  public Attr SetNamedItem(Attr item) {
    var ret = (JSObjectHandle)Call("setNamedItem", item);
    return ret == null ? default(Attr) : new Attr(ret);
  }
  public Attr RemoveNamedItem(string name) {
    var ret = (JSObjectHandle)Call("removeNamedItem", name);
    return ret == null ? default(Attr) : new Attr(ret);
  }
  public Attr GetNamedItemNS(string namespaceUri, string localName) {
    var ret = (JSObjectHandle)Call("getNamedItemNS", namespaceUri, localName);
    return ret == null ? default(Attr) : new Attr(ret);
  }
  public Attr SetNamedItemNS(Attr item) {
    var ret = (JSObjectHandle)Call("setNamedItemNS", item);
    return ret == null ? default(Attr) : new Attr(ret);
  }
  public Attr RemoveNamedItemNS(string namespaceUri, string localName) {
    var ret = (JSObjectHandle)Call("removeNamedItemNS", namespaceUri, localName);
    return ret == null ? default(Attr) : new Attr(ret);
  }
  public Attr Item => (Attr)GetProperty("item");
  public int Length => (int)GetProperty("length");
} // NamedNodeMap

public partial class DOMTokenList : JSObject {
  // AngSharp Type: AngleSharp.Dom.ITokenList
  // DOM IDL Type: DOMTokenList

  internal DOMTokenList(JSObjectHandle handle) : base(handle) { }

  public bool Contains(string token) {
    var ret = (bool)Call("contains", token);
    return ret;
  }
  /** TODO: Method with non-DOM params is not yet supported **/
  // Add:
  //    tokens : String[]
  /** TODO: Method with non-DOM params is not yet supported **/
  // Remove:
  //    tokens : String[]
  public bool Toggle(string token, bool force) {
    var ret = (bool)Call("toggle", token, force);
    return ret;
  }
  public int Length => (int)GetProperty("length");
  public string Item => (string)GetProperty("item");
} // DOMTokenList

public partial class Event : JSObject {
  // AngSharp Type: AngleSharp.Dom.Events.Event
  // DOM IDL Type: Event

  internal Event(JSObjectHandle handle) : base(handle) { }

  public void StopPropagation() {
    Call("stopPropagation");
  }
  public void StopImmediatePropagation() {
    Call("stopImmediatePropagation");
  }
  public void PreventDefault() {
    Call("preventDefault");
  }
  public void InitEvent(string type, bool bubbles, bool cancelable) {
    Call("initEvent", type, bubbles, cancelable);
  }
  public string Type => (string)GetProperty("type");
  public EventTarget Target => (EventTarget)GetProperty("target");
  public EventTarget CurrentTarget => (EventTarget)GetProperty("currentTarget");
  public Event EventPhase => (Event)GetProperty("eventPhase");
  public bool Bubbles => (bool)GetProperty("bubbles");
  public bool Cancelable => (bool)GetProperty("cancelable");
  public bool DefaultPrevented => (bool)GetProperty("defaultPrevented");
  public bool IsTrusted => (bool)GetProperty("isTrusted");
  public DateTime TimeStamp => (DateTime)GetProperty("timeStamp");
} // Event

public partial class EventTarget : JSObject {
  // AngSharp Type: AngleSharp.Dom.IEventTarget
  // DOM IDL Type: EventTarget

  internal EventTarget(JSObjectHandle handle) : base(handle) { }

  public void AddEventListener(string type, AngleSharp.Dom.DomEventHandler callback, bool capture) {
    Call("addEventListener", type, callback, capture);
  }
  public void RemoveEventListener(string type, AngleSharp.Dom.DomEventHandler callback, bool capture) {
    Call("removeEventListener", type, callback, capture);
  }
  public bool DispatchEvent(Event ev) {
    var ret = (bool)Call("dispatchEvent", ev);
    return ret;
  }
} // EventTarget

/** WARNING:  Duplicate DOM name -- class name incremented **/
public partial class Event_2 : JSObject {
  // AngSharp Type: AngleSharp.Dom.Events.EventPhase
  // DOM IDL Type: Event

  internal Event_2(JSObjectHandle handle) : base(handle) { }

  /** TODO: Enum is not supported yet **/
} // Event_2

public partial class Range : JSObject {
  // AngSharp Type: AngleSharp.Dom.IRange
  // DOM IDL Type: Range

  internal Range(JSObjectHandle handle) : base(handle) { }

  public void SetStart(Node refNode, int offset) {
    Call("setStart", refNode, offset);
  }
  public void SetEnd(Node refNode, int offset) {
    Call("setEnd", refNode, offset);
  }
  public void SetStartBefore(Node refNode) {
    Call("setStartBefore", refNode);
  }
  public void SetEndBefore(Node refNode) {
    Call("setEndBefore", refNode);
  }
  public void SetStartAfter(Node refNode) {
    Call("setStartAfter", refNode);
  }
  public void SetEndAfter(Node refNode) {
    Call("setEndAfter", refNode);
  }
  public void Collapse(bool toStart) {
    Call("collapse", toStart);
  }
  public void SelectNode(Node refNode) {
    Call("selectNode", refNode);
  }
  public void SelectNodeContents(Node refNode) {
    Call("selectNodeContents", refNode);
  }
  public void DeleteContents() {
    Call("deleteContents");
  }
  public DocumentFragment ExtractContents() {
    var ret = (JSObjectHandle)Call("extractContents");
    return ret == null ? default(DocumentFragment) : new DocumentFragment(ret);
  }
  public DocumentFragment CloneContents() {
    var ret = (JSObjectHandle)Call("cloneContents");
    return ret == null ? default(DocumentFragment) : new DocumentFragment(ret);
  }
  public void InsertNode(Node node) {
    Call("insertNode", node);
  }
  public void SurroundContents(Node newParent) {
    Call("surroundContents", newParent);
  }
  public Range CloneRange() {
    var ret = (JSObjectHandle)Call("cloneRange");
    return ret == null ? default(Range) : new Range(ret);
  }
  public void Detach() {
    Call("detach");
  }
  public bool IsPointInRange(Node node, int offset) {
    var ret = (bool)Call("isPointInRange", node, offset);
    return ret;
  }
  /** TODO: Method with non-DOM params is not yet supported **/
  // CompareBoundaryTo:
  //    how : RangeType
  //    sourceRange : IRange
  public AngleSharp.Dom.RangePosition ComparePoint(Node node, int offset) {
    var ret = (AngleSharp.Dom.RangePosition)Call("comparePoint", node, offset);
    return ret;
  }
  public bool IntersectsNode(Node node) {
    var ret = (bool)Call("intersectsNode", node);
    return ret;
  }
  public Node StartContainer => (Node)GetProperty("startContainer");
  public int StartOffset => (int)GetProperty("startOffset");
  public Node EndContainer => (Node)GetProperty("endContainer");
  public int EndOffset => (int)GetProperty("endOffset");
  public bool Collapsed => (bool)GetProperty("collapsed");
  public Node CommonAncestorContainer => (Node)GetProperty("commonAncestorContainer");
} // Range

public partial class Comment : JSObject {
  // AngSharp Type: AngleSharp.Dom.IComment
  // DOM IDL Type: Comment

  internal Comment(JSObjectHandle handle) : base(handle) { }

} // Comment

public partial class DocumentFragment : JSObject {
  // AngSharp Type: AngleSharp.Dom.IDocumentFragment
  // DOM IDL Type: DocumentFragment

  internal DocumentFragment(JSObjectHandle handle) : base(handle) { }

} // DocumentFragment

public partial class Attr : JSObject {
  // AngSharp Type: AngleSharp.Dom.IAttr
  // DOM IDL Type: Attr

  internal Attr(JSObjectHandle handle) : base(handle) { }

  public string LocalName => (string)GetProperty("localName");
  public string Name => (string)GetProperty("name");
  public string Value => (string)GetProperty("value");
  public string NamespaceURI => (string)GetProperty("namespaceURI");
  public string Prefix => (string)GetProperty("prefix");
} // Attr

public partial class ProcessingInstruction : JSObject {
  // AngSharp Type: AngleSharp.Dom.IProcessingInstruction
  // DOM IDL Type: ProcessingInstruction

  internal ProcessingInstruction(JSObjectHandle handle) : base(handle) { }

  public string Target => (string)GetProperty("target");
} // ProcessingInstruction

public partial class Text : JSObject {
  // AngSharp Type: AngleSharp.Dom.IText
  // DOM IDL Type: Text

  internal Text(JSObjectHandle handle) : base(handle) { }

  public Text SplitText(int offset) {
    var ret = (JSObjectHandle)Call("splitText", offset);
    return ret == null ? default(Text) : new Text(ret);
  }
  public string WholeText => (string)GetProperty("wholeText");
  public Element AssignedSlot => (Element)GetProperty("assignedSlot");
} // Text

public partial class NodeIterator : JSObject {
  // AngSharp Type: AngleSharp.Dom.INodeIterator
  // DOM IDL Type: NodeIterator

  internal NodeIterator(JSObjectHandle handle) : base(handle) { }

  public Node NextNode() {
    var ret = (JSObjectHandle)Call("nextNode");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node PreviousNode() {
    var ret = (JSObjectHandle)Call("previousNode");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node Root => (Node)GetProperty("root");
  public Node ReferenceNode => (Node)GetProperty("referenceNode");
  public bool PointerBeforeReferenceNode => (bool)GetProperty("pointerBeforeReferenceNode");
  public NodeFilter WhatToShow => (NodeFilter)GetProperty("whatToShow");
  public AngleSharp.Dom.NodeFilter Filter => (AngleSharp.Dom.NodeFilter)GetProperty("filter");
} // NodeIterator

public partial class NodeFilter : JSObject {
  // AngSharp Type: AngleSharp.Dom.FilterSettings
  // DOM IDL Type: NodeFilter

  internal NodeFilter(JSObjectHandle handle) : base(handle) { }

  /** TODO: Enum is not supported yet **/
} // NodeFilter

public partial class TreeWalker : JSObject {
  // AngSharp Type: AngleSharp.Dom.ITreeWalker
  // DOM IDL Type: TreeWalker

  internal TreeWalker(JSObjectHandle handle) : base(handle) { }

  public Node NextNode() {
    var ret = (JSObjectHandle)Call("nextNode");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node PreviousNode() {
    var ret = (JSObjectHandle)Call("previousNode");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node ParentNode() {
    var ret = (JSObjectHandle)Call("parentNode");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node FirstChild() {
    var ret = (JSObjectHandle)Call("firstChild");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node LastChild() {
    var ret = (JSObjectHandle)Call("lastChild");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node PreviousSibling() {
    var ret = (JSObjectHandle)Call("previousSibling");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node NextSibling() {
    var ret = (JSObjectHandle)Call("nextSibling");
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node Root => (Node)GetProperty("root");
  public Node CurrentNode => (Node)GetProperty("currentNode");
  public NodeFilter WhatToShow => (NodeFilter)GetProperty("whatToShow");
  public AngleSharp.Dom.NodeFilter Filter => (AngleSharp.Dom.NodeFilter)GetProperty("filter");
} // TreeWalker

public partial class Node : JSObject {
  // AngSharp Type: AngleSharp.Dom.INode
  // DOM IDL Type: Node

  internal Node(JSObjectHandle handle) : base(handle) { }

  public Node CloneNode(bool deep) {
    var ret = (JSObjectHandle)Call("cloneNode", deep);
    return ret == null ? default(Node) : new Node(ret);
  }
  public bool IsEqualNode(Node otherNode) {
    var ret = (bool)Call("isEqualNode", otherNode);
    return ret;
  }
  public Document CompareDocumentPosition(Node otherNode) {
    var ret = (JSObjectHandle)Call("compareDocumentPosition", otherNode);
    return ret == null ? default(Document) : new Document(ret);
  }
  public void Normalize() {
    Call("normalize");
  }
  public bool Contains(Node otherNode) {
    var ret = (bool)Call("contains", otherNode);
    return ret;
  }
  public bool IsDefaultNamespace(string namespaceUri) {
    var ret = (bool)Call("isDefaultNamespace", namespaceUri);
    return ret;
  }
  public string LookupNamespaceURI(string prefix) {
    var ret = (string)Call("lookupNamespaceURI", prefix);
    return ret;
  }
  public string LookupPrefix(string namespaceUri) {
    var ret = (string)Call("lookupPrefix", namespaceUri);
    return ret;
  }
  public Node AppendChild(Node child) {
    var ret = (JSObjectHandle)Call("appendChild", child);
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node InsertBefore(Node newElement, Node referenceElement) {
    var ret = (JSObjectHandle)Call("insertBefore", newElement, referenceElement);
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node RemoveChild(Node child) {
    var ret = (JSObjectHandle)Call("removeChild", child);
    return ret == null ? default(Node) : new Node(ret);
  }
  public Node ReplaceChild(Node newChild, Node oldChild) {
    var ret = (JSObjectHandle)Call("replaceChild", newChild, oldChild);
    return ret == null ? default(Node) : new Node(ret);
  }
  public string BaseURI => (string)GetProperty("baseURI");
  public string NodeName => (string)GetProperty("nodeName");
  public NodeList ChildNodes => (NodeList)GetProperty("childNodes");
  public Document OwnerDocument => (Document)GetProperty("ownerDocument");
  public Element ParentElement => (Element)GetProperty("parentElement");
  public Node ParentNode => (Node)GetProperty("parentNode");
  public Node FirstChild => (Node)GetProperty("firstChild");
  public Node LastChild => (Node)GetProperty("lastChild");
  public Node NextSibling => (Node)GetProperty("nextSibling");
  public Node PreviousSibling => (Node)GetProperty("previousSibling");
  public Document NodeType => (Document)GetProperty("nodeType");
  public string NodeValue => (string)GetProperty("nodeValue");
  public string TextContent => (string)GetProperty("textContent");
  public bool HasChildNodes => (bool)GetProperty("hasChildNodes");
} // Node

/** WARNING:  Duplicate DOM name -- class name incremented **/
public partial class Document_2 : JSObject {
  // AngSharp Type: AngleSharp.Dom.DocumentPositions
  // DOM IDL Type: Document

  internal Document_2(JSObjectHandle handle) : base(handle) { }

  /** TODO: Enum is not supported yet **/
} // Document_2

public partial class NodeList : JSObject {
  // AngSharp Type: AngleSharp.Dom.INodeList
  // DOM IDL Type: NodeList

  internal NodeList(JSObjectHandle handle) : base(handle) { }

  public Node Item => (Node)GetProperty("item");
  public int Length => (int)GetProperty("length");
} // NodeList

/** WARNING:  Duplicate DOM name -- class name incremented **/
public partial class Document_3 : JSObject {
  // AngSharp Type: AngleSharp.Dom.NodeType
  // DOM IDL Type: Document

  internal Document_3(JSObjectHandle handle) : base(handle) { }

  /** TODO: Enum is not supported yet **/
} // Document_3

public partial class HTMLAllCollection : JSObject {
  // AngSharp Type: AngleSharp.Dom.IHtmlAllCollection
  // DOM IDL Type: HTMLAllCollection

  internal HTMLAllCollection(JSObjectHandle handle) : base(handle) { }

} // HTMLAllCollection

public partial class HTMLAnchorElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlAnchorElement
  // DOM IDL Type: HTMLAnchorElement

  internal HTMLAnchorElement(JSObjectHandle handle) : base(handle) { }

  public string Target => (string)GetProperty("target");
  public string Download => (string)GetProperty("download");
  public DOMSettableTokenList Ping => (DOMSettableTokenList)GetProperty("ping");
  public string Rel => (string)GetProperty("rel");
  public DOMTokenList RelList => (DOMTokenList)GetProperty("relList");
  public string Hreflang => (string)GetProperty("hreflang");
  public string Type => (string)GetProperty("type");
  public string Text => (string)GetProperty("text");
} // HTMLAnchorElement

public partial class DOMSettableTokenList : JSObject {
  // AngSharp Type: AngleSharp.Dom.ISettableTokenList
  // DOM IDL Type: DOMSettableTokenList

  internal DOMSettableTokenList(JSObjectHandle handle) : base(handle) { }

  public string Value => (string)GetProperty("value");
} // DOMSettableTokenList

public partial class DOMImplementation : JSObject {
  // AngSharp Type: AngleSharp.Dom.IImplementation
  // DOM IDL Type: DOMImplementation

  internal DOMImplementation(JSObjectHandle handle) : base(handle) { }

  public XMLDocument CreateDocument(string namespaceUri, string qualifiedName, DocumentType doctype) {
    var ret = (JSObjectHandle)Call("createDocument", namespaceUri, qualifiedName, doctype);
    return ret == null ? default(XMLDocument) : new XMLDocument(ret);
  }
  public Document CreateHTMLDocument(string title) {
    var ret = (JSObjectHandle)Call("createHTMLDocument", title);
    return ret == null ? default(Document) : new Document(ret);
  }
  public DocumentType CreateDocumentType(string qualifiedName, string publicId, string systemId) {
    var ret = (JSObjectHandle)Call("createDocumentType", qualifiedName, publicId, systemId);
    return ret == null ? default(DocumentType) : new DocumentType(ret);
  }
  public bool HasFeature(string feature, string version) {
    var ret = (bool)Call("hasFeature", feature, version);
    return ret;
  }
} // DOMImplementation

public partial class XMLDocument : JSObject {
  // AngSharp Type: AngleSharp.Dom.Xml.IXmlDocument
  // DOM IDL Type: XMLDocument

  internal XMLDocument(JSObjectHandle handle) : base(handle) { }

} // XMLDocument

public partial class DocumentType : JSObject {
  // AngSharp Type: AngleSharp.Dom.IDocumentType
  // DOM IDL Type: DocumentType

  internal DocumentType(JSObjectHandle handle) : base(handle) { }

  public string Name => (string)GetProperty("name");
  public string PublicId => (string)GetProperty("publicId");
  public string SystemId => (string)GetProperty("systemId");
} // DocumentType

public partial class HTMLFormElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlFormElement
  // DOM IDL Type: HTMLFormElement

  internal HTMLFormElement(JSObjectHandle handle) : base(handle) { }

  public Document Submit() {
    var ret = (JSObjectHandle)Call("submit");
    return ret == null ? default(Document) : new Document(ret);
  }
  public void Reset() {
    Call("reset");
  }
  public bool CheckValidity() {
    var ret = (bool)Call("checkValidity");
    return ret;
  }
  public bool ReportValidity() {
    var ret = (bool)Call("reportValidity");
    return ret;
  }
  public void RequestAutocomplete() {
    Call("requestAutocomplete");
  }
  public string AcceptCharset => (string)GetProperty("acceptCharset");
  public string Action => (string)GetProperty("action");
  public string Autocomplete => (string)GetProperty("autocomplete");
  public string Enctype => (string)GetProperty("enctype");
  public string Encoding => (string)GetProperty("encoding");
  public string Method => (string)GetProperty("method");
  public string Name => (string)GetProperty("name");
  public bool NoValidate => (bool)GetProperty("noValidate");
  public string Target => (string)GetProperty("target");
  public int Length => (int)GetProperty("length");
  public HTMLFormControlsCollection Elements => (HTMLFormControlsCollection)GetProperty("elements");
} // HTMLFormElement

public partial class HTMLFormControlsCollection : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlFormControlsCollection
  // DOM IDL Type: HTMLFormControlsCollection

  internal HTMLFormControlsCollection(JSObjectHandle handle) : base(handle) { }

} // HTMLFormControlsCollection

public partial class HTMLImageElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlImageElement
  // DOM IDL Type: HTMLImageElement

  internal HTMLImageElement(JSObjectHandle handle) : base(handle) { }

  public string Alt => (string)GetProperty("alt");
  public string CurrentSrc => (string)GetProperty("currentSrc");
  public string Src => (string)GetProperty("src");
  public string Srcset => (string)GetProperty("srcset");
  public string Sizes => (string)GetProperty("sizes");
  public string CrossOrigin => (string)GetProperty("crossOrigin");
  public string UseMap => (string)GetProperty("useMap");
  public bool IsMap => (bool)GetProperty("isMap");
  public int Width => (int)GetProperty("width");
  public int Height => (int)GetProperty("height");
  public int NaturalWidth => (int)GetProperty("naturalWidth");
  public int NaturalHeight => (int)GetProperty("naturalHeight");
  public bool Complete => (bool)GetProperty("complete");
} // HTMLImageElement

public partial class HTMLScriptElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlScriptElement
  // DOM IDL Type: HTMLScriptElement

  internal HTMLScriptElement(JSObjectHandle handle) : base(handle) { }

  public string Src => (string)GetProperty("src");
  public bool Async => (bool)GetProperty("async");
  public bool Defer => (bool)GetProperty("defer");
  public string Type => (string)GetProperty("type");
  public string Charset => (string)GetProperty("charset");
  public string CrossOrigin => (string)GetProperty("crossOrigin");
  public string Text => (string)GetProperty("text");
  public string Integrity => (string)GetProperty("integrity");
} // HTMLScriptElement

public partial class HTMLEmbedElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlEmbedElement
  // DOM IDL Type: HTMLEmbedElement

  internal HTMLEmbedElement(JSObjectHandle handle) : base(handle) { }

  public string Src => (string)GetProperty("src");
  public string Type => (string)GetProperty("type");
  public string Width => (string)GetProperty("width");
  public string Height => (string)GetProperty("height");
} // HTMLEmbedElement

public partial class HTMLHeadElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlHeadElement
  // DOM IDL Type: HTMLHeadElement

  internal HTMLHeadElement(JSObjectHandle handle) : base(handle) { }

} // HTMLHeadElement

public partial class HTMLElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlElement
  // DOM IDL Type: HTMLElement

  internal HTMLElement(JSObjectHandle handle) : base(handle) { }

  public void Click() {
    Call("click");
  }
  public void Focus() {
    Call("focus");
  }
  public void Blur() {
    Call("blur");
  }
  public void ForceSpellCheck() {
    Call("forceSpellCheck");
  }
  public string Lang => (string)GetProperty("lang");
  public string Title => (string)GetProperty("title");
  public string Dir => (string)GetProperty("dir");
  public DOMStringMap Dataset => (DOMStringMap)GetProperty("dataset");
  public bool Translate => (bool)GetProperty("translate");
  public int TabIndex => (int)GetProperty("tabIndex");
  public bool Spellcheck => (bool)GetProperty("spellcheck");
  public string ContentEditable => (string)GetProperty("contentEditable");
  public bool IsContentEditable => (bool)GetProperty("isContentEditable");
  public bool Hidden => (bool)GetProperty("hidden");
  public bool Draggable => (bool)GetProperty("draggable");
  public string AccessKey => (string)GetProperty("accessKey");
  public string AccessKeyLabel => (string)GetProperty("accessKeyLabel");
  public HTMLMenuElement ContextMenu => (HTMLMenuElement)GetProperty("contextMenu");
  public DOMSettableTokenList Dropzone => (DOMSettableTokenList)GetProperty("dropzone");
} // HTMLElement

public partial class DOMStringMap : JSObject {
  // AngSharp Type: AngleSharp.Dom.IStringMap
  // DOM IDL Type: DOMStringMap

  internal DOMStringMap(JSObjectHandle handle) : base(handle) { }

} // DOMStringMap

public partial class HTMLMenuElement : JSObject {
  // AngSharp Type: AngleSharp.Dom.Html.IHtmlMenuElement
  // DOM IDL Type: HTMLMenuElement

  internal HTMLMenuElement(JSObjectHandle handle) : base(handle) { }

  public string Label => (string)GetProperty("label");
  public string Type => (string)GetProperty("type");
} // HTMLMenuElement

public partial class Location : JSObject {
  // AngSharp Type: AngleSharp.Dom.ILocation
  // DOM IDL Type: Location

  internal Location(JSObjectHandle handle) : base(handle) { }

  public void Assign(string url) {
    Call("assign", url);
  }
  public void Replace(string url) {
    Call("replace", url);
  }
  public void Reload() {
    Call("reload");
  }
} // Location

public partial class Navigator : JSObject {
  // AngSharp Type: AngleSharp.Dom.Navigator.INavigator
  // DOM IDL Type: Navigator

  internal Navigator(JSObjectHandle handle) : base(handle) { }

} // Navigator

public partial class History : JSObject {
  // AngSharp Type: AngleSharp.Dom.IHistory
  // DOM IDL Type: History

  internal History(JSObjectHandle handle) : base(handle) { }

  public void Go(int delta) {
    Call("go", delta);
  }
  public void Back() {
    Call("back");
  }
  public void Forward() {
    Call("forward");
  }
  public void PushState(object data, string title, string url) {
    Call("pushState", data, title, url);
  }
  public void ReplaceState(object data, string title, string url) {
    Call("replaceState", data, title, url);
  }
  public int Length => (int)GetProperty("length");
  public object State => (object)GetProperty("state");
} // History

}
