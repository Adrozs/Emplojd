using System.ComponentModel.DataAnnotations;

namespace Emplojd.ViewModels___DTOs
{
    public class LoginRequestDto
    {
        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        [StringLength(256, MinimumLength = 8)]
        public string Password { get; set; }
    }
}
