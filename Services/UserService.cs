using ChasGPT_Backend.Repositories;
using ChasGPT_Backend.ViewModels___DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ChasGPT_Backend.Services
{
    public class UserService
    {
        public static async Task<IResult> CreateAccountAsync([FromBody] CreateAccountRequestDto  createAccReq, [FromServices] IUserRepository userRepository)
        {
            try
            {
                if (createAccReq == null)
                    return Results.BadRequest("Invalid request data.");

                bool success = await userRepository.CreateAccountAsync(createAccReq.Email, createAccReq.EmailConfirmed, createAccReq.Password, createAccReq.PasswordConfirmed); 
                
                if (success)
                {
                    return Results.Ok("Account successfully created.");
                }
                else
                {
                    return Results.BadRequest("Something went wrong while trying to create the account");
                }
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

        public static async Task<IResult> LoginAsync([FromBody] LoginRequestDto loginReq, [FromServices] IUserRepository userRepository)
        {
            try
            {
                if (loginReq == null)
                    return Results.BadRequest("Invalid request data.");

                string token = await userRepository.LoginAsync(loginReq.Email, loginReq.Password);
                return Results.Ok(new { Token = token });

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

        public static async Task<IResult> ChangePasswordAsync([FromBody] ChangePasswordRequestDto changePassReq, [FromServices] IUserRepository userRepository)
        {
            try
            {
                if (changePassReq == null)
                    return Results.BadRequest("Invalid request data.");

                bool success = await userRepository.ChangePasswordAsync(changePassReq.Email, changePassReq.Password, changePassReq.NewPassword, changePassReq.NewPasswordConfirm);

                if (success)
                {
                    return Results.Ok("Password successfully changed.");
                }
                else
                {
                    return Results.BadRequest("Failed to change password.");
                }
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
