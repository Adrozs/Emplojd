using System.ComponentModel.DataAnnotations;

namespace ChasGPT_Backend.ViewModels___DTOs.Account
{
    public class ResetPasswordRequest
    {
        [Required(ErrorMessage = "New password is required.")]
        [DataType(DataType.Password)]
        [StringLength(256, MinimumLength = 8)]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "New password confirmation is required.")]
        [DataType(DataType.Password)]
        [StringLength(256, MinimumLength = 8)]
        public string NewPasswordConfirm { get; set; }
    }
}
