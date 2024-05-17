using System.Reflection.Emit;
using System.Text.Json.Serialization;

namespace ChasGPT_Backend.ViewModels
{
    public class JobSearchResultWrapper
    {
        //public int SearchResults { get; set; } avvakta med detta?
        [JsonPropertyName("hits")]
        public List<JobDto> Jobs { get; set; }
    }

    public class JobDto
    {
        public string Id { get; set; }
        public string Headline { get; set; } 
        public string Logo_Url { get; set; }
        //public string ApplicationDeadline { get; set; } 
        public DescriptionDto Description { get; set; } 
        public EmploymentTypeDto EmploymentType { get; set; } 
        //public SalaryTypeDto SalaryType { get; set; } 
        //public DurationDto Duration { get; set; } 
        public WorkingHoursTypeDto WorkingHoursType { get; set; } //Heltid
        public EmployerDto Employer { get; set; } // Rekryterare??
        public ApplicationDetailsDto ApplicationDetails { get; set; }
        public OccupationDto Occupation { get; set; }
        //public List<ApplicationContactDto> ApplicationContacts { get; set; }
        //public string PublicationDate { get; set; }
    }
    public class DescriptionDto
    {
        public string Text { get; set; }
        public string Text_formatted { get; set; }
    }

    public class EmploymentTypeDto
    {
        public string Label { get; set; }
    }

    //public class SalaryTypeDto
    //{
    //    public string Label { get; set; }
    //    public string Description { get; set; }
    //}

    //public class DurationDto
    //{
    //    public string Label { get; set; }
    //}

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

    //public class ApplicationContactDto
    //{
    //    public string Name { get; set; }
    //    public string Description { get; set; }
    //    public string Email { get; set; }
    //    public string Telephone { get; set; }
    //}

}
