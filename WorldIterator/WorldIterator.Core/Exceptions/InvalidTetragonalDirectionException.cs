namespace WorldIterator.Core.Exceptions
{
    public class InvalidTetragonalDirectionException
        : InvalidDirectionException
    {
        public InvalidTetragonalDirectionException(int directionNumber)
            : base ("Tetragonal", directionNumber)
        {
        }
    }
}