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

            var result = await _userProfileService.AddUserProfileAsync(userProfileDto, currentUser);

            if (result.Success)
                return Ok("Profile successfully updated.");
            
             return BadRequest($"Failed to update profile: {result.ErrorMessage}");
        }

        [HttpPost("CreateUserCvManually")]
         public async Task<IActionResult> CreateUserCvManually([FromBody] CvManuallyDto cvManuallyDtos)
        {
            ClaimsPrincipal currentUser = User;

            var result = await _userProfileService.AddUserCvManuallyAsync(currentUser, cvManuallyDtos);

            if (result.Success)
                return Ok("CV successfully updated.");

            return BadRequest($"Failed to update profile: {result.ErrorMessage}");
        }

        [HttpGet("GetUserProfile")]
        public async Task<IActionResult> GetUserProfile()
        {
            ClaimsPrincipal currentUser = User;

            var userProfile = await _userProfileService.GetUserProfileAsync(currentUser);
            if (userProfile == null)
                return NotFound("No matching user found.");

            return Ok(userProfile);
        }

        [HttpGet("GetCvManually")]
        public async Task<IActionResult> GetCvManuallyAsync()
        {
            ClaimsPrincipal currentUser = User;

            var cvManually = await _userProfileService.GetUserCvManuallyAsync(currentUser);
            if (cvManually == null)
                return NotFound("No CV found for this user.");

            return Ok(cvManually);
        }
    }
}
