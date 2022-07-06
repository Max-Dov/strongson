using WorldProcessor.Core.Entities;

namespace WorldProcessor.Core.Interfaces.Services
{
    public interface IWorldIterationService
    {
        public World GenerateNextWorldIteration(
            World world,
            List<TileConfig> tileConfigs);
    }
}