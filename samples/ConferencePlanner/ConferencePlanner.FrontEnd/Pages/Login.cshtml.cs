using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authentication;

namespace ConferencePlanner.FrontEnd.Pages
{
    public class LoginModel : PageModel
    {
        private readonly IAuthenticationSchemeProvider _schemeProvider;

        public LoginModel(IAuthenticationSchemeProvider schemeProvider)
        {
            _schemeProvider = schemeProvider;
        }

        public IEnumerable<AuthenticationScheme> AuthSchemes { get; set; }

        public async Task OnGet()
        {
            AuthSchemes = await _schemeProvider.GetRequestHandlerSchemesAsync();
        }

        public IActionResult OnPost(string scheme)
        {
            return Challenge(new AuthenticationProperties { RedirectUri = Url.Page("/Index") }, scheme);
        }
    }
}