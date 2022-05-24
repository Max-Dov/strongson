namespace WorldProcessor.Core.Exceptions
{
    public class InvalidHexagonalDirectionException
        : InvalidDirectionException
    {
        public InvalidHexagonalDirectionException(int directionNumber)
            : base("Hexagonal", directionNumber)
        {
        }
    }
}