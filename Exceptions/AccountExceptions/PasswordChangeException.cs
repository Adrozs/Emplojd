namespace ChasGPT_Backend.Exceptions.LoginExceptions
{
    public class PasswordChangeException : ApiException
    {
        public override int StatusCode => StatusCodes.Status400BadRequest;
        public PasswordChangeException(string message) : base(message) { }
    }
}
