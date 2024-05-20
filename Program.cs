using ChasGPT_Backend.Services;
using OpenAI_API;
using ChasGPT_Backend.Models;
using ChasGPT_Backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ChasGPT_Backend.Repository;
using ChasGPT_Backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ChasGPT_Backend.Helpers;
using ChasGPT_Backend.Options;
using AspNet.Security.OAuth.LinkedIn;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.OAuth;

namespace ChasGPT_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            // Add services to the container.
            DotNetEnv.Env.Load();

            builder.Services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors();

            builder.Services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = true;
                options.SignIn.RequireConfirmedEmail = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                options.Lockout.MaxFailedAccessAttempts = 8;
            })
            .AddEntityFrameworkStores<ApplicationContext>()
            .AddDefaultTokenProviders();

            builder.Services.Configure<MailKitSettings>(configuration.GetSection("MailKitSettings"));

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]))
                };
            })
            .AddLinkedIn(options =>
            {
                options.ClientId = configuration["LinkedIn:ClientId"];
                options.ClientSecret = configuration["LinkedIn:ClientSecret"];
                options.CallbackPath = new PathString("/signin-linkedin");
                options.Scope.Add("r_liteprofile");
                options.Scope.Add("r_emailaddress");

                options.SaveTokens = true;

                options.Events = new OAuthEvents
                {
                    OnCreatingTicket = async context =>
                    {
                        var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
                        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);

                        var response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, context.HttpContext.RequestAborted);
                        response.EnsureSuccessStatusCode();

                        var user = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
                        context.RunClaimActions(user.RootElement);
                    }
                };
            });

            builder.Services.AddAuthorization();

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IJobAdRepository, JobAdRepository>();
            builder.Services.AddSingleton(provider => new JwtRepository(provider.GetRequiredService<IConfiguration>()));
            builder.Services.AddScoped<AuthenticationService>();
            builder.Services.AddScoped<IEmailSender, EmailSender>();
            builder.Services.AddSingleton(sp => new OpenAIAPI(Environment.GetEnvironmentVariable("OPENAI_API_KEY")));

            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
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

            app.UseCors(policyBuilder =>
            {
                policyBuilder.WithOrigins("https://localhost:54686", "http://localhost:54687", "http://localhost:5173", "https://localhost:5173")
                             .SetIsOriginAllowedToAllowWildcardSubdomains()
                             .AllowAnyHeader()
                             .AllowCredentials()
                             .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS");
            });

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthentication();
            app.UseAuthorization();

            // Configure your endpoints
            app.MapPost("/login", UserService.LoginAsync).AllowAnonymous();
            app.MapPost("/create-account", UserService.CreateAccountAsync).AllowAnonymous();
            app.MapGet("/confirm-email", UserService.EmailVerificationAsync).AllowAnonymous();
            app.MapPost("/forgot-password", UserService.GeneratePasswordResetTokenAsync).AllowAnonymous();
            app.MapPost("/reset-password", UserService.ResetPasswordAsync).AllowAnonymous();

            app.MapGet("/GetPersonalLetter/{userId}/{jobId}/{temperature}/{job}", ChatGPTService.GenerateLetterAsync);

            app.MapGet("/search", JobAdService.SearchJob).RequireAuthorization();
            app.MapGet("/ad/{adId}", JobAdService.GetJobFromId).RequireAuthorization();

            app.MapGet("/saved-ads", JobAdService.GetSavedJobAdsAsync).RequireAuthorization();
            app.MapPost("/save-ad", JobAdService.SaveJobAdAsync).RequireAuthorization();
            app.MapDelete("/saved-ad", JobAdService.RemoveSavedJobAdAsync).RequireAuthorization();

            app.Run();
        }
    }
}


