using ChasGPT_Backend.Data;
using ChasGPT_Backend.Models;
using ChasGPT_Backend.ViewModels;
using ChasGPT_Backend.ViewModels___DTOs.JobAds;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text.Json;

namespace ChasGPT_Backend.Repositories
{
    public interface IJobAdRepository
    {
        public Task<List<JobDto>> GetJobAdsAsync(string search, int? region, int? pageIndex);
        public Task<JobDto> GetJobAdFromIdAsync(int adId);
        public  Task<JobChatGptDto> GetJobAdFromIdChatGptAsync(int jobId);
        public Task<List<SavedJobAdDto>> GetSavedJobAdsAsync(ClaimsPrincipal currentUser);
        public Task<bool> SaveJobAdAsync(SaveJobAdRequest request, ClaimsPrincipal currentUser);
        public Task<bool> RemoveSavedJobAdAsync(int platsbankenJobAdId, ClaimsPrincipal currentUser);
    }

    public class JobAdRepository : IJobAdRepository
    {
        private HttpClient _httpClient = new HttpClient();
        private string _apiBaseUri = "https://jobsearch.api.jobtechdev.se/";
        private int _limit = 25; // Search results
        private readonly ApplicationContext _context;

        // Make sure that the deserializer ignores casing 
        private JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public JobAdRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<JobDto>> GetJobAdsAsync(string search, int? region, int? pageIndex)
        {
            // If region isn't inputted omit it from the search query
            string query = (region == null) ? 
                $"{_apiBaseUri}search?q={search}&offset={pageIndex}&limit={_limit}" : 
                $"{_apiBaseUri}search?region={region}&q={search}&offset={pageIndex}&limit={_limit}";

        
            // Get request to the external API and ensure success
            string responseBody = await ExternalApiGetRequestAsync(query);

            JobSearchResultWrapper result = JsonSerializer.Deserialize<JobSearchResultWrapper>(responseBody, _jsonOptions);

            if (result == null)
                throw new JsonException("Failed to deserialize the API response.");

            // Tries to convert the response to a list and if either the response or the list is null it returns an empty list
            return result?.Jobs.ToList() ?? new List<JobDto>();
        }

        public async Task<JobDto> GetJobAdFromIdAsync(int adId)
        {
            string query = $"{_apiBaseUri}ad/{adId}";

                // Get request to the external API and ensure success
                string responseBody = await ExternalApiGetRequestAsync(query);

                JobDto result = JsonSerializer.Deserialize<JobDto>(responseBody, _jsonOptions);

                if (result == null)
                    throw new JsonException("Failed to deserialize the API response");

                return result ?? new JobDto(); 
        }

        // Only returns the job title, description and id - used in our internal letter generator
        public async Task<JobChatGptDto> GetJobAdFromIdChatGptAsync(int jobId)
        {
            string query = $"{_apiBaseUri}ad/{jobId}";

            try
            {
                // Get request to the external API and ensure success
                string responseBody = await ExternalApiGetRequestAsync(query);

                JobChatGptDto result = JsonSerializer.Deserialize<JobChatGptDto>(responseBody, _jsonOptions);

                if (result == null)
                    throw new InvalidOperationException("Failed to deserialize the API response");

                return result ?? new JobChatGptDto();
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Request error: {ex.Message}");
                return new JobChatGptDto();
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"JSON parsing error: {ex.Message}");
                return new JobChatGptDto();
            }
        }

        // Sends the API request to the external API uri send in and ensure success code
        private async Task<string> ExternalApiGetRequestAsync(string query)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(query);
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody))
                throw new InvalidOperationException("The Api response is null or empty.");

            return responseBody;
        }


        public async Task<List<SavedJobAdDto>> GetSavedJobAdsAsync(ClaimsPrincipal currentUser)
        {
            // Get the email from the JWT claims
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
                throw new InvalidOperationException("No email found in token claims.");

            // Get user along with its saved job ads
            User? user = await _context.Users
                .Include(u => u.SavedJobAds)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new InvalidOperationException("No matching user found.");


            List<SavedJobAdDto>? savedJobAds = user.SavedJobAds.Select(j => new SavedJobAdDto
            {
                PlatsbankenId = j.PlatsbankenJobId,
                Headline = j.Headline,
                Employer = new EmployerDto
                {
                    Name = j.Employer
                }
            }).ToList();

            if (savedJobAds.Count == 0)
                throw new InvalidOperationException("Did not find any saved job ads.");

            return savedJobAds;
        }


        public async Task<bool> SaveJobAdAsync(SaveJobAdRequest request, ClaimsPrincipal currentUser)
        {
            // Get the email from the JWT claims
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
                throw new InvalidOperationException("No email found in token claims.");

            // Get user along with its saved job ads
            User? user = await _context.Users
                .Include(u => u.SavedJobAds)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new InvalidOperationException("No matching user found.");


            if (user.SavedJobAds.Any(j => j.PlatsbankenJobId == request.PlatsbankenJobAdId))
                throw new InvalidOperationException("User has already saved this job ad.");


            JobAd jobAd = new JobAd
            {
                PlatsbankenJobId = request.PlatsbankenJobAdId,
                Headline = request.Headline,
                Employer = request.Employer,
            };


            try
            {
                user.SavedJobAds.Add(jobAd);
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to save the job ad.", ex);
            }
        }

        public async Task<bool> RemoveSavedJobAdAsync(int platsbankenJobAdId, ClaimsPrincipal currentUser)
        {
            // Get the email from the JWT claims
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
                throw new InvalidOperationException("No email found in token claims.");

            // Get user along with its saved job ads
            User? user = await _context.Users
                .Include(u => u.SavedJobAds)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new InvalidOperationException("No matching user found.");
            

            JobAd? jobAd = user.SavedJobAds.FirstOrDefault(j => j.PlatsbankenJobId == platsbankenJobAdId);

            if (jobAd == null)
                throw new InvalidOperationException("User has not saved this job ad.");

            try
            {
                user.SavedJobAds.Remove(jobAd);
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to remove the saved job ad.", ex);
            }
        }
    }
}
