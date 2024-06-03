using Emplojd.Server.ResultObjects;
using Microsoft.AspNetCore.Identity;

namespace Emplojd.Helpers
{
    public class ResultHandler
    {
        public static IResult HandleIdentityResult(IdentityResult result, string successMessage, string failMessage)
        {
            if (result.Succeeded)
            {
                return Results.Ok(successMessage);
            }
            else
            {
                var errors = string.Join(",", result.Errors.Select(e => e.Description));
                return Results.BadRequest($"{failMessage} {errors}");
            }
        }
        
        public static IResult HandleCoverLetterResult(CoverLetterResult result, string successMessage, string failMessage)
        {
            if (result.Success)
            {
                return Results.Ok(successMessage);
            }
            else
            {
                var errors = string.Join(",", result.ErrorMessage);
                return Results.BadRequest($"{failMessage} {errors}");
            }
        }
    }
}
