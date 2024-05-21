using ChasGPT_Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChasGPT_Backend.Data
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<User> Users { get; set; }

        public DbSet<SavedCoverLetter> CoverLetters { get; set; }
        public DbSet<SavedJobAd> SavedJobAds { get; set; }

        public DbSet<JobAd> JobAd { get; set; }


        public DbSet<CoverLetter> CoverLetters { get; set; }
        public DbSet<SavedJobAds> SavedJobAds { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }


        // User and SavedJobAds relationship
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(p => p.SavedJobAds)
                .WithMany(j => j.Users)
                .UsingEntity(j => j.ToTable("UserJobAds"));
        }
    }
}
