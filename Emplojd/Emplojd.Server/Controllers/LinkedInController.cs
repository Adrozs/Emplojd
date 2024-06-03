using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using AspNet.Security.OAuth.LinkedIn;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Emplojd.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.OAuth;


namespace Emplojd.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkedInController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<LinkedInController> _logger;

        public LinkedInController(IConfiguration configuration, UserManager<User> userManager, ILogger<LinkedInController> logger)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _userManager = userManager;
            _logger = logger;
        }
        [HttpGet("/login-linkedin")]
        public IActionResult LinkedInLogin()
        {
            var redirectUri = "https://www.emplojd.com/linkedinresponse";
            var property = new AuthenticationProperties
            {
                RedirectUri = Url.Action("LinkedInResponse", new { redirectUri })
            };

            return Challenge(property, "LinkedIn");
        }

        [HttpGet("/linkedinresponse")]
        public async Task<IActionResult> LinkedInResponse()
        {
            var result = await HttpContext.AuthenticateAsync("LinkedIn");

            var claimsPrincipal = result.Principal;
            if (claimsPrincipal == null)
            {
                _logger.LogWarning("Authentication failed: result or principal is null.");
                return BadRequest("Failed to login with LinkedIn");
            }

            var claims = claimsPrincipal.Claims.ToList();
            _logger.LogInformation($"Claims: {claims}");
            string email = claimsPrincipal.FindFirstValue(ClaimTypes.Email);

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

            var loginInfo = new UserLoginInfo("LinkedIn", claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier), "LinkedIn");

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

            var token = LinkedInJwtToken(claims);

            return Ok(new { token });
        }

        private string LinkedInJwtToken(IEnumerable<Claim> claims)
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
