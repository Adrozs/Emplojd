using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;

namespace Emplojd.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        //Config with errorhandling
        public GoogleController(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));

        }
        [HttpGet("/login-google")]
        public IActionResult GoogleLogin()
        {
            //here we construct the redirectUri based on the applications Configuration(!!)
            var redirectUri = "https://localhost:54686/googleresponse";
            var property = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleResponse", new { redirectUri })
            };

            return Challenge(property, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("/googleresponse")]
        public async Task<IActionResult> GoogleResponse(string redirectUri)
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var claims = result.Principal?.Identities.FirstOrDefault()?.Claims.ToList();

            var token = GenerateJwtToken(claims);

            return Ok(new { token });
        }

        private string GenerateJwtToken(IEnumerable<Claim> claims)
        {
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var credentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
