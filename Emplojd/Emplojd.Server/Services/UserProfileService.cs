using DocumentFormat.OpenXml.Wordprocessing;
using Emplojd.Data;
using Emplojd.Helpers;
using Emplojd.Models;
using Emplojd.Server.Models;
using Emplojd.Server.ResultObjects;
using Emplojd.Server.ViewModels___DTOs;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Emplojd.Server.Services
{
    public class UserProfileService
    {
        private readonly ApplicationContext _context;
        private readonly BlobStorageService _blobStorageService;

        public UserProfileService(ApplicationContext context, BlobStorageService blobStorageService)
        {
            _context = context;
            _blobStorageService = blobStorageService;

        }

        public async Task<UserProfileResult> AddUserProfileAsync(UserProfileDto userProfileDto, ClaimsPrincipal currentUser)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return UserProfileResult.Failed("No matching user found.");

            try
            {
                user.FirstName = userProfileDto.FirstName;
                user.LastName = userProfileDto.LastName;
                user.UserInterestTags = userProfileDto.UserInterestTags?.Take(5).ToList();
                user.DescriptiveWords = userProfileDto.DescriptiveWords?.Take(5).ToList();
            

                await _context.SaveChangesAsync();

                if (userProfileDto.ImageFile != null && userProfileDto.ImageFile.Length > 0)
                {
                    // Upload image to Azure Blob Storage
                    var imageUrl = await _blobStorageService.UploadBlobAsync(userProfileDto.ImageFile);

                    // Update user's image file path
                    user.ImageFilePath = imageUrl;

                    await _context.SaveChangesAsync();
                }

                return UserProfileResult.Successful() ;
            }
            catch (Exception ex)
            {
                var exResult = ExceptionHandler.HandleException(ex);
                return UserProfileResult.Failed($"Failed to create or update profile: {exResult}");
            }
        }

        public async Task<UserProfileDto> GetUserProfileAsync(ClaimsPrincipal currentUser)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return null;

            return new UserProfileDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserInterestTags = user.UserInterestTags,
                DescriptiveWords = user.DescriptiveWords,
                ImageFilePath = user.ImageFilePath
            };
        }


        public async Task<List<CvManuallyDto>> GetUserCvManuallyAsync(ClaimsPrincipal currentUser)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users
                .Include(u => u.CvManually)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null || user.CvManually == null)
                return null;

            return user.CvManually.Select(c => new CvManuallyDto
            {
                CvManuallyId = c.CvManuallyId,
                PositionEducation = c.PositionEducation,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                CvText = c.CvText,
                SchoolWorkplace = c.SchoolWorkplace,
                IsEducation = c.IsEducation
            }).ToList();
        }

        public async Task<UserProfileResult> AddUserCvManuallyAsync(ClaimsPrincipal currentUser, SaveCvManuallyRequest request)
        {
            try
            {
                string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

                var user = await _context.Users
                    .Include(u => u.CvManually)
                    .FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                    return UserProfileResult.Failed("No matching user found.");

                var cvManually = user.CvManually.SingleOrDefault(cm => cm.CvManuallyId == request.CvManuallyId);


                // If no id was sent in create a new experience and add it to the list
                if (cvManually == null)
                {
                    cvManually = new CvManually
                    {
                        PositionEducation = request.PositionEducation,
                        StartDate = request.StartDate,
                        EndDate = request.EndDate,
                        CvText = request.CvText,
                        SchoolWorkplace = request.SchoolWorkplace,
                        IsEducation = request.IsEducation,
                    };

                    user.CvManually.Add(cvManually);
                }
                // If id was sent in get that letter and update it.
                else
                {
                    if (!string.IsNullOrEmpty(request.PositionEducation))
                        cvManually.PositionEducation = request.PositionEducation;

                    if (!string.IsNullOrEmpty(request.PositionEducation))
                        cvManually.StartDate = request.StartDate;

                    if (!string.IsNullOrEmpty(request.EndDate))
                        cvManually.EndDate = request.EndDate;

                    if (!string.IsNullOrEmpty(request.SchoolWorkplace))
                        cvManually.SchoolWorkplace = request.SchoolWorkplace;

                    if (!string.IsNullOrEmpty(request.CvText))
                        cvManually.CvText = request.CvText;

                    // Defaults to false so can't check if it is sent in or not
                    cvManually.IsEducation = request.IsEducation;

                    _context.CvManually.Update(cvManually);
                }

                await _context.SaveChangesAsync();

                return UserProfileResult.Successful();
            }
            catch (Exception ex)
            {
                var exResult = ExceptionHandler.HandleException(ex);
                return UserProfileResult.Failed($"Failed to create or update profile: {exResult}");
            }
        }

        public async Task<UserProfileResult> DeleteCvManuallyAsync(ClaimsPrincipal currentUser, int cvManuallyId)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users
                    .Include(u => u.CvManually)
                    .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return UserProfileResult.Failed("No matching user found.");

            try
            {
                var cvManually = user.CvManually.FirstOrDefault(c => c.CvManuallyId == cvManuallyId);
                if (cvManually == null)
                    return UserProfileResult.Failed("No matching cv found.");

                _context.CvManually.Remove(cvManually);
                await _context.SaveChangesAsync();

                return UserProfileResult.Successful();
            }
            catch (Exception ex)
            {
                var exResult = ExceptionHandler.HandleException(ex);
                return UserProfileResult.Failed($"Failed to remove cv: {exResult}");
            }
        }

        public async Task CoverLetterSignature(ClaimsPrincipal currentUser)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                Console.WriteLine("User not found.");
                return;
            }

            string signature = $"Med vänliga hälsningar,\n{user.FirstName} {user.LastName}";
            Console.WriteLine(signature);
        }

        public async Task CustomSignature(ClaimsPrincipal currentUser, string customSignature)
        {
            const int MaxSignatureLength = 100;
            if (customSignature.Length > MaxSignatureLength)
            {
                Console.WriteLine($"Din signatur är för lång, Max antal bokstäver: {MaxSignatureLength} ");
                return;
            }

            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                Console.WriteLine("User not found.");
                return;
            }

            string signature = $"{customSignature}\n{user.FirstName} {user.LastName}";
            Console.WriteLine(signature);
        }
    }
}
