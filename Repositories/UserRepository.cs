using ChasGPT_Backend.Models;
using ChasGPT_Backend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Encodings.Web;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace ChasGPT_Backend.Repositories
{

    public interface IUserRepository
    {
        public Task<bool> CreateAccountAsync(string email, string emailConfirm, string password, string passwordConfirm);
        public Task<string> LoginAsync(string email, string password);
        public Task<bool> ChangePasswordAsync(string currentPassword, string newPassword, string newPasswordConfirm, ClaimsPrincipal currentUser);
        public Task<bool> EmailVerification(string userId, string emailConfirmationToken);
    }

    public class UserRepository : IUserRepository
    {
        // No dbContext needed atm as UserManager interacts with db for user management purposes
        // Might be needed to ad for other stuff not covered by UserManager - double check documentation before changing.

        private readonly UserManager<User> _userManager;
        private readonly AuthenticationService _authService;
        private readonly IEmailSender _emailSender;

        public UserRepository(UserManager<User> userManager, AuthenticationService authService, IEmailSender emailSender)
        {
            _userManager = userManager;
            _authService = authService;
            _emailSender = emailSender;
        }


        public async Task<bool> CreateAccountAsync(string email, string emailConfirm, string password, string passwordConfirm)
        {
            // Check so emails and passwords match
            if (email != emailConfirm)
                throw new InvalidOperationException("Emails do not match.");

            if (password != passwordConfirm)
                throw new InvalidOperationException("Passwords do not match.");


            User user = new User
            {
                UserName = email, 
                Email = email
            };

            // Creates and hashes password for user in db - All MS Identity methods have build it validation and error handling
            IdentityResult createUserResult = await _userManager.CreateAsync(user, password);


            // If the creation didn't succeeded throw exception with details as to why
            if (!createUserResult.Succeeded)
                throw new InvalidOperationException("Failed to create account: " + string.Join(", ", createUserResult.Errors.Select(e => e.Description)));


            // If account was sucesfully created - generate a confirmation token and send it with a link to the confirmation page on our website to the users email
            var emailConfirmationToken = _userManager.GenerateEmailConfirmationTokenAsync(user);

            string websiteUrl = "https://localhost:5173/confirm-email";
            string callbackUrl = $"{websiteUrl}?userId={user.Id}&code={emailConfirmationToken}";


            var result = _emailSender.SendEmailAsync(email, "Emplojd - Just one more step!", $"Please confirm your email by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

            return true;
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            User user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new InvalidOperationException("No matching user found.");

            // Checks so password is valid for this user
            bool validLogin = await _userManager.CheckPasswordAsync(user, password);

            if (!validLogin)
                throw new InvalidOperationException("Invalid email or password.");

            // Generate token for user
            string token = _authService.GenerateToken(user);

            return token;
        }

        public async Task<bool> ChangePasswordAsync(string currentPassword, string newPassword, string newPasswordConfirm, ClaimsPrincipal currentUser)
        {
            // Get the email from the JWT claims
            string email = currentUser.FindFirst(ClaimTypes.Email)?.Value; 
            
            if (string.IsNullOrEmpty(email))
                throw new InvalidOperationException("No email found in token claims.");


            User user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new InvalidOperationException("No matching user found.");

            if (newPassword != newPasswordConfirm)
                throw new InvalidOperationException("Passwords doesn't match.");

            if (currentPassword == newPassword)
                throw new InvalidOperationException("New password can't be the same as old password.");

            // Check if current password is correct and if yes change to the new password
            IdentityResult result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            // If the result wasn't successful throw exception with details as to why
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to change password: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return result.Succeeded;
        }

        // Commented out to be able to push the code
        //public async Task<bool> EmailVerification(string userId, string emailConfirmationToken)
        //{
        //    // code
        //}

    }
}
