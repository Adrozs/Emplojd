using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using AspNet.Security.OAuth.LinkedIn;
using System.Security.Claims;
using ChasGPT_Backend.Repositories;

namespace ChasGPT_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkedInController : ControllerBase
    {
        private readonly JwtRepository _jwtRepository;

        public LinkedInController(JwtRepository jwtRepository)
        {
            _jwtRepository = jwtRepository;
        }

        [HttpGet("signin-linkedin")]
        public IActionResult SignInWithLinkedIn()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("LinkedInResponse")
            };
            return Challenge(properties, LinkedInAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet("linkedinresponse")]
        public async Task<IActionResult> LinkedInResponse()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (!result.Succeeded)
            {
                return BadRequest("Authentication failed.");
            }

            // Extract claims from LinkedIn
            var claims = result.Principal?.Identities.FirstOrDefault()?.Claims.ToList();

            if (claims == null)
            {
                return BadRequest("No claims found.");
            }

            // Extract LinkedIn access token
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (!string.IsNullOrEmpty(accessToken))
            {
                claims.Add(new Claim("urn:linkedin:access_token", accessToken));
            }

            // Generate JWT token from LinkedIn claims
            var jwtToken = _jwtRepository.LinkedInGenerateJwt(claims);

            return Ok(new { Token = jwtToken });
        }
    }
}


