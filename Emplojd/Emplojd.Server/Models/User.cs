﻿using Microsoft.AspNetCore.Identity;

namespace Emplojd.Models
{
    public class User : IdentityUser
    {
        // Properties included because we inherit from IdentityUser:

        public virtual UserProfile UserProfile { get; set; }
        public virtual ICollection<JobAd> SavedJobAds { get; set; } = new List<JobAd>();
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

    }
}