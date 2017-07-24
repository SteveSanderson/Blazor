namespace System.Security.Principal
{
    public interface IPrincipal
    {
        IIdentity Identity { get; set; }
    }
}
