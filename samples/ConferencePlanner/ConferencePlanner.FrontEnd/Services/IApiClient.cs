using ConferencePlanner.ConferenceDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConferencePlanner.FrontEnd.Services
{
    public interface IApiClient
    {
        Task<SessionResponse[]> GetSessionsAsync();
        Task<SessionResponse> GetSessionAsync(int id);
        Task<List<SpeakerResponse>> GetSpeakersAsync();
        Task<SpeakerResponse> GetSpeakerAsync(int id);
        Task PutSessionAsync(Session session);
        Task<List<SearchResult>> SearchAsync(string query);
        Task AddAttendeeAsync(Attendee attendee);
        Task<AttendeeResponse> GetAttendeeAsync(string name);
        Task DeleteSessionAsync(int id);

        Task<List<SessionResponse>> GetSessionsByAttendeeAsync(string name);
        Task AddSessionToAttendeeAsync(string name, int sessionId);
        Task RemoveSessionFromAttendeeAsync(string name, int sessionId);
    }

}