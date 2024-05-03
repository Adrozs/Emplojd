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

        // Call the generate jwt method
        public string GenerateToken(User user)
        {
            return _jwtRepository.GenerateJwt(user);
        }
    }
}
