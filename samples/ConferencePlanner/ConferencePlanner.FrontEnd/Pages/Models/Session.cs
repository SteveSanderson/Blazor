using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Pages.Models
{
    public class Session : ConferenceDTO.Session
    {
        [DataType(DataType.MultilineText)]
        public override string Abstract { get => base.Abstract; set => base.Abstract = value; }

        [DisplayName("Start time")]
        public override DateTimeOffset? StartTime { get => base.StartTime; set => base.StartTime = value; }

        [DisplayName("End time")]
        public override DateTimeOffset? EndTime { get => base.EndTime; set => base.EndTime = value; }
    }
}