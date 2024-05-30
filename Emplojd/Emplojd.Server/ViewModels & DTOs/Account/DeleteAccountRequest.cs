using System.ComponentModel.DataAnnotations;

namespace Emplojd.Server.ViewModels___DTOs.Account
{
    public class DeleteAccountRequest
    {
        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        [StringLength(256, MinimumLength = 8)]
        public string Password { get; set; }
    }
}
