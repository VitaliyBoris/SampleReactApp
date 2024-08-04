namespace ReactApp1.Server.DataProviders.Impl
{
    public class BabyNamesFileProvider : IBabyNamesProvider
    {
        private readonly ILogger<BabyNamesFileProvider> _logger;

        private readonly Lazy<IReadOnlyCollection<string>> _names;

        public BabyNamesFileProvider(ILogger<BabyNamesFileProvider> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _names = new(LoadNamesFromFile);
        }

        public IEnumerable<string> GetNames(string sub, int limit) => _names.Value.Where(x => x.StartsWith(sub, StringComparison.OrdinalIgnoreCase)).Take(limit);

        private IReadOnlyCollection<string> LoadNamesFromFile() => File.ReadAllLines("./data/names.txt");
    }
}
