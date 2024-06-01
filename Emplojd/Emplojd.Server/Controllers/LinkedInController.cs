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
using Microsoft.AspNetCore.Identity;
using Emplojd.Models;
using Microsoft.AspNetCore.Authentication.Google;

namespace Emplojd.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkedInController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<LinkedInController> _logger;

        // Config constructor
        public LinkedInController(IConfiguration configuration, UserManager<User> userManager, ILogger<LinkedInController> logger)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _userManager = userManager;
            _logger = logger;
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
            var state = HttpContext.Session.GetString("LinkedInOAuthState");

            var receivedState = HttpContext.Request.Query["state"];
            if (state != receivedState)
            {
                return BadRequest("Invalid OAuth state.");
            }

            var result = await HttpContext.AuthenticateAsync(OpenIdConnectDefaults.AuthenticationScheme);
            if (!result.Succeeded)
            {
                return BadRequest("LinkedIn authentication failed.");
            }

            var claimsPrincipal = result.Principal;
            if (claimsPrincipal == null)
            {
                _logger.LogWarning("Authentication failed: result or principal is null.");
                return BadRequest("Failed to login with LinkedIn");
            }

            var claims = claimsPrincipal.Claims.ToList();
            string email = claimsPrincipal?.FindFirstValue(ClaimTypes.Email);

            // Logging claims (writing them out)
            _logger.LogInformation("User claims:");
            foreach (var claim in claims)
            {
                _logger.LogInformation($"{claim.Type}: {claim.Value}");
            }
            _logger.LogInformation($"Email: {email}");

            if (string.IsNullOrEmpty(email))
            {
                _logger.LogWarning("Email is empty.");
                return BadRequest("Email is empty");
            }

            var user = await _userManager.FindByEmailAsync(email);

            // If user doesn't exist create a new one
            if (user == null)
            {
                user = new User
                {
                    UserName = email,
                    Email = email,
                    EmailConfirmed = true
                };

                var createResult = await _userManager.CreateAsync(user);
                if (!createResult.Succeeded)
                {
                    _logger.LogError("Failed to create user.");
                    return BadRequest("Failed to create user");
                }
            }

            var loginInfo = new UserLoginInfo(OpenIdConnectDefaults.AuthenticationScheme, result.Principal.FindFirstValue(ClaimTypes.NameIdentifier), OpenIdConnectDefaults.AuthenticationScheme);

            var userLogins = await _userManager.GetLoginsAsync(user);
            if (!userLogins.Any(l => l.LoginProvider == loginInfo.LoginProvider && l.ProviderKey == loginInfo.ProviderKey))
            {
                var addLoginResult = await _userManager.AddLoginAsync(user, loginInfo);

                if (!addLoginResult.Succeeded)
                {
                    _logger.LogError("Failed to associate LinkedIn login with user.");
                    return BadRequest("Failed to associate LinkedIn login with user");
                }
            }

            // Remove state after verifying it
            HttpContext.Session.Remove("LinkedInOAuthState");

            var token = LinkedInJwtToken(claims);

            return Ok(new { token, email, claims = claims.Select(c => new { c.Type, c.Value }) });
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
