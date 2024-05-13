using ChasGPT_Backend.ViewModels;

namespace ChasGPT_Backend.ViewModels___DTOs.JobAds
{
    public class SavedJobAdDto
    {
        public int PlatsbankenId { get; set; }
        public string Headline { get; set; }
        public EmployerDto Employer { get; set; } // EmployerDto exists inside JobSearchResultWrapper
    }
}
