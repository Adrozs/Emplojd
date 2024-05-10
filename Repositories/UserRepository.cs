using ChasGPT_Backend.Models;
using ChasGPT_Backend.Services;
using Microsoft.AspNetCore.Identity;
using System.Text.Encodings.Web;

namespace ChasGPT_Backend.Repositories
{

    public interface IUserRepository
    {
        public Task<bool> CreateAccountAsync(string email, string emailConfirm, string password, string passwordConfirm);
        public Task<string> LoginAsync(string email, string password);
        //public Task<bool> ChangePasswordAsync(string currentPassword, string newPassword, string newPasswordConfirm, ClaimsPrincipal currentUser);
        public Task<bool> EmailVerificationAsync(string userId, string code);
        public Task<bool> GeneratePasswordResetCodeAsync(string email);
        public Task<bool> ResetPasswordAsync(string userId, string code, string newPassword, string newPasswordConfirm);

    }

    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly AuthenticationService _authService;
        private readonly IEmailSender _emailSender;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, AuthenticationService authService, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _authService = authService;
            _emailSender = emailSender;
        }


        public async Task<bool> CreateAccountAsync(string email, string emailConfirm, string password, string passwordConfirm)
        {
            // Check so emails and passwords match
            if (email != emailConfirm)
                throw new ArgumentException("Emails do not match.");

            if (password != passwordConfirm)
                throw new ArgumentException("Passwords do not match.");


            User user = new User
            {
                UserName = email, 
                Email = email
            };

            // Creates and hashes password for user in db - All MS Identity methods have build it validation and error handling
            IdentityResult createUserResult = await _userManager.CreateAsync(user, password);


            if (!createUserResult.Succeeded)
                throw new InvalidOperationException("Failed to create account: " + string.Join(", ", createUserResult.Errors.Select(e => e.Description)));

            string emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);


            // Create the redirect url to send in the email
            string websiteUrl = "https://localhost:5173/confirm-email";
            string callbackUrl = $"{websiteUrl}?userId={user.Id}&code={Uri.EscapeDataString(emailConfirmationToken)}";

            string emailSubject = "Emplojd - Just one more step!";
            string emailBody = 
                $"<h2>Welcome to Emplojd!</h2>" +
                $"<p>We're so excited to have you on board and will be happy to help you set everything up.<br>" +
                $"Please click the link below to verify your email address.<br>" +
                $"<a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>Click here to verify your email.</a>.<br><br>" +
                $"If you're having trouble clicking the link, copy and paste the URL below into your browser: <br>" +
                $"{callbackUrl}<br><br><br>" +
                $"Please let us know if you have any questions or general feedback simply by replying to this email.<br><br>" +
                $"All the best,<br>" +
                $"Emplojd</p>";


            // Send email to users email with message and confirmaton link
            var sendEmailResult = await _emailSender.SendEmailAsync(email, emailSubject, emailBody);

            if (!sendEmailResult.Success)
                throw new InvalidOperationException("Failed to send email: " + string.Join(", ", sendEmailResult.ErrorMessage));

            return sendEmailResult.Success;
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            User? user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new InvalidOperationException("No matching user found.");

            // Checks so password is valid for this user
            var loginResult = await _signInManager.PasswordSignInAsync(email, password, isPersistent: false, lockoutOnFailure: true);

            if (loginResult.Succeeded)
            {
                string token = _authService.GenerateToken(user);
                return token;
            }
            else if (loginResult.IsNotAllowed)
                throw new InvalidOperationException("You must confirm your account to log in. Please check your email for a verification link.");
            else if (loginResult.IsLockedOut)
                throw new InvalidOperationException("The account is locked due to multiple failed attempts. Try again in a few minutes.");
            else
                throw new InvalidOperationException("Invalid login attempt.");
        }

        // Commented away as is it even necessary?
        //public async Task<bool> ChangePasswordAsync(string currentPassword, string newPassword, string newPasswordConfirm, ClaimsPrincipal currentUser)
        //{
        //    // Check input 
        //    if (newPassword != newPasswordConfirm)
        //        throw new ArgumentException("Passwords doesn't match.");

        //    if (currentPassword == newPassword)
        //        throw new ArgumentException("New password can't be the same as old password.");


        //    // Get the email from the JWT claims
        //    string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value; 

        //    if (string.IsNullOrEmpty(email))
        //        throw new InvalidOperationException("No email found in token claims.");


        //    User? user = await _userManager.FindByEmailAsync(email);

        //    if (user == null)
        //        throw new InvalidOperationException("No matching user found.");
           

        //    // Check if current password is correct and if yes change to the new password
        //    IdentityResult result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

        //    // If the result wasn't successful throw exception with details as to why
        //    if (!result.Succeeded)
        //        throw new InvalidOperationException("Failed to change password: " + string.Join(", ", result.Errors.Select(e => e.Description)));

        //    return result.Succeeded;
        //}


        // Takes in user id and email code and checks if it's the one we created and sent out to the user

        public async Task<bool> EmailVerificationAsync(string userId, string code)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
                throw new ArgumentException("Invalid user ID or verification code");

            User? user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                throw new ArgumentException("No user found with specified id.");

            IdentityResult result = await _userManager.ConfirmEmailAsync(user, Uri.UnescapeDataString(code));
            
            // If the result wasn't successful throw exception with details as to why
            if (!result.Succeeded)
                throw new Exception("Failed to confirm email: " + string.Join(", ", result.Errors.Select(e => e.Description)));

            user.EmailConfirmed = true;

            return result.Succeeded;
        }

        public async Task<bool> GeneratePasswordResetCodeAsync(string email)
        {
            // Find user
            User? user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new InvalidOperationException("No matching user found.");

            var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            // Create the redirect url to send in the email
            string websiteUrl = "https://localhost:5173/reset-password";
            string callbackUrl = $"{websiteUrl}?userId={user.Id}&code={Uri.EscapeDataString(passwordResetToken)}";

            string emailSubject = "Password reset request";
            string emailBody = $"Please reset your password by clicking <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>here</a>. If you did not request a password reset, please ignore this email.";

            // Send email
            var sendEmailResult = await _emailSender.SendEmailAsync(user.Email, emailSubject, emailBody);

            if (!sendEmailResult.Success)
                throw new InvalidOperationException("Failed to send email: " + string.Join(", ", sendEmailResult.ErrorMessage));

            return sendEmailResult.Success;
        }

        public async Task<bool> ResetPasswordAsync(string userId, string code, string newPassword, string newPasswordConfirm)
        {
            // Check input 
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
                throw new ArgumentException("Invalid user ID or verification code");

            if (string.IsNullOrEmpty(newPassword) || string.IsNullOrEmpty(newPasswordConfirm))
                throw new ArgumentException("Password can't be empty.");

            if (newPassword != newPasswordConfirm)
                throw new ArgumentException("Passwords doesn't match.");

            User? user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                throw new ArgumentException("No user found with specified id.");

            IdentityResult result = await _userManager.ResetPasswordAsync(user, Uri.UnescapeDataString(code), newPassword);

            // If the result wasn't successful throw exception with details as to why
            if (!result.Succeeded)
                throw new InvalidOperationException("Failed to change password: " + string.Join(", ", result.Errors.Select(e => e.Description)));

            return result.Succeeded;
        }

    }
}
