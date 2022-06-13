using WorldProcessor.Core.Entities;

namespace WorldProcessor.Core.Interfaces.Services
{
    public interface IWorldGenerationService
    {
        public World Generate(
            int seed,
            WorldConfig worldConfig);

        public World Generate(
            IPosition dimensions,
            int seed,
            WorldConfig worldConfig);
    }
}
