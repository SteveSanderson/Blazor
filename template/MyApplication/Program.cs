using Blazor.Routing;

namespace MyApplication
{
    public class Program
    {
        static void Main(string[] args)
        {
            Router.MountInElement("app");
        }
    }
}
