using Emplojd.Data;
using Emplojd.Server.ResultObjects;
using Emplojd.Server.Services;
using Emplojd.Server.ViewModels___DTOs;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Emplojd.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadResumeController : ControllerBase
    {
        private readonly ResumeService _resumeService;
        private readonly BlobStorageService _blobStorageService;
        private readonly ApplicationContext _context;

        public UploadResumeController(ResumeService resumeService, BlobStorageService blobStorageService, ApplicationContext context)
        {
            _resumeService = resumeService;
            _blobStorageService = blobStorageService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> UploadResume([FromForm] ResumeDto resumeDto)
        {
            try
            {
                ClaimsPrincipal currentUser = User;
                //string? filePath = await _resumeService.StoreResumeAsync(resumeDto, currentUser);
                //if (filePath != null)
                //{
                //    return Ok(new { FilePath = filePath });
                //}
                //else
                //{
                //    return BadRequest("Failed to upload resume.");
                //}

                string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);


                if (resumeDto.ResumeFile != null && resumeDto.ResumeFile.Length > 0)
                {
                    var cvUrl = await _blobStorageService.UploadBlobAsync(resumeDto.ResumeFile);
                    resumeDto.ResumeFilePath = cvUrl;

                    user.ResumeFilePath = cvUrl;
                    await _context.SaveChangesAsync();

                    return Ok(new { FilePath = cvUrl });

                }
                else
                {
                    return BadRequest("Failed to upload resume.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}