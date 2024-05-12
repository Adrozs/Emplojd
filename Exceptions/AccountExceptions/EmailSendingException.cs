namespace ChasGPT_Backend.Exceptions.LoginExceptions
{

    public class EmailSendingException : ApiException
    {
        public override int StatusCode => StatusCodes.Status500InternalServerError;
        public EmailSendingException(string message) : base(message) { }
    }
}
