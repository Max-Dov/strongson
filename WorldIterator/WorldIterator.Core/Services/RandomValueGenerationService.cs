using Microsoft.Extensions.Logging;
using WorldProcessor.Core.Interfaces;
using WorldProcessor.Core.Interfaces.Services;

namespace WorldProcessor.Core.Services
{
    public class RandomValueGenerationService : IRandomValueGenerationService
    {
        public RandomValueGenerationService()
        { }

        public double Generate(int seed, int epoch, IPosition position, int iteration = 0)
        {
            double seedMix = Math.Abs(Math.Cos(seed));
            double epochMix = Math.Abs(Math.Sin(epoch));
            double coordinatesMix = Math.Abs(Math.Cos(int.Parse(position.GetStringHashCode("17"))));
            double iterationMix = Math.Abs(Math.Sin(iteration));
            var shaking = seedMix + epochMix + coordinatesMix + iterationMix;

            var stringResult = "0," + new string(shaking.ToString().Reverse().Take(..^2).ToArray());


            return double.Parse(stringResult);
        }
    }
}
