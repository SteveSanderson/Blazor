using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace Blazor.Host.Debugging.Discovery
{
    internal class V8DebugTargetsUtil
    {
        public static async Task<DebuggablePageInfo[]> GetDebuggablePages(string debuggerHost)
        {
            using (var httpClient = new HttpClient())
            using (var req = new HttpRequestMessage(HttpMethod.Get, $"http://{debuggerHost}/json"))
            {
                var response = await httpClient.SendAsync(req);

                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<DebuggablePageInfo[]>(json);
            }
        }
    }
}
