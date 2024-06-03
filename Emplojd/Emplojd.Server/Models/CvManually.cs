using Emplojd.Models;
using System.ComponentModel.DataAnnotations;

namespace Emplojd.Server.Models
{
    public class CvManually
    {
        [Key]
        public int CvManuallyId { get; set; }
        public string PositionEducation { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string SchoolWorkplace { get; set; }
        Added migrations for CvText field in CvManually public string CvText { get; set; }
        public bool IsEducation { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
