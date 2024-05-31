using System.ComponentModel.DataAnnotations;

namespace Emplojd.Server.Models
{
    public class SavedCoverLetter
    {
        [Key]
        public int SavedCoverLetterId { get; set; }
        public float Temperature { get; set; }
        //public int  PlatsbankenJobAdId { get; set; }
        public string CoverLetterTitle { get; set; }
        public string CoverLetterContent { get; set; }
        public string CompanyName { get; set; }
        public DateTime Date { get; set; }
    }
}
