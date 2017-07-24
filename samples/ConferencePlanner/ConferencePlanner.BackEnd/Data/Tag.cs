using System.Collections.Generic;

namespace ConferencePlanner.BackEnd.Data
{
    public class Tag : ConferenceDTO.Tag
    {
        public virtual ICollection<SessionTag> SessionTags { get; set; }
    }
}