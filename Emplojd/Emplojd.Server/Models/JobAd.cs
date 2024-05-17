using System.ComponentModel.DataAnnotations;

namespace Emplojd.Models
{
    public class JobAd
    {
        [Key]
        public int JobAdId { get; set; }
        public int PlatsbankenJobId { get; set; }
        public string Headline { get; set; }
        public string Employer { get; set; }

        public virtual ICollection<User>? Users { get; set; }

    }
}
