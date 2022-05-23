using WorldIterator.Core.Entities;

namespace WorldIterator.Core.Interfaces.Services
{
    public interface IWorldIterationService
    {
        public Task<World> GenerateNextWorldIterationAsync(
            World world,
            IEnumerable<TileConfig> tileConfigs,
            CancellationToken cancellationToken);
    }
}