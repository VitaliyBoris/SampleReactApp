using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.DataProviders;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BabyNamesController : ControllerBase
    {
        private readonly ILogger<BabyNamesController> _logger;
        private readonly IBabyNamesProvider _babyNamesProvider;

        public BabyNamesController(ILogger<BabyNamesController> logger, IBabyNamesProvider babyNamesProvider)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _babyNamesProvider = babyNamesProvider ?? throw new ArgumentNullException(nameof(babyNamesProvider));
        }

        [HttpGet(Name = "GetBabyNames")]
        public IEnumerable<string> Get(string sub, int limit = 10) => _babyNamesProvider.GetNames(sub, limit);
    }
}
