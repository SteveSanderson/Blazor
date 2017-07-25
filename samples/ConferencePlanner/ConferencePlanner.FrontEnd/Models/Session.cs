using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ConferencePlanner.FrontEnd.Models
{
    public class Session
    {
        public int ID { get; set; }

        //[Required]
        public int ConferenceID { get; set; }

        //[Required]
        //[StringLength(200)]
        public string Title { get; set; }

        //[StringLength(4000)]
        //[DataType(DataType.MultilineText)]
        public virtual string Abstract { get; set; }

        //[DisplayName("Start time")]
        public virtual string StartTime { get; set; }

        //[DisplayName("End time")]
        public virtual string EndTime { get; set; }

        // Bonus points to those who can figure out why this is written this way
        //public TimeSpan Duration => EndTime?.Subtract(StartTime ?? EndTime ?? DateTime.MinValue) ?? TimeSpan.Zero;

        public int? TrackId { get; set; }
    }
}