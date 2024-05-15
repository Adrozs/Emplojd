namespace ChasGPT_Backend.Exceptions
{
    public abstract class ApiException : Exception
    {
        public abstract int StatusCode { get; }
        protected ApiException(string message) : base(message) { }
        protected ApiException(string message, Exception inner) : base(message, inner) { }


        public virtual IResult ToActionResult()
        {
            return Results.Problem(Message, statusCode: StatusCode);
        }
    }
}
