﻿using ChasGPT_Backend.Models;
using ChasGPT_Backend.Services;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace ChasGPT_Backend.Repository
{

    public interface IUserRepository
    {
        public Task<bool> CreateAccountAsync(string email, string emailConfirm, string password, string passwordConfirm);
        public Task<string> LoginAsync(string email, string password);
        public Task<bool> ChangePasswordAsync(string currentPassword, string newPassword, string newPasswordConfirm, ClaimsPrincipal currentUser);
    }

    public class UserRepository : IUserRepository
    {
        // No dbContext needed atm as UserManager interacts with db for user management purposes
        // Might be needed to ad for other stuff not covered by UserManager - float check documentation before changing.

        private readonly UserManager<User> _userManager;
        private readonly AuthenticationService _authService;

        public UserRepository(UserManager<User> userManager, AuthenticationService authService)
        {
            _userManager = userManager;
            _authService = authService;
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
            IdentityResult result = await _userManager.CreateAsync(user, password);

            // If the creation didn't succeeded throw exception with details as to why
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to create account: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return result.Succeeded;
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
    }
}
