using Emplojd.Exceptions;
using Newtonsoft.Json;

namespace Emplojd.Helpers
{
    public static class ExceptionHandler
    {
        public static IResult HandleException(Exception ex)
        {
            // Put ILogger here when implemented 
            // Example logger code:
            // logger.LogError(ex, "Handling exception of type {ExceptionType}", ex.GetType().Name);


            // Handle our own custom exceptions
            if (ex is ApiException apiEx)
            {
                return apiEx.ToActionResult();
            }

            // Handle other exceptions that don't follow our own exception pattern in ApiException
            switch (ex)
            {
                case ArgumentException argEx:
                    return Results.BadRequest($"Argument error: {argEx.Message}");
                case JsonException jsonEx:
                    return Results.BadRequest($"JSON parsing error: {jsonEx.Message}");
                case HttpRequestException httpEx:
                    return Results.Problem($"Request error: {httpEx.Message}", statusCode: StatusCodes.Status503ServiceUnavailable);
                case InvalidOperationException invalidOpEx:
                    return Results.Problem(invalidOpEx.Message, statusCode: StatusCodes.Status400BadRequest);
                default:
                    // Log unexpected exceptions and return a generic error response
                    // Log.Error(ex, "Unexpected error occurred.");
                    return Results.Problem("An unexpected error occurred.", ex.Message, statusCode: StatusCodes.Status500InternalServerError);
            }
        }
    }
}
