namespace Emplojd.Models
{
    public class CoverLetter
    {
        public int CoverLetterId { get; set; }
        public float Temperature { get; set; }
        //public string PlatsbankenJobAdId { get; set; } // Add later if frontend has more time
        public string GeneratedCoverLetter { get; set; }
    }
}
