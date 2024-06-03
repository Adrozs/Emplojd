namespace Emplojd.Server.ViewModels___DTOs.UserProfile
{
    public class SaveCvManuallyRequest
    {
        public int? CvManuallyId { get; set; } = null;
        public string PositionEducation { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string SchoolWorkplace { get; set; }
        public string CvText { get; set; }
        public bool IsEducation { get; set; }


    }
}
