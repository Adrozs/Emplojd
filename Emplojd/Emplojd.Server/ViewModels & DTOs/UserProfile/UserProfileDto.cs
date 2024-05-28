using Emplojd.Server.ViewModels___DTOs.UserProfile;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Emplojd.Server.ViewModels___DTOs
{
    public class UserProfileDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("firstname")]
        public string? FirstName { get; set; }
        [JsonPropertyName("lastname")]
        public string? LastName { get; set; }

        [JsonPropertyName("interests")]
        public List<string>? UserInterestTags { get; set; }

        [JsonPropertyName("descriptive-words")]
        public List<string>? DescriptiveWords { get; set; }
    }
}
