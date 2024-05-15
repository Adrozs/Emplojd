using ChasGPT_Backend.Models;
using ChasGPT_Backend.Repositories;

namespace ChasGPT_Backend.Services
{
    public class AuthenticationService
    {
        private readonly JwtRepository _jwtRepository;

        public AuthenticationService(JwtRepository jwtRepository)
        {
            _jwtRepository = jwtRepository;
        }

        public string GenerateToken(User user)
        {
            try
            {
                return _jwtRepository.GenerateJwt(user);
            }
            catch (Exception ex)
            {
                // Rethrow the error from GenerateJWT to be handled further upp the chain
                throw new ApplicationException("An error occurred while generating the JWT.", ex);
            }
        }
    }
}
