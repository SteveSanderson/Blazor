using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.Runtime.Components
{
    public interface IModel
    {
        Task InitAsync();
        Task InitAsync(int id);
    }
}
