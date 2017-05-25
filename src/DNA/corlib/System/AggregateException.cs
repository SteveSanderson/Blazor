using System;
using System.Collections.Generic;
using System.Text;

namespace System
{
    public class AggregateException : Exception
    {
        public AggregateException(Exception exception) : base("Error occurred: " + exception.Message, exception)
        {
        }
    }
}
