
using ChasGPT_Backend.Models;
using ChasGPT_Backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ChasGPT_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Database connections commented out until we decide on MySQL or MSSQL. 

            // Setup database context and connection string here
            //builder.Services.AddDbContext<ApplicationDbContext>(options =>
            //    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddIdentity<User, IdentityRole>()
                //.AddEntityFrameworkStores<ApplicationDbContext>()
                 .AddDefaultTokenProviders();



            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            // Endpoints 

            // User account 
            app.MapGet("/login", UserService.VerifyLogin);
            app.MapGet("/create-account", UserService.CreateAccount);
            app.MapGet("/change-password", UserService.ChangePassword);


            app.Run();
        }
    }
}
