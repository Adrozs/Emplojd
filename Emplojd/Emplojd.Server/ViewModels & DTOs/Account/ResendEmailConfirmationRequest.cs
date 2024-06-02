using System.ComponentModel.DataAnnotations;

namespace Emplojd.Server.ViewModels___DTOs.Account
{
    public class ResendEmailConfirmationRequest
    {
        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }
    }
}
