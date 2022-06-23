using Microsoft.Extensions.Logging;

using WorldProcessor.Core.Entities;
using WorldProcessor.Core.Interfaces;
using WorldProcessor.Core.Interfaces.Services;

namespace WorldProcessor.Core.Services
{
    public class WorldIterationService : IWorldIterationService
    {
        private readonly RandomValueGenerationService _randomValueGenerationService;

        public WorldIterationService()
        {
            _randomValueGenerationService = new RandomValueGenerationService();
        }

        public World GenerateNextWorldIteration(
            World world,
            IEnumerable<TileConfig> tileConfigs)
        {
            World result = new()
            {
                ConfigId = world.ConfigId,
                Dimensions = world.Dimensions,
                TileShape = world.TileShape,
                Epoch = world.Epoch + 1,
                Seed = world.Seed,
                Tiles = world.Tiles.ToDictionary(
                    entry => entry.Key,
                    entry => (Tile)entry.Value.Clone()),
            };


            result.Tiles = IterateWithMutationCheck(
                result,
                tileConfigs);

            result.Tiles = IterateWithMutationMagnitudeRecalculation(
                result,
                tileConfigs);


            return result;
        }

        private Dictionary<IPosition, Tile> IterateWithMutationCheck(
            World world,
            IEnumerable<TileConfig> tileConfigs)
        {
            var maximalWorldDimensionValue = world.Dimensions.GetMaximalCoordinate();

            var worldOrderedIterationPath = world.Dimensions
                .GenerateOrderedSpiralPath(
                    world.Dimensions.GetZeroPosition(),
                    maximalWorldDimensionValue)
                .ToList();

            var result = world.Tiles.ToDictionary(
                entry => entry.Key,
                entry => (Tile)entry.Value.Clone());

            for (int i = 0; i < worldOrderedIterationPath.Count; i++)
            {
                var currentPosition = worldOrderedIterationPath[i];

                if (!world.Tiles.TryGetValue(currentPosition, out var currentTile))
                {
                    continue;
                }

                var tileConfig = tileConfigs.First(config => currentTile.ConfigId == config.Id);

                if(IsTileNeedToMutate(currentTile, currentPosition, tileConfig, world))
                {
                    var possibleMutationWays =
                        GetPossibleTilesToMutateIn(
                            currentTile,
                            currentPosition,
                            tileConfigs,
                            result);

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

        private Dictionary<IPosition, Tile> IterateWithMutationMagnitudeRecalculation(
            World world,
            IEnumerable<TileConfig> tileConfigs)
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
                result[key] = world.Tiles[key];
            }

            for (int i = 0; i < worldOrderedIterationPath.Count; i++)
            {
                var currentPosition = worldOrderedIterationPath[i];

                if (!world.Tiles.TryGetValue(currentPosition, out var currentTile))
                {
                    continue;
                }

                var currentTileConfig = tileConfigs.First(tileConfig => tileConfig.Id == currentTile.ConfigId);

                var orderedRingOfTiles = Enumerable.Range(1, currentTileConfig.CrowdWeightMultiplierRadius)
                    .SelectMany(radius => world.Dimensions
                        .GenerateOrderedRingPath(currentPosition, radius))
                    .ToList();

                for (int j = 0; j < orderedRingOfTiles.Count; j++)
                {
                    if (!result.ContainsKey(orderedRingOfTiles[j]))
                    {
                        continue;
                    }

                    var oldMutationChance = result[orderedRingOfTiles[j]].MutationChance;

                    result[orderedRingOfTiles[j]].MutationChance = 
                        (oldMutationChance * currentTileConfig.CrowdWeightMultiplier);
                }
            }

            return result;
        }

        private bool IsTileNeedToMutate(Tile tile, IPosition position, TileConfig config, World world)
        {
            var tileAge = world.Epoch - tile.BirthEpoch;

            if(tileAge > config.MaxAge)
            {
                return true;
            }

            if(tileAge < config.MinAge)
            {
                return false;
            }

            var randomValue = _randomValueGenerationService
                .Generate(
                    world.Seed,
                    world.Epoch,
                    position, 0
                    );

            return tile.MutationChance >= randomValue * 100;
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
                cumulative.Add(cumulative.Last() + tileConfigsSortedList[i].MutationWeight);
            }

            var randomValue = _randomValueGenerationService
                .Generate(world.Seed, world.Epoch, currentPosition, 1);

            var mutationResultValue = (int)(randomValue * cumulative.Last());

            int index = Array.BinarySearch(cumulative.ToArray(), mutationResultValue);

            if(index < 0)
            {
                index = ~index;
            }

            var mutationResultTileConfig = tileConfigsSortedList[index];

            var representationId = GenerateTileRepresentation(
                world.Seed,
                world.Epoch,
                currentPosition,
                mutationResultTileConfig.RepresentationsIds);

            return new Tile
            {
                ConfigId = mutationResultTileConfig.Id,
                RepresentationId = representationId,
                MutationChance = mutationResultTileConfig.MutationChance,
                BirthEpoch = world.Epoch
            };
        }

        private string GenerateTileRepresentation(
            int seed,
            int epoch,
            IPosition position,
            IEnumerable<string> representationIds)
        {
            var randomValue = _randomValueGenerationService.Generate(
                seed,
                epoch,
                position,
                2);

            return representationIds.ElementAt(
                (int)(randomValue * representationIds.Count()));
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
                            .Range(constraint.MinDistance, constraint.MaxDistance - constraint.MinDistance)
                            .SelectMany(radius => tilePosition
                                .GenerateOrderedRingPath(tilePosition, radius))
                            .Where(position => map.ContainsKey(position))
                            .Select(position => map[position])
                            .Where(tile => tile.ConfigId == constraint.NeighborConfigId)
                            .Count();

                        return exactTileAmountInRing <= constraint.MaxAmount &&
                            exactTileAmountInRing >= constraint.MinAmount;
                    });
                }));

            return result;
        }
    }
}