using System.ComponentModel.DataAnnotations;

namespace Emplojd.Models
{
    public class SavedJobAds
    {
        [Key]
        public int SavedJobId { get; set; }
        public int PlatsbankenJobId { get; set; }
    }
}
