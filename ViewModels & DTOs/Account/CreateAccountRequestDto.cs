namespace ChasGPT_Backend.ViewModels___DTOs
{
    public class CreateAccountRequestDto
    {
        public string Email { get; set; }
        public string EmailConfirmed { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmed { get; set; }
    }
}
