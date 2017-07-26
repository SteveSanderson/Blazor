using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ConferencePlanner.FrontEnd.Models;
using ConferencePlanner.FrontEnd.Services;
using Blazor.Util;
using Blazor.Runtime.Components;

namespace ConferencePlanner.FrontEnd
{
    public class EditSessionModel
    {
        private readonly string _baseUrl = "http://localhost:56009/";

        public bool ShowMessage => !string.IsNullOrEmpty(Message);

        public string Message { get; set; }

        public ClientSessionResponse Session { get; set; } = new ClientSessionResponse();

        public int SessionID { get; set; } = 1;

        public async Task InitAsyncImpl()
        {
            Console.WriteLine($"CALLED EditSessionModel.InitAsync()");

            var http = new HttpClient();

            Console.WriteLine($"CALLING http.GetAsync()");
            var response = await http.GetAsync($"{_baseUrl}/api/Sessions/{SessionID}");
            Console.WriteLine($"RETURNED http.GetAsync()");

            // BUG: Following line requires loading System.Net.Primitives which fails in DNA right now
            //if ((int)response.StatusCode == 404)
            //{
            //    Message = "The session wasn't there :(";
            //    return;
            //}

            //response.EnsureSuccessStatusCode();

            // BUG: This causes WASM to have a fit
            //var session = await response.Content.ReadAsJsonAsync<ClientSessionResponse>();

            Console.WriteLine($"CALLING response.Content.ReadAsStringAsync()");
            var session = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"RETURNED response.Content.ReadAsStringAsync()");
            Session = JsonUtil.Deserialize<ClientSessionResponse>(session);

            Console.WriteLine($"RETURNING EditSessionModel.InitAsync()");
        }

        public async Task OnSaveClick()
        {
            Console.WriteLine($"CALLED OnSaveClick()");

            var http = new HttpClient();

            //Console.WriteLine($"CALLING http.PutJsonAsync({_baseUrl}/api/Sessions/{SessionID})");
            //var response = await http.PutJsonAsync($"{_baseUrl}/api/Sessions/{SessionID}", Session);
            //Console.WriteLine($"RETURNED http.PutJsonAsync({_baseUrl}/api/Sessions/{SessionID})");

            //if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            //{
            //    Message = "The session wasn't there :(";
            //    return;
            //}

            var url = $"{_baseUrl}/api/Sessions/{SessionID}";

            Console.WriteLine($"CALLING JsonUtil.Serialize({{ Title = {Session.Title}, TrackId = {Session.TrackId} }})");
            var body = JsonUtil.Serialize(Session);

            Console.WriteLine($"CALLING new HttpRequestMessage()");
            var request = new HttpRequestMessage(HttpMethod.Put, url)
            {
                Content = new StringContent(body)
            };

            Console.WriteLine($"RETURNED new HttpRequestMessage()");

            Console.WriteLine($"CALLING http.SendAsync({url})");
            var response = await http.SendAsync(request);
            Console.WriteLine($"RETURNED http.SendAsync({url})");

            try
            {
                response.EnsureSuccessStatusCode();
                Message = "Session updated successfully!";
            }
            catch (Exception ex)
            {
                Message = $"Something went wrong: {ex.Message}";
            }
        }

        public void OnDeleteClick()
        {
            throw new NotImplementedException();
        }
    }
}
