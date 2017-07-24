using System;
using System.Collections;
using System.Collections.Generic;

namespace BackEnd.Data
{
    public class Session : ConferenceDTO.Session
    {
        public Conference Conference { get; set; }

        public virtual ICollection<SessionSpeaker> SessionSpeakers { get; set; }

        public Track Track { get; set; }

        public virtual ICollection<SessionTag> SessionTags { get; set; }
    }
}