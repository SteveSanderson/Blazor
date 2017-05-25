using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.Components
{
    public interface IRazorComponentFactory
    {
        RazorComponent Instantiate();
    }
}
