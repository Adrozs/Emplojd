using Emplojd.Helpers;
using Emplojd.Repositories;
using Emplojd.ViewModels;
using Emplojd.ViewModels___DTOs.JobAds;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace Emplojd.Services
{
    public class JobAdService
    {
        public static async Task<IResult> SearchJob([FromServices] IJobAdRepository jobAdRepository, [FromQuery] string search, [FromQuery] int? region, [FromQuery] int page = 1)
        {
            try
            {
                List<JobDto> result = await jobAdRepository.GetJobAdsAsync(search, region, page);

                if (result.Count == 0)
                    return Results.NotFound("No job ads matching search found.");

                return Results.Json(result);
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }

        public static async Task<IResult> GetJobFromId([FromQuery] int adId, [FromServices] IJobAdRepository jobAdRepository)
        {
            try
            {
                JobDto result = await jobAdRepository.GetJobAdFromIdAsync(adId);

                if (result == null)
                    return Results.NotFound($"No job ad with id \"{adId}\" was found");
       
               return Results.Json(result);
                
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }
        

        public static async Task<JobChatGptDto> GetJobAdFromIdChatGpt(int jobId, IJobAdRepository jobAdRepository)
        {
            try
            {
                // Returns the JobAd if found or null if no matching ad was found
                return await jobAdRepository.GetJobAdFromIdChatGptAsync(jobId);
            }
            catch (Exception)
            {
                // If an exception occurred rethrow the error to the method calling it for it to handle.
                throw;
            }
        }


        public static async Task<IResult> GetSavedJobAdsAsync(ClaimsPrincipal currentUser, [FromServices] IJobAdRepository jobAdRepository)
        {
            try
            {
                List<SavedJobAdDto> jobAds = await jobAdRepository.GetSavedJobAdsAsync(currentUser);

                if (jobAds.Count == 0)
                    return Results.NotFound("No saved job ads were found.");

                return Results.Json(jobAds);

            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
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
                    return Results.Problem("User has already saved this job ad.");

                return Results.Ok("Job ad successfully saved.");

            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
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
                    return Results.Problem("User has not saved this job ad.");

                return Results.Ok("Job ad successfully removed.");

            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }
    }
}
