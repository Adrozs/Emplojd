using DocumentFormat.OpenXml.Spreadsheet;
using Emplojd.Data;
using Emplojd.Helpers;
using Emplojd.Models;
using Emplojd.Server.ResultObjects;
using Emplojd.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace Emplojd.Repository
{

    public interface IUserRepository
    {
        public Task<IdentityResult> CreateAccountAsync(string email, string emailConfirm, string password, string passwordConfirm);
        public Task<LoginResult> LoginAsync(string email, string password);
        //public Task<bool> ChangePasswordAsync(string currentPassword, string newPassword, string newPasswordConfirm, ClaimsPrincipal currentUser);
        public Task<IdentityResult> EmailVerificationAsync(string userId, string code);
        public Task<IdentityResult> ResendEmailVerificationAsync(string email);
        public Task<IdentityResult> GeneratePasswordResetCodeAsync(string email);
        public Task<IdentityResult> ResetPasswordAsync(string userId, string code, string newPassword, string newPasswordConfirm);
        public Task<IdentityResult> DeleteAccountAsync(string password, ClaimsPrincipal currentUser);
    }

    public class UserRepository : IUserRepository
    {
        private readonly string _baseEmplojdUrl = "https://emplojd.com";
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly AuthenticationService _authService;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationContext _context;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, AuthenticationService authService, 
            IEmailSender emailSender, ApplicationContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _authService = authService;
            _emailSender = emailSender;
            _context = context;
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

            // Creates and hashes password for user in db - All MS Identity methods have build it validation and error handling
            IdentityResult createUserResult = await _userManager.CreateAsync(user, password);

            if (!createUserResult.Succeeded)
                return IdentityResult.Failed(new IdentityError { Description = string.Join(", ", createUserResult.Errors.Select(e => e.Description)) });

            string emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);


            // Create the redirect url to send in the email
            string websiteUrl = $"{_baseEmplojdUrl}/confirm-email";
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
            // Check and validate input and user
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
                return IdentityResult.Failed(new IdentityError { Description = "Invalid user ID or verification code." });

            User? user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return IdentityResult.Failed(new IdentityError { Description = "No user found." });

            // Attempt to confirm email
            IdentityResult result = await _userManager.ConfirmEmailAsync(user, Uri.UnescapeDataString(code));
            
            if (!result.Succeeded)
                return IdentityResult.Failed(new IdentityError { Description = "Failed to confirm email: " + string.Join(", ", result.Errors.Select(e => e.Description)) });

            // Set email confirmation
            user.EmailConfirmed = true;

            return result;
        }

        public async Task<IdentityResult> ResendEmailVerificationAsync(string email)
        {
            User? user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return IdentityResult.Failed(new IdentityError { Description = "Could not find matching user." });

            string emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            // Create the redirect url to send in the email
            string websiteUrl = $"{_baseEmplojdUrl}/confirm-email";
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
                return IdentityResult.Failed(new IdentityError { Description = "Failed to send email: " + string.Join(", ", sendEmailResult.ErrorMessage) });

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> GeneratePasswordResetCodeAsync(string email)
        {
            User? user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return IdentityResult.Failed(new IdentityError { Description = "No user found." });

            string passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            // Create the redirect url to send in the email
            string websiteUrl = $"{_baseEmplojdUrl}/reset-password";
            string callbackUrl = $"{websiteUrl}?userId={user.Id}&code={Uri.EscapeDataString(passwordResetToken)}";

            string emailSubject = "Password reset request";
            string emailBody = $"Please reset your password by clicking <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>here</a>. <br>" +
                $"If you did not request a password reset, please ignore this email. <br><br>" +
                $"If you're having trouble clicking the link, copy and paste the URL below into your browser: <br>" +
                $"{callbackUrl}<br><br><br>" +
                $"Please let us know if you have any questions or general feedback simply by replying to this email.<br><br>";


            // Attempt to send email
            EmailResult sendEmailResult = await _emailSender.SendEmailAsync(user.Email, emailSubject, emailBody);

            if (!sendEmailResult.Success)
                return IdentityResult.Failed(new IdentityError { Description = "Failed to send email:" + string.Join(", ", sendEmailResult.ErrorMessage) });
            
            return IdentityResult.Success;
        }

        public async Task<IdentityResult> ResetPasswordAsync(string userId, string code, string newPassword, string newPasswordConfirm)
        {
            // Check and validate input 
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
                // Rethrow the unexpected exception to be handled further up the chain
                throw;
            }
        }

        public async Task<IdentityResult> DeleteAccountAsync(string password, ClaimsPrincipal currentUser)
        {
            // Get valid user with all its info

            // Get the email from the JWT claims
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
                return IdentityResult.Failed(new IdentityError { Description = "No matching user found with the provided email." });

            // Get user along with its connected tables
            User? user = await _context.Users
                .Include(u => u.SavedJobAds)
                .Include(u => u.SavedCoverLetters)
                .Include(u => u.CvManually)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return IdentityResult.Failed(new IdentityError { Description = "No matching user found." });

            // Validate password
            if (!await _userManager.CheckPasswordAsync(user, password))
                return IdentityResult.Failed(new IdentityError { Description = "Invalid login credentials." });


            // Begin db transaction and delete everything connected to a user - rollback if something fails
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Remove all user data from connected tables
                _context.CoverLetters.RemoveRange(user.SavedCoverLetters);
                _context.CvManually.RemoveRange(user.CvManually);

                // Save users job ads to a new list to ensure we have a separate independent copy when we clear the user job ad relation 
                var jobAdsToCheck = new List<SavedJobAd>(user.SavedJobAds);

                // Clear the users saved job ad relations
                user.SavedJobAds.Clear();

                // Save before proceeding
                await _context.SaveChangesAsync();

                // Check if any other user has saved the same job ad - if not delete if from the context
                foreach (var jobAd in jobAdsToCheck)
                {
                    if (!_context.Users.Any(u => u.SavedJobAds.Contains(jobAd)))
                    {
                        _context.SavedJobAds.Remove(jobAd);
                    }
                }

                await _context.SaveChangesAsync();


                // Finally delete the account and its identity propertiees
                IdentityResult deleteAccountResult = await _userManager.DeleteAsync(user);
                await _context.SaveChangesAsync();

                if (!deleteAccountResult.Succeeded)
                {
                    await transaction.RollbackAsync();
                    return IdentityResult.Failed(new IdentityError { Description = "Something went wrong while attempting to delete the account." });
                }

                await transaction.CommitAsync();
                return IdentityResult.Success;
            }
            // If exception occurred rollback any changes and rethrow the exception to the service
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }

        }
    }
}
