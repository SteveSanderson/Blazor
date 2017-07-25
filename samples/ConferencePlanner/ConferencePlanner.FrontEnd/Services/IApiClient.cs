using ConferencePlanner.FrontEnd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConferencePlanner.FrontEnd.Services
{
    public interface IApiClient
    {
        Task<ClientSessionResponse[]> GetSessionsAsync();
        //Task<SessionResponse> GetSessionAsync(int id);
        //Task<List<SpeakerResponse>> GetSpeakersAsync();
        //Task<SpeakerResponse> GetSpeakerAsync(int id);
        //Task PutSessionAsync(Session session);
        //Task<List<SearchResult>> SearchAsync(string query);
        //Task AddAttendeeAsync(Attendee attendee);
        //Task<AttendeeResponse> GetAttendeeAsync(string name);
        //Task DeleteSessionAsync(int id);

        //Task<List<SessionResponse>> GetSessionsByAttendeeAsync(string name);
        //Task AddSessionToAttendeeAsync(string name, int sessionId);
        //Task RemoveSessionFromAttendeeAsync(string name, int sessionId);
    }

    public class ClientSessionResponse : Models.Session
    {
        public Track Track { get; set; }

        public ICollection<Speaker> Speakers { get; set; } = new List<Speaker>();

        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}