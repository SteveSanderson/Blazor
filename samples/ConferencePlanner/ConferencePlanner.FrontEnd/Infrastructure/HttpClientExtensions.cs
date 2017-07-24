using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using Blazor.Util;

namespace ConferencePlanner.FrontEnd.Infrastructure
{
    public static class HttpClientExtensions
    {
        public static async Task<T> ReadAsJsonAsync<T>(this HttpContent response)
        {
            var resultRaw = await response.ReadAsStringAsync();

            return JsonUtil.Deserialize<T>(resultRaw);
        }

        public static Task<HttpResponseMessage> PostJsonAsync<T>(this HttpClient client, string url, T value)
        {
            return SendJsonAsync<T>(client, HttpMethod.Post, url, value);
        }

        public static Task<HttpResponseMessage> PutJsonAsync<T>(this HttpClient client, string url, T value)
        {
            return SendJsonAsync<T>(client, HttpMethod.Put, url, value);
        }

        public static Task<HttpResponseMessage> SendJsonAsync<T>(this HttpClient client, HttpMethod method, string url, T value)
        {
            var bodyRaw = JsonUtil.Serialize(value);

            var request = new HttpRequestMessage(method, url)
            {
                Content = new StringContent(bodyRaw, Encoding.UTF8, "application/json")
            };

            request.Content.Headers.TryAddWithoutValidation("Content-Type", "application/json");

            return client.SendAsync(request);
        }
    }
}