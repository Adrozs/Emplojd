using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace ChasGPT_Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleController : ControllerBase
    {
        [HttpGet("/signin-google")]
        public async Task<IActionResult> Login()
        {
            //await HttpContext.ChallengeAsync(GoogleDefaults.AuthenticationScheme,
            //     new AuthenticationProperties
            //     {
            //         RedirectUri = Url.Action("GoogleResponse")
            //     });
            var property = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleResponse")
            };

            return Challenge(property, GoogleDefaults.AuthenticationScheme);
        }
        [HttpGet("/googleresponse")]
        public async Task<IActionResult> GoogleResponse()
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
