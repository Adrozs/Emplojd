using System.ComponentModel.DataAnnotations;

namespace ChasGPT_Backend.Models
{
    public class SavedJobAd
    {
        [Key]
        public int SavedJobAdId { get; set; }
        public int PlatsbankenJobId { get; set; }

        public virtual ICollection<User> User { get; set; }
    }
}
