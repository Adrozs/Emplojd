using System.Reflection;
using OpenAI_API.Models;
using OpenAI_API;
using Emplojd.Server.ViewModels___DTOs.CoverLetter;
using System.Security.Claims;
using Emplojd.Data;
using Emplojd.Models;
using Emplojd.Exceptions.JobAdExceptions;
using Microsoft.EntityFrameworkCore;

namespace Emplojd.Repositories
{
    public interface IChatGPTRepository
    {
        public Task<string> GenerateLetterAsync(int userId, int jobId, float temperature, bool job);
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


        public async Task<string> GenerateLetterAsync(int userId, int jobId, float temperature, bool job)
        {

            //Här hämtas CV från databasen
            string cvText = "test";

            //använd Adrians metod för att hämta jobbannonsen
            string jobAd = "test";

            //Hämta från databas med userId för att få användarens namn, intressen och nyckelord
            string userInfo = "test";

            if (string.IsNullOrEmpty(cvText))
            {
                // Handle case where cvText is missing or empty (Behöver vi ha detta om användaren måste ha ett CV inlagt?)
                throw new Exception("Cv is empty");
            }

            var chat = api.Chat.CreateConversation();
            chat.Model = Model.ChatGPTTurbo;
            chat.RequestParameters.Temperature = temperature; //Om användaren väljer tepearatur så skickar frontend tillbaka svaraet i en variabel som heter temperature. 

            int desiredLength = 500;

            // Prepare the prompt using CV text (ha en promt för jobb och en annan för praktik. Ändra sen!!!)
            string prompt = $"Based on my CV:\n{cvText}\n\nGenerate a personalized letter:"; //Lägg till jobbannonsen och använder info här också! ish {job.id} OBS:Ändra till svenska


            // Make the API call to stream completion results
            chat.AppendUserInput(prompt);
            // and get the response
            string response = await chat.GetResponseFromChatbotAsync();

            return response;

            //Spara till databasen i en separat tabell tillsammans med userId

        }


        public async Task<List<SavedCoverLetterDto>> GetSavedCoverLettersAsync(ClaimsPrincipal currentUser)
        {
            User user = await GetUserAndCoverLettersAsync(currentUser);

            List<SavedCoverLetterDto>? savedCoverLetters = user.CoverLetters.Select(c => new SavedCoverLetterDto
            {
                CoverLetterId = c.CoverLetterId,
                Temperature = c.Temperature,
                CoverLetterText = c.GeneratedCoverLetter
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
                var coverLetter = user.CoverLetters.SingleOrDefault(c => c.CoverLetterId == request.CoverLetterId);


                // If cover letter doesn't exist create new one and save to db if not null write over the existing one
                if (coverLetter == null)
                {
                    coverLetter = new CoverLetter
                    {
                        GeneratedCoverLetter = request.CoverLetterText,
                        Temperature = request.Temperature,
                    };

                    // Add cover letter to user and the context
                    user.CoverLetters.Add(coverLetter);
                }
                else
                {
                    coverLetter.GeneratedCoverLetter = request.CoverLetterText;
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
            
            CoverLetter? coverLetter = user.CoverLetters.SingleOrDefault(c => c.CoverLetterId == request.CoverLetterId);
            if (coverLetter == null)
                return CoverLetterResult.Failed("Cover letter not found.");


            // Start transaction
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                user.CoverLetters.Remove(coverLetter);
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
                .Include(u => u.CoverLetters)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                throw new UserNotFoundException("No matching user found with the provided email.");

            return user;
        }

    }
}
