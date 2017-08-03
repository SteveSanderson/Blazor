using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Blazor.Runtime.Components;
using Blazor.Util;
using ClientServerApp.Shared;

namespace ClientServerApp.Client
{
    public class WeatherModel : PageModel
    {
        public WeatherForecast[] WeatherForecasts { get; set; } = new WeatherForecast[0];

        public override async Task InitAsync()
        {
            using (var client = new HttpClient())
            {
                var json = await client.GetStringAsync(Context.AbsoluteUrl("/api/SampleData/WeatherForecasts"));
                WeatherForecasts = JsonUtil.Deserialize<WeatherForecast[]>(json);

            }
        }
    }
}
