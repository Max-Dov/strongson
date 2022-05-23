namespace WorldIterator.Core.Exceptions
{
    public class InvalidDirectionException : Exception
    {
        protected InvalidDirectionException(string directionName, int directionNumber)
            : base($"Invalid {directionName} direction number - {directionNumber}")
        {
        }
    }
}