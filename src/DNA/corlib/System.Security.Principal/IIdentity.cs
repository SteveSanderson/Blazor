namespace System.Security.Principal
{
    public interface IIdentity
    {
        string Name { get; set; }

        bool IsAuthenticated { get; set; }

        string AuthenticationType { get; set; }
    }
}