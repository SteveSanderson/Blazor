using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ConferencePlanner.FrontEnd.Models;
using ConferencePlanner.FrontEnd.Services;
using Blazor.Util;
using Blazor.Runtime.Components;
using System.Threading;

namespace ConferencePlanner.FrontEnd
{
    public class EditSessionModel
    {
        private readonly string _baseUrl = "http://localhost:56009";

        private readonly HttpClient _httpClient = new HttpClient();

        public bool ShowMessage => !string.IsNullOrEmpty(Message);

        public string Message { get; set; }

        public ClientSessionResponse Session { get; set; } = new ClientSessionResponse();

        public int SessionID { get; set; } = 1;

        private int _initCount = 0;

        public async Task InitAsyncImpl()
        {
            var count = Interlocked.Increment(ref _initCount);
            Console.WriteLine($"CALLED EditSessionModel.InitAsync() [{count}]");

            Console.WriteLine($"CALLING http.GetAsync() [{count}]");
            var response = await _httpClient.GetAsync($"{_baseUrl}/api/Sessions/{SessionID}");
            Console.WriteLine($"RETURNED http.GetAsync() [{count}]");

            // BUG: Following line requires loading System.Net.Primitives which fails in DNA right now
            //if ((int)response.StatusCode == 404)
            //{
            //    Message = "The session wasn't there :(";
            //    return;
            //}

            //response.EnsureSuccessStatusCode();

            // BUG: This causes WASM to have a fit
            //var session = await response.Content.ReadAsJsonAsync<ClientSessionResponse>();

            Console.WriteLine($"CALLING response.Content.ReadAsStringAsync() [{count}]");
            var session = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"RETURNED response.Content.ReadAsStringAsync() [{count}]");

            Session = JsonUtil.Deserialize<ClientSessionResponse>(session);

            if (Session == null)
            {
                Message = "Error retrieving session.";
                Session = new ClientSessionResponse();
            }

            Console.WriteLine($"RETURNING EditSessionModel.InitAsync() [{count}]");
        }

        public async Task OnSaveClick()
        {
            var count = Interlocked.Increment(ref _initCount);
            Console.WriteLine($"CALLED OnSaveClick() [{count}]");

            //Console.WriteLine($"CALLING http.PutJsonAsync({_baseUrl}/api/Sessions/{SessionID})");
            //var response = await http.PutJsonAsync($"{_baseUrl}/api/Sessions/{SessionID}", Session);
            //Console.WriteLine($"RETURNED http.PutJsonAsync({_baseUrl}/api/Sessions/{SessionID})");

            //if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            //{
            //    Message = "The session wasn't there :(";
            //    return;
            //}

            var url = $"{_baseUrl}/api/Sessions/{SessionID}";

            Console.WriteLine($"CALLING JsonUtil.Serialize({{ Title = {Session.Title}, TrackId = {Session.TrackId} }}) [{count}]");
            var body = JsonUtil.Serialize(Session);

            Console.WriteLine($"CALLING new HttpRequestMessage() [{count}]");
            var request = new HttpRequestMessage(HttpMethod.Put, url)
            {
                Content = new StringContent(body)
            };

            Console.WriteLine($"RETURNED new HttpRequestMessage() [{count}]");

            Console.WriteLine($"CALLING http.SendAsync({url}) [{count}]");
            var response = await _httpClient.SendAsync(request);
            Console.WriteLine($"RETURNED http.SendAsync({url}) [{count}]");

            try
            {
                response.EnsureSuccessStatusCode();
                Message = "Session updated successfully!";
            }
            catch (Exception ex)
            {
                Message = $"Something went wrong: {ex.Message}";
            }

            Console.WriteLine($"RETURNING OnSaveClick() [{count}]");
        }

        public void OnDeleteClick()
        {
            throw new NotImplementedException();
        }
    }
}
