using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ConferenceDTO
{
    public class Tag
    {
        public int ID { get; set; }

        [Required]
        [StringLength(32)]
        public string Name { get; set; }
    }
}