using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrontEnd.Pages.Models
{
    public class Attendee : ConferenceDTO.Attendee
    {
        [DisplayName("First name")]
        public override string FirstName { get => base.FirstName; set => base.FirstName = value; }

        [DisplayName("Last name")]
        public override string LastName { get => base.LastName; set => base.LastName = value; }

        [DisplayName("Email address")]
        [DataType(DataType.EmailAddress)]
        public override string EmailAddress { get => base.EmailAddress; set => base.EmailAddress = value; }
    }
}