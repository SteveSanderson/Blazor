using System;
using System.Collections.Generic;
using System.Text;

namespace System.ComponentModel.DataAnnotations
{
    public class StringLengthAttribute : ValidationAttribute
    {
        public StringLengthAttribute(int maximumLength)
        {
        }
    }
}
