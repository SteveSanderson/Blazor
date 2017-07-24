using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ConferenceDTO;
using System.Text.Encodings.Web;

namespace FrontEnd.Pages
{
    public class SessionModel : PageModel
    {
        private readonly IApiClient _apiClient;

        private readonly HtmlEncoder _htmlEncoder;


        public SessionModel(IApiClient apiClient, HtmlEncoder htmlEncoder)
        {
            _apiClient = apiClient;
            _htmlEncoder = htmlEncoder;
        }

        public SessionResponse Session { get; set; }

        public int? DayOffset { get; set; }

        public bool IsInPersonalAgenda { get; set; }

        public async Task<IActionResult> OnGet(int id)
        {
            Session = await _apiClient.GetSessionAsync(id);

            if (Session == null)
            {
                return RedirectToPage("/Index");
            }

            var userSessions = await _apiClient.GetSessionsByAttendeeAsync(User.Identity.Name);

            IsInPersonalAgenda = userSessions.Any(u => u.ID == id);

            var allSessions = await _apiClient.GetSessionsAsync();

            var startDate = allSessions.Min(s => s.StartTime?.Date);

            DayOffset = Session.StartTime?.DateTime.Subtract(startDate ?? DateTime.MinValue).Days;
            if (!string.IsNullOrEmpty(Session.Abstract))
            {
                var encodedCrLf = _htmlEncoder.Encode("\r\n");
                var encodedAbstract = _htmlEncoder.Encode(Session.Abstract);
                Session.Abstract = "<p>" + String.Join("</p><p>", encodedAbstract.Split(encodedCrLf, StringSplitOptions.RemoveEmptyEntries)) + "</p>";
            }

            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int sessionId)
        {
            await _apiClient.AddSessionToAttendeeAsync(User.Identity.Name, sessionId);

            return RedirectToPage();
        }

        public async Task<IActionResult> OnPostRemoveAsync(int sessionId)
        {
            await _apiClient.RemoveSessionFromAttendeeAsync(User.Identity.Name, sessionId);

            return RedirectToPage();
        }
    }
}