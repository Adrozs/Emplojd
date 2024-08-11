using Emplojd.Services;
using OpenAI_API;
using Emplojd.Models;
using Emplojd.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Emplojd.Repository;
using Emplojd.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Emplojd.Helpers;
using Emplojd.Options;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using System.Text.Json;
using AspNet.Security.OAuth.LinkedIn;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Extensions.Configuration;
using Emplojd.Server.Controllers;
using DotNetEnv;
using Emplojd.Server.Services;
using EmplojdAuthenticationService = Emplojd.Services.AuthenticationService;

namespace Emplojd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Load environment variables from .env file
            DotNetEnv.Env.Load();

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddScoped<ResumeService>();

            // Use environment variables for BlobStorageService
            builder.Services.AddScoped<BlobStorageService>(provider =>
            {
                var connectionString = Environment.GetEnvironmentVariable("AZUREBLOBSTORAGECONNECTION");
                var containerName = Environment.GetEnvironmentVariable("AZUREBLOBSTORAGECONTAINERNAME");
                return new BlobStorageService(connectionString, containerName);
            });

            builder.Services.AddScoped<UserProfileService>();

            if (builder.Environment.IsDevelopment())
            {
                // Setup database context and connection string here
                builder.Services.AddDbContext<ApplicationContext>(options =>
                {
                    options.UseSqlServer(Environment.GetEnvironmentVariable("DEFAULTCONNECTION"));
                });
            }

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "LinkedIn";
            })
            .AddCookie()
            .AddGoogle(options =>
            {
                options.ClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
                options.ClientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");

                options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
                options.ClaimActions.MapJsonKey(ClaimTypes.Name, "localizedFirstName");
                options.ClaimActions.MapJsonKey(ClaimTypes.Surname, "localizedLastName");
                options.ClaimActions.MapJsonKey(ClaimTypes.Email, "emailAddress");
            })
            .AddOAuth("LinkedIn", options =>
            {
                options.ClientId = Environment.GetEnvironmentVariable("LINKEDIN_CLIENT_ID");
                options.ClientSecret = Environment.GetEnvironmentVariable("LINKEDIN_CLIENT_SECRET");
                options.CallbackPath = new PathString("/signin-linkedin");

                options.AuthorizationEndpoint = "https://www.linkedin.com/oauth/v2/authorization";
                options.TokenEndpoint = "https://www.linkedin.com/oauth/v2/accessToken";
                options.UserInformationEndpoint = "https://api.linkedin.com/v2/userinfo";

                options.Scope.Add("openid");
                options.Scope.Add("profile");
                options.Scope.Add("email");

                options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "sub");
                options.ClaimActions.MapJsonKey(ClaimTypes.Name, "given_name");
                options.ClaimActions.MapJsonKey(ClaimTypes.Surname, "family_name");
                options.ClaimActions.MapJsonKey(ClaimTypes.Email, "email");

                options.Events = new OAuthEvents
                {
                    OnCreatingTicket = async context =>
                    {
                        var request = new HttpRequestMessage(HttpMethod.Get, options.UserInformationEndpoint);
                        request.Headers.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", context.AccessToken);

                        var response = await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
                        response.EnsureSuccessStatusCode();

                        var user = JsonDocument.Parse(await response.Content.ReadAsStringAsync()).RootElement;

                        context.RunClaimActions(user);
                    }
                };
            });

            ConfigurationManager configuration = builder.Configuration;

            // Add services to the container.
            builder.Services.AddControllers();

            // Setup database context and connection string here
            builder.Services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(Environment.GetEnvironmentVariable("DEFAULTCONNECTION")));

            // Add CORS services
            builder.Services.AddCors();

            // Adding Microsoft identity with config settings
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

            // Add Mailkit email config
            builder.Services.Configure<MailKitSettings>(configuration.GetSection("MailKitSettings"));

            // Adding authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
                    ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET")))
                };
            });

            // Add authorization
            builder.Services.AddAuthorization();


            // Add to scope
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IJobAdRepository, JobAdRepository>();
            builder.Services.AddScoped<IChatGPTRepository, ChatGPTRepository>();
            builder.Services.AddSingleton(provider =>
                new JwtRepository(provider.GetRequiredService<IConfiguration>()));
            builder.Services.AddScoped<EmplojdAuthenticationService>();
            builder.Services.AddScoped<IEmailSender, EmailSender>();
            builder.Services.AddSingleton(sp => new OpenAIAPI(Environment.GetEnvironmentVariable("OPENAI_API_KEY")));
            builder.Services.AddScoped<UserProfileService>();

            // Configure Swagger
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
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors(builder =>
            {
                builder.WithOrigins("https://your-allowed-origin.com")
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

            app.UseHttpsRedirection();

            app.UseCors("OpenCorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            // Define endpoints
            app.MapPost("/login", UserService.LoginAsync).AllowAnonymous();
            app.MapPost("/create-account", UserService.CreateAccountAsync).AllowAnonymous();
            app.MapGet("/confirm-email", UserService.ConfirmEmailAsync).AllowAnonymous();
            app.MapPost("/resend-confirm-email", UserService.ResendEmailConfirmationAsync).AllowAnonymous();
            app.MapPost("/forgot-password", UserService.GeneratePasswordResetTokenAsync).AllowAnonymous();
            app.MapPost("/reset-password", UserService.ResetPasswordAsync).AllowAnonymous();
            app.MapDelete("/delete-account", UserService.DeleteAccountAsync).RequireAuthorization();

            app.MapPost("/GetCoverLetter", ChatGPTService.GenerateLetterAsync).RequireAuthorization();
            app.MapGet("/saved-letter", ChatGPTService.GetCoverLettersAsync).RequireAuthorization();
            app.MapGet("/saved-letter/{coverLetterId}", ChatGPTService.GetCoverLetterAsync).RequireAuthorization();
            app.MapPost("/save-letter", ChatGPTService.SaveCoverLetterAsync).RequireAuthorization();
            app.MapDelete("/saved-letter", ChatGPTService.RemoveSavedCoverLettersAsync).RequireAuthorization();

            app.MapGet("/search", JobAdService.SearchJob).RequireAuthorization();
            app.MapGet("/ad/{adId}", JobAdService.GetJobFromId).RequireAuthorization();

            app.MapGet("/saved-ads", JobAdService.GetSavedJobAdsAsync).RequireAuthorization();
            app.MapPost("/save-ad", JobAdService.SaveJobAdAsync).RequireAuthorization();
            app.MapDelete("/saved-ad", JobAdService.RemoveSavedJobAdAsync).RequireAuthorization();

            app.Run();
        }
    }
}
