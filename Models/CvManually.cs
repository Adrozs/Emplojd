using System.ComponentModel.DataAnnotations;

namespace ChasGPT_Backend.Models
{
    public class CvManually
    {
        [Key]
        public int CvManuallyId { get; set; }
        public string PositionEducation { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string SchoolWorkplace { get; set; }
        public bool IsEducation { get; set; }

        public virtual User User { get; set; }
    }
}
