using Emplojd.Data;
using Emplojd.Models;
using Emplojd.Server.Models;
using Emplojd.Server.ViewModels___DTOs;
using Emplojd.Server.ViewModels___DTOs.UserProfile;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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

        public async Task AddUserProfileAsync(UserProfileDto userProfileDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userProfileDto.Id);

            if (user == null)
            {
                user = new User
                {
                    Id = userProfileDto.Id,
                    Name = userProfileDto.Name,
                    UserInterestTags = userProfileDto.UserInterestTags,
                    DescriptiveWords = userProfileDto.DescriptiveWords,
                    CvContentText = userProfileDto.CvContentText,
                };

                _context.Users.Add(user);
            }
            else
            {
                user.Name = userProfileDto.Name;
                user.UserInterestTags = userProfileDto.UserInterestTags;
                user.DescriptiveWords = userProfileDto.DescriptiveWords;
                user.CvContentText = userProfileDto.CvContentText;
            }

            await _context.SaveChangesAsync();
        }

        public async Task AddUserCvManuallyAsync(int userId, List<CvManuallyDto> cvManuallyDtos)
        {
            var userIdString = userId.ToString();
            var user = await _context.Users.Include(u => u.CvManually).FirstOrDefaultAsync(u => u.Id == userIdString);

            if (user != null)
            {
                user.CvManually = cvManuallyDtos.Select(c => new CvManually
                {
                    CvManuallyId = c.CvManuallyId,
                    PositionEducation = c.PositionEducation,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate,
                    SchoolWorkplace = c.SchoolWorkplace,
                    IsEducation = c.IsEducation,
                }).ToList();

                await _context.SaveChangesAsync();
            }
        }

        public async Task<UserProfileDto> GetUserProfileAsync(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            return new UserProfileDto
            {
                Id = user.Id,
                Name = user.Name,
                UserInterestTags = user.UserInterestTags,
                DescriptiveWords = user.DescriptiveWords,
                CvContentText = user.CvContentText
            };
        }

        public async Task<List<CvManuallyDto>> GetUserCvManuallyAsync(string userId)
        {
            var user = await _context.Users.Include(u => u.CvManually).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null || user.CvManually == null)
            {
                return new List<CvManuallyDto>(); // better handling if we get an empty list instead of null as it wont conflict with the CV generation
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
    }
}
