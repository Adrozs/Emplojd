using ChasGPT_Backend.Repositories;
using ChasGPT_Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ChasGPT_Backend.Services
{
    public class JobAdService
    {
        public static async Task<IResult> SearchJob([FromQuery] string search, [FromQuery] int? region, [FromQuery] int? offset, [FromServices] IJobAdRepository jobAdRepository)
        {
            try
            {
                List<JobDto> result = await jobAdRepository.GetJobAds(search, region, offset);

                // If there are 0 things in the result we got no results so return 204 NoContent
                if (result.Count == 0)
                {
                    return Results.NoContent();
                }
                else
                {
                    return Results.Json(result);
                }
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }

        }

        public static async Task<IResult> GetJobFromId([FromQuery] int jobId, [FromServices] IJobAdRepository jobAdRepository)
        {
            try
            {
                JobDto result = await jobAdRepository.GetJobAdFromId(jobId);

                // If there are 0 things in the result we got no results so return 204 NoContent
                if (result == null)
                {
                    return Results.NoContent();
                }
                else
                {
                    return Results.Json(result);
                }
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }
        

        // Only to be used within the program - not an endpoint!
        public static async Task<JobChatGptDto> GetJobAdFromIdChatGpt([FromQuery] int jobId, [FromServices] IJobAdRepository jobAdRepository)
        {
            // Error handling? Try/Catch?


            // Returns the object or null
            return await jobAdRepository.GetJobAdFromIdChatGpt(jobId);
        }
    }
}
