namespace ChasGPT_Backend.Exceptions.LoginExceptions
{
    public class InvalidLoginAttemptException : ApiException
    {
        public override int StatusCode => StatusCodes.Status401Unauthorized;
        public InvalidLoginAttemptException(string message) : base(message) { }
    }
}
