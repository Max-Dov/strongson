using Microsoft.Extensions.Logging;

using WorldIterator.Core.Entities;
using WorldIterator.Core.Interfaces;
using WorldIterator.Core.Interfaces.Services;

namespace WorldIterator.Core.Services
{
    public class WorldIterationService : IWorldIterationService
    {
        private readonly ILogger _logger;
        private readonly IRandomValueGenerationService _randomValueGenerationService;

        public WorldIterationService(
            ILogger<WorldIterationService> logger,
            IRandomValueGenerationService randomValueGenerationService)
        {
            _logger = logger;
            _randomValueGenerationService = randomValueGenerationService;
        }

        public async Task<World> GenerateNextWorldIterationAsync(
            World world,
            IEnumerable<TileConfig> tileConfigs,
            CancellationToken cancellationToken)
        {
            World result = new()
            {
                ConfigId = world.ConfigId,
                Dimensions = world.Dimensions,
                Epoch = world.Epoch + 1,
                Seed = world.Seed
            };

            try
            {
                _logger.LogInformation($"World {result.ConfigId}. Generation of next world iteration begins.");

                _logger.LogInformation($"World {result.ConfigId}. Iteration with mutation check begins.");

                result.Tiles = await IterateWithMutationCheckAsync(
                    world,
                    tileConfigs,
                    cancellationToken);

                _logger.LogInformation($"World {result.ConfigId}. Iteration with mutation check ends.");

                _logger.LogInformation($"World {result.ConfigId}. Iteration with mutation magnitude recalculation begins.");

                result.Tiles = await IterateWithMutationMagnitudeRecalculationAsync(
                    result,
                    tileConfigs,
                    cancellationToken);

                _logger.LogInformation($"World {result.ConfigId}. Iteration with mutation magnitude recalculation ends.");

                _logger.LogInformation($"World {result.ConfigId}. Generation of next world iteration ends.");
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogWarning(
                    $"World {world.ConfigId}. Next iteration generation was canceled. " +
                    $"Details: {ex.Message}");
            }

            return result;
        }

        private async Task<Dictionary<IPosition, Tile>> IterateWithMutationCheckAsync(
            World world,
            IEnumerable<TileConfig> tileConfigs,
            CancellationToken cancellationToken)
        {
            var maximalWorldDimensionValue = world.Dimensions.GetMaximalCoordinate();

            var worldOrderedIterationPath = world.Dimensions
                .GenerateOrderedSpiralPath(
                    world.Dimensions.GetZeroPosition(),
                    maximalWorldDimensionValue)
                .ToList();

            var result = new Dictionary<IPosition, Tile>();

            for (int i = 0; i < worldOrderedIterationPath.Count; i++)
            {
                cancellationToken.ThrowIfCancellationRequested();

                var currentPosition = worldOrderedIterationPath[i];

                if (!world.Tiles.TryGetValue(currentPosition, out var currentTile))
                {
                    continue;
                }

                var mutationCheckRandomValue = _randomValueGenerationService
                    .Generate(
                        world.Seed,
                        world.Epoch + 1,
                        currentPosition, 0
                        );

                if (mutationCheckRandomValue > currentTile.MutationChance)
                {
                    result[currentPosition] = currentTile;
                }
                else
                {
                    var possibleMutationWays =
                        GetPossibleTilesToMutateIn(
                            currentTile,
                            currentPosition,
                            tileConfigs,
                            world.Tiles);

                    result[currentPosition] =
                        GetMutationResult(
                            currentTile,
                            currentPosition,
                            world,
                            possibleMutationWays);
                }
            }

            return result;
        }

        private async Task<Dictionary<IPosition, Tile>> IterateWithMutationMagnitudeRecalculationAsync(
            World world,
            IEnumerable<TileConfig> tileConfigs,
            CancellationToken cancellationToken)
        {
            var maximalWorldDimensionValue = world.Dimensions.GetMaximalCoordinate();

            var worldOrderedIterationPath = world.Dimensions
                .GenerateOrderedSpiralPath(
                    world.Dimensions.GetZeroPosition(),
                    maximalWorldDimensionValue)
                .ToList();

            var result = new Dictionary<IPosition, Tile>();
            foreach(var key in world.Tiles.Keys)
            {
                cancellationToken.ThrowIfCancellationRequested();

                result[key] = world.Tiles[key];
            }

            for (int i = 0; i < worldOrderedIterationPath.Count; i++)
            {
                cancellationToken.ThrowIfCancellationRequested();

                var currentPosition = worldOrderedIterationPath[i];

                if (!world.Tiles.TryGetValue(currentPosition, out var currentTile))
                {
                    continue;
                }

                var currentTileConfig = tileConfigs.First(tileConfig => tileConfig.Id == currentTile.ConfigId);

                var orderedRingOfTiles = Enumerable.Range(1, currentTileConfig.MutationMagnitudeRadius)
                    .SelectMany(radius => world.Dimensions
                        .GenerateOrderedRingPath(currentPosition, radius))
                    .ToList();

                for (int j = 0; j < orderedRingOfTiles.Count; j++)
                {
                    cancellationToken.ThrowIfCancellationRequested();

                    result[orderedRingOfTiles[j]].MutationChance *= currentTileConfig.MutationMagnitude;
                }
            }

            return result;
        }

        private Tile GetMutationResult(
            Tile currentTile,
            IPosition currentPosition,
            World world,
            IEnumerable<TileConfig> tileConfigs)
        {
            if(!tileConfigs.Any())
            {
                return currentTile.Clone() as Tile;
            }

            var tileConfigsSortedList = tileConfigs
                .OrderBy(tileConfig => tileConfig.Id)
                .ToList();

            var cumulative = new List<int>
            {
                tileConfigsSortedList[0].MutationWeight
            };

            for (int i = 1; i < tileConfigsSortedList.Count; i++)
            {
                cumulative.Add(tileConfigsSortedList[i].MutationWeight + tileConfigsSortedList[i - 1].MutationWeight);
            }

            var randomValue = _randomValueGenerationService
                .Generate(world.Seed, world.Epoch, currentPosition, 1);

            var mutationResultValue = randomValue * cumulative.Last();

            int index = Array.BinarySearch(cumulative.ToArray(), randomValue);

            var mutationResultTileConfig = tileConfigsSortedList[index];

            return new Tile
            {
                ConfigId = mutationResultTileConfig.Id,
                Representation = mutationResultTileConfig.Representation,
                MutationChance = mutationResultTileConfig.ChanceToMutate
            };
        }

        private IEnumerable<TileConfig> GetPossibleTilesToMutateIn(
            Tile tile,
            IPosition tilePosition,
            IEnumerable<TileConfig> tileConfigs,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            var result = new List<TileConfig>();

            result.Add(tileConfigs.First(tileConfig => tileConfig.Id == tile.ConfigId));

            result.AddRange(
                tileConfigs
                .Where(tileConfig => tileConfig.Id != tile.ConfigId)
                .Where(tileConfig =>
                {
                    return tileConfig.Neighbors.All(constraint =>
                    {
                        var exactTileAmountInRing = Enumerable
                            .Range(constraint.MinimumDistance, constraint.MaximumDistance - constraint.MinimumDistance)
                            .SelectMany(radius => tilePosition
                                .GenerateOrderedRingPath(tilePosition, radius))
                            .Select(position => map[position])
                            .Where(tile => tile.ConfigId == constraint.NeighborId)
                            .Count();

                        return exactTileAmountInRing <= constraint.MaxAmount &&
                            exactTileAmountInRing >= constraint.MinAmount;
                    });
                }));

            return result;
        }
    }
}