namespace WorldIterator.Core.Interfaces.Services
{
    public interface IRandomValueGenerationService
    {
        public double Generate(int seed, int epoch, IPosition position, int iteration = 0);
    }
}
