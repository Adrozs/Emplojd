using Emplojd.Models;
using Emplojd.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Emplojd.Data
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<User> Users { get; set; }

        public DbSet<JobAd> JobAd { get; set; }


        public DbSet<SavedCoverLetter> CoverLetters { get; set; }
        public DbSet<SavedJobAd> SavedJobAds { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }


        // User and SavedJobAds relationship
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(p => p.SavedJobAds)
                .WithMany(j => j.User)
                .UsingEntity(j => j.ToTable("UserJobAds"));
        }
    }
}
