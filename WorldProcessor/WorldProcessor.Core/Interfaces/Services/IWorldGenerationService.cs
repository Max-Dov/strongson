using WorldProcessor.Core.Entities;

namespace WorldProcessor.Core.Interfaces.Services
{
    public interface IWorldGenerationService
    {
        public World Generate(
            int seed,
            int epoch,
            WorldConfig worldConfig);

        public World Generate(
            int seed,
            int epoch,
            IPosition dimensions,
            WorldConfig worldConfig);
    }
}
