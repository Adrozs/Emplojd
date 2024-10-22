﻿using System.ComponentModel.DataAnnotations;

namespace Emplojd.ViewModels___DTOs.Account
{
    public class GeneratePasswordResetTokenRequest
    {
        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }
    }
}
