using System.Text.Json.Serialization;

namespace Emplojd.Server.ViewModels___DTOs
{
    public class UserProfileDto
    {
        [JsonPropertyName("firstname")]
        public string? FirstName { get; set; }
      
        [JsonPropertyName("lastname")]
        public string? LastName { get; set; }
      
        [JsonPropertyName("interests")]
        public List<string>? UserInterestTags { get; set; }

        [JsonPropertyName("descriptiveWords")]
        public List<string>? DescriptiveWords { get; set; }
    }
}
