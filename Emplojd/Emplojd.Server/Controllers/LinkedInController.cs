using AspNet.Security.OAuth.LinkedIn;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace Emplojd.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkedInController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        // Config constructor
        public LinkedInController(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpGet("/login-linkedin")]
        public IActionResult LinkedInLogin()
        {
            var redirectUri = "https://localhost:54686/linkedinresponse";
            var property = new AuthenticationProperties
            {
                RedirectUri = Url.Action("LinkedInResponse", new { redirectUri })
            };

            return Challenge(property, LinkedInAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet("/linkedinresponse")]
        public async Task<IActionResult> LinkedInResponse()
        {
            var authenticateResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (!authenticateResult.Succeeded)
                return BadRequest(); 

            var claimsIdentity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
            claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, authenticateResult.Principal.FindFirstValue(ClaimTypes.NameIdentifier)));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, authenticateResult.Principal.FindFirstValue(ClaimTypes.Name)));

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

            // Generate JWT
            var token = LinkedInJwtToken(claimsIdentity.Claims);
            return Ok(new { Token = token });
        }

        private string LinkedInJwtToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: signinCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}
