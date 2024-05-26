using Emplojd.Server.ViewModels___DTOs.UserProfile;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Emplojd.Server.ViewModels___DTOs
{
    public class UserProfileDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("interests")]
        public List<string>? UserInterestTags { get; set; }

        [JsonPropertyName("descriptive-words")]
        public List<string>? DescriptiveWords { get; set; }

        [JsonPropertyName("cv-from-file")]
        public string? CvContentText { get; set; }

        [JsonPropertyName("cv-manual-entry")]
        public ICollection<CvManuallyDto>? CvManually { get; set; }
    }
}
