using System;
using System.Collections.Generic;
using System.Text;

namespace ConferencePlanner.ConferenceDTO
{
    public class SessionResponse : Session
    {
        public Track Track { get; set; }

        public ICollection<Speaker> Speakers { get; set; } = new List<Speaker>();

        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
