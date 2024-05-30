using System.Reflection;
using OpenAI_API.Models;
using OpenAI_API;
using Emplojd.Server.ViewModels___DTOs.CoverLetter;
using System.Security.Claims;
using Emplojd.Data;
using Emplojd.Models;
using Emplojd.Exceptions.JobAdExceptions;
using Microsoft.EntityFrameworkCore;
using Emplojd.Server.Models;
using Emplojd.Server.ViewModels___DTOs;
using Emplojd.Services;
using Emplojd.ViewModels;

namespace Emplojd.Repositories
{
    public interface IChatGPTRepository
    {
        public Task<string> GenerateLetterAsync(GenerateCoverLetterDto generateCoverLetterDto);
        Task<List<SavedCoverLetterDto>> GetSavedCoverLettersAsync(ClaimsPrincipal currentUser);
        Task<CoverLetterResult> RemoveSavedCoverLettersAsync(RemoveCoverLetterRequest request, ClaimsPrincipal currentUser);
        Task<CoverLetterResult> SaveCoverLetterAsync(SaveCoverLetterRequest request, ClaimsPrincipal currentUser);
    }
    public class ChatGPTRepository : IChatGPTRepository
    {
        private readonly OpenAIAPI api;
        private readonly ApplicationContext _context;
        

        public ChatGPTRepository(OpenAIAPI openAIApi, ApplicationContext context)
        {
            api = openAIApi;
            _context = context;
        }


        public async Task<string> GenerateLetterAsync(GenerateCoverLetterDto generateCoverLetterDto)
        {

            // hämta CV content
            string cvContentText = generateCoverLetterDto.CvText;

            // hämta job ad
            string jobAd = generateCoverLetterDto.JobTitle + generateCoverLetterDto.JobDescription;

            // Hämta name, interests, and descriptive words
            string firstName = generateCoverLetterDto.FirstName;
            string lastName = generateCoverLetterDto.LastName;

            //If UserInterestTags is not null, this joins the list items into a single string, separated by ", ".
            string userInterests = generateCoverLetterDto.UserInterestTags != null ? string.Join(", ", generateCoverLetterDto.UserInterestTags) : string.Empty;
            string userDescriptiveWords = generateCoverLetterDto.DescriptiveWords != null ? string.Join(", ", generateCoverLetterDto.DescriptiveWords) : string.Empty;

            float temperature = generateCoverLetterDto.Temperature;


            //OBS LÄGG TILL MER FELHANTERING!!!
            //if (string.IsNullOrEmpty(cvContentText))
            //{
               
            //    throw new Exception("CV content is empty");
            //}

            var chat = api.Chat.CreateConversation();
            chat.Model = Model.ChatGPTTurbo;
            //chat.RequestParameters.Temperature = temperature;

            int desiredLength = 300;

            // Prepare the prompt using CV text and user info
            string prompt = $"Jag söker jobbet som {generateCoverLetterDto.JobTitle}. " +
            $"Du ska skriva ett personligt brev åt mig, använd inte allt för formella ord utan mer avslappnat, dock fortfarande i arbetssammanhang. " +
            $"Du behöver inte använda all information utan det som är relevant att ta med för jobbet." +
            $"Här är lite info om mig. Mitt CV:\n{cvContentText}\n" +
            $"Några av mina intressen: {userInterests}\n" +
            $"Ord jag tycker beskriver mig: {userDescriptiveWords}\n" +
            $"Ta in den informationen ovan om mig och läs av denna jobbannons och skriv ett personligt brev enligt instruktionerna du har fått." +
            $"Med önskad längd på brevet:{desiredLength}\noch temperatur: {temperature}\n." +
            $"Jobbanonsen: {jobAd}";

            // Make the API call to stream completion results
            chat.AppendUserInput(prompt);
            // Get the response
            string response = await chat.GetResponseFromChatbotAsync();

            // Save the response to the database if needed
            // await SaveGeneratedLetterAsync(userProfile.Id, response);

            return response;
        }


        public async Task<List<SavedCoverLetterDto>> GetSavedCoverLettersAsync(ClaimsPrincipal currentUser)
        {
            User user = await GetUserAndCoverLettersAsync(currentUser);

            List<SavedCoverLetterDto>? savedCoverLetters = user.SavedCoverLetters.Select(c => new SavedCoverLetterDto
            {
                CoverLetterId = c.SavedCoverLetterId,
                Temperature = c.Temperature,
                CoverLetterTitle = c.CoverLetterTitle,
                CoverLetterContent = c.CoverLetterContent
            })
            .ToList();

            return savedCoverLetters;
        }

        public async Task<CoverLetterResult> SaveCoverLetterAsync(SaveCoverLetterRequest request, ClaimsPrincipal currentUser)
        {
            User user = await GetUserAndCoverLettersAsync(currentUser);

            // To do:
            // Check so there's only 1 cover letter for each platsbanken job ad 
            // if there already is one, then overwrite that one with the new cover letter
            // Comment out that code though but make it work. Add later if frontend has more time on their end.

            try
            {
                // Check if cover letter already exists
                var coverLetter = user.SavedCoverLetters.SingleOrDefault(c => c.SavedCoverLetterId == request.CoverLetterId);


                // If cover letter doesn't exist create new one and save to db if not null write over the existing one
                if (coverLetter == null)
                {
                    coverLetter = new SavedCoverLetter
                    {
                        CoverLetterTitle = request.CoverLetterTitle,
                        CoverLetterContent = request.CoverLetterContent,
                        Temperature = request.Temperature,
                    };

                    // Add cover letter to user and the context
                    user.SavedCoverLetters.Add(coverLetter);
                }
                else
                {
                    coverLetter.CoverLetterTitle = request.CoverLetterTitle;
                    coverLetter.CoverLetterContent = request.CoverLetterContent;
                    coverLetter.Temperature = request.Temperature;

                    _context.CoverLetters.Update(coverLetter);
                }

                await _context.SaveChangesAsync();

                return CoverLetterResult.Successful();

            }
            catch(DbUpdateException ex)
            {
                return CoverLetterResult.Failed(ex.Message);
            }
        }

        public async Task<CoverLetterResult> RemoveSavedCoverLettersAsync(RemoveCoverLetterRequest request, ClaimsPrincipal currentUser)
        {
            User user = await GetUserAndCoverLettersAsync(currentUser);
            
            SavedCoverLetter? coverLetter = user.SavedCoverLetters.SingleOrDefault(c => c.SavedCoverLetterId == request.CoverLetterId);
            if (coverLetter == null)
                return CoverLetterResult.Failed("Cover letter not found.");


            // Start transaction
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                user.SavedCoverLetters.Remove(coverLetter);
                _context.CoverLetters.Remove(coverLetter);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return CoverLetterResult.Successful();

            }
            catch (DbUpdateException ex)
            {
                await transaction.RollbackAsync();

                return CoverLetterResult.Failed(ex.Message);
            }

        }

        private async Task<User> GetUserAndCoverLettersAsync(ClaimsPrincipal currentUser)
        {
            // Get the email from the JWT claims
            string? email = currentUser.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
                throw new UserNotFoundException("No email found in token claims.");

            // Get user along with its cover letters
            User? user = await _context.Users
                .Include(u => u.SavedCoverLetters)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new UserNotFoundException("No matching user found with the provided email.");

            return user;
        }
    }
}
