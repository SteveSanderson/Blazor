// The types in this file need to be defined otherwise Razor tooling shows
// errors in the VS errors list. It doesn't matter that these are fake, since
// they aren't actually used anyway.

using System;

namespace Microsoft.AspNetCore.Mvc
{
    public interface IUrlHelper { }
    public interface IViewComponentHelper { }
}

namespace Microsoft.AspNetCore.Mvc.Rendering
{
    public interface IJsonHelper { }
    public interface IHtmlHelper<T> { }
}

namespace Microsoft.AspNetCore.Mvc.ViewFeatures
{
    public interface IModelExpressionProvider { }
}

namespace Microsoft.AspNetCore.Mvc.Razor.Internal
{
    public class RazorInjectAttributeAttribute : Attribute { }
}