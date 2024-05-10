using ChasGPT_Backend.Repositories;
using ChasGPT_Backend.ViewModels;
using ChasGPT_Backend.ViewModels___DTOs.JobAds;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace ChasGPT_Backend.Services
{
    public class JobAdService
    {
        public static async Task<IResult> SearchJob([FromQuery] string search, [FromQuery] int? region, [FromQuery] int? pageIndex, [FromServices] IJobAdRepository jobAdRepository)
        {
            try
            {
                List<JobDto> result = await jobAdRepository.GetJobAdsAsync(search, region, pageIndex);

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
                JobDto result = await jobAdRepository.GetJobAdFromIdAsync(adId);

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
        

        public static async Task<JobChatGptDto> GetJobAdFromIdChatGpt(int jobId, IJobAdRepository jobAdRepository)
        {
            JobChatGptDto jobAd = new JobChatGptDto();
            try
            {
                // Returns the object or null
                jobAd = await jobAdRepository.GetJobAdFromIdChatGptAsync(jobId);
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


        public static async Task<IResult> GetSavedJobAdsAsync(ClaimsPrincipal currentUser, [FromServices] IJobAdRepository jobAdRepository)
        {
            try
            {
                List<SavedJobAdDto> jobAds = await jobAdRepository.GetSavedJobAdsAsync(currentUser);

                // If there are 0 things in the result we got no results so return 204 NoContent
                if (jobAds == null)
                    return Results.NoContent();

                return Results.Json(jobAds);

            }
            // Known issues exceptions
            catch (InvalidOperationException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized);
            }
            // Generic unpredicted exceptions
            catch (Exception ex)
            {
                return Results.Problem("An unexpected error occurred.", ex.Message);
            }
        }

        public static async Task<IResult> SaveJobAdAsync([FromBody] SaveJobAdRequest request, ClaimsPrincipal currentUser, [FromServices] IJobAdRepository jobAdRepository)
        {
            if (request.PlatsbankenJobAdId == 0 || string.IsNullOrEmpty(request.Headline) || string.IsNullOrEmpty(request.Employer))
                return Results.BadRequest("Invalid request data. All job ad fields must be filled out.");

            try
            {
                bool result = await jobAdRepository.SaveJobAdAsync(request, currentUser);

                if (!result)
                    return Results.Problem("Something went wrong trying to save the job ad.");

                return Results.Ok("Job ad successfully saved.");

            }
            // Known issues exceptions
            catch (InvalidOperationException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized);
            }
            // Generic unpredicted exceptions
            catch (Exception ex)
            {
                return Results.Problem("An unexpected error occurred.", ex.Message);
            }
        }

        public static async Task<IResult> RemoveSavedJobAdAsync([FromBody] RemoveJobAdRequest request, ClaimsPrincipal currentUser, [FromServices] IJobAdRepository jobAdRepository)
        {
            if (request.PlatsbankenJobAdId == 0)
                return Results.BadRequest("Invalid request data. All job ad fields must be filled out.");

            try
            {
                bool result = await jobAdRepository.RemoveSavedJobAdAsync(request.PlatsbankenJobAdId, currentUser);

                if (!result)
                    return Results.Problem("Something went wrong trying to remove the saved job ad.");

                return Results.Ok("Job ad successfully removed.");

            }
            // Known issues exceptions
            catch (InvalidOperationException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized);
            }
            // Generic unpredicted exceptions
            catch (Exception ex)
            {
                return Results.Problem("An unexpected error occurred.", ex.Message);
            }
        }
    }
}
