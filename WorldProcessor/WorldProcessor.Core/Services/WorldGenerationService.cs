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

        public World Generate(int seed, int epoch, WorldConfig worldConfig)
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

            return Generate(seed, epoch, dimensions, worldConfig);
        }

        public World Generate(int seed, int epoch, IPosition dimensions, WorldConfig worldConfig)
        {
            var world = new World()
            {
                ConfigId = worldConfig.Id,
                Epoch = epoch,
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
                        epoch,
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
            int epoch,
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
                epoch,
                position);

            var resultTileConfigIndex = (int)(tileChoiseRollResult * availableTilesForPosition.Count());

            var tileConfig = availableTilesForPosition.ElementAt(resultTileConfigIndex);

            var representationId = GenerateTileRepresentation(
                seed,
                epoch,
                position,
                tileConfig.RepresentationsIds);

            return new Tile()
            {
                ConfigId = tileConfig.Id,
                BirthEpoch = 0,
                RepresentationId = representationId,
                MutationChance = tileConfig.MutationChance
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

        private IEnumerable<TileConfig> GetAvailableTilesForPosition(
            IPosition tilePosition,
            IEnumerable<TileConfig> tileConfigs,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            var result = new List<TileConfig>();

            result.AddRange(
                tileConfigs
                .Where(tileConfig => CheckIfTileCanBePlacedAtPosition(
                    tileConfig,
                    tilePosition,
                    map)));

            return result;
        }

        private bool CheckIfTileCanBePlacedAtPosition(
            TileConfig tileConfig,
            IPosition tilePosition,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            foreach (var constraint in tileConfig.Neighbors)
            {
                IEnumerable<IPosition> region;

                if (constraint.MaxDistance > 0)
                {
                    var spiralPath = tilePosition.GenerateOrderedSpiralPath(
                        tilePosition,
                        constraint.MaxDistance);

                    region = map.Keys.Intersect(spiralPath);
                }
                else
                {
                    region = map.Keys;
                }

                if (constraint.MinDistance > 0)
                {
                    var spiralPath = tilePosition.GenerateOrderedSpiralPath(
                        tilePosition,
                        constraint.MinDistance);

                    region = region.Except(spiralPath);
                }

                var exactTileAmountInRing = 0;
                foreach (var position in region)
                {
                    if (map[position].ConfigId == constraint.NeighborConfigId)
                    {
                        exactTileAmountInRing++;
                    }

                    if (exactTileAmountInRing > constraint.MaxAmount ||
                        exactTileAmountInRing < constraint.MinAmount)
                    {
                        return false;
                    }
                }
            }

            return true;
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
                        (oldMutationChance * currentTileConfig.CrowdWeightMultiplier);
                }
            }

            return result;
        }
    }
}
