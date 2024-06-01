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
