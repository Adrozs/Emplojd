namespace Emplojd.Server.ResultObjects
{
    public class UserProfileResult
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }

        public static UserProfileResult Failed(string message) => new UserProfileResult { Success = false, ErrorMessage = message };
        public static UserProfileResult Successful() => new UserProfileResult { Success = true };
    }
}
