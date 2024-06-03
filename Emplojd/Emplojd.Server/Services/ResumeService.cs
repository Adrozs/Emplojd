using Emplojd.Data;
using Emplojd.Server.ViewModels___DTOs;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Emplojd.Server.Services
{
    public class ResumeService
    {
        private readonly BlobStorageService _blobStorageService;
        private readonly ApplicationContext _context;

        public ResumeService(BlobStorageService blobStorageService, ApplicationContext context)
        {
            _blobStorageService = blobStorageService;
            _context = context;
        }

        public async Task<string?> StoreResumeAsync(ResumeDto resumeDto, ClaimsPrincipal currentUser)
        {
            if (resumeDto.ResumeFile == null)
            {
                throw new ArgumentNullException(nameof(resumeDto.ResumeFile), "Resume file cannot be null.");
            }
            var email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = _context.Users.SingleOrDefault(u => u.Email == email);

            if (user == null)
            {
                throw new ArgumentException("User not found.");
            }

            string fileExtension = Path.GetExtension(resumeDto.ResumeFile.FileName);
            string fileName = $"{Guid.NewGuid()}{fileExtension}";
            string filePath = $"resumes/{fileName}"; // You can change the directory as per your requirement.

            // Check if the resume file is either PDF or DOCX
            if (fileExtension != ".pdf" && fileExtension != ".docx")
            {
                throw new ArgumentException("Invalid file format. Only PDF and DOCX formats are supported.");
            }

            // Store the resume file in Blob Storage
            using (var memoryStream = new MemoryStream())
            {
                await resumeDto.ResumeFile.CopyToAsync(memoryStream);
                memoryStream.Position = 0; // Reset the stream position
                // Use the correct method name: UploadBlobAsync
                await _blobStorageService.UploadBlobAsync(resumeDto.ResumeFile);
            }

            // Update the ResumeFilePath property in the ResumeDto
            resumeDto.ResumeFilePath = filePath;

            user.ResumeFilePath = filePath;
            await _context.SaveChangesAsync();
            return filePath;
        }

        public async Task<GetResumeDto> GetUserResumeAsync(ClaimsPrincipal currentUser)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return null;

            return new GetResumeDto
            {
                ResumeFilePath = user.ResumeFilePath
            };
        }
    }
}