namespace ChasGPT_Backend.Exceptions.JobAdExceptions
{
    public class ExternalApiException : ApiException
    {
        public override int StatusCode => StatusCodes.Status502BadGateway;

        public ExternalApiException(string message) : base(message) { }
        public ExternalApiException(string message, Exception inner) : base(message, inner) { }
    }

    public class ResourceNotFoundException : ExternalApiException
    {
        public override int StatusCode => StatusCodes.Status404NotFound;
        public ResourceNotFoundException(string message) : base(message) { }
    }

    public class RateLimitExceededException : ExternalApiException
    {
        public override int StatusCode => StatusCodes.Status429TooManyRequests;
        public RateLimitExceededException(string message) : base(message) { }
    }

}
