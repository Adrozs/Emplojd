using Emplojd.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Logging;


namespace Emplojd.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<GoogleController> _logger;

        public GoogleController(IConfiguration configuration, UserManager<User> userManager, ILogger<GoogleController> logger)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet("/login-google")]
        public IActionResult GoogleLogin()
        {
            var redirectUri = Url.Action("GoogleResponse");
            var properties = new AuthenticationProperties
            {
                RedirectUri = redirectUri
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("/googleresponse")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);
            var claimsPrincipal = result.Principal;

            if (claimsPrincipal == null)
                return BadRequest("Failed to login with Google");

            var claims = claimsPrincipal.Claims;
            var token = GenerateJwtToken(claims);
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
                    return BadRequest("Failed to create user");
                }
            }

            // Associate google login credentials with the user to connect the two
            var loginInfo = new UserLoginInfo(GoogleDefaults.AuthenticationScheme, result.Principal.FindFirstValue(ClaimTypes.NameIdentifier), GoogleDefaults.AuthenticationScheme);

            var userLogins = await _userManager.GetLoginsAsync(user);
            if (!userLogins.Any(l => l.LoginProvider == loginInfo.LoginProvider && l.ProviderKey == loginInfo.ProviderKey))
            {
                var addLoginResult = await _userManager.AddLoginAsync(user, loginInfo);

                if (!addLoginResult.Succeeded)
                {
                    return BadRequest("Failed to associate Google login with user");
                }
            }

            return Ok(new { token });
        }

        private string GenerateJwtToken(IEnumerable<Claim> claims)
        {
            //var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_ISSUER")));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                //issuer: _configuration["Jwt:Issuer"],
                //audience: _configuration["Jwt:Audience"],
                issuer: Environment.GetEnvironmentVariable("JWT_ISSUER"),
                audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}
