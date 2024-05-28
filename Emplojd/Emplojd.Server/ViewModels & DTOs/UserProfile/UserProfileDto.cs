using Emplojd.Server.ViewModels___DTOs.UserProfile;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Emplojd.Server.ViewModels___DTOs
{
    public class UserProfileDto
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("interests")]
        public List<string>? UserInterestTags { get; set; }

        [JsonPropertyName("descriptiveWords")]
        public List<string>? DescriptiveWords { get; set; }
    }
}
