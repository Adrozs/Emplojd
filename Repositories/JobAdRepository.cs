using ChasGPT_Backend.Data;
using ChasGPT_Backend.Exceptions.JobAdExceptions;
using ChasGPT_Backend.Models;
using ChasGPT_Backend.ViewModels;
using ChasGPT_Backend.ViewModels___DTOs.JobAds;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace ChasGPT_Backend.Repositories
{
    public interface IJobAdRepository
    {
        public Task<List<JobDto>> GetJobAdsAsync(string search, int? region, int? pageIndex);
        public Task<JobDto> GetJobAdFromIdAsync(int adId);
        public Task<JobChatGptDto> GetJobAdFromIdChatGptAsync(int jobId);
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
            string query = (region == null || region == 0) ? 
                $"{_apiBaseUri}search?q={search}&offset={pageIndex}&limit={_limit}" : 
                $"{_apiBaseUri}search?region={region}&q={search}&offset={pageIndex}&limit={_limit}";

        
            // Get request to the external API and ensure success
            string responseBody = await ExternalApiGetRequestAsync(query);

            try
            {
                JobSearchResultWrapper? result = JsonSerializer.Deserialize<JobSearchResultWrapper>(responseBody, _jsonOptions);

                return result.Jobs.ToList();
            }
            catch (JsonException ex)
            {
                throw new ExternalApiException("Failed to deserialize the API response", ex);
            }
        }

        public async Task<JobDto> GetJobAdFromIdAsync(int adId)
        {
            string query = $"{_apiBaseUri}ad/{adId}";

            // Get request to the external API and ensure success
            string responseBody = await ExternalApiGetRequestAsync(query);

            try
            {
                JobDto? result = JsonSerializer.Deserialize<JobDto>(responseBody, _jsonOptions);

                return result;
            }
            catch (JsonException ex)
            {
                throw new ExternalApiException("Failed to deserialize the API response", ex);
            }    
        }

        // Only returns the job title, description and id - used in our internal letter generator
        public async Task<JobChatGptDto> GetJobAdFromIdChatGptAsync(int jobId)
        {
            string query = $"{_apiBaseUri}ad/{jobId}";
            
            // Get request to the external API and ensure success
            string responseBody = await ExternalApiGetRequestAsync(query);

            try
            {
                JobChatGptDto? result = JsonSerializer.Deserialize<JobChatGptDto>(responseBody, _jsonOptions);

                return result;
            }
            catch (JsonException ex)
            {
                throw new ExternalApiException("Failed to deserialize the API response", ex);
            }
        }


        public async Task<List<SavedJobAdDto>> GetSavedJobAdsAsync(ClaimsPrincipal currentUser) 
        {
            User user = await GetUserAndJobAdsAsync(currentUser);

            List<SavedJobAdDto>? savedJobAds = user.SavedJobAds.Select(j => new SavedJobAdDto
            {
                PlatsbankenId = j.PlatsbankenJobId,
                Headline = j.Headline,
                Employer = new EmployerDto
                {
                    Name = j.Employer
                }
            }).ToList();

            return savedJobAds;
        }


        public async Task<bool> SaveJobAdAsync(SaveJobAdRequest request, ClaimsPrincipal currentUser)
        {
            User user = await GetUserAndJobAdsAsync(currentUser);

            if (user.SavedJobAds.Any(j => j.PlatsbankenJobId == request.PlatsbankenJobAdId))
                return false;


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
                throw new DbUpdateException("Failed to save the job ad.", ex);
            }
        }

        public async Task<bool> RemoveSavedJobAdAsync(int platsbankenJobAdId, ClaimsPrincipal currentUser)
        {
            User user = await GetUserAndJobAdsAsync(currentUser);

            JobAd? jobAd = user.SavedJobAds.FirstOrDefault(j => j.PlatsbankenJobId == platsbankenJobAdId);

            if (jobAd == null)
                return false;

            try
            {
                user.SavedJobAds.Remove(jobAd);
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw new DbUpdateException("Failed to remove the saved job ad.", ex);
            }
        }


        // Helper methods

        // Sends the API request to the external API uri send in and ensure success code
        private async Task<string> ExternalApiGetRequestAsync(string query)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(query);

            if (!response.IsSuccessStatusCode)
            {
                // Handle known status codes explicitly
                switch (response.StatusCode)
                {
                    // Handle 400 Bad Request
                    case System.Net.HttpStatusCode.BadRequest:
                        throw new ExternalApiException("Bad request to external API. Please check the query parameters.");
                    // Handle 404 Missing ad
                    case System.Net.HttpStatusCode.NotFound:
                        throw new ResourceNotFoundException("The requested job ad is not available.");
                    // Handle 429 Rate limit exceeded
                    case System.Net.HttpStatusCode.TooManyRequests:
                        throw new RateLimitExceededException("Rate limit exceeded. Please wait before sending more requests.");
                    // Handle 500 Internal Server Error
                    case System.Net.HttpStatusCode.InternalServerError:
                        throw new ExternalApiException("Internal server error at the external API.");
                    // Generic handler for any other unexpected status codes
                    default:
                        throw new ExternalApiException($"Unexpected status code: {response.StatusCode}");
                }
            }

            string responseBody = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(responseBody))
                throw new ExternalApiException("The Api response is null or empty.");

            return responseBody;
        }

        private async Task<User> GetUserAndJobAdsAsync(ClaimsPrincipal currentUser)
        {
            // Get the email from the JWT claims
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
                throw new UserNotFoundException("No email found in token claims.");

            // Get user along with its saved job ads
            User? user = await _context.Users
                .Include(u => u.SavedJobAds)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new UserNotFoundException("No matching user found with the provided email.");

            return user;
        }
    }
}
