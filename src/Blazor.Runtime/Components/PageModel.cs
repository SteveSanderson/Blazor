using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.Runtime.Components
{
    public abstract class PageModel : IModel
    {
        private BlazorContext Context { get; set; }

        public virtual Task InitAsync()
        {
            Console.WriteLine("From PageModel");
            return null;
        }
    }
}
