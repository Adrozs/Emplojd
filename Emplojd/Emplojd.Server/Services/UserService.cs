using Emplojd.Helpers;
﻿using Emplojd.Repository;
﻿using Azure.Core;
using Emplojd.Repositories;
using Emplojd.ViewModels___DTOs;
using Emplojd.ViewModels___DTOs.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Emplojd.Server.ViewModels___DTOs.Account;
using System.Security.Claims;

namespace Emplojd.Services
{
    public class UserService
    {
        public static async Task<IResult> CreateAccountAsync([FromBody] CreateAccountRequestDto request, [FromServices] IUserRepository userRepository)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.EmailConfirmed) || string.IsNullOrEmpty(request.Password) || string.IsNullOrEmpty(request.PasswordConfirmed))
                return Results.BadRequest("Invalid request data. Account credentials can't be empty.");

            try
            {
                IdentityResult result = await userRepository.CreateAccountAsync(request.Email, request.EmailConfirmed, request.Password, request.PasswordConfirmed);

                // Returns status code and message depending on result value
                return ResultHandler.HandleIdentityResult(result, "Account successfully created. Please check your email to verify your account.", "Failed to create account:");
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }

        public static async Task<IResult> LoginAsync([FromBody] LoginRequestDto request, [FromServices] IUserRepository userRepository)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return Results.BadRequest("Invalid request data. Login credentials can't be empty.");

            try
            {
                LoginResult result = await userRepository.LoginAsync(request.Email, request.Password);

                if (result.Success)
                    return Results.Ok(new { result.Token });
                else
                    return Results.BadRequest($"Failed to login: {result.ErrorMessage}");
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
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
                IdentityResult result = await userRepository.EmailVerificationAsync(userId, code);

                // Returns status code and message depending on result value
                return ResultHandler.HandleIdentityResult(result, "Email successfully confirmed.", "Failed to confirm email.");
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }

        public static async Task<IResult> GeneratePasswordResetTokenAsync([FromBody] GeneratePasswordResetTokenRequest request, [FromServices] IUserRepository userRepository)
        {
            try
            {
                IdentityResult result = await userRepository.GeneratePasswordResetCodeAsync(request.Email);

                // Returns status code and message depending on result value
                return ResultHandler.HandleIdentityResult(result, "Password reset email successfully sent.", "Failed to send reset email:");
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }
        public static async Task<IResult> ResetPasswordAsync([FromQuery] string userId, [FromQuery] string code, ResetPasswordRequest request, [FromServices] IUserRepository userRepository)
        {
            try
            {
                IdentityResult result = await userRepository.ResetPasswordAsync(userId, code, request.NewPassword, request.NewPasswordConfirm);

                // Returns status code and message depending on result value
                return ResultHandler.HandleIdentityResult(result, "Password successfully changed.", "Failed to change password:");
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }
        }

        public static async Task<IResult> DeleteAccountAsync([FromBody] DeleteAccountRequest request, [FromServices] IUserRepository userRepository, ClaimsPrincipal currentUser)
        {
            try
            {
                IdentityResult result = await userRepository.DeleteAccountAsync(request.Password, currentUser);    

                return ResultHandler.HandleIdentityResult(result, "Account successfully deleted.", "Failed to delete account:");
            }
            catch (Exception ex)
            {
                return ExceptionHandler.HandleException(ex);
            }

        }
    }
}
