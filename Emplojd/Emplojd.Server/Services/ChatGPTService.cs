using Emplojd.Helpers;
using Emplojd.Models;
using Emplojd.Repositories;
using Emplojd.Server.ViewModels___DTOs.CoverLetter;
using Emplojd.ViewModels___DTOs.JobAds;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Security.Claims;

namespace Emplojd.Services
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

        public static async Task<IResult> GetCoverLettersAsync(ClaimsPrincipal currentUser, [FromServices] IChatGPTRepository chatGptRepository)
        {
            try
            {
                List<SavedCoverLetterDto> coverLetters = await chatGptRepository.GetSavedCoverLettersAsync(currentUser);

                if (coverLetters.Count == 0)
                    return Results.NotFound("No saved cover letters were found.");

                return Results.Json(coverLetters);
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }

        public static async Task<IResult> SaveCoverLetterAsync([FromBody] SaveCoverLetterRequest request, ClaimsPrincipal currentUser, [FromServices] IChatGPTRepository chatGptRepository)
        {
            if (string.IsNullOrEmpty(request.CoverLetterText) || request.Temperature == 0)
                return Results.BadRequest("Invalid request data. All cover letter fields must be filled out.");

            try
            {
                CoverLetterResult result = await chatGptRepository.SaveCoverLetterAsync(request, currentUser);

                return ResultHandler.HandleCoverLetterResult(result, "Successfully saved cover letter", "Failed to save cover letter:");
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }

        public static async Task<IResult> RemoveSavedCoverLettersAsync([FromBody] RemoveCoverLetterRequest request, ClaimsPrincipal currentUser, [FromServices] IChatGPTRepository chatGptRepository)
        {
            if (request.CoverLetterId == 0)
                return Results.BadRequest("Invalid request data. Missing id.");

            try
            {
                CoverLetterResult result = await chatGptRepository.RemoveSavedCoverLettersAsync(request, currentUser);

                return ResultHandler.HandleCoverLetterResult(result, "Successfully removed cover letter", "Failed to remove cover letter:");
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }
    }
}
