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

            var shuffledFieldCoordinates = ShuffleCoordinates(
                dimensions.GenerateInitialField(dimensions),
                seed,
                epoch,
                world.Dimensions.GetZeroPosition());

            var tiles = new Dictionary<IPosition, Tile>();

            foreach(var currentPosition in shuffledFieldCoordinates)
            {
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

        private List<IPosition> ShuffleCoordinates(
            IReadOnlyList<IPosition> original,
            int seed,
            int epoch,
            IPosition coordnates)
        {
            var result = original.Select(el => el).ToList();

            for(var i = 0; i < result.Count - 1; i++)
            {
                var randomValue = _randomValueGenerationService
                    .Generate(
                        seed,
                        epoch,
                        coordnates,
                        0);

                var newPosition = (int)Math.Truncate(randomValue * (i + 1));

                var temp = result[i];
                result[i] = result[newPosition];
                result[newPosition] = temp;
            }

            return result;
        }

        private Tile GenerateTile(
            int seed,
            int epoch,
            IPosition position,
            IEnumerable<TileConfig> tileConfigs,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            var availableTileConfigs = GetAvailableTilesForPosition(
                position,
                tileConfigs,
                map);

            var tileConfig = ChooseRightTileConfigForPosition(
                seed,
                epoch,
                position,
                map,
                availableTileConfigs);

            var representationId = GenerateTileRepresentation(
                seed,
                epoch,
                position,
                tileConfig.RepresentationsIds);

            map.TryGetValue(position, out var placeholderTile);

            return new Tile()
            {
                ConfigId = tileConfig.Id,
                RepresentationId = representationId,
                MutationChance = placeholderTile is null
                    ? tileConfig.MutationChance
                    : tileConfig.MutationChance * placeholderTile.MutationChance,
                MutationWeightMultipliers = placeholderTile is null
                    ? new Dictionary<string, double>()
                    : placeholderTile.MutationWeightMultipliers,
                BirthEpoch = epoch,
            };
        }

        private string GenerateTileRepresentation(
            int seed,
            int epoch,
            IPosition position,
            IReadOnlyList<string> representationIds)
        {
            var randomValue = _randomValueGenerationService.Generate(
                seed,
                epoch,
                position,
                2);

            return representationIds.ElementAt(
                (int)(randomValue * representationIds.Count));
        }

        private TileConfig ChooseRightTileConfigForPosition(
            int seed,
            int epoch,
            IPosition position,
            IReadOnlyDictionary<IPosition, Tile> map,
            IReadOnlyList<TileConfig> tileConfigs)
        {
            if(tileConfigs.Count == 1) {
                return tileConfigs[0];
            }

            var mutationWeights = tileConfigs
                .Select(tileConfig => tileConfig.MutationWeight)
                .ToList();

            if (map.TryGetValue(position, out var tile))
            {
                for(var i = 0; i < tileConfigs.Count; i++)
                {
                    if(tile.MutationWeightMultipliers
                        .TryGetValue(tileConfigs[i].Id, out var multiplier))
                    {
                        mutationWeights[i] *= multiplier;
                    }
                }
            }

            var cumulative = new double[mutationWeights.Count];
            cumulative[0] = mutationWeights[0];
            for (var i = 1; i < mutationWeights.Count; i++)
            {
                cumulative[i] = cumulative[i - 1] + mutationWeights[i];
            }

            var randomValue = _randomValueGenerationService
                .Generate(seed, epoch, position, 1) * cumulative.Last();

            var index = Array.BinarySearch(cumulative, randomValue);
            index = index < 0 ? ~index : index;

            return tileConfigs[index];
        }

        private List<TileConfig> GetAvailableTilesForPosition(
            IPosition tilePosition,
            IEnumerable<TileConfig> tileConfigs,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            return tileConfigs
                .Where(tileConfig => CheckIfTileCanBePlacedAtPosition(
                    tileConfig,
                    tilePosition,
                    map))
                .ToList();
        }

        private bool CheckIfTileCanBePlacedAtPosition(
            TileConfig tileConfig,
            IPosition tilePosition,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            return !tileConfig.Neighbors.Any(
                constraint => !CheckIfConstraintIsSatisfied(constraint, tilePosition, map));
        }

        private bool CheckIfConstraintIsSatisfied(
            NeighborConstraint constraint,
            IPosition position,
            IReadOnlyDictionary<IPosition, Tile> map)
        {
            IEnumerable<IPosition> region = Enumerable.Empty<IPosition>();

            if(constraint.MinDistance is not null)
            {

                var possibleTraspassersCoordinates = position.GenerateOrderedSpiralPath(
                    position,
                    constraint.MinDistance.Value);

                var filteredCoordinates = map.Keys
                    .Intersect(possibleTraspassersCoordinates)
                    .ToList();

                for(var i = 0; i < filteredCoordinates.Count; i++)
                {
                    if (map[filteredCoordinates[i]].ConfigId == constraint.NeighborConfigId)
                    {
                        return false;
                    }
                }

                // First prototype of algorithm
                //var TraspassersCount = map.Keys
                //    .Intersect(possibleTraspassersCoordinates)
                //    .Select(coordinates => map[coordinates].ConfigId)
                //    .Where(configId => configId == constraint.NeighborConfigId)
                //    .Count();

                //if(TraspassersCount > 0)
                //{
                //    return false;
                //}
            }

            var neighboursCooridnates = new List<IPosition>();
            var min = constraint.MinDistance.GetValueOrDefault(1);
            var max = constraint.MaxDistance.GetValueOrDefault(1);
            for(var radius = min; radius <= max; radius++)
            {
                neighboursCooridnates.AddRange(
                    position.GenerateOrderedRingPath(
                        position,
                        radius));
            }

            var filteredNeigbourCoordinates = map.Keys
                .Intersect(neighboursCooridnates)
                .ToList();

            var constraintNeighboursAmount = 0;
            for (var i = 0; i < filteredNeigbourCoordinates.Count; i++)
            {
                if (map[filteredNeigbourCoordinates[i]].ConfigId == constraint.NeighborConfigId)
                {
                    constraintNeighboursAmount++;
                }
                if (constraintNeighboursAmount > constraint.MaxAmount ||
                   ((constraint.MinAmount is not null) && constraintNeighboursAmount > constraint.MinAmount))
                {
                    return false;
                }
            }

            return true;

            // First prototype of algorithm
            //var constraintNeighboursAmount = neighboursCooridnates
            //    .Select(coordinates => map[coordinates].ConfigId)
            //    .Where(configId => configId == constraint.NeighborConfigId)
            //    .Count();

            //return constraintNeighboursAmount <= constraint.MaxAmount &&
            //    (!(constraint.MinAmount is not null) || constraintNeighboursAmount <= constraint.MinAmount);
        }

        private Dictionary<IPosition, Tile> RecalculateMutationChances(
            IReadOnlyDictionary<IPosition, Tile> map,
            IEnumerable<TileConfig> tileConfigs)
        {
            var result = new Dictionary<IPosition, Tile>();

            foreach (var position in map.Keys)
            {
                if (!result.ContainsKey(position))
                {
                    result.Add(position, map[position]);
                }

                var tileConfig = tileConfigs
                    .First(config => config.Id == map[position].ConfigId);

                if (tileConfig.MutationWeightMultiplier is not null &&
                    tileConfig.MutationWeightMultiplierRadius is not null)
                {
                    var neighbourPositions = map.Keys
                        .Intersect(
                            position.GenerateOrderedSpiralPath(
                                position,
                                tileConfig.MutationWeightMultiplierRadius.Value));

                    foreach (var neighbourPosition in neighbourPositions)
                    {
                        if (!result.ContainsKey(neighbourPosition))
                        {
                            result.Add(neighbourPosition, map[neighbourPosition]);
                        }

                        var neighbour = result[neighbourPosition];

                        if(!neighbour.MutationWeightMultipliers.ContainsKey(tileConfig.Id))
                        {
                            neighbour.MutationWeightMultipliers[tileConfig.Id] = 1;
                        }

                        neighbour.MutationWeightMultipliers[tileConfig.Id] *= 
                            tileConfig.MutationWeightMultiplier.Value;
                    }
                }

                if (tileConfig.MutationChanceMultiplier is not null &&
                    tileConfig.MutationChanceMultiplierRadius is not null)
                {
                    var neighbourPositions = map.Keys
                        .Intersect(
                            position.GenerateOrderedSpiralPath(
                                position,
                                tileConfig.MutationChanceMultiplierRadius.Value));

                    foreach (var neighbourPosition in neighbourPositions)
                    {
                        result[neighbourPosition].MutationChance *=
                            tileConfig.MutationChanceMultiplier.Value;
                    }
                }
            }

            return result;
        }
    }
}
