using Blazor.Routing;

namespace ClientServerApp.Client
{
    public class Program
    {
        static void Main(string[] args)
        {
            Router.MountInElement("app");
        }
    }
}
