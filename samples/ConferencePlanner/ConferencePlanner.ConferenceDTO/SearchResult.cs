using Newtonsoft.Json.Linq;

namespace ConferencePlanner.ConferenceDTO
{
    public class SearchResult
    {
        public SearchResultType Type { get; set; }

        public JObject Value { get; set; }
    }

    public enum SearchResultType
    {
        Attendee,
        Conference,
        Session,
        Track,
        Speaker
    }
}