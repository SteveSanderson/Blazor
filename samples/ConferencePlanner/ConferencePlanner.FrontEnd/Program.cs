using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Blazor.Routing;

namespace ConferencePlanner.FrontEnd
{
    public class Program
    {
        static void Main(string[] args)
        {
            Router.MountInElement("app");
        }
    }
}
