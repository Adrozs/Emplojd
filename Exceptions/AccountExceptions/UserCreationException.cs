namespace ChasGPT_Backend.Exceptions.LoginExceptions
{
    public class UserCreationException : ApiException
    {
        public override int StatusCode => StatusCodes.Status400BadRequest;
        public UserCreationException(string message) : base(message) { }
    }
}
