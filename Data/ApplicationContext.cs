using ChasGPT_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ChasGPT_Backend.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<SavedCoverLetter> CoverLetters { get; set; }
        public DbSet<SavedJobAd> SavedJobAds { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

    }
}
