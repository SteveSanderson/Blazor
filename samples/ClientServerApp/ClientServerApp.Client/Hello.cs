using System;
using System.Collections.Generic;
using System.Text;

namespace ClientServerApp.Client
{
    public class Hello
    {
        public int MyProperty { get; set; }

        public string AnotherProp { get; set; }

        public void IncrementCount()
        {
            MyProperty++;
        }

        public void OnResetCounter()
        {
            MyProperty = 0;
        }
    }
}
