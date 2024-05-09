using System.ComponentModel.DataAnnotations;

namespace ChasGPT_Backend.Models
{
    public class SavedJobAds
    {
        [Key]
        public int SavedJobId { get; set; }
        public int PlatsbankenJobId { get; set; }

        public virtual ICollection<UserProfile> UserInterests { get; set; }
    }
}
