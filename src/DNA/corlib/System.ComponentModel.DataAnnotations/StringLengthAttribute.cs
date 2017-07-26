using System;
using System.Collections.Generic;
using System.Text;

namespace System.ComponentModel.DataAnnotations
{
    public class StringLengthAttribute : ValidationAttribute
    {
        private readonly int _maximumLength;

        public StringLengthAttribute(int maximumLength)
        {
            _maximumLength = maximumLength;
        }

        public int MinimumLength => 0;
        public int MaximumLength => _maximumLength;
    }
}
