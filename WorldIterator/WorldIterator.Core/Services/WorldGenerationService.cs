using WorldProcessor.Core.Interfaces;
using WorldProcessor.Core.Interfaces.Services;
using WorldProcessor.Core.Entities;
using WorldProcessor.Core.ValueTypes;

namespace WorldProcessor.Core.Services
{
    public class WorldGenerationService : IWorldGenerationService
    {
        private readonly RandomValueGenerationService _randomValueGenerationService;

        public WorldGenerationService()
        {
            _randomValueGenerationService = new RandomValueGenerationService();
        }

        public World Generate(int seed, WorldConfig worldConfig)
        {
            IPosition dimensions;
            if(worldConfig.TileShape.Equals("HEXAGONAL", StringComparison.OrdinalIgnoreCase))
            {
                dimensions = new Position3(10, 10, 10);
            }
            else if(worldConfig.TileShape.Equals("TETRAGONAL", StringComparison.OrdinalIgnoreCase))
            {
                dimensions = new Position2(50, 50);
            }
            else
            {
                throw new ArgumentException($"Invalid tile shape: {worldConfig.TileShape}", nameof(worldConfig.TileShape));
            }

            return Generate(dimensions, seed, worldConfig);
        }

        public World Generate(IPosition dimensions, int seed, WorldConfig worldConfig)
        {
            var world = new World()
            {
                ConfigId = worldConfig.Id,
                TileShape = worldConfig.TileShape,
                Dimensions = dimensions,
                Seed = seed
            };

            var maximalWorldDimensionValue = world.Dimensions.GetMaximalCoordinate();

            var worldOrderedIterationPath = world.Dimensions
                .GenerateOrderedSpiralPath(
                    world.Dimensions.GetZeroPosition(),
                    maximalWorldDimensionValue)
                .ToList();

            var tiles = new Dictionary<IPosition, Tile>();

            for (int i = 0; i < worldOrderedIterationPath.Count; i++)
            {
                var currentPosition = worldOrderedIterationPath[i];

                var tile = GenerateTile(
                        seed,
                        currentPosition,
                        worldConfig.Tiles,
                        tiles);

                tiles.Add(currentPosition, tile);
            }

            tiles = RecalculateMutationChances(
                tiles,
                worldConfig.Tiles);

            world.Tiles = tiles;

            return world;
        }

        private Tile GenerateTile(
            int seed,
            IPosition position,
            IEnumerable<TileConfig> tileConfigs,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            var availableTilesForPosition = GetAvailableTilesForPosition(
                position,
                tileConfigs,
                map);

            var tileChoiseRollResult = _randomValueGenerationService.Generate(
                seed,
                0,
                position);

            var resultTileConfigIndex = (int)(tileChoiseRollResult * availableTilesForPosition.Count());

            var tileConfig = availableTilesForPosition.ElementAt(resultTileConfigIndex);

            return new Tile()
            {
                ConfigId = tileConfig.Id,
                BirthEpoch = 0,
                Representation = "",
                MutationChance = tileConfig.MutationChance
            };
        }

        private IEnumerable<TileConfig> GetAvailableTilesForPosition(
            IPosition tilePosition,
            IEnumerable<TileConfig> tileConfigs,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            var result = new List<TileConfig>();

            result.AddRange(
                tileConfigs
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

        private Dictionary<IPosition, Tile> RecalculateMutationChances(
            IReadOnlyDictionary<IPosition, Tile> map,
            IEnumerable<TileConfig> tileConfigs)
        {
            var result = map.ToDictionary(
                entry => entry.Key,
                entry => (Tile)entry.Value.Clone());

            foreach(var position in map.Keys)
            {
                var currentTileConfig = tileConfigs.First(tileConfig => map[position].ConfigId == tileConfig.Id);

                var orderedRingOfTiles = Enumerable.Range(1, currentTileConfig.CrowdWeightMultiplierRadius)
                    .SelectMany(radius => position.GenerateOrderedRingPath(position, radius))
                    .ToList();

                foreach(var tilePosition in orderedRingOfTiles)
                {
                    if (!map.ContainsKey(tilePosition))
                    {
                        continue;
                    }

                    var oldMutationChance = map[tilePosition].MutationChance;

                    result[tilePosition].MutationChance =
                        (int)(oldMutationChance * currentTileConfig.CrowdWeightMultiplier);
                }
            }

            return result;
        }
    }
}
