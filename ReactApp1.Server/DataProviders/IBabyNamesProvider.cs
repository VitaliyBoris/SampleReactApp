namespace ReactApp1.Server.DataProviders
{
    public interface IBabyNamesProvider
    {
        IEnumerable<string> GetNames(string sub, int limit);
    }
}
