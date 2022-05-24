using Microsoft.Extensions.Logging;
using WorldProcessor.Core.Interfaces;
using WorldProcessor.Core.Interfaces.Services;

namespace WorldProcessor.Core.Services
{
    public class RandomValueGenerationService : IRandomValueGenerationService
    {
        private readonly ILogger _logger;

        public RandomValueGenerationService(
            ILogger<RandomValueGenerationService> logger
            )
        {
            _logger = logger;
        }

        public double Generate(int seed, int epoch, IPosition position, int iteration = 0)
        {
            double seedMix = Math.Abs(Math.Cos(seed));
            double epochMix = Math.Abs(Math.Sin(epoch));
            double coordinatesMix = Math.Abs(Math.Cos(int.Parse(position.GetStringHashCode("17"))));
            double iterationMix = Math.Abs(Math.Sin(iteration));
            var shaking = $"{seedMix}{epochMix}{coordinatesMix}{iterationMix}";

            var result = double.Parse("0." + shaking.Reverse().Take(..^1));

            _logger.LogDebug(
                $"Seed: {seed}, " +
                $"Epoch: {epoch}, " +
                $"Position: ({position.GetStringHashCode(", ")}), " +
                $"Iteration: {iteration} "+
                $"=> {result}");

            return result;
        }
    }
}
