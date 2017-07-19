using System;
using Blazor.Runtime.Interop;

namespace Blazor.Dom {

public partial class Window
{
  private static Window _Current;

  public static Window Current
  {
    get
    {
      if (_Current == null)
        _Current = new Window((JSObjectHandle)JSObjectHandle.Global.GetProperty("window"));
      return _Current;
    }
  }
}

public partial class Document
{
  private static Document _Current;

  public static Document Current
  {
    get
    {
      if (_Current == null)
        _Current = new Document((JSObjectHandle)JSObjectHandle.Global.GetProperty("document"));
      return _Current;
    }
  }
}

}
