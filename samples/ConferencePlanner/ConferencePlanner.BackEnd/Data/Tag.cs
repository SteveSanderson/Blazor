using System.Collections.Generic;

namespace BackEnd.Data
{
    public class Tag : ConferenceDTO.Tag
    {
        public virtual ICollection<SessionTag> SessionTags { get; set; }
    }
}