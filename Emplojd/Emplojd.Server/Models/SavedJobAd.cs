using System.ComponentModel.DataAnnotations;

namespace Emplojd.Models
{
    public class SavedJobAd
    {
        public int SavedJobAdId { get; set; }
        public int PlatsbankenJobAdId { get; set; }
        public string Headline { get; set; }  
        public string Employer { get; set; } 

        public virtual ICollection<User> Users { get; set; }
    }
}
