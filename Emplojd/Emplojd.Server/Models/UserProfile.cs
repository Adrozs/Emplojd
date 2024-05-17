namespace ChasGPT_Backend.Models
{
    public class UserProfile
    {
        public int UserProfileId { get; set; }

        public List<string> UserInterestTags { get; set; }

        //public string questionnaire { get; set; }

        public List<string> DescriptiveWords { get; set; }

        //INSERT CV MODEL LOGIC HERE 
        

        //public virtual User User { get; set; }
        public virtual ICollection<CoverLetter> CoverLetter { get; set; }    
    }
}
