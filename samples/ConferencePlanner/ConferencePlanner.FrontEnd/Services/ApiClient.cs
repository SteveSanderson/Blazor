using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ConferencePlanner.FrontEnd.Services
{
    public class ApiClient : IApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;

        public ApiClient(HttpClient httpClient, string baseUrl)
        {
            _httpClient = httpClient;
            _baseUrl = baseUrl;
        }

        //public async Task AddAttendeeAsync(Attendee attendee)
        //{
        //    var response = await _httpClient.PostJsonAsync($"/api/attendees", attendee);

        //    response.EnsureSuccessStatusCode();
        //}

        //public async Task<AttendeeResponse> GetAttendeeAsync(string name)
        //{
        //    if (string.IsNullOrEmpty(name))
        //    {
        //        return null;
        //    }

        //    var response = await _httpClient.GetAsync($"/api/attendees/{name}");

        //    if (response.StatusCode == HttpStatusCode.NotFound)
        //    {
        //        return null;
        //    }

        //    response.EnsureSuccessStatusCode();

        //    return await response.Content.ReadAsJsonAsync<AttendeeResponse>();
        //}

        //public async Task<SessionResponse> GetSessionAsync(int id)
        //{
        //    var response = await _httpClient.GetAsync($"/api/sessions/{id}");

        //    if (response.StatusCode == HttpStatusCode.NotFound)
        //    {
        //        return null;
        //    }

        //    response.EnsureSuccessStatusCode();

        //    return await response.Content.ReadAsJsonAsync<SessionResponse>();
        //}

        public async Task<ClientSessionResponse[]> GetSessionsAsync()
        {
            var response = await _httpClient.GetAsync(_baseUrl + "/api/sessions");

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsJsonAsync<ClientSessionResponse[]>();
        }

        //public async Task DeleteSessionAsync(int id)
        //{
        //    var response = await _httpClient.DeleteAsync($"/api/sessions/{id}");

        //    if (response.StatusCode == HttpStatusCode.NotFound)
        //    {
        //        return;
        //    }

        //    response.EnsureSuccessStatusCode();
        //}

        //public async Task<SpeakerResponse> GetSpeakerAsync(int id)
        //{
        //    var response = await _httpClient.GetAsync($"/api/speakers/{id}");

        //    if (response.StatusCode == HttpStatusCode.NotFound)
        //    {
        //        return null;
        //    }

        //    response.EnsureSuccessStatusCode();

        //    return await response.Content.ReadAsJsonAsync<SpeakerResponse>();
        //}

        //public async Task<List<SpeakerResponse>> GetSpeakersAsync()
        //{
        //    var response = await _httpClient.GetAsync("/api/speakers");

        //    response.EnsureSuccessStatusCode();

        //    return await response.Content.ReadAsJsonAsync<List<SpeakerResponse>>();
        //}

        //public async Task PutSessionAsync(Session session)
        //{
        //    var response = await _httpClient.PutJsonAsync($"/api/sessions/{session.ID}", session);

        //    response.EnsureSuccessStatusCode();
        //}

        //public async Task<List<SearchResult>> SearchAsync(string query)
        //{
        //    var term = new SearchTerm
        //    {
        //        Query = query
        //    };

        //    var response = await _httpClient.PostJsonAsync($"/api/search", term);

        //    response.EnsureSuccessStatusCode();

        //    return await response.Content.ReadAsJsonAsync<List<SearchResult>>();
        //}

        //public async Task AddSessionToAttendeeAsync(string name, int sessionId)
        //{
        //    var response = await _httpClient.PostAsync($"/api/attendees/{name}/session/{sessionId}", null);

        //    response.EnsureSuccessStatusCode();
        //}

        //public async Task RemoveSessionFromAttendeeAsync(string name, int sessionId)
        //{
        //    var response = await _httpClient.DeleteAsync($"/api/attendees/{name}/session/{sessionId}");

        //    response.EnsureSuccessStatusCode();
        //}

        //public async Task<List<SessionResponse>> GetSessionsByAttendeeAsync(string name)
        //{
        //    throw new NotImplementedException();
        //    // TODO: Add backend API for this

        //    //var sessionsTask = GetSessionsAsync();
        //    //var attendeeTask = GetAttendeeAsync(name);

        //    //await Task.WhenAll(sessionsTask, attendeeTask);

        //    //var sessions = await sessionsTask;
        //    //var attendee = await attendeeTask;

        //    //if (attendee == null)
        //    //{
        //    //    return new List<SessionResponse>();
        //    //}

        //    //var sessionIds = attendee.Sessions.Select(s => s.ID);

        //    ////sessions.RemoveAll(s => !sessionIds.Contains(s.ID));

        //    //return sessions.ToList();
        //}
    }
}