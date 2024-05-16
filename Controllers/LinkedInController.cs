using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AspNet.Security.OAuth.LinkedIn;
using Microsoft.AspNetCore.Authentication;

namespace ChasGPT_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkedInController : ControllerBase
    {
        [HttpGet("/signin-linkedin")]

        public async Task<IActionResult> Login()
        {
            var property = new AuthenticationProperties
            {
                RedirectUri = Url.Action("signin-linkedin")
            };

            return Challenge(property, LinkedInAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
