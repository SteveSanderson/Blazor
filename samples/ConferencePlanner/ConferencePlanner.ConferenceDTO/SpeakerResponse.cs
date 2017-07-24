using System;
using System.Collections.Generic;
using System.Text;

namespace ConferenceDTO
{
    public class SpeakerResponse : Speaker
    {
        // TODO: Set order of JSON proeprties so this shows up last not first
        public ICollection<Session> Sessions { get; set; } = new List<Session>();
    }
}