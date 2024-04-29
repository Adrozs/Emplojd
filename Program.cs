
using ChasGPT_Backend.Models;
using ChasGPT_Backend.Services;
using ChasGPT_Backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ChasGPT_Backend.Repositories;

namespace ChasGPT_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Setup database context and connection string here
            builder.Services.AddDbContext<ApplicationContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Adding Microsoft identity with config settings
            builder.Services.AddIdentity<User, IdentityRole>(options => // IdentityUser instead??
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true; 
                options.Password.RequireDigit = true; 
                options.Password.RequireNonAlphanumeric = true; 
            })
            .AddEntityFrameworkStores<ApplicationContext>() // Connects identity to the database giving its method ability to access it
            .AddDefaultTokenProviders();

            // Add repositories to scope
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IJobAdRepository, JobAdRepository>();



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
            app.MapGet("/login/{email}/{password}", UserService.VerifyLogin);
            app.MapPost("/create-account/{email}/{password}/{passwordConfirm}", UserService.CreateAccount);
            app.MapPost("/change-password/{email}/{password}/{newPassword}/{newPasswordConfirm}", UserService.ChangePassword);

            // Job search
            app.MapGet("/search/{search}/{region?}/{offset?}", JobAdService.SearchJob);
            app.MapGet("/ad/{jobId}", JobAdService.GetJobFromId);


            app.Run();
        }
    }
}
