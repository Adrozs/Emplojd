using Emplojd.Server.Services;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Emplojd.Server.ViewModels___DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
            ClaimsPrincipal currentUser = User;

            await _userProfileService.AddUserProfileAsync(userProfileDto, currentUser);
            return Ok();
        }

        [HttpPost("CreateUserCvManually")]
         public async Task<IActionResult> CreateUserCvManually([FromBody] CvManuallyDto cvManuallyDtos)
        {
            ClaimsPrincipal currentUser = User;

            await _userProfileService.AddUserCvManuallyAsync(currentUser, cvManuallyDtos);
            return Ok();
        }

        [HttpGet("GetUserProfile")]
        public async Task<IActionResult> GetUserProfile()
        {
            ClaimsPrincipal currentUser = User;

            var userProfile = await _userProfileService.GetUserProfileAsync(currentUser);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("GetCvManually")]
        public async Task<IActionResult> GetCvManuallyAsync()
        {
            ClaimsPrincipal currentUser = User;

            var cvManually = await _userProfileService.GetUserCvManuallyAsync(currentUser);
            if (cvManually == null)
            {
                return NotFound();
            }
            return Ok(cvManually);
        }
    }
}
