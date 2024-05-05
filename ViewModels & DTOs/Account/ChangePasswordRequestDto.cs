namespace ChasGPT_Backend.ViewModels___DTOs
{
    public class ChangePasswordRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string NewPasswordConfirm { get; set; }
    }
}
