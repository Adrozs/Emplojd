namespace ChasGPT_Backend.Models
{
    public class SavedCoverLetter
    {
        public int SavedCoverLetterId { get; set; }
        public float Temperature { get; set; }
        public int PlatsbankenId { get; set; }
        public string CoverLetterTitle { get; set; }
        public string CoverLetterContent { get; set; }
    }
}
