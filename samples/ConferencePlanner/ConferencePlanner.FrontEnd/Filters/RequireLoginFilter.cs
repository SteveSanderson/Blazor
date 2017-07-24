using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Routing;

namespace FrontEnd.Filters
{
    public class RequireLoginFilter : IAsyncResourceFilter
    {
        private IApiClient _apiClient;
        private IUrlHelperFactory _urlHelperFactory;

        public RequireLoginFilter(IApiClient apiClient, IUrlHelperFactory urlHelperFactory)
        {
            _apiClient = apiClient;
            _urlHelperFactory = urlHelperFactory;
        }

        public async Task OnResourceExecutionAsync(ResourceExecutingContext context, ResourceExecutionDelegate next)
        {
            var urlHelper = _urlHelperFactory.GetUrlHelper(context);
            var welcomePage = urlHelper.Page("/Welcome");
            
            var ignoreRoutes = new[] {
                urlHelper.Page("/Login"),
                urlHelper.Action("logout", "account"),
                welcomePage
            };

            // If the user is authenticated but not associated *and* we're not ignoring this path
            // then redirect to /Welcome
            if (context.HttpContext.User.Identity.IsAuthenticated &&
                !ignoreRoutes.Any(path => string.Equals(context.HttpContext.Request.Path, path, StringComparison.OrdinalIgnoreCase)))
            {
                var attendee = await _apiClient.GetAttendeeAsync(context.HttpContext.User.Identity.Name);

                if (attendee == null)
                {
                    context.HttpContext.Response.Redirect(urlHelper.Page("/Welcome"));

                    return;
                }
            }
            else if (string.Equals(context.HttpContext.Request.Path, welcomePage, StringComparison.OrdinalIgnoreCase))
            {
                var attendee = await _apiClient.GetAttendeeAsync(context.HttpContext.User.Identity.Name);

                if (attendee != null)
                {
                    context.HttpContext.Response.Redirect(urlHelper.Page("/Index"));
                    return;
                }
            }

            await next();
        }
    }
}