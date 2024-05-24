using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using AspNet.Security.OAuth.LinkedIn;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration; 
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

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
            try
            {
                var state = Guid.NewGuid().ToString("N");
                HttpContext.Session.SetString("LinkedInOAuthState", state);

                var redirectUri = "https://localhost:54686/linkedinresponse";
                var properties = new AuthenticationProperties
                {
                    RedirectUri = redirectUri
                };

                return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/linkedinresponse")]
        public async Task<IActionResult> LinkedInResponse()
        {
            try
            {
                var state = HttpContext.Session.GetString("LinkedInOAuthState");
                var authenticateResult = await HttpContext.AuthenticateAsync();
                if (!authenticateResult.Succeeded)
                {
                    return BadRequest("LinkedIn authentication failed.");
                }

                var receivedState = HttpContext.Request.Query["state"];
                if (state != receivedState)
                {
                    return BadRequest("Invalid OAuth state.");
                }

                // Remove state after verifying it
                HttpContext.Session.Remove("LinkedInOAuthState");

                var claimsIdentity = (ClaimsIdentity)authenticateResult.Principal.Identity;

                // Generate JWT token
                var token = LinkedInJwtToken(claimsIdentity.Claims);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during LinkedIn authentication: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
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
