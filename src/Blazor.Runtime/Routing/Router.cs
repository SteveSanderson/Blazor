using Blazor.Components;
using System.Collections.Generic;

namespace Blazor.Routing
{
    public static class Router
    {
        private static string _mountInElementSelector;
        private static string _currentPageComponentPath;
        private static Component _currentPageComponent;

        public static void MountInElement(string selector)
        {
            _mountInElementSelector = selector;
        }

        internal static void OnNavigation(string descriptor)
        {
            var parsed = MiniJSON.Json.Deserialize(descriptor) as Dictionary<string, object>;
            var url = (string)parsed["url"];

            // By holding the _currentPageComponent in a static property, we ensure that it doesn't
            // get GCed while the user can still see and try to interact with it.
            // TODO: Instead of just using "MountAsPage" which destroys the entire previous element content,
            //       somehow find the nearest common layout ancestor between the old and new page, and retain
            //       the DOM/vdom up to and including that layout, and just insert the new sequence of child
            //       layouts and the new page into it.
            _currentPageComponentPath = UrlToComponentPath(url);
            _currentPageComponent = RazorComponent
                .Instantiate(_currentPageComponentPath)
                .MountAsPage(_mountInElementSelector);
        }

        private static string UrlToComponentPath(string url)
        {
            if (url.EndsWith("/"))
            {
                url = url + "Index";
            }

            return $".{url}.cshtml";
        }
    }
}
