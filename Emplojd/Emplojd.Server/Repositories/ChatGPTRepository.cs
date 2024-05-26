using System.Reflection;
using OpenAI_API.Models;
using OpenAI_API;
using System.Text;
using Emplojd.Models;
using Emplojd.Server.Models;

namespace Emplojd.Repositories
{
    public interface IChatGPTRepository
    {
        public Task<string> GenerateLetterAsync(int userId, int jobId, float temperature, bool job);
    }
    public class ChatGPTRepository : IChatGPTRepository
    {
        private readonly OpenAIAPI api;

        public ChatGPTRepository(OpenAIAPI openAIApi)
        {
            api = openAIApi;
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

        //private string GenerateCvText(List<CvManually> cvManuals)
        //{
        //    var sb = new StringBuilder();
        //    foreach (var cv in cvManuals)
        //    {
        //        sb.AppendLine($"{cv.PositionEducation} ({cv.StartDate.ToShortDateString()} - {cv.EndDate.ToShortDateString()}) at {cv.SchoolWorkplace}");
        //        sb.AppendLine(cv.IsEducation ? "Education" : "Work Experience");
        //    }
        //    return sb.ToString();
        //}

        public async Task<string> GetUserCvTextAsync(int userId)
        {
            // Replace with actual data access logic to fetch the CV text from db
            return await Task.FromResult("CV content for user " + userId);
        }

        public async Task<JobAd> GetJobAdAsync(int jobId)
        {
            // Replace with actual data access logic to fetch the job ad from db
            return await Task.FromResult(new JobAd
            {
                JobAdId = jobId,
                Employer = "Tech Corp"
            });
        }

        public async Task<User> GetUserInfoAsync(int userId)
        {
            // replace with actual data access logic (just test)
            return await Task.FromResult(new User
            {
                //Id = UserIdentity.Id,
                Name = "John",
                UserInterestTags = new List<string> { "Programming", "Reading" },
                DescriptiveWords = new List<string> { "Hardworking", "Team player" }
            });
        }
    }
}

        //public async Task<List<CvManuallyModel>> GetCvManualAsync(int userId)
        //{
        //    // Replace with actual data access logic to fetch the manual CV entries from the database
        //    return await Task.FromResult(new List<CvManuallyModel>
        //    {
        //        new CvManuallyModel
        //        {
        //            Id = 1,
        //            PositionEducation = "Software Engineer",
        //            StartDate = new DateTime(2020, 1, 1),
        //            EndDate = new DateTime(2022, 12, 31),
        //            SchoolWorkplace = "Tech Corp",
        //            IsEducation = false,
        //            UserId = userId
        //        }

