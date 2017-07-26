using System;
using Blazor.Interop;
public interface JQueryAjaxSettings
{
    object @accepts { get; set; }
    bool @async { get; set; }
    object @beforeSend(JQueryXHR @jqXHR, JQueryAjaxSettings @settings);
    bool @cache { get; set; }
    object @complete(JQueryXHR @jqXHR, string @textStatus);
    object /* Type Literal */ @contents { get; set; }
    object @contentType { get; set; }
    object @context { get; set; }
    object /* Type Literal */ @converters { get; set; }
    bool @crossDomain { get; set; }
    object @data { get; set; }
    object @dataFilter(object @data, object @ty);
    string @dataType { get; set; }
    object @error(JQueryXHR @jqXHR, string @textStatus, string @errorThrown);
    bool @global { get; set; }
    object /* Type Literal */ @headers { get; set; }
    bool @ifModified { get; set; }
    bool @isLocal { get; set; }
    object @jsonp { get; set; }
    object @jsonpCallback { get; set; }
    string @method { get; set; }
    string @mimeType { get; set; }
    string @password { get; set; }
    bool @processData { get; set; }
    string @scriptCharset { get; set; }
    object /* Type Literal */ @statusCode { get; set; }
    object @success(object @data, string @textStatus, JQueryXHR @jqXHR);
    double @timeout { get; set; }
    bool @traditional { get; set; }
    string @type { get; set; }
    string @url { get; set; }
    string @username { get; set; }
    object @xhr { get; set; }
    object /* Type Literal */ @xhrFields { get; set; }
}
public interface JQueryXHR : XMLHttpRequest, JQueryPromise<object>
{
    object @overrideMimeType(string @mimeType);
    void @abort(string @statusText);
    JQueryPromise<R> @then<R>(Func<object, string, JQueryXHR, object /* Union Type */> @doneCallback, Action<JQueryXHR, string, object> @failCallback);
    object @responseJSON { get; set; }
    void @error(JQueryXHR @xhr, string @textStatus, string @errorThrown);
}
public interface JQueryCallback
{
    JQueryCallback @add(Function @callbacks);
    JQueryCallback @add(Function[] @callbacks);
    JQueryCallback @disable();
    bool @disabled();
    JQueryCallback @empty();
    JQueryCallback @fire(object[] @arguments);
    bool @fired();
    JQueryCallback @fireWith(object @context, object[] @args);
    bool @has(Function @callback);
    JQueryCallback @lock();
    bool @locked();
    JQueryCallback @remove(Function @callbacks);
    JQueryCallback @remove(Function[] @callbacks);
}
public interface JQueryGenericPromise<T>
{
    JQueryPromise<U> @then<U>(Func<T, object[], object /* Union Type */> @doneFilter, Func<object[], object> @failFilter, Func<object[], object> @progressFilter);
    JQueryPromise<object /* void */> @then(Action<T, object[]> @doneFilter, Func<object[], object> @failFilter, Func<object[], object> @progressFilter);
}
public interface JQueryPromiseCallback<T>
{
}
public interface JQueryPromiseOperator<T, U>
{
}
public interface JQueryPromise<T> : JQueryGenericPromise<T>
{
    string @state();
    JQueryPromise<T> @always(object /* Union Type */ @alwaysCallback1, Array @alwaysCallbackN);
    JQueryPromise<T> @done(object /* Union Type */ @doneCallback1, Array @doneCallbackN);
    JQueryPromise<T> @fail(object /* Union Type */ @failCallback1, Array @failCallbackN);
    JQueryPromise<T> @progress(object /* Union Type */ @progressCallback1, Array @progressCallbackN);
    JQueryPromise<object> @pipe(Func<object, object> @doneFilter, Func<object, object> @failFilter, Func<object, object> @progressFilter);
    JQueryPromise<T> @promise(object @target);
}
public interface JQueryDeferred<T> : JQueryGenericPromise<T>
{
    string @state();
    JQueryDeferred<T> @always(object /* Union Type */ @alwaysCallback1, Array @alwaysCallbackN);
    JQueryDeferred<T> @done(object /* Union Type */ @doneCallback1, Array @doneCallbackN);
    JQueryDeferred<T> @fail(object /* Union Type */ @failCallback1, Array @failCallbackN);
    JQueryDeferred<T> @progress(object /* Union Type */ @progressCallback1, Array @progressCallbackN);
    JQueryDeferred<T> @notify(object @value, object[] @args);
    JQueryDeferred<T> @notifyWith(object @context, object[] @args);
    JQueryDeferred<T> @reject(object @value, object[] @args);
    JQueryDeferred<T> @rejectWith(object @context, object[] @args);
    JQueryDeferred<T> @resolve(T @value, object[] @args);
    JQueryDeferred<T> @resolveWith(object @context, T[] @args);
    JQueryPromise<T> @promise(object @target);
    JQueryPromise<object> @pipe(Func<object, object> @doneFilter, Func<object, object> @failFilter, Func<object, object> @progressFilter);
}
public interface BaseJQueryEventObject : Event
{
    Element @currentTarget { get; set; }
    object @data { get; set; }
    Element @delegateTarget { get; set; }
    bool @isDefaultPrevented();
    bool @isImmediatePropagationStopped();
    bool @isPropagationStopped();
    string @namespace { get; set; }
    Event @originalEvent { get; set; }
    object @preventDefault();
    Element @relatedTarget { get; set; }
    object @result { get; set; }
    void @stopImmediatePropagation();
    void @stopPropagation();
    Element @target { get; set; }
    double @pageX { get; set; }
    double @pageY { get; set; }
    double @which { get; set; }
    bool @metaKey { get; set; }
}
public interface JQueryInputEventObject : BaseJQueryEventObject
{
    bool @altKey { get; set; }
    bool @ctrlKey { get; set; }
    bool @metaKey { get; set; }
    bool @shiftKey { get; set; }
}
public interface JQueryMouseEventObject : JQueryInputEventObject
{
    double @button { get; set; }
    double @clientX { get; set; }
    double @clientY { get; set; }
    double @offsetX { get; set; }
    double @offsetY { get; set; }
    double @pageX { get; set; }
    double @pageY { get; set; }
    double @screenX { get; set; }
    double @screenY { get; set; }
}
public interface JQueryKeyEventObject : JQueryInputEventObject
{
    object @char { get; set; }
    double @charCode { get; set; }
    object @key { get; set; }
    double @keyCode { get; set; }
}
public interface JQueryEventObject : BaseJQueryEventObject, JQueryInputEventObject, JQueryMouseEventObject, JQueryKeyEventObject
{
}
public interface JQuerySupport
{
    bool @ajax { get; set; }
    bool @boxModel { get; set; }
    bool @changeBubbles { get; set; }
    bool @checkClone { get; set; }
    bool @checkOn { get; set; }
    bool @cors { get; set; }
    bool @cssFloat { get; set; }
    bool @hrefNormalized { get; set; }
    bool @htmlSerialize { get; set; }
    bool @leadingWhitespace { get; set; }
    bool @noCloneChecked { get; set; }
    bool @noCloneEvent { get; set; }
    bool @opacity { get; set; }
    bool @optDisabled { get; set; }
    bool @optSelected { get; set; }
    bool @scriptEval();
    bool @style { get; set; }
    bool @submitBubbles { get; set; }
    bool @tbody { get; set; }
}
public interface JQueryParam
{
}
public interface JQueryEventConstructor
{
}
public interface JQueryCoordinates
{
    double @left { get; set; }
    double @top { get; set; }
}
public interface cssPropertySetter
{
}
public interface JQueryCssProperties
{
}
public interface JQuerySerializeArrayElement
{
    string @name { get; set; }
    string @value { get; set; }
}
public interface JQueryAnimationOptions
{
    object @duration { get; set; }
    string @easing { get; set; }
    Function @complete { get; set; }
    Func<double, object, object> @step { get; set; }
    Func<JQueryPromise<object>, double, double, object> @progress { get; set; }
    Func<JQueryPromise<object>, object> @start { get; set; }
    Func<JQueryPromise<object>, bool, object> @done { get; set; }
    Func<JQueryPromise<object>, bool, object> @fail { get; set; }
    Func<JQueryPromise<object>, bool, object> @always { get; set; }
    object @queue { get; set; }
    Object @specialEasing { get; set; }
}
public interface JQueryEasingFunction
{
}
public interface JQueryEasingFunctions
{
    JQueryEasingFunction @linear { get; set; }
    JQueryEasingFunction @swing { get; set; }
}
public class JQueryStatic
{
    public JQueryXHR @ajax(JQueryAjaxSettings @settings) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["ajax"].Invoke<JQueryXHR>(settings);
    public JQueryXHR @ajax(string @url, JQueryAjaxSettings @settings) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["ajax"].Invoke<JQueryXHR>(url, settings);
    public void @ajaxPrefilter(string @dataTypes, Func<object, JQueryAjaxSettings, JQueryXHR, object> @handler) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["ajaxPrefilter"].Invoke(dataTypes, handler);
    public void @ajaxPrefilter(Func<object, JQueryAjaxSettings, JQueryXHR, object> @handler) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["ajaxPrefilter"].Invoke(handler);
    public void @ajaxTransport(string @dataType, Func<object, JQueryAjaxSettings, JQueryXHR, object> @handler) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["ajaxTransport"].Invoke(dataType, handler);
    JQueryAjaxSettings @ajaxSettings { get; set; }
    public void @ajaxSetup(JQueryAjaxSettings @options) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["ajaxSetup"].Invoke(options);
    public JQueryXHR @get(string @url, Func<object, string, JQueryXHR, object> @success, string @dataType) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["get"].Invoke<JQueryXHR>(url, success, dataType);
    public JQueryXHR @get(string @url, object /* Union Type */ @data, Func<object, string, JQueryXHR, object> @success, string @dataType) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["get"].Invoke<JQueryXHR>(url, data, success, dataType);
    public JQueryXHR @get(JQueryAjaxSettings @settings) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["get"].Invoke<JQueryXHR>(settings);
    public JQueryXHR @getJSON(string @url, Func<object, string, JQueryXHR, object> @success) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["getJSON"].Invoke<JQueryXHR>(url, success);
    public JQueryXHR @getJSON(string @url, object /* Union Type */ @data, Func<object, string, JQueryXHR, object> @success) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["getJSON"].Invoke<JQueryXHR>(url, data, success);
    public JQueryXHR @getScript(string @url, Func<string, string, JQueryXHR, object> @success) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["getScript"].Invoke<JQueryXHR>(url, success);
    JQueryParam @param { get; set; }
    public JQueryXHR @post(string @url, Func<object, string, JQueryXHR, object> @success, string @dataType) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["post"].Invoke<JQueryXHR>(url, success, dataType);
    public JQueryXHR @post(string @url, object /* Union Type */ @data, Func<object, string, JQueryXHR, object> @success, string @dataType) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["post"].Invoke<JQueryXHR>(url, data, success, dataType);
    public JQueryXHR @post(JQueryAjaxSettings @settings) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["post"].Invoke<JQueryXHR>(settings);
    public JQueryCallback @Callbacks(string @flags) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["Callbacks"].Invoke<JQueryCallback>(flags);
    public void @holdReady(bool @hold) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["holdReady"].Invoke(hold);
    public JQueryStatic @noConflict(bool @removeAll) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["noConflict"].Invoke<JQueryStatic>(removeAll);
    public JQueryPromise<T> @when<T>(Array @deferreds) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["when"].Invoke<JQueryPromise<T>>(deferreds);
    object /* Type Literal */ @cssHooks { get; set; }
    object @cssNumber { get; set; }
    public T @data<T>(Element @element, string @key, T @value) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["data"].Invoke<T>(element, key, value);
    public object @data(Element @element, string @key) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["data"].Invoke<object>(element, key);
    public object @data(Element @element) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["data"].Invoke<object>(element);
    public void @dequeue(Element @element, string @queueName) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["dequeue"].Invoke(element, queueName);
    public bool @hasData(Element @element) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["hasData"].Invoke<bool>(element);
    public object[] @queue(Element @element, string @queueName) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["queue"].Invoke<object[]>(element, queueName);
    public JQuery @queue(Element @element, string @queueName, Function[] @newQueue) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["queue"].Invoke<JQuery>(element, queueName, newQueue);
    public JQuery @queue(Element @element, string @queueName, Function @callback) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["queue"].Invoke<JQuery>(element, queueName, callback);
    public JQuery @removeData(Element @element, string @name) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["removeData"].Invoke<JQuery>(element, name);
    public JQueryDeferred<T> @Deferred<T>(Func<JQueryDeferred<T>, object> @beforeStart) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["Deferred"].Invoke<JQueryDeferred<T>>(beforeStart);
    JQueryEasingFunctions @easing { get; set; }
    object /* Type Literal */ @fx { get; set; }
    public object @proxy(Func<object[], object> @func, Object @context, object[] @additionalArguments) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["proxy"].Invoke<object>(func, context, additionalArguments);
    public object @proxy(Object @context, string @name, object[] @additionalArguments) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["proxy"].Invoke<object>(context, name, additionalArguments);
    JQueryEventConstructor @Event { get; set; }
    public JQuery @error(object @message) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["error"].Invoke<JQuery>(message);
    object @expr { get; set; }
    JQuery @fn { get; set; }
    bool @isReady { get; set; }
    JQuerySupport @support { get; set; }
    public bool @contains(Element @container, Element @contained) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["contains"].Invoke<bool>(container, contained);
    public T[] @each<T>(T[] @collection, Func<double, T, object /* Union Type */> @callback) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["each"].Invoke<T[]>(collection, callback);
    public T @each<T>(T @collection, Func<string, object, object /* Union Type */> @callback) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["each"].Invoke<T>(collection, callback);
    public object @extend(object @target, object @object1, object[] @objectN) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["extend"].Invoke<object>(target, object1, objectN);
    public object @extend(bool @deep, object @target, object @object1, object[] @objectN) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["extend"].Invoke<object>(deep, target, object1, objectN);
    public object @globalEval(string @code) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["globalEval"].Invoke<object>(code);
    public T[] @grep<T>(T[] @array, Func<T, double, bool> @func, bool @invert) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["grep"].Invoke<T[]>(array, func, invert);
    public double @inArray<T>(T @value, T[] @array, double @fromIndex) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["inArray"].Invoke<double>(value, array, fromIndex);
    public object /* Generic Type */ @isArray(object @obj) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["isArray"].Invoke<object /* Generic Type */>(obj);
    public bool @isEmptyObject(object @obj) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["isEmptyObject"].Invoke<bool>(obj);
    public object /* Generic Type */ @isFunction(object @obj) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["isFunction"].Invoke<object /* Generic Type */>(obj);
    public bool @isNumeric(object @value) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["isNumeric"].Invoke<bool>(value);
    public bool @isPlainObject(object @obj) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["isPlainObject"].Invoke<bool>(obj);
    public object /* Generic Type */ @isWindow(object @obj) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["isWindow"].Invoke<object /* Generic Type */>(obj);
    public bool @isXMLDoc(Node @node) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["isXMLDoc"].Invoke<bool>(node);
    public object[] @makeArray(object @obj) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["makeArray"].Invoke<object[]>(obj);
    public U[] @map<T, U>(T[] @array, Func<T, double, U> @callback) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["map"].Invoke<U[]>(array, callback);
    public object @map(object @arrayOrObject, Func<object, object, object> @callback) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["map"].Invoke<object>(arrayOrObject, callback);
    public T[] @merge<T>(T[] @first, T[] @second) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["merge"].Invoke<T[]>(first, second);
    public object @noop() => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["noop"].Invoke<object>();
    public double @now() => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["now"].Invoke<double>();
    public object @parseJSON(string @json) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["parseJSON"].Invoke<object>(json);
    public XMLDocument @parseXML(string @data) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["parseXML"].Invoke<XMLDocument>(data);
    public string @trim(string @str) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["trim"].Invoke<string>(str);
    public object /* Union Type */ @type(object @obj) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["type"].Invoke<object /* Union Type */>(obj);
    public T[] @unique<T>(T[] @array) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["unique"].Invoke<T[]>(array);
    public object[] @parseHTML(string @data, HTMLElement @context, bool @keepScripts) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["parseHTML"].Invoke<object[]>(data, context, keepScripts);
    public object[] @parseHTML(string @data, Document @context, bool @keepScripts) => Blazor.Runtime.Interop.JavaScript.Window["jQuery"]["parseHTML"].Invoke<object[]>(data, context, keepScripts);
}
public interface JQuery
{
    JQuery @ajaxComplete(Func<JQueryEventObject, XMLHttpRequest, object, object> @handler);
    JQuery @ajaxError(Func<JQueryEventObject, JQueryXHR, JQueryAjaxSettings, object, object> @handler);
    JQuery @ajaxSend(Func<JQueryEventObject, JQueryXHR, JQueryAjaxSettings, object> @handler);
    JQuery @ajaxStart(Func<object> @handler);
    JQuery @ajaxStop(Func<object> @handler);
    JQuery @ajaxSuccess(Func<JQueryEventObject, XMLHttpRequest, JQueryAjaxSettings, object> @handler);
    JQuery @load(string @url, object /* Union Type */ @data, Func<string, string, XMLHttpRequest, object> @complete);
    string @serialize();
    JQuerySerializeArrayElement[] @serializeArray();
    JQuery @addClass(string @className);
    JQuery @addClass(Func<double, string, string> @func);
    JQuery @addBack(string @selector);
    string @attr(string @attributeName);
    JQuery @attr(string @attributeName, object /* Union Type */ @value);
    JQuery @attr(string @attributeName, Func<double, string, object /* Union Type */> @func);
    JQuery @attr(Object @attributes);
    bool @hasClass(string @className);
    string @html();
    JQuery @html(string @htmlString);
    JQuery @html(Func<double, string, string> @func);
    object @prop(string @propertyName);
    JQuery @prop(string @propertyName, object /* Union Type */ @value);
    JQuery @prop(Object @properties);
    JQuery @prop(string @propertyName, Func<double, object, object> @func);
    JQuery @removeAttr(string @attributeName);
    JQuery @removeClass(string @className);
    JQuery @removeClass(Func<double, string, string> @func);
    JQuery @removeProp(string @propertyName);
    JQuery @toggleClass(string @className, bool @swtch);
    JQuery @toggleClass(bool @swtch);
    JQuery @toggleClass(Func<double, string, bool, string> @func, bool @swtch);
    object @val();
    JQuery @val(object /* Union Type */ @value);
    JQuery @val(Func<double, string, string> @func);
    string @css(string @propertyName);
    object @css(string[] @propertyNames);
    JQuery @css(string @propertyName, object /* Union Type */ @value);
    JQuery @css(string @propertyName, Func<double, string, object /* Union Type */> @value);
    JQuery @css(JQueryCssProperties @properties);
    double @height();
    JQuery @height(object /* Union Type */ @value);
    JQuery @height(Func<double, double, object /* Union Type */> @func);
    double @innerHeight();
    JQuery @innerHeight(object /* Union Type */ @value);
    double @innerWidth();
    JQuery @innerWidth(object /* Union Type */ @value);
    JQueryCoordinates @offset();
    JQuery @offset(JQueryCoordinates @coordinates);
    JQuery @offset(Func<double, JQueryCoordinates, JQueryCoordinates> @func);
    double @outerHeight(bool @includeMargin);
    JQuery @outerHeight(object /* Union Type */ @value);
    double @outerWidth(bool @includeMargin);
    JQuery @outerWidth(object /* Union Type */ @value);
    JQueryCoordinates @position();
    double @scrollLeft();
    JQuery @scrollLeft(double @value);
    double @scrollTop();
    JQuery @scrollTop(double @value);
    double @width();
    JQuery @width(object /* Union Type */ @value);
    JQuery @width(Func<double, double, object /* Union Type */> @func);
    JQuery @clearQueue(string @queueName);
    JQuery @data(string @key, object @value);
    object @data(string @key);
    JQuery @data(object /* Type Literal */ @obj);
    object @data();
    JQuery @dequeue(string @queueName);
    JQuery @removeData(string @name);
    JQuery @removeData(string[] @list);
    JQuery @removeData();
    JQueryPromise<object> @promise(string @type, Object @target);
    JQuery @animate(Object @properties, object /* Union Type */ @duration, Function @complete);
    JQuery @animate(Object @properties, object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @animate(Object @properties, JQueryAnimationOptions @options);
    JQuery @delay(double @duration, string @queueName);
    JQuery @fadeIn(object /* Union Type */ @duration, Function @complete);
    JQuery @fadeIn(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @fadeIn(JQueryAnimationOptions @options);
    JQuery @fadeOut(object /* Union Type */ @duration, Function @complete);
    JQuery @fadeOut(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @fadeOut(JQueryAnimationOptions @options);
    JQuery @fadeTo(object /* Union Type */ @duration, double @opacity, Function @complete);
    JQuery @fadeTo(object /* Union Type */ @duration, double @opacity, string @easing, Function @complete);
    JQuery @fadeToggle(object /* Union Type */ @duration, Function @complete);
    JQuery @fadeToggle(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @fadeToggle(JQueryAnimationOptions @options);
    JQuery @finish(string @queue);
    JQuery @hide(object /* Union Type */ @duration, Function @complete);
    JQuery @hide(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @hide(JQueryAnimationOptions @options);
    JQuery @show(object /* Union Type */ @duration, Function @complete);
    JQuery @show(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @show(JQueryAnimationOptions @options);
    JQuery @slideDown(object /* Union Type */ @duration, Function @complete);
    JQuery @slideDown(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @slideDown(JQueryAnimationOptions @options);
    JQuery @slideToggle(object /* Union Type */ @duration, Function @complete);
    JQuery @slideToggle(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @slideToggle(JQueryAnimationOptions @options);
    JQuery @slideUp(object /* Union Type */ @duration, Function @complete);
    JQuery @slideUp(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @slideUp(JQueryAnimationOptions @options);
    JQuery @stop(bool @clearQueue, bool @jumpToEnd);
    JQuery @stop(string @queue, bool @clearQueue, bool @jumpToEnd);
    JQuery @toggle(object /* Union Type */ @duration, Function @complete);
    JQuery @toggle(object /* Union Type */ @duration, string @easing, Function @complete);
    JQuery @toggle(JQueryAnimationOptions @options);
    JQuery @toggle(bool @showOrHide);
    JQuery @bind(string @eventType, object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @bind(string @eventType, Func<JQueryEventObject, object> @handler);
    JQuery @bind(string @eventType, object @eventData, bool @preventBubble);
    JQuery @bind(string @eventType, bool @preventBubble);
    JQuery @bind(object @events);
    JQuery @blur();
    JQuery @blur(Func<JQueryEventObject, object> @handler);
    JQuery @blur(object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @change();
    JQuery @change(Func<JQueryEventObject, object> @handler);
    JQuery @change(object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @click();
    JQuery @click(Func<JQueryEventObject, object> @handler);
    JQuery @click(object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @contextmenu();
    JQuery @contextmenu(Func<JQueryMouseEventObject, object> @handler);
    JQuery @contextmenu(Object @eventData, Func<JQueryMouseEventObject, object> @handler);
    JQuery @dblclick();
    JQuery @dblclick(Func<JQueryEventObject, object> @handler);
    JQuery @dblclick(object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @delegate(object @selector, string @eventType, Func<JQueryEventObject, object> @handler);
    JQuery @delegate(object @selector, string @eventType, object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @focus();
    JQuery @focus(Func<JQueryEventObject, object> @handler);
    JQuery @focus(object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @focusin();
    JQuery @focusin(Func<JQueryEventObject, object> @handler);
    JQuery @focusin(Object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @focusout();
    JQuery @focusout(Func<JQueryEventObject, object> @handler);
    JQuery @focusout(Object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @hover(Func<JQueryEventObject, object> @handlerIn, Func<JQueryEventObject, object> @handlerOut);
    JQuery @hover(Func<JQueryEventObject, object> @handlerInOut);
    JQuery @keydown();
    JQuery @keydown(Func<JQueryKeyEventObject, object> @handler);
    JQuery @keydown(object @eventData, Func<JQueryKeyEventObject, object> @handler);
    JQuery @keypress();
    JQuery @keypress(Func<JQueryKeyEventObject, object> @handler);
    JQuery @keypress(object @eventData, Func<JQueryKeyEventObject, object> @handler);
    JQuery @keyup();
    JQuery @keyup(Func<JQueryKeyEventObject, object> @handler);
    JQuery @keyup(object @eventData, Func<JQueryKeyEventObject, object> @handler);
    JQuery @load(Func<JQueryEventObject, object> @handler);
    JQuery @load(object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @mousedown();
    JQuery @mousedown(Func<JQueryMouseEventObject, object> @handler);
    JQuery @mousedown(Object @eventData, Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseenter();
    JQuery @mouseenter(Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseenter(Object @eventData, Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseleave();
    JQuery @mouseleave(Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseleave(Object @eventData, Func<JQueryMouseEventObject, object> @handler);
    JQuery @mousemove();
    JQuery @mousemove(Func<JQueryMouseEventObject, object> @handler);
    JQuery @mousemove(Object @eventData, Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseout();
    JQuery @mouseout(Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseout(Object @eventData, Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseover();
    JQuery @mouseover(Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseover(Object @eventData, Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseup();
    JQuery @mouseup(Func<JQueryMouseEventObject, object> @handler);
    JQuery @mouseup(Object @eventData, Func<JQueryMouseEventObject, object> @handler);
    JQuery @off();
    JQuery @off(string @events, string @selector, Func<JQueryEventObject, object> @handler);
    JQuery @off(string @events, Func<JQueryEventObject, object[], object> @handler);
    JQuery @off(string @events, Func<JQueryEventObject, object> @handler);
    JQuery @off(object /* Type Literal */ @events, string @selector);
    JQuery @on(string @events, Func<JQueryEventObject, object[], object> @handler);
    JQuery @on(string @events, object @data, Func<JQueryEventObject, object[], object> @handler);
    JQuery @on(string @events, string @selector, Func<JQueryEventObject, object[], object> @handler);
    JQuery @on(string @events, string @selector, object @data, Func<JQueryEventObject, object[], object> @handler);
    JQuery @on(object /* Type Literal */ @events, string @selector, object @data);
    JQuery @on(object /* Type Literal */ @events, object @data);
    JQuery @one(string @events, Func<JQueryEventObject, object> @handler);
    JQuery @one(string @events, Object @data, Func<JQueryEventObject, object> @handler);
    JQuery @one(string @events, string @selector, Func<JQueryEventObject, object> @handler);
    JQuery @one(string @events, string @selector, object @data, Func<JQueryEventObject, object> @handler);
    JQuery @one(object /* Type Literal */ @events, string @selector, object @data);
    JQuery @one(object /* Type Literal */ @events, object @data);
    JQuery @ready(Func<JQueryStatic, object> @handler);
    JQuery @resize();
    JQuery @resize(Func<JQueryEventObject, object> @handler);
    JQuery @resize(Object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @scroll();
    JQuery @scroll(Func<JQueryEventObject, object> @handler);
    JQuery @scroll(Object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @select();
    JQuery @select(Func<JQueryEventObject, object> @handler);
    JQuery @select(Object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @submit();
    JQuery @submit(Func<JQueryEventObject, object> @handler);
    JQuery @submit(object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @trigger(string @eventType, object /* Union Type */ @extraParameters);
    JQuery @trigger(JQueryEventObject @event, object /* Union Type */ @extraParameters);
    Object @triggerHandler(string @eventType, object[] @extraParameters);
    Object @triggerHandler(JQueryEventObject @event, object[] @extraParameters);
    JQuery @unbind(string @eventType, Func<JQueryEventObject, object> @handler);
    JQuery @unbind(string @eventType, bool @fls);
    JQuery @unbind(object @evt);
    JQuery @undelegate();
    JQuery @undelegate(string @selector, string @eventType, Func<JQueryEventObject, object> @handler);
    JQuery @undelegate(string @selector, Object @events);
    JQuery @undelegate(string @namespace);
    JQuery @unload(Func<JQueryEventObject, object> @handler);
    JQuery @unload(object @eventData, Func<JQueryEventObject, object> @handler);
    Element @context { get; set; }
    string @jquery { get; set; }
    JQuery @error(Func<JQueryEventObject, object> @handler);
    JQuery @error(object @eventData, Func<JQueryEventObject, object> @handler);
    JQuery @pushStack(object[] @elements);
    JQuery @pushStack(object[] @elements, string @name, object[] @arguments);
    JQuery @after(object /* Union Type */ @content1, object[] @content2);
    JQuery @after(Func<double, string, object /* Union Type */> @func);
    JQuery @append(object /* Union Type */ @content1, object[] @content2);
    JQuery @append(Func<double, string, object /* Union Type */> @func);
    JQuery @appendTo(object /* Union Type */ @target);
    JQuery @before(object /* Union Type */ @content1, object[] @content2);
    JQuery @before(Func<double, string, object /* Union Type */> @func);
    JQuery @clone(bool @withDataAndEvents, bool @deepWithDataAndEvents);
    JQuery @detach(string @selector);
    JQuery @empty();
    JQuery @insertAfter(object /* Union Type */ @target);
    JQuery @insertBefore(object /* Union Type */ @target);
    JQuery @prepend(object /* Union Type */ @content1, object[] @content2);
    JQuery @prepend(Func<double, string, object /* Union Type */> @func);
    JQuery @prependTo(object /* Union Type */ @target);
    JQuery @remove(string @selector);
    JQuery @replaceAll(object /* Union Type */ @target);
    JQuery @replaceWith(object /* Union Type */ @newContent);
    JQuery @replaceWith(Func<object /* Union Type */> @func);
    string @text();
    JQuery @text(object /* Union Type */ @text);
    JQuery @text(Func<double, string, string> @func);
    HTMLElement[] @toArray();
    JQuery @unwrap();
    JQuery @wrap(object /* Union Type */ @wrappingElement);
    JQuery @wrap(Func<double, object /* Union Type */> @func);
    JQuery @wrapAll(object /* Union Type */ @wrappingElement);
    JQuery @wrapAll(Func<double, string> @func);
    JQuery @wrapInner(object /* Union Type */ @wrappingElement);
    JQuery @wrapInner(Func<double, string> @func);
    JQuery @each(Func<double, Element, object /* Union Type */> @func);
    HTMLElement @get(double @index);
    HTMLElement[] @get();
    double @index();
    double @index(object /* Union Type */ @selector);
    double @length { get; set; }
    string @selector { get; set; }
    JQuery @add(string @selector, Element @context);
    JQuery @add(Element[] @elements);
    JQuery @add(string @html);
    JQuery @add(JQuery @obj);
    JQuery @children(string @selector);
    JQuery @closest(string @selector);
    JQuery @closest(string @selector, Element @context);
    JQuery @closest(JQuery @obj);
    JQuery @closest(Element @element);
    object[] @closest(object @selectors, Element @context);
    JQuery @contents();
    JQuery @end();
    JQuery @eq(double @index);
    JQuery @filter(string @selector);
    JQuery @filter(Func<double, Element, bool> @func);
    JQuery @filter(Element @element);
    JQuery @filter(JQuery @obj);
    JQuery @find(string @selector);
    JQuery @find(Element @element);
    JQuery @find(JQuery @obj);
    JQuery @first();
    JQuery @has(string @selector);
    JQuery @has(Element @contained);
    bool @is(string @selector);
    bool @is(Func<double, Element, bool> @func);
    bool @is(JQuery @obj);
    bool @is(object @elements);
    JQuery @last();
    JQuery @map(Func<double, Element, object> @callback);
    JQuery @next(string @selector);
    JQuery @nextAll(string @selector);
    JQuery @nextUntil(string @selector, string @filter);
    JQuery @nextUntil(Element @element, string @filter);
    JQuery @nextUntil(JQuery @obj, string @filter);
    JQuery @not(string @selector);
    JQuery @not(Func<double, Element, bool> @func);
    JQuery @not(object /* Union Type */ @elements);
    JQuery @not(JQuery @obj);
    JQuery @offsetParent();
    JQuery @parent(string @selector);
    JQuery @parents(string @selector);
    JQuery @parentsUntil(string @selector, string @filter);
    JQuery @parentsUntil(Element @element, string @filter);
    JQuery @parentsUntil(JQuery @obj, string @filter);
    JQuery @prev(string @selector);
    JQuery @prevAll(string @selector);
    JQuery @prevUntil(string @selector, string @filter);
    JQuery @prevUntil(Element @element, string @filter);
    JQuery @prevUntil(JQuery @obj, string @filter);
    JQuery @siblings(string @selector);
    JQuery @slice(double @start, double @end);
    object[] @queue(string @queueName);
    JQuery @queue(Function[] @newQueue);
    JQuery @queue(Function @callback);
    JQuery @queue(string @queueName, Function[] @newQueue);
    JQuery @queue(string @queueName, Function @callback);
    JQuery @extend(object /* Type Literal */ @object);
}
public partial class Browser
{
    public static JQueryStatic jQuery = new JQueryStatic();
}
