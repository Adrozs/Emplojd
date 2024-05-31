using Emplojd.Data;
using Emplojd.Helpers;
using Emplojd.Models;
using Emplojd.Server.Models;
using Emplojd.Server.ResultObjects;
using Emplojd.Server.ViewModels___DTOs;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Emplojd.Server.Services
{
    public class UserProfileService
    {
        private readonly ApplicationContext _context;

        public UserProfileService(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<UserProfileResult> AddUserProfileAsync(UserProfileDto userProfileDto, ClaimsPrincipal currentUser)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users 
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return UserProfileResult.Failed("No matching user found.");

            try
            {
                user.FirstName = userProfileDto.FirstName;
                user.LastName = userProfileDto.LastName;
                user.UserInterestTags = userProfileDto.UserInterestTags;
                user.DescriptiveWords = userProfileDto.DescriptiveWords;

                await _context.SaveChangesAsync();

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

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return null;

            return new UserProfileDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserInterestTags = user.UserInterestTags,
                DescriptiveWords = user.DescriptiveWords,
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
                PositionEducation = c.PositionEducation,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                SchoolWorkplace = c.SchoolWorkplace,
                IsEducation = c.IsEducation
            }).ToList();
        }

        public async Task<UserProfileResult> AddUserCvManuallyAsync(ClaimsPrincipal currentUser, CvManuallyDto cvManuallyDtos)
        {
            try
            {
                string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

                var user = await _context.Users
                    .Include(u => u.CvManually)
                    .FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                    return UserProfileResult.Failed("No matching user found.");
               
                var newCvManually =
                    new CvManually
                    {
                        PositionEducation = cvManuallyDtos.PositionEducation,
                        StartDate = cvManuallyDtos.StartDate,
                        EndDate = cvManuallyDtos.EndDate,
                        SchoolWorkplace = cvManuallyDtos.SchoolWorkplace,
                        IsEducation = cvManuallyDtos.IsEducation,
                    };

                user.CvManually.Add(newCvManually);

                await _context.SaveChangesAsync();

                return UserProfileResult.Successful();
            }
            catch (Exception ex)
            {
                var exResult = ExceptionHandler.HandleException(ex);
                return UserProfileResult.Failed($"Failed to create or update profile: {exResult}");
            }
        }
    }
}
