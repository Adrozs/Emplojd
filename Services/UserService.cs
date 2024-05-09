using Azure.Core;
using ChasGPT_Backend.Repositories;
using ChasGPT_Backend.ViewModels___DTOs;
using ChasGPT_Backend.ViewModels___DTOs.Account;
using Microsoft.AspNetCore.Mvc;

namespace ChasGPT_Backend.Services
{
    public class UserService
    {
        public static async Task<IResult> CreateAccountAsync([FromBody] CreateAccountRequestDto request, [FromServices] IUserRepository userRepository)
        {
            try
            {
                if (request == null)
                    return Results.BadRequest("Invalid request data.");

                bool success = await userRepository.CreateAccountAsync(request.Email, request.EmailConfirmed, request.Password, request.PasswordConfirmed); 
                
                if (success)
                    return Results.Ok("Account successfully created. Please check your email to verify your account.");
                else
                    return Results.BadRequest("Something went wrong while trying to create the account");
            }
            // Known issues exceptions
            catch (InvalidOperationException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized);
            }
            catch (ArgumentException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest);
            }
            // Generic unpredicted exceptions
            catch (Exception ex)
            {
                return Results.Problem("An unexpected error occurred.", ex.Message);
            }
        }

        public static async Task<IResult> LoginAsync([FromBody] LoginRequestDto request, [FromServices] IUserRepository userRepository)
        {
            try
            {
                if (request == null)
                    return Results.BadRequest("Invalid request data.");

                string token = await userRepository.LoginAsync(request.Email, request.Password);
                return Results.Ok(new { Token = token });

            }
            // Known issues exceptions
            catch (InvalidOperationException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized);
            }
            catch (ArgumentException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest);
            }
            // Generic unpredicted exceptions
            catch (Exception ex) 
            {
                return Results.Problem("An unexpected error occurred.", ex.Message);
            }
        }

        // Commented away as is it even necessary? 
        //public static async Task<IResult> ChangePasswordAsync([FromBody] ChangePasswordRequestDto request, [FromServices] IUserRepository userRepository, HttpContext httpContext)
        //{
        //    try
        //    {
        //        if (request == null)
        //            return Results.BadRequest("Invalid request data.");

        //        bool success = await userRepository.ChangePasswordAsync(request.CurrentPassword, request.NewPassword, request.NewPasswordConfirm, httpContext.User);

        //        if (success)
        //        {
        //            return Results.Ok("Password successfully changed.");
        //        }
        //        else
        //        {
        //            return Results.BadRequest("Failed to change password.");
        //        }
        //    }
        //    // Known issues exceptions
        //    catch (InvalidOperationException ex)
        //    {
        //        return Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest);
        //    }
        //    // Generic unpredicted exceptions
        //    catch (Exception ex)
        //    {
        //        return Results.Problem("An unexpected error occurred.", ex.Message);
        //    }
        //}

        public static async Task<IResult> EmailVerificationAsync([FromQuery] string userId, [FromQuery] string code, [FromServices] IUserRepository userRepository)
        {
            try 
            {
                bool success = await userRepository.EmailVerificationAsync(userId, code);

                if (success)
                    return Results.Ok("Email successfully confirmed.");
                else
                    return Results.BadRequest("Failed to confirm email.");
            }
            // Known issues exceptions
            catch (ArgumentException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest);
            }
            // Generic unpredicted exceptions
            catch (Exception ex)
            {
                return Results.Problem("An unexpected error occurred.", ex.Message);
            }
        }

        public static async Task<IResult> GeneratePasswordResetTokenAsync([FromBody] GeneratePasswordResetTokenRequest request, [FromServices] IUserRepository userRepository)
        {
            try
            {
                bool success = await userRepository.GeneratePasswordResetCodeAsync(request.Email);

                if (success)
                    return Results.Ok("Password reset email successfully sent.");
                else
                    return Results.BadRequest("Something went wrong trying to send the email or generate reset token.");
            }
            // Known issues exceptions
            catch (ArgumentException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest);
            }
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
        public static async Task<IResult> ResetPasswordAsync([FromQuery] string userId, [FromQuery] string code, ResetPasswordRequest request, [FromServices] IUserRepository userRepository)
        {
            try
            {
                bool success = await userRepository.ResetPasswordAsync(userId, code, request.NewPassword, request.NewPasswordConfirm);

                if (success)
                    return Results.Ok("Password successfully changed.");
                else
                    return Results.BadRequest("Failed to change password.");
            }
            // Known issues exceptions
            catch (ArgumentException ex)
            {
                return Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest);
            }
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
