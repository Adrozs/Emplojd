using Microsoft.AspNetCore.Identity;

namespace ChasGPT_Backend.Models
{
    public class User : IdentityUser
    {
        // Properties included because we inherit from IdentityUser:

        public int Id {  get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName {  get; set; }
        public string Email {  get; set; }
        public bool EmailConfirmed { get; set; }
        public string Address { get; set; }
        public string PasswordHash {  get; set; }
        public int SecurityStamp { get; set; }
        public string ConcurrencyStamp {  get; set; }
        public int PhoneNumber {  get; set; }
        public bool PhoneNumberConfirmed {  get; set; }
        public bool TwoFactorEnabled {  get; set; }
        public DateTime LockoutEnd { get ; set; }
        public bool LockoutEnabled {  get; set; }
        public int AccessFailedCount {  get; set; }


        public virtual UserProfile UserProfile { get; set; }
        public virtual ICollection<SavedJobAds> SavedJobAds { get; set; }
        public virtual ICollection<CoverLetter> CoverLetter { get; set; }

        /*
            Id: A primary key for the user.
            UserName: The username of the user.
            NormalizedUserName: A normalized version of the username for easier searching and indexing.
            Email: The user's email address.
            NormalizedEmail: A normalized version of the email for easier searching and indexing.
            EmailConfirmed: A flag indicating whether the user's email address has been confirmed.
            PasswordHash: The hashed version of the user's password.
            SecurityStamp: A random value that should change whenever a user’s credentials are changed (e.g., password changes). This is important for the security of the application.
            ConcurrencyStamp: A stamp used to handle optimistic concurrency when updating records.
            PhoneNumber: The user's phone number.
            PhoneNumberConfirmed: Indicates whether the phone number is confirmed.
            TwoFactorEnabled: Indicates whether two-factor authentication is enabled for the user.
            LockoutEnd: The date and time at which the user's lockout ends.
            LockoutEnabled: Indicates whether the user can be locked out.
            AccessFailedCount: The number of failed login attempts. This is used for implementing lockout functionality.
         */


        public virtual ICollection<JobAd>? SavedJobAds { get; set; } = new List<JobAd>();

    }
}
