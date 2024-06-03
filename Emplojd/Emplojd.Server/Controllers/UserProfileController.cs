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
        private readonly BlobStorageService _blobStorageService;

        public UserProfileController(UserProfileService userProfileService, BlobStorageService blobStorageService)
        {
            _userProfileService = userProfileService;
            _blobStorageService = blobStorageService;
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

        [HttpPost("AddCvManually")]
        public async Task<IActionResult> CreateUserCvManually([FromBody] SaveCvManuallyRequest request)
        {
            ClaimsPrincipal currentUser = User;

            var result = await _userProfileService.AddUserCvManuallyAsync(currentUser, request);

            if (result.Success)
                return Ok("CV successfully updated.");

            return BadRequest($"Failed to update or create cv: {result.ErrorMessage}");
        }

        [HttpDelete("DeleteCvManually")]
        public async Task<IActionResult> DeleteCvManuallyAsync([FromBody] DeleteCvManualRequest request)
        {
            ClaimsPrincipal currentUser = User;

            var result = await _userProfileService.DeleteCvManuallyAsync(currentUser, request.CvManuallyId);

            if (result.Success)
                return Ok("CV successfully deleted.");

            return BadRequest($"Failed to delete cv: {result.ErrorMessage}");
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

        [HttpPost]
        public async Task<IActionResult> UploadUserProfile([FromForm] UserProfileDto userProfileDto)
        {
            if (userProfileDto.ImageFile != null && userProfileDto.ImageFile.Length > 0)
            {
                var imageUrl = await _blobStorageService.UploadBlobAsync(userProfileDto.ImageFile);
                userProfileDto.ImageFilePath = imageUrl;
            }

            await _userProfileService.AddUserProfileAsync(userProfileDto, User);
            return Ok();
        }
    }
}
