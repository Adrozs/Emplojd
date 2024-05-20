using ChasGPT_Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChasGPT_Backend.Repositories
{
    public class JwtRepository
    {
        private readonly IConfiguration _configuration;

        public JwtRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateJwt(User user)
        {
            try
            {
                // Create claims
                List<Claim> claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                };

                // Configure token settings
                SymmetricSecurityKey secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                SigningCredentials credentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

                // Create JWT
                JwtSecurityToken jwt = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(3),
                    signingCredentials: credentials
                    );

                // Serialize token
                var tokenHandler = new JwtSecurityTokenHandler();
                return tokenHandler.WriteToken(jwt);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error generating JWT token", ex);
            }
        }

        public string LinkedInGenerateJwt(IEnumerable<Claim> claims)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(3),
                    signingCredentials: creds);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error generating JWT token", ex);
            }
        }
    }
}
