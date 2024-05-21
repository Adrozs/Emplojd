using System.Reflection;
using OpenAI_API.Models;
using OpenAI_API;

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
    }
}
