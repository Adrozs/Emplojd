﻿namespace Emplojd.Server.ViewModels___DTOs.UserProfile
{
    public class CvManuallyDto
    {

        public int CvManuallyId { get; set; }
        public string PositionEducation { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string SchoolWorkplace { get; set; }
        public bool IsEducation { get; set; }

        public virtual int UserId { get; set; }
    }
}