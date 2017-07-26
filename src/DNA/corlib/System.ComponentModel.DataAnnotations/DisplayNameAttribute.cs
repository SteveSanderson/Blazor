using System;
using System.Collections.Generic;
using System.Text;

namespace System.ComponentModel
{
    public class DisplayNameAttribute : Attribute
    {
        private readonly string _displayName;

        public DisplayNameAttribute() : this(null)
        {
        }

        public DisplayNameAttribute(string displayName)
        {
            _displayName = displayName;
        }

        public string DisplayName => _displayName;
    }
}
