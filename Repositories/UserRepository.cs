using ChasGPT_Backend.Models;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;

namespace ChasGPT_Backend.Repository
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
        // Might be needed to ad for other stuff not covered by UserManager - float check documentation before changing.

        private readonly UserManager<User> _userManager;

        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }


        public async Task<bool> CreateAccountAsync(string email, string password, string passwordConfirm)
        {
            // Check login details and throw exceptions if wrong
            await ValidateLoginDetailsAsync(email, password, passwordConfirm);

            User user = new User
            {
                UserName = email,
                Email = email
            };

            // Creates and hashes password for user in db
            IdentityResult result = await _userManager.CreateAsync(user, password);

            // If the creation didn't succeeded throw exception with details as to why
            if (!result.Succeeded)
            {
                throw new ArgumentException("Failed to create account: " + string.Join(", ", result.Errors.Select(e => e.Description)));

            }

            return result.Succeeded;
        }

        public async Task<bool> VerifyLoginAsync(string email, string password)
        {
            // Check login details and throw exceptions if wrong
            await ValidateLoginDetailsAsync(email, password);

            User user = await GetExistingUser(email);

            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<bool> ChangePasswordAsync(string email, string password, string newPassword, string newPasswordConfirm)
        {
            // Validate new passwords. Throw exceptions if something's not up to standard
            ValidatePasswordChange(newPassword, newPasswordConfirm);

            User user = await GetExistingUser(email);

            // Check if current password is correct and if yes change to the new password
            IdentityResult result = await _userManager.ChangePasswordAsync(user, password, newPassword);

            // If the result wasn't successful throw exception with details as to why
            if (!result.Succeeded)
            {
                throw new ArgumentException("Failed to change password: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return true;
        }

        private async Task<User> GetExistingUser(string email)
        {
            // Return user if found, else throw exception
            User user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                throw new ArgumentException("No matching user found.");

            return user;
        }


        // Login validation below

        private async Task ValidateLoginDetailsAsync(string email, string password, string? passwordConfirm = null)
        {
            // If passwordConfirm isn't null it was sent in and thus we want to create an account so we need to check so passwords match
            // and that the account doesn't already exist.
            if (passwordConfirm != null)
            {
                MatchingPasswords(password, passwordConfirm);

                if (await DoesUserExistAsync(email))
                    throw new ArgumentException("There's already an account with this email");
            }


            // Check so email uses correct format
            if (!EmailIsValid(email))
                throw new ArgumentException("Invalid email format.");

            // Check so password adheres to password standards 
            ValidatePassword(password);
        }


        private void ValidatePasswordChange(string newPassword, string newPasswordConfirm)
        {
            MatchingPasswords(newPassword, newPasswordConfirm);

            ValidatePassword(newPassword);
        }

        private void MatchingPasswords(string password, string passwordConfirm)
        {
            if (password != passwordConfirm)
                throw new ArgumentException("Passwords do not match.");
        }

        private bool EmailIsValid(string email)
        {
            return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        }

        private void ValidatePassword(string password)
        {
            // Minimum 8 characters
            if (password.Length < 8)
                throw new ArgumentException("Password must be atleast 8 characters long.");

            // Atleast 1 digit
            if (!password.Any(char.IsDigit))
                throw new ArgumentException("Password must contain atleast one digit.");

            // Atleast 1 uppercase
            if (!password.Any(char.IsUpper))
                throw new ArgumentException("Password must contain atleast one uppercase letter.");


            // Atleast 1 lowercase
            if (!password.Any(char.IsLower))
                throw new ArgumentException("Password must contain atleast one lowercase letter.");

            // Atleast 1 special char
            if (!password.Any(c => !char.IsLetterOrDigit(c)))
                throw new ArgumentException("Password must contain atleast one special character.");

        }

        private async Task<bool> DoesUserExistAsync(string email)
        {
            // If user already exists return true
            User user = await _userManager.FindByEmailAsync(email);
            if (user != null)
                return true;

            return false;
        }
    }
}
