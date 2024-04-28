using System.Reflection.Emit;
using System.Text.Json.Serialization;

namespace ChasGPT_Backend.ViewModels
{
    public class JobChatGptDto
    {
        public string Headline { get; set; } 
        public DescriptionChatGptDto Description { get; set; } 
    }

    // DTOs for nested objects

    public class DescriptionChatGptDto
	{
        public string Text { get; set; }
    }

}
