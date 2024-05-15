namespace ChasGPT_Backend.Models
{
    public class CoverLetter
    {
        public int CoverLetterId { get; set; }
        public float Temperature { get; set; }
        //public string JobAdId { get; set; }
        public string GeneratedCoverLetter { get; set; }
    }
}
