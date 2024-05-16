using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AspNet.Security.OAuth.LinkedIn;

namespace Emplojd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkedInController : ControllerBase
    {
        [HttpGet("/signin-linkedin")]
        public async Task<IActionResult> Login()
        {
            //await HttpContext.ChallengeAsync(GoogleDefaults.AuthenticationScheme,
            //     new AuthenticationProperties
            //     {
            //         RedirectUri = Url.Action("GoogleResponse")
            //     });
            var property = new AuthenticationProperties
            {
                RedirectUri = Url.Action("signin-linkedin")
            };

            return Challenge(property, LinkedInAuthenticationDefaults.AuthenticationScheme);
        }
        [HttpGet("/linkedinresponse")]
        public async Task<IActionResult> LinkedInResponse()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var claims = result.Principal.Identities.FirstOrDefault().Claims.Select(claim => new
            {
                claim.Issuer,
                claim.OriginalIssuer,
                claim.Type,
                claim.Value

            });

            return Ok(claims);
        }

    }
}