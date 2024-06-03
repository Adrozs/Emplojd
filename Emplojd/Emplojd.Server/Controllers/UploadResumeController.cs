using Emplojd.Data;
using Emplojd.Server.ResultObjects;
using Emplojd.Server.Services;
using Emplojd.Server.ViewModels___DTOs;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using iText.Kernel.Pdf.Canvas.Parser.Listener;
using System.Net.Http;

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

        [HttpGet("GetResume")]
        public async Task<IActionResult> GetResume()
        {
            ClaimsPrincipal currentUser = User;
            var userProfile = await _resumeService.GetUserResumeAsync(currentUser);

            if (userProfile == null)
                return NotFound("No matching user found.");

            var resumeFilePath = userProfile.ResumeFilePath;

            if (string.IsNullOrEmpty(resumeFilePath))
                return NotFound("No resume file found for the user.");

            string resumeText = await GetTextFromCvPdf(resumeFilePath);

            return Ok(new { UserProfile = userProfile, ResumeText = resumeText });
        }

        private async Task<string> GetTextFromCvPdf(string pdfUrl)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    var response = await client.GetAsync(pdfUrl);
                    response.EnsureSuccessStatusCode();

                    using (var memoryStream = new MemoryStream())
                    {
                        await response.Content.CopyToAsync(memoryStream);
                        memoryStream.Position = 0;

                        PdfDocument pdfDoc = new PdfDocument(new PdfReader(memoryStream));
                        var text = new StringBuilder();

                        for (int i = 1; i <= pdfDoc.GetNumberOfPages(); i++)
                        {
                            var page = pdfDoc.GetPage(i);
                            text.Append(PdfTextExtractor.GetTextFromPage(page, new SimpleTextExtractionStrategy()));
                        }

                        pdfDoc.Close();
                        return text.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error extracting text from PDF: {ex.Message}";
            }
        }
    }
}