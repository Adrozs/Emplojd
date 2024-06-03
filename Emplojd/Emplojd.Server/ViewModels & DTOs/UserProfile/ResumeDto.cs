using System.Text.Json.Serialization;

namespace Emplojd.Server.ViewModels___DTOs.UserProfile
{
    public class ResumeDto
    {
        [JsonPropertyName("resume")]
        public IFormFile ResumeFile { get; set; }
        [JsonPropertyName("resumeFilePath")]
        public string? ResumeFilePath { get; set; }

    }
}