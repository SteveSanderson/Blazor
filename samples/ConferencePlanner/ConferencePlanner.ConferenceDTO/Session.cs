using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ConferenceDTO
{
    public class Session
    {
        public int ID { get; set; }

        [Required]
        public int ConferenceID { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [StringLength(4000)]
        public virtual string Abstract { get; set; }

        public virtual DateTimeOffset? StartTime { get; set; }

        public virtual DateTimeOffset? EndTime { get; set; }

        // Bonus points to those who can figure out why this is written this way
        public TimeSpan Duration => EndTime?.Subtract(StartTime ?? EndTime ?? DateTime.MinValue) ?? TimeSpan.Zero;

        public int? TrackId { get; set; }
    }
}