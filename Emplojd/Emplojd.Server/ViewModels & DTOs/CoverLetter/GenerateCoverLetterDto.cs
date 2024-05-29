namespace Emplojd.Server.ViewModels___DTOs.CoverLetter
{
    public class GenerateCoverLetterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<string> UserInterestTags { get; set; }
        public List<string> DescriptiveWords { get; set; }
        public int jobId { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public string CvText { get; set; }  
        public float Temperature { get; set; }

    }
}
