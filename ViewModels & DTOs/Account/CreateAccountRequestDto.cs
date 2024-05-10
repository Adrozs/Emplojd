using System.ComponentModel.DataAnnotations;

namespace ChasGPT_Backend.ViewModels___DTOs
{
    public class CreateAccountRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [EmailAddress]
        public string EmailConfirmed { get; set; }

        [Required]
        [StringLength(256, MinimumLength = 8)]
        public string Password { get; set; }

        [Required]
        [StringLength(256, MinimumLength = 8)]
        public string PasswordConfirmed { get; set; }
    }
}
