using ChasGPT_Backend.Repositories;
using ChasGPT_Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ChasGPT_Backend.Services
{
    public class JobAdService
    {
        public static async Task<IResult> SearchJob([FromQuery] string search, [FromQuery] int? region, [FromQuery] int? pageIndex, [FromServices] IJobAdRepository jobAdRepository)
        {
            try
            {
                List<JobDto> result = await jobAdRepository.GetJobAds(search, region, pageIndex);

                // If there are 0 things in the result we got no results so return 204 NoContent
                if (result.Count == 0)
                    return Results.NoContent();
                
                return Results.Json(result);
            }
            // Known issues exceptions
            catch (InvalidOperationException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized);
            }
            catch (HttpRequestException ex)
            {
                return Results.Problem("Request error:", ex.Message);
            }
            catch (JsonException ex)
            {
                return Results.Problem("JSON parsing error:", ex.Message);
            }
            // Generic unpredicted exceptions
            catch (Exception ex)
            {
                return Results.Problem("An unexpected error occurred.", ex.Message);
            }

        }

        public static async Task<IResult> GetJobFromId([FromQuery] int adId, [FromServices] IJobAdRepository jobAdRepository)
        {
            try
            {
                JobDto result = await jobAdRepository.GetJobAdFromId(adId);

                // If there are 0 things in the result we got no results so return 204 NoContent
                if (result == null)
                    return Results.NoContent();
       
               return Results.Json(result);
                
            }
            // Known issues exceptions
            catch (InvalidOperationException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized);
            }
            catch (HttpRequestException ex)
            {
                return Results.Problem("Request error:", ex.Message);
            }
            catch (JsonException ex)
            {
                return Results.Problem("JSON parsing error:", ex.Message);
            }
            // Generic unpredicted exceptions
            catch (Exception ex)
            {
                return Results.Problem("An unexpected error occurred.", ex.Message);
            }
        }
        

        // Only to be used within the program - not an endpoint!
        public static async Task<JobChatGptDto> GetJobAdFromIdChatGpt(int jobId, IJobAdRepository jobAdRepository)
        {
            JobChatGptDto jobAd = new JobChatGptDto();
            try
            {
                // Returns the object or null
                jobAd = await jobAdRepository.GetJobAdFromIdChatGpt(jobId);
            }
            // Known issues exceptions
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"Invalid operation: {ex.Message} \nInner exception: {ex.InnerException} \nSource: {ex.Source}");
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Request error: {ex.Message} \nInner exception: {ex.InnerException} \nSource: {ex.Source}");
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"JSON parsing error: {ex.Message} \nInner exception: {ex.InnerException} \nSource: {ex.Source}");
            }
            // Generic unpredicted exceptions
            catch (Exception ex)
            {
                Console.WriteLine($"An unexpected error occurred: {ex.Message} \nInner exception: {ex.InnerException} \nSource: {ex.Source}");
            }

            return jobAd;
        }
    }
}
