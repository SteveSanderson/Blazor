using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Data
{
    public class Track : ConferenceDTO.Track
    {
        [Required]
        public Conference Conference { get; set; }

        public virtual ICollection<Session> Sessions { get; set; }
    }
}