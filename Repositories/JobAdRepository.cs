using ChasGPT_Backend.ViewModels;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace ChasGPT_Backend.Repositories
{
    public interface IJobAdRepository
    {
        public Task<List<JobDto>> GetJobAds(string search, int? region, int? offset);
        public Task<JobDto> GetJobAdFromId(int jobId);
        public  Task<JobChatGptDto> GetJobAdFromIdChatGpt(int jobId);

    }

    public class JobAdRepository : IJobAdRepository
    {
        private HttpClient _httpClient = new HttpClient();
        private int _limit = 25;
        private string _apiBaseUri = "https://jobsearch.api.jobtechdev.se/";

        // Make sure that the deserializer ignores casing 
        private JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public async Task<List<JobDto>> GetJobAds(string search, int? region, int? offset)
        {
            if (offset == null)
                offset = 0;

            // If region isn't inputted omit it from the search query
            string query = (region == null) ? 
                $"{_apiBaseUri}search?q={search}&offset={offset}&limit={_limit}" : 
                $"{_apiBaseUri}search?region={region}&q={search}&offset={offset}&limit={_limit}";

            try
            {
                // Get request to the external API and ensure success
                string responseBody = await ExternalApiGetRequestAsync(query);

                JobSearchResultWrapper result = JsonSerializer.Deserialize<JobSearchResultWrapper>(responseBody, _jsonOptions);

                if (result == null)
                    throw new InvalidOperationException("Failed to deserialize the API response");

                // Tries to convert the response to a list and if either the response or the list is null it returns an empty list
                return result?.Jobs.ToList() ?? new List<JobDto>();
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Request error: {ex.Message}");
                return new List<JobDto>();
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"JSON parsing error: {ex.Message}");
                return new List<JobDto>();
            }
        }

        public async Task<JobDto> GetJobAdFromId(int jobId)
        {
            string query = $"{_apiBaseUri}ad/{jobId}";

            try
            {
                // Get request to the external API and ensure success
                string responseBody = await ExternalApiGetRequestAsync(query);

                JobDto result = JsonSerializer.Deserialize<JobDto>(responseBody, _jsonOptions);

                if (result == null)
                    throw new InvalidOperationException("Failed to deserialize the API response");

                return result ?? new JobDto(); 
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Request error: {ex.Message}");
                return new JobDto();
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"JSON parsing error: {ex.Message}");
                return new JobDto();
            }
        }

        // Only returns the job title, description and id - used in our internal letter generator
        public async Task<JobChatGptDto> GetJobAdFromIdChatGpt(int jobId)
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
                throw new InvalidOperationException("The Api response is empty or null");

            return responseBody;
        }
    }
}
