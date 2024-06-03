namespace Emplojd.Server.ResultObjects
{
    public class CoverLetterResult
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }

        public static CoverLetterResult Failed(string message) => new CoverLetterResult { Success = false, ErrorMessage = message };
        public static CoverLetterResult Successful() => new CoverLetterResult { Success = true };
    }
}
