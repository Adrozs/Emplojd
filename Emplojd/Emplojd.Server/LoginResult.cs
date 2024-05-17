namespace Emplojd
{
    public class LoginResult
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public string ErrorMessage { get; set; }

        public static LoginResult Failed(string message) => new LoginResult { Success = false, ErrorMessage = message };
        public static LoginResult Successful(string token) => new LoginResult { Success = true, Token = token};
    }
}
