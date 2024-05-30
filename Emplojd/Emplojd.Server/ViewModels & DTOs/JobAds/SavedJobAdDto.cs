using Emplojd.ViewModels;

namespace Emplojd.ViewModels___DTOs.SavedJobAdDto
{
    public class SavedJobAdDto
    {
        public int PlatsbankenId { get; set; }
        public string Logo_Url { get; set; }
        public string Headline { get; set; }
        public string Publication_Date { get; set; }



        // These below exists inside JobSearchResultWrapper
        public DescriptionDto Description { get; set; }
        public EmploymentTypeDto Employment_Type { get; set; }
        public WorkingHoursTypeDto Working_Hours_Type { get; set; }
        public EmployerDto Employer { get; set; }
        public OccupationDto Occupation { get; set; }
        public WorkplaceAddressDto Workplace_Address { get; set; }


    }
}
