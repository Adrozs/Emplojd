using System.Text.Json.Serialization;

namespace Emplojd.Server.ViewModels___DTOs.UserProfile
{
    public class CvManuallyDto
    {
        //[JsonPropertyName("Position")]
        public string PositionEducation { get; set; }

        //[JsonPropertyName("StartDate")]
        public string StartDate { get; set; }

        //[JsonPropertyName("EndDate")]
        public string EndDate { get; set; }

        //[JsonPropertyName("School or Workplace")]
        public string SchoolWorkplace { get; set; }

        //[JsonPropertyName("Is the user a student")]
        public bool IsEducation { get; set; }


        public class CvFileDto
        {
            public string? CvContentText { get; set; }
        }
    }
}
