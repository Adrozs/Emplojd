
using ChasGPT_Backend.Models;
using ChasGPT_Backend.Services;
using ChasGPT_Backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ChasGPT_Backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace ChasGPT_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ConfigurationManager configuration = builder.Configuration;

            // Add services to the container.

            // Setup database context and connection string here
            builder.Services.AddDbContext<ApplicationContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Adding Microsoft identity with config settings
            builder.Services.AddIdentity<User, IdentityRole>(options =>
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
                    options.TokenValidationParameters = new TokenValidationParameters // The rules of which authorization will check
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["Jwt:Secret"])) // Symetric key lets the system know the same secret is used for both signing and verifying the JWT. Then encodes it into bytes
                    };
                });

            // Add authorization
            builder.Services.AddAuthorization();


            // Add to scope
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IJobAdRepository, JobAdRepository>();
            builder.Services.AddSingleton<JwtRepository>(provider =>
                new JwtRepository(provider.GetRequiredService<IConfiguration>()));
            builder.Services.AddScoped<AuthenticationService>();


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure Swagger to include JWT authorization input
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

                // Define the Bearer Authentication scheme
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization", // Name of the header
                    In = ParameterLocation.Header, // Location of the header
                    Type = SecuritySchemeType.Http, // Type of the security
                    Scheme = "bearer" // Scheme name
                });

                // Make sure Swagger UI requires a Bearer token to be specified
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer" // Must match the scheme name defined in AddSecurityDefinition
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Forces all api calls to use the JWT (token) to be authorized. (Unless specified).
            app.UseAuthentication();
            app.UseAuthorization();



            // ENDPOINTS
            // Note: Don't forget to add ".RequireAuthorization()" to your endpoints! Without it you can access them without the token.

            // User account 
            app.MapPost("/login", UserService.LoginAsync);
            app.MapPost("/create-account", UserService.CreateAccountAsync);
            app.MapPost("/change-password", UserService.ChangePasswordAsync).RequireAuthorization();


            // Job search

            // Made the URI flexible to be able to omit parameters that aren't search from the query
            app.MapGet("/search", async (string query, int? region, int? page, IJobAdRepository jobAdRepository) =>
            {
                return await JobAdService.SearchJob(query, region, page ?? 1, jobAdRepository);
            }).RequireAuthorization();
            app.MapGet("/ad/{adId}", JobAdService.GetJobFromId).RequireAuthorization();


            app.Run();
        }
    }
}
