using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    namespace ChasGPT.Data
    {
        public class ApplicationContext : DbContext
        {
            //ADD Things here

            public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
        }
    }
}