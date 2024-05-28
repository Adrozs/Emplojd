using DocumentFormat.OpenXml.Spreadsheet;
using Emplojd.Data;
using Emplojd.Models;
using Emplojd.Server.Models;
using Emplojd.Server.ViewModels___DTOs;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Emplojd.Server.Services
{
    public class UserProfileService
    {
        private readonly ApplicationContext _context;

        public UserProfileService(ApplicationContext context)
        {
            _context = context;
        }

        public async Task AddUserProfileAsync(UserProfileDto userProfileDto, ClaimsPrincipal currentUser)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users 
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                user = new User
                {
                    Name = userProfileDto.Name,
                    UserInterestTags = userProfileDto.UserInterestTags,
                    DescriptiveWords = userProfileDto.DescriptiveWords,
                };

                _context.Users.Add(user);
            }
            else
            {
                user.Name = userProfileDto.Name;
                user.UserInterestTags = userProfileDto.UserInterestTags;
                user.DescriptiveWords = userProfileDto.DescriptiveWords;
            }

            await _context.SaveChangesAsync();
        }

        public async Task<UserProfileDto> GetUserProfileAsync(ClaimsPrincipal currentUser)
        {
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _context.Users
                .Include(u => u.CvManually)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return null;
            }

            return new UserProfileDto
            {
                Name = user.Name,
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
            {
                return null;
            }

            return user.CvManually.Select(c => new CvManuallyDto
            {
                CvManuallyId = c.CvManuallyId,
                PositionEducation = c.PositionEducation,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                SchoolWorkplace = c.SchoolWorkplace,
                IsEducation = c.IsEducation
            }).ToList();
        }

        public async Task AddUserCvManuallyAsync(ClaimsPrincipal currentUser, CvManuallyDto cvManuallyDtos)
        {
            try
            {
                string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

                var user = await _context.Users
                    .Include(u => u.CvManually)
                    .FirstOrDefaultAsync(u => u.Email == email);

                if (user != null)
                {
                    var newCvManually =
                        new CvManually
                        {
                            CvManuallyId = cvManuallyDtos.CvManuallyId,
                            PositionEducation = cvManuallyDtos.PositionEducation,
                            StartDate = cvManuallyDtos.StartDate,
                            EndDate = cvManuallyDtos.EndDate,
                            SchoolWorkplace = cvManuallyDtos.SchoolWorkplace,
                            IsEducation = cvManuallyDtos.IsEducation,
                        };

                    //foreach (var cv in newCvManually)
                    //{
                    //    user.CvManually.Add(cv);
                    //}

                    user.CvManually.Add(newCvManually);

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                // Handle the exception appropriately (log, throw, etc.)
                // For now, let's log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw; // Re-throw the exception to propagate it upwards
            }
        }

    }
}
