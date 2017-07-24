using System;
using System.Collections.Generic;
using System.Text;

namespace ConferenceDTO
{
    public class ConferenceResponse : Conference
    {
        public ICollection<Session> Sessions { get; set; } = new List<Session>();

        public ICollection<Track> Tracks { get; set; } = new List<Track>();

        public ICollection<Speaker> Speakers { get; set; } = new List<Speaker>();
    }
}
