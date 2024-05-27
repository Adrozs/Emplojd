using Emplojd.Models;
using Emplojd.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Emplojd.Data
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<JobAd> JobAd { get; set; }
        public DbSet<SavedCoverLetter> CoverLetters { get; set; }
        public DbSet<SavedJobAd> SavedJobAds { get; set; }
        public DbSet<CvManually> CvManuallys { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User and SavedJobAds relationship
            modelBuilder.Entity<User>()
                .HasMany(p => p.SavedJobAds)
                .WithMany(j => j.User)
                .UsingEntity(j => j.ToTable("UserJobAds"));

            // User and CvManually relationship
            modelBuilder.Entity<CvManually>()
                .HasOne(cm => cm.User)
                .WithMany(u => u.CvManually)
                .HasForeignKey(cm => cm.UserId);
        }
    }
}
