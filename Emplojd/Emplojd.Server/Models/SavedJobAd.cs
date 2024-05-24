using System.ComponentModel.DataAnnotations;

namespace Emplojd.Models
{
    public class SavedJobAd
    {
        [Key]
        public int SavedJobAdId { get; set; }
        public int PlatsbankenJobId { get; set; }
        public string Headline { get; set; }  
        public string Employer { get; set; } 

        public virtual ICollection<User> User { get; set; }
    }
}
