using Emplojd.Server.Services;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Emplojd.Server.ViewModels___DTOs;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("CreateUserProfile")]
        public async Task<IActionResult> CreateUserProfile([FromBody] UserProfileDto userProfileDto)
        {
            await _userProfileService.AddUserProfileAsync(userProfileDto);
            return Ok();
        }

        [HttpPost("CreateUserCvManually")]
         public async Task<IActionResult> CreateUserCvManually([FromBody] CvManuallyDto cvManuallyDtos, [FromQuery] string userId)
        {
            await _userProfileService.AddUserCvManuallyAsync(userId, cvManuallyDtos);
            return Ok();
        }

        [HttpGet("GetUserProfile")]
        public async Task<IActionResult> GetUserProfile([FromQuery] string userId)
        {
            var userProfile = await _userProfileService.GetUserProfileAsync(userId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("GetCvManually")]
        public async Task<IActionResult> GetCvManuallyAsync([FromQuery] string userId)
        {
            var cvManually = await _userProfileService.GetUserCvManuallyAsync(userId);
            if (cvManually == null)
            {
                return NotFound();
            }
            return Ok(cvManually);
        }
    }
}
