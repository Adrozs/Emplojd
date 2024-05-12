namespace ChasGPT_Backend.Exceptions.LoginExceptions
{
    public class EmailConfirmationException : ApiException
    {
        public override int StatusCode => StatusCodes.Status500InternalServerError;
        public EmailConfirmationException(string message) : base(message) { }
    }
}
