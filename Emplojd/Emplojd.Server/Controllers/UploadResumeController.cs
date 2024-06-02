using Emplojd.Server.Services;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Emplojd.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadResumeController : ControllerBase
    {
        private readonly ResumeService _resumeService;

        public UploadResumeController(ResumeService resumeService)
        {
            _resumeService = resumeService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadResume([FromForm] ResumeDto resumeDto)
        {
            try
            {
                string? filePath = await _resumeService.StoreResumeAsync(resumeDto);
                if (filePath != null)
                {
                    return Ok(new { FilePath = filePath });
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