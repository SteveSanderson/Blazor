using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ConferencePlanner.FrontEnd.Models
{
    public class Attendee
    {
        public int ID { get; set; }

        //[Required]
        //[StringLength(200)]
        //[DisplayName("First name")]
        public virtual string FirstName { get; set; }

        //[Required]
        //[StringLength(200)]
        //[DisplayName("Last name")]
        public virtual string LastName { get; set; }

        //[Required]
        //[StringLength(200)]
        public string UserName { get; set; }

        //[StringLength(256)]
        //[DisplayName("Email address")]
        public virtual string EmailAddress { get; set; }
    }
}