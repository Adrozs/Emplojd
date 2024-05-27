using Emplojd.Helpers;
using Emplojd.Models;
using Emplojd.Services;
using Microsoft.AspNetCore.Identity;
using System.Text.Encodings.Web;

namespace Emplojd.Repository
{

    public interface IUserRepository
    {
        public Task<IdentityResult> CreateAccountAsync(string email, string emailConfirm, string password, string passwordConfirm);
        public Task<LoginResult> LoginAsync(string email, string password);
        //public Task<bool> ChangePasswordAsync(string currentPassword, string newPassword, string newPasswordConfirm, ClaimsPrincipal currentUser);
        public Task<IdentityResult> EmailVerificationAsync(string userId, string code);
        public Task<IdentityResult> GeneratePasswordResetCodeAsync(string email);
        public Task<IdentityResult> ResetPasswordAsync(string userId, string code, string newPassword, string newPasswordConfirm);

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


        public async Task<IdentityResult> CreateAccountAsync(string email, string emailConfirm, string password, string passwordConfirm)
        {
            // Check so emails and passwords match
            if (email != emailConfirm)
                return IdentityResult.Failed(new IdentityError { Description = "Emails do not match."});

            if (password != passwordConfirm)
                return IdentityResult.Failed(new IdentityError { Description = "Passwords do not match." });
                
            User user = new User
            {
                UserName = email, 
                Email = email
            };

            await Console.Out.WriteLineAsync("Created user");

            // Creates and hashes password for user in db - All MS Identity methods have build it validation and error handling
            IdentityResult createUserResult = await _userManager.CreateAsync(user, password);

            await Console.Out.WriteLineAsync("user manager created user");

            if (!createUserResult.Succeeded)
                return IdentityResult.Failed(new IdentityError { Description = string.Join(", ", createUserResult.Errors.Select(e => e.Description)) });

            await Console.Out.WriteLineAsync("generating email token");

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
                $"Emplojd</p>" +
                // Remove this when not testing anymore
                $"<p><br>TEMP REMOVE LATER <br> CODE: {Uri.EscapeDataString(emailConfirmationToken)} <br> USERID: {user.Id} </p>";


            await Console.Out.WriteLineAsync("trying to send email");


            // Send email to users email with message and confirmaton link
            var sendEmailResult = await _emailSender.SendEmailAsync(email, emailSubject, emailBody);

            if (!sendEmailResult.Success)
                return IdentityResult.Failed(new IdentityError { Description = "Failed to send email: " + string.Join(", ", sendEmailResult.ErrorMessage) });

            return IdentityResult.Success;
        }

        public async Task<LoginResult> LoginAsync(string email, string password)
        {
            User? user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return LoginResult.Failed("No user found.");

            // Checks so password is valid for this user
            var loginResult = await _signInManager.PasswordSignInAsync(email, password, isPersistent: false, lockoutOnFailure: true);

            if (loginResult.Succeeded)
            {
                string token = _authService.GenerateToken(user);
                return LoginResult.Successful(token);
            }
            else if (loginResult.IsNotAllowed)
                return LoginResult.Failed("You must confirm your account to log in. Please check your email for a verification link.");
            else if (loginResult.IsLockedOut)
                return LoginResult.Failed("The account is locked due to multiple failed attempts. Try again in a few minutes.");
            else
                return LoginResult.Failed("Invalid login attempt.");
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

        public async Task<IdentityResult> EmailVerificationAsync(string userId, string code)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
                return IdentityResult.Failed(new IdentityError { Description = "Invalid user ID or verification code." });

            User? user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return IdentityResult.Failed(new IdentityError { Description = "No user found." });


            IdentityResult result = await _userManager.ConfirmEmailAsync(user, Uri.UnescapeDataString(code));
            
            // If the result wasn't successful throw exception with details as to why
            if (!result.Succeeded)
                return IdentityResult.Failed(new IdentityError { Description = "Failed to confirm email: " + string.Join(", ", result.Errors.Select(e => e.Description)) });

            // Set the users email confirmation status
            user.EmailConfirmed = true;

            return result;
        }

        public async Task<IdentityResult> GeneratePasswordResetCodeAsync(string email)
        {
            User? user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return IdentityResult.Failed(new IdentityError { Description = "No user found." });

            string passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            // Create the redirect url to send in the email
            string websiteUrl = "https://localhost:5173/reset-password";
            string callbackUrl = $"{websiteUrl}?userId={user.Id}&code={Uri.EscapeDataString(passwordResetToken)}";

            string emailSubject = "Password reset request";
            string emailBody = $"Please reset your password by clicking <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>here</a>. If you did not request a password reset, please ignore this email.";

            // Attempt to send email
            EmailResult sendEmailResult = await _emailSender.SendEmailAsync(user.Email, emailSubject, emailBody);

            if (!sendEmailResult.Success)
                return IdentityResult.Failed(new IdentityError { Description = "Failed to send email:" + string.Join(", ", sendEmailResult.ErrorMessage) });
            
            return IdentityResult.Success;
        }

        public async Task<IdentityResult> ResetPasswordAsync(string userId, string code, string newPassword, string newPasswordConfirm)
        {
            // Check input 
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
                return IdentityResult.Failed(new IdentityError { Description = "Invalid user ID or verification code." });

            if (string.IsNullOrEmpty(newPassword) || string.IsNullOrEmpty(newPasswordConfirm))
                return IdentityResult.Failed(new IdentityError { Description = "Password can't be empty." });

            if (newPassword != newPasswordConfirm)
                return IdentityResult.Failed(new IdentityError { Description = "Passwords doesn't match." });

            User? user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return IdentityResult.Failed(new IdentityError { Description = "No user found with specified id."});

            // Attempt to reset password in the db and catch eventual exceptions
            try
            {
                IdentityResult result = await _userManager.ResetPasswordAsync(user, Uri.UnescapeDataString(code), newPassword);
                return result;

            }
            catch (Exception) 
            {
                // Rethrow the unexpected exception to be handled further up
                throw;
            }
        }
    }
}
