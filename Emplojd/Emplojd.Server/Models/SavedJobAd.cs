using Emplojd.ViewModels;
using System.ComponentModel.DataAnnotations;

namespace Emplojd.Models
{
    public class SavedJobAd
    {
        public int SavedJobAdId { get; set; }
        public int PlatsbankenJobAdId { get; set; }
        public string Headline { get; set; }  
        public string Employer { get; set; }
        public string Description { get; set; }
        public string Employment_Type { get; set; }
        public string Working_Hours_Type { get; set; }
        public string Occupation { get; set; }
        public string Workplace_Address { get; set; }
        public string Publication_Date { get; set; }
        public string Logo_Url { get; set; }


        public virtual ICollection<User> Users { get; set; }
    }
}
