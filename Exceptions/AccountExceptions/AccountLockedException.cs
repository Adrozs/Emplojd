namespace ChasGPT_Backend.Exceptions.LoginExceptions
{
    public class AccountLockedException : ApiException
    {
        public override int StatusCode => StatusCodes.Status403Forbidden;
        public AccountLockedException(string message) : base(message) { }
    }
}
