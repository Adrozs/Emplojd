using ChasGPT_Backend.Models;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;

namespace ChasGPT_Backend.Repositories
{

    public interface IUserRepository
    {
        public Task<bool> CreateAccountAsync(string email, string password, string passwordConfirm);
        public Task<bool> VerifyLoginAsync(string email, string password);
        public Task<bool> ChangePasswordAsync(string email, string password, string newPassword, string newPasswordConfirm);
    }

    public class UserRepository : IUserRepository
    {
        // No dbContext needed atm as UserManager interacts with db for user management purposes
        // Might be needed to ad for other stuff not covered by UserManager - double check documentation before changing.

        private readonly UserManager<User> _userManager;

        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }


        public async Task<bool> CreateAccountAsync(string email, string password, string passwordConfirm)
        {
            if (password != passwordConfirm)
                throw new ArgumentException("Passwords do not match.");

            User user = new User
            {
                UserName = email,
                Email = email
            };

            // Creates and hashes password for user in db - All MS Identity methods have build it validation and error handling
            IdentityResult result = await _userManager.CreateAsync(user, password);

            // If the creation didn't succeeded throw exception with details as to why
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to create account: " + string.Join(", ", result.Errors.Select(e => e.Description)));

            }

            return result.Succeeded;
        }

        public async Task<bool> VerifyLoginAsync(string email, string password)
        {
            User user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new InvalidOperationException("No matching user found.");

            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<bool> ChangePasswordAsync(string email, string password, string newPassword, string newPasswordConfirm)
        {
            User user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new InvalidOperationException("No matching user found");

            // Check if current password is correct and if yes change to the new password
            IdentityResult result = await _userManager.ChangePasswordAsync(user, password, newPassword);

            // If the result wasn't successful throw exception with details as to why
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to change password: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return result.Succeeded;
        }
    }
}
