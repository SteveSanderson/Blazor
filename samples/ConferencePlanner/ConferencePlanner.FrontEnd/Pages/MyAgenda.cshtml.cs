using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConferenceDTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FrontEnd.Pages
{
    public class MyAgendaModel : IndexModel
    {
        public MyAgendaModel(IApiClient apiClient) : base(apiClient)
        {
        }
        
        protected override Task<List<SessionResponse>> GetSessionsAsync()
        {
            return _apiClient.GetSessionsByAttendeeAsync(User.Identity.Name);
        }
    }
}