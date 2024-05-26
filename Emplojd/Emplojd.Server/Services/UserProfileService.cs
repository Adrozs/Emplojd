using Emplojd.Data;
using Emplojd.Models;
using Emplojd.Server.Models;
using Emplojd.Server.ViewModels___DTOs;
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
            var user = await _context.Users
                .Include(u => u.CvManually)
                .FirstOrDefaultAsync(u => u.Id == userProfileDto.Id);

            if (user == null)
            {
                user = new User
                {
                    Id = userProfileDto.Id,
                    UserName = userProfileDto.Id, // IF we assume Id is the same as UserName
                    Name = userProfileDto.Name,
                    UserInterestTags = userProfileDto.UserInterestTags,
                    DescriptiveWords = userProfileDto.DescriptiveWords,
                    CvContentText = userProfileDto.CvContentText,
                    CvManually = userProfileDto.CvManually?.Select(c => new CvManually
                    {
                        CvManuallyId = c.CvManuallyId,
                        PositionEducation = c.PositionEducation,
                        StartDate = c.StartDate,
                        EndDate = c.EndDate,
                        SchoolWorkplace = c.SchoolWorkplace,
                        IsEducation = c.IsEducation,
                    }).ToList()
                };

                _context.Users.Add(user);
            }
            else
            {
                user.Name = userProfileDto.Name;
                user.UserInterestTags = userProfileDto.UserInterestTags;
                user.DescriptiveWords = userProfileDto.DescriptiveWords;
                user.CvContentText = userProfileDto.CvContentText;

                // Update CvManually entries
                user.CvManually = userProfileDto.CvManually?.Select(c => new CvManually
                {
                    CvManuallyId = c.CvManuallyId,
                    PositionEducation = c.PositionEducation,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate,
                    SchoolWorkplace = c.SchoolWorkplace,
                    IsEducation = c.IsEducation,
                }).ToList();
            }

            await _context.SaveChangesAsync();
        }
    }
}
