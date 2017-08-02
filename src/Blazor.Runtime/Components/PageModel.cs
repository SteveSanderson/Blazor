using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.Runtime.Components
{
    public abstract class PageModel : IModel
    {
        public BlazorContext Context { get; set; }

        public virtual Task InitAsync()
        {
            return null;
        }
        public virtual Task InitAsync(int id)
        {
            // THIS IS A HUGE HACK FOR THE DEMO VIA DAMIAN
            return null;
        }
    }
}
