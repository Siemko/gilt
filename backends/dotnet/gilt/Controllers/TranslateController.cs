using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace gilt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslateController : ControllerBase
    {
        private readonly IStringLocalizer<TranslateController> _localizer;

        public TranslateController(IStringLocalizer<TranslateController> localizer)
        {
            _localizer = localizer;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<string> Get()
        {
            return _localizer["Title"].Value;
        }
    }
}