using ConferencePlanner.FrontEnd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

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

    public class ClientSessionResponse
    {
        public int ID { get; set; }

        //[Required]
        public int ConferenceID { get; set; }

        //[Required]
        //[StringLength(200)]
        public string Title { get; set; }

        //[StringLength(4000)]
        //[DataType(DataType.MultilineText)]
        public virtual string Abstract { get; set; }

        //[DisplayName("Start time")]
        public virtual string StartTime { get; set; }

        //[DisplayName("End time")]
        public virtual string EndTime { get; set; }

        // Bonus points to those who can figure out why this is written this way
        //public TimeSpan Duration => EndTime?.Subtract(StartTime ?? EndTime ?? DateTime.MinValue) ?? TimeSpan.Zero;

        public int? TrackId { get; set; }

        public Track Track { get; set; }

        public Speaker[] Speakers { get; set; }

        public Tag[] Tags { get; set; }
    }
}