using ChasGPT_Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ChasGPT_Backend.Services
{
    public class UserService
    {
        public async Task<IResult> CreateAccount(string email, string password, string passwordConfirm, [FromServices] IUserRepository userRepository)
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

        public async Task<IResult> VerifyLogin(string email, string password, [FromServices] IUserRepository userRepository)
        {
            try
            {
                bool success = await userRepository.VerifyLoginAsync(email, password);

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


        public async Task<IResult> ChangePassword(string email, string password, string newPassword, string newPasswordConfirm, [FromServices] IUserRepository userRepository)
        {
            try
            {
                bool success = await userRepository.ChangePasswordAsync(email, password, newPasswordConfirm, newPasswordConfirm);

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
