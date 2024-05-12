namespace ChasGPT_Backend.Exceptions.LoginExceptions
{
    public class AccountNotConfirmedException : ApiException
    {
        public override int StatusCode => StatusCodes.Status403Forbidden;
        public AccountNotConfirmedException(string message) : base(message) { }
    }
}
