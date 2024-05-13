﻿using ChasGPT_Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChasGPT_Backend.Data
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<User> Users { get; set; }
        public DbSet<CoverLetter> CoverLetters { get; set; }
        public DbSet<SavedJobAds> SavedJobAds { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

    }
}
