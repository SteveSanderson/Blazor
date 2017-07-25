using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ConferencePlanner.FrontEnd.Models
{
    public class Tag
    {
        public int ID { get; set; }

        //[Required]
        //[StringLength(32)]
        public string Name { get; set; }
    }
}