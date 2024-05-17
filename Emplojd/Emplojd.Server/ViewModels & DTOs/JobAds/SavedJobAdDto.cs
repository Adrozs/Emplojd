using Emplojd.ViewModels;

namespace Emplojd.ViewModels___DTOs.JobAds
{
    public class SavedJobAdDto
    {
        public int PlatsbankenId { get; set; }
        public string Headline { get; set; }
        public EmployerDto Employer { get; set; } // EmployerDto exists inside JobSearchResultWrapper
    }
}
