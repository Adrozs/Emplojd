using ChasGPT_Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ChasGPT_Backend.Services
{
    public class UserService
    {
        public static async Task<IResult> CreateAccountAsync([FromQuery] string email, [FromQuery] string password, [FromQuery] string passwordConfirm, [FromServices] IUserRepository userRepository)
        {
            try
            {
                bool success = await userRepository.CreateAccountAsync(email, password, passwordConfirm); 
                
                if (success)
                {
                    return Results.Ok("Account successfully created.");
                }
                else
                {
                    return Results.BadRequest("Failed to create account");
                }
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

        public static async Task<IResult> LoginAsync([FromQuery] string email, [FromQuery] string password, [FromServices] IUserRepository userRepository)
        {
            try
            {
                bool success = await userRepository.LoginAsync(email, password);

                if (success) 
                {
                    return Results.Ok("Login credentials match.");
                }
                else
                {
                    return Results.BadRequest("Wrong login credentials.");
                }
            }
            catch (Exception ex) 
            {
                return Results.BadRequest(ex.Message);
            }
        }


        public static async Task<IResult> ChangePasswordAsync(string email, [FromQuery] string password, string newPassword, [FromQuery] string newPasswordConfirm, [FromServices] IUserRepository userRepository)
        {
            try
            {
                bool success = await userRepository.ChangePasswordAsync(email, password, newPassword, newPasswordConfirm);

                if (success)
                {
                    return Results.Ok("Password successfully changed.");
                }
                else
                {
                    return Results.BadRequest("Failed to change password.");
                }
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }
    }
}
