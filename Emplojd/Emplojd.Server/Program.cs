
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
using AuthenticationService = Emplojd.Services.AuthenticationService;
using AspNet.Security.OAuth.LinkedIn;
using Emplojd.Server.Services;
using Azure.Identity;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using Azure.Security.KeyVault.Secrets;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using Microsoft.Extensions.Configuration;
using Emplojd.Server.Controllers;
using Microsoft.Extensions.DependencyInjection;
using System.Text;

namespace Emplojd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            DotNetEnv.Env.Load();

            builder.Services.AddControllers();
            builder.Services.AddScoped<ResumeService>();
            builder.Services.AddScoped<BlobStorageService>(provider =>
            {

                var connectionString = Environment.GetEnvironmentVariable("AZUREBLOBSTORAGECONNECTION");
                var containerName = Environment.GetEnvironmentVariable("AZUREBLOBSTORAGECONTAINERNAME");
                //var connectionString = builder.Configuration.GetConnectionString("AzureBlobStorageConnection");
                //var containerName = builder.Configuration.GetConnectionString("AzureBlobStorageContainerName");
                return new BlobStorageService(connectionString, containerName);
            });
            builder.Services.AddScoped<UserProfileService>();



            if (builder.Environment.IsDevelopment())
            {
                // Setup database context and connection string here
                builder.Services.AddDbContext<ApplicationContext>(options =>
                {
                    //options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
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
                        //options.ClientId = builder.Configuration.GetSection("GoogleKeys:ClientId").Value;
                        //options.ClientSecret = builder.Configuration.GetSection("GoogleKeys:ClientSecret").Value;
                        options.ClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
                        options.ClientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");


                        options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
                        options.ClaimActions.MapJsonKey(ClaimTypes.Name, "localizedFirstName");
                        options.ClaimActions.MapJsonKey(ClaimTypes.Surname, "localizedLastName");
                        options.ClaimActions.MapJsonKey(ClaimTypes.Email, "emailAddress");
                    })
                    .AddOAuth("LinkedIn", options =>
                    {
                        //options.ClientId = builder.Configuration.GetSection("LinkedInKeys:ClientId").Value;
                        //options.ClientSecret = builder.Configuration.GetSection("LinkedInKeys:ClientSecret").Value;
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


            DotNetEnv.Env.Load();

            // Setup database context and connection string here
            builder.Services.AddDbContext<ApplicationContext>(options =>
                //options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection
                options.UseSqlServer(Environment.GetEnvironmentVariable("DEFAULTCONNECTION")));

            // Add CORS services
            builder.Services.AddCors(options => { options.AddPolicy("AllowEmplojdDomain", policy => { policy.WithOrigins("https://emplojd.com").AllowAnyHeader().AllowAnyMethod(); }); });

            // Adding Microsoft identity with config settings
            builder.Services.AddIdentity<User, IdentityRole>(options =>
            {
                // Password Requirements
                options.Password.RequiredLength = 8;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = true;

                // Ensure email is confirmed
                options.SignIn.RequireConfirmedEmail = true;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                options.Lockout.MaxFailedAccessAttempts = 8;
            })
            .AddEntityFrameworkStores<ApplicationContext>() // Connects identity to the database giving its method ability to access it
            .AddDefaultTokenProviders();

            // Add Mailkit email config
            //builder.Services.Configure<MailKitSettings>(configuration.GetSection("MailKitSettings"));
            builder.Services.Configure<MailKitSettings>(settings =>
            {
                settings.MailPort = int.Parse(Environment.GetEnvironmentVariable("MAILKIT_MAILPORT"));
                settings.MailServer = Environment.GetEnvironmentVariable("MAILKIT_MAILSERVER");
                settings.SenderName = Environment.GetEnvironmentVariable("MAILKIT_SENDERNAME");
                settings.Sender = Environment.GetEnvironmentVariable("MAILKIT_SENDER");
                settings.Password = Environment.GetEnvironmentVariable("MAILKIT_PASSWORD");
            });


            // Adding authentication
            builder.Services.AddAuthentication(options =>
            {
                // JWT options
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
                        //ValidIssuer = configuration["Jwt:Issuer"],
                        //ValidAudience = configuration["Jwt:Audience"],
                        //IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["Jwt:Secret"])) // Symetric key lets the system know the same secret is used for both signing and verifying the JWT. Then encodes it into bytes
                        ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
                        ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET")))
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
            builder.Services.AddScoped<AuthenticationService>();
            builder.Services.AddScoped<IEmailSender, EmailSender>();
            //builder.Services.AddSingleton(sp => new OpenAIAPI(configuration["OPENAI_API_KEY"]));
            builder.Services.AddSingleton(sp => new OpenAIAPI(Environment.GetEnvironmentVariable("OPENAI_API_KEY")));
            builder.Services.AddScoped<UserProfileService>();



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
            app.UseStaticFiles();

            // Used for the controllers configuration
            app.UseRouting();

            // Add CORS (CHANGE BEFORE PRODUCTION - ONLY FOR TESTING!) Right now it allows access to any and all
            //app.UseCors(builder =>
            //{
            //    builder
            //          .WithOrigins("emplojdserver20240531231628.azurewebsites.net", "https://www.emplojdserver20240531231628.azurewebsites.net", "https://emplojdserver20240531231628.azurewebsites.net", "https://localhost:54686", "http://localhost:54687", "http://localhost:5173", "https://localhost:5173", "https://localhost:4173", "https://www.emplojd.com", "https://emplojd.com", "https://accounts.google.com", "https://accounts.google.com", "https://accounts.google.com/o/oauth2/v2/auth?client_id=613316498870-2cgo926gqmcqocdkiik4k0ht0vm60un1.apps.googleusercontent.com&scope=openid%20profile%20email&response_type=code&redirect_uri=https%3A%2F%2Femplojdserver20240531231628.azurewebsites.net%2Fsignin-google")
            //          .SetIsOriginAllowedToAllowWildcardSubdomains()
            //          .AllowAnyHeader()
            //          .AllowCredentials()
            //          .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS");
            //});


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {

            }

            app.UseSwagger();
            app.UseSwaggerUI();


            app.UseHttpsRedirection();


            // Apply the CORS policy
            app.UseCors("AllowEmplojdDomain");


            // Forces all api calls to use the JWT (token) to be authorized. (Unless specified).
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();




            // ENDPOINTS
            // Note: Don't forget to add ".RequireAuthorization()" to your endpoints! Without it you can access them without the token.

            // User account
            // .AllowAnonymous() to explicitly say that this doesn't require token auth
            app.MapPost("/login", UserService.LoginAsync).AllowAnonymous();
            app.MapPost("/create-account", UserService.CreateAccountAsync).AllowAnonymous();
            app.MapGet("/confirm-email", UserService.ConfirmEmailAsync).AllowAnonymous();
            app.MapPost("/resend-confirm-email", UserService.ResendEmailConfirmationAsync).AllowAnonymous();
            app.MapPost("/forgot-password", UserService.GeneratePasswordResetTokenAsync).AllowAnonymous();
            app.MapPost("/reset-password", UserService.ResetPasswordAsync).AllowAnonymous();
            app.MapDelete("/delete-account", UserService.DeleteAccountAsync).RequireAuthorization();

            // Is this even necessary anymore when we have /reset-password ??? - only difference with this one is it changed password without email verification
            //app.MapPost("/change-password", UserService.ChangePasswordAsync).RequireAuthorization();


            // Cover letter
            app.MapPost("/GetCoverLetter", ChatGPTService.GenerateLetterAsync).RequireAuthorization();
            app.MapGet("/saved-letter", ChatGPTService.GetCoverLettersAsync).RequireAuthorization();
            app.MapGet("/saved-letter/{coverLetterId}", ChatGPTService.GetCoverLetterAsync).RequireAuthorization();
            app.MapPost("/save-letter", ChatGPTService.SaveCoverLetterAsync).RequireAuthorization();
            app.MapDelete("/saved-letter", ChatGPTService.RemoveSavedCoverLettersAsync).RequireAuthorization();

            // JobAd search
            // Made the URI flexible to be able to omit parameters that aren't search from the query
            app.MapGet("/search", JobAdService.SearchJob).RequireAuthorization();
            app.MapGet("/ad/{adId}", JobAdService.GetJobFromId).RequireAuthorization();


            // JobAds Get/Save/Delete
            app.MapGet("/saved-ads", JobAdService.GetSavedJobAdsAsync).RequireAuthorization();
            app.MapPost("/save-ad", JobAdService.SaveJobAdAsync).RequireAuthorization();
            app.MapDelete("/saved-ad", JobAdService.RemoveSavedJobAdAsync).RequireAuthorization();



            app.Run();
        }
    }
}