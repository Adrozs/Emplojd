﻿namespace Emplojd.Server.ViewModels___DTOs.CoverLetter
{
    public class SaveCoverLetterRequest
    {
        public int? CoverLetterId { get; set; } = null;
        public string CoverLetterTitle { get; set; }
        public string CoverLetterContent { get; set; }
        public string CompanyName { get; set; }
        public DateTime Date { get; set; }
        public float Temperature { get; set; }
    }
}
