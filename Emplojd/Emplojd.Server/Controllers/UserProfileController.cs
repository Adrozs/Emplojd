using Microsoft.AspNetCore.Mvc;
using Emplojd.Server.Services;
using Emplojd.Server.ViewModels___DTOs;
using System.Threading.Tasks;

namespace Emplojd.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly UserProfileService _userProfileService;

        public UserProfileController(UserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserProfile([FromBody] UserProfileDto userProfileDto)
        {
            await _userProfileService.AddUserProfileAsync(userProfileDto);
            return Ok();
        }
    }
}
