using Emplojd.Server.Models;
using System.Text.Json.Serialization;

namespace Emplojd.Server.ViewModels___DTOs
{
    public class UserProfileDto
    {
        // User id
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
        //Kolla hur man lägger till objekt inom objekt från json-fil för CV-manually nedan
        public ICollection<CvManually>? CvManually { get; set; }
    }
}