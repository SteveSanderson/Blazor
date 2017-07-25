//using Microsoft.AspNetCore.Razor.TagHelpers;
//using Microsoft.AspNetCore.Authorization;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc.ViewFeatures;
//using Microsoft.AspNetCore.Mvc.Rendering;

//namespace ConferencePlanner.FrontEnd.TagHelpers
//{
//    [HtmlTargetElement("*", Attributes = "authz")]
//    [HtmlTargetElement("*", Attributes = "authz-policy")]
//    public class AuthzTagHelper : TagHelper
//    {
//        private readonly IAuthorizationService _authz;

//        public AuthzTagHelper(IAuthorizationService authz)
//        {
//            _authz = authz;
//        }

//        [HtmlAttributeName("authz")]
//        public bool RequiresAuthentication { get; set; }

//        [HtmlAttributeName("authz-policy")]
//        public string RequiredPolicy { get; set; }

//        [ViewContext]
//        public ViewContext ViewContext { get; set; }

//        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
//        {
//            var requiresAuth = RequiresAuthentication || !string.IsNullOrEmpty(RequiredPolicy);
//            var showOutput = false;

//            if (context.AllAttributes["authz"] != null && !requiresAuth && !ViewContext.HttpContext.User.Identity.IsAuthenticated)
//            {
//                // authz="false" & user isn't authenticated
//                showOutput = true;
//            }
//            else if (!string.IsNullOrEmpty(RequiredPolicy))
//            {
//                // auth-policy="foo" & user is authorized for policy "foo"
//                var authorized = false;
//                var cachedResult = ViewContext.ViewData["AuthPolicy." + RequiredPolicy];
//                if (cachedResult != null)
//                {
//                    authorized = (bool)cachedResult;
//                }
//                else
//                {
//                    var authorizationResult = await _authz.AuthorizeAsync(ViewContext.HttpContext.User, RequiredPolicy);
//                    authorized = authorizationResult.Succeeded;
//                    ViewContext.ViewData["AuthPolicy." + RequiredPolicy] = authorized;
//                }

//                showOutput = authorized;
//            }
//            else if (requiresAuth && ViewContext.HttpContext.User.Identity.IsAuthenticated)
//            {
//                // auth="true" & user is authenticated
//                showOutput = true;
//            }

//            if (!showOutput)
//            {
//                output.SuppressOutput();
//            }
//        }
//    }
//}