using WorldProcessor.Core.Entities;

namespace WorldProcessor.Core.Interfaces.Services
{
    public interface IWorldIterationService
    {
        public Task<World> GenerateNextWorldIterationAsync(
            World world,
            IEnumerable<TileConfig> tileConfigs,
            CancellationToken cancellationToken);
    }
}