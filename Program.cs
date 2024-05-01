
using ChasGPT_Backend.Models;
using ChasGPT_Backend.Services;
using ChasGPT_Backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ChasGPT_Backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace ChasGPT_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ConfigurationManager configuration = builder.Configuration;

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

            // Adding authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            // Add JWT Bearer
            .AddJwtBearer(options =>
            {
                options.SaveToken = true; // Allows the server to save the token for the duration of the request
                options.RequireHttpsMetadata = true; // Enforces HTTPS so tokens aren't transfered over unsecure connections
                options.TokenValidationParameters = new TokenValidationParameters() // The rules of which authorization will check
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidAudience = configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["JWT:Secret"])) // Symetric key lets the system know the same secret is used for both signing and verifying the JWT. Then encodes it into bytes
                };
            });



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

            app.UseAuthentication(); // Forces all api calls to use the JWT (token) to be authorized. (Unless specified).
            app.UseAuthorization();


            // Endpoints 

            // User account 
            app.MapPost("/login/{email}/{password}", UserService.LoginAsync);
            app.MapPost("/create-account/{email}/{password}/{passwordConfirm}", UserService.CreateAccountAsync);
            app.MapPost("/change-password/{email}/{password}/{newPassword}/{newPasswordConfirm}", UserService.ChangePasswordAsync);

            // Job search
            app.MapGet("/search/{search}/{region?}/{offset?}", JobAdService.SearchJob);
            app.MapGet("/ad/{jobId}", JobAdService.GetJobFromId);


            app.Run();
        }
    }
}
