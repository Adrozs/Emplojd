using System.Text.Json.Serialization;

namespace Emplojd.Server.ViewModels___DTOs.UserProfile
{
    public class GetResumeDto
    {
        [JsonPropertyName("resumeFilePath")]
        public string? ResumeFilePath { get; set; }
    }
}
