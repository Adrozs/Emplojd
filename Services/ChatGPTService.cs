using ChasGPT_Backend.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace ChasGPT_Backend.Services
{
    public class ChatGPTService
    {
        public static async Task<IResult> GenerateLetterAsync(int userId, int jobId, [FromQuery]int temperature, [FromQuery]bool job, [FromServices]IChatGPTRepository chatGPTRepository)
        {
            try
            {
                // Generate the personalized letter
                var letter = await chatGPTRepository.GenerateLetterAsync(userId, jobId, temperature, job);

                // Return the generated letter
                return Results.Ok(letter);
            }

            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            
            }

            
        }
    }
}
