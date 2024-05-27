using System.Reflection.Emit;
using System.Text.Json.Serialization;

namespace Emplojd.ViewModels
{
    public class JobSearchResultWrapper
    {
        [JsonPropertyName("hits")]
        public List<JobDto> Jobs { get; set; }
    }

    public class JobDto
    {
        public string Id { get; set; }
        public string Logo_Url { get; set; }
        public string Headline { get; set; }
        public string Application_Deadline { get; set; } 
        public DescriptionDto Description { get; set; } 
        public EmploymentTypeDto Employment_Type { get; set; } 
        public WorkingHoursTypeDto Working_Hours_Type { get; set; }
        public EmployerDto Employer { get; set; }
        public ApplicationDetailsDto Application_Details { get; set; }
        public OccupationDto Occupation { get; set; }
        public WorkplaceAddressDto Workplace_Address { get; set; }
        public string Publication_Date { get; set; }
    }
    public class DescriptionDto
    {
        public string Text { get; set; }
        public string Text_Formatted { get; set; }
    }

    public class EmploymentTypeDto
    {
        public string Label { get; set; }
    }

    public class WorkingHoursTypeDto
    {
        public string Label { get; set; }
    }

    public class EmployerDto
    {
        public string Name { get; set; }
    }

    public class ApplicationDetailsDto
    {
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Url { get; set; }
    }

    public class OccupationDto
    {
        public string Label { get; set; }
    }

    public class WorkplaceAddressDto
    {
        public string Municipality { get; set; }
    }
}
