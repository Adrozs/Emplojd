using ChasGPT_Backend.Repositories;

namespace ChasGPT_Backend.Services
{
    public class UserService
    {
        public static async Task<IResult> CreateAccount(string email, string password, string passwordConfirm, IUserRepository userRepository)
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

        public static async Task<IResult> VerifyLogin(string email, string password, IUserRepository userRepository)
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


        public static async Task<IResult> ChangePassword(string email, string password, string newPassword, string newPasswordConfirm, IUserRepository userRepository)
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
