using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace gilt.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TranslateController : Controller
    {
        private readonly IStringLocalizer<TranslateController> _localizer;

        public TranslateController(IStringLocalizer<TranslateController> localizer)
        {
            _localizer = localizer;
        }

        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            return Json(_localizer["Title"].Value);
        }
    }
}