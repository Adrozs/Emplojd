using Emplojd.Server.ViewModels___DTOs.UserProfile;

namespace Emplojd.Server.Services
{
    public class ResumeService
    {
        private readonly BlobStorageService _blobStorageService;

        public ResumeService(BlobStorageService blobStorageService)
        {
            _blobStorageService = blobStorageService;
        }

        public async Task<string?> StoreResumeAsync(ResumeDto resumeDto)
        {
            if (resumeDto.ResumeFile == null)
            {
                throw new ArgumentNullException(nameof(resumeDto.ResumeFile), "Resume file cannot be null.");
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

            return filePath;
        }
    }
}
