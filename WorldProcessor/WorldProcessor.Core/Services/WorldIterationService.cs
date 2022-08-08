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
            List<TileConfig> tileConfigs)
        {
            return world;

            //var epoch = world.Epoch + 1;

            //var tilesMap = GetMapWithMutatedTiles(
            //    world.Tiles, tileConfigs, epoch, world.Seed);

            //tilesMap = GetMapWithRecalculatedMutationChances(tilesMap, tileConfigs);

            //return new World()
            //{
            //    ConfigId = world.ConfigId,
            //    Dimensions = world.Dimensions,
            //    TileShape = world.TileShape,
            //    Epoch = epoch,
            //    Seed = world.Seed,
            //    Tiles = tilesMap,
            //};
        }

        // TODO: Rework world iteration
        //private Dictionary<IPosition, Tile> GetMapWithMutatedTiles(
        //    IReadOnlyDictionary<IPosition, Tile> map,
        //    List<TileConfig> tileConfigs,
        //    int epoch,
        //    int seed)
        //{
        //    var result = new Dictionary<IPosition, Tile>();

        //    foreach (var position in map.Keys)
        //    {
        //        var tile = map[position];
        //        var tileConfig = tileConfigs.First(config => config.Id == tile.ConfigId);

        //        if (IsTileNeedToMutate(tile, position, tileConfig, epoch, seed))
        //        {
        //            var possibleMutations =
        //                GetPossibleTilesToMutateIn(
        //                    tile,
        //                    position,
        //                    tileConfigs,
        //                    result);

        //            var mutatedTile =
        //                GetMutatedTile(
        //                    position,
        //                    possibleMutations,
        //                    epoch,
        //                    seed);

        //            result.Add(position, mutatedTile);
        //        }
        //        else
        //        {
        //            result.Add(position, tile);
        //        }
        //    }

        //    return result;
        //}

        //private Dictionary<IPosition, Tile> GetMapWithRecalculatedMutationChances(
        //    IReadOnlyDictionary<IPosition, Tile> map,
        //    List<TileConfig> tileConfigs)
        //{
        //    var result = new Dictionary<IPosition, Tile>();

        //    foreach (var position in map.Keys)
        //    {
        //        var tile = map[position];
        //        var tileConfig = tileConfigs.First(config => config.Id == tile.ConfigId);

        //        if (!result.ContainsKey(position))
        //        {
        //            result.Add(position, tile);
        //        }

        //        var affectedPositionsList = position
        //            .GenerateOrderedSpiralPath(
        //                position,
        //                tileConfig.CrowdWeightMultiplierRadius)
        //            .Where(tilePosition => map.ContainsKey(tilePosition))
        //            .ToList();

        //        foreach(var affectedPosition in affectedPositionsList)
        //        {
        //            if (!result.ContainsKey(affectedPosition))
        //            {
        //                result.Add(affectedPosition, (Tile)map[affectedPosition].Clone());
        //            }

        //            result[affectedPosition].MutationChance *= tileConfig.CrowdWeightMultiplier;
        //        }
        //    }

        //    return result;
        //}

        //private bool IsTileNeedToMutate(
        //    Tile tile,
        //    IPosition position,
        //    TileConfig config,
        //    int epoch,
        //    int seed)
        //{
        //    var tileAge = epoch - tile.BirthEpoch;

        //    if(tileAge > config.MaxAge)
        //    {
        //        return true;
        //    }

        //    if(tileAge < config.MinAge)
        //    {
        //        return false;
        //    }

        //    var randomValue = _randomValueGenerationService
        //        .Generate(
        //            seed,
        //            epoch,
        //            position,
        //            0);

        //    return tile.MutationChance >= randomValue * 100;
        //}

        //private List<TileConfig> GetPossibleTilesToMutateIn(
        //    Tile tile,
        //    IPosition tilePosition,
        //    IEnumerable<TileConfig> tileConfigs,
        //    IReadOnlyDictionary<IPosition, Tile> map)
        //{
        //    var result = new List<TileConfig>();

        //    result.Add(tileConfigs.First(tileConfig => tileConfig.Id == tile.ConfigId));

        //    result.AddRange(
        //        tileConfigs
        //        .Where(tileConfig => tileConfig.Id != tile.ConfigId)
        //        .Where(tileConfig => CheckIfTileCanBePlacedAtPosition(
        //            tileConfig,
        //            tilePosition,
        //            map)));

        //    return result;
        //}

        //private bool CheckIfTileCanBePlacedAtPosition(
        //    TileConfig tileConfig,
        //    IPosition tilePosition,
        //    IReadOnlyDictionary<IPosition, Tile> map)
        //{
        //    foreach(var constraint in tileConfig.Neighbors)
        //    {
        //        IEnumerable<IPosition> region;

        //        if(constraint.MaxDistance > 0)
        //        {
        //            var spiralPath = tilePosition.GenerateOrderedSpiralPath(
        //                tilePosition,
        //                constraint.MaxDistance);

        //            region = map.Keys.Intersect(spiralPath);
        //        }
        //        else
        //        {
        //            region = map.Keys;
        //        }

        //        if(constraint.MinDistance > 0)
        //        {
        //            var spiralPath = tilePosition.GenerateOrderedSpiralPath(
        //                tilePosition,
        //                constraint.MinDistance);

        //            region = region.Except(spiralPath);
        //        }

        //        var exactTileAmountInRing = 0;
        //        foreach(var position in region)
        //        {
        //            if(map[position].ConfigId == constraint.NeighborConfigId)
        //            {
        //                exactTileAmountInRing++;
        //            }

        //            if (exactTileAmountInRing > constraint.MaxAmount ||
        //                exactTileAmountInRing < constraint.MinAmount)
        //            {
        //                return false;
        //            }
        //        }
        //    }

        //    return true;
        //}

        //private Tile GetMutatedTile(
        //    IPosition position,
        //    List<TileConfig> possibleMutations,
        //    int epoch,
        //    int seed)
        //{
        //    var tileConfigsSortedList = possibleMutations
        //        .OrderBy(tileConfig => tileConfig.Id)
        //        .ToList();

        //    var cumulative = new List<int>
        //    {
        //        tileConfigsSortedList[0].MutationWeight
        //    };

        //    for (int i = 1; i < tileConfigsSortedList.Count; i++)
        //    {
        //        cumulative.Add(cumulative.Last() + tileConfigsSortedList[i].MutationWeight);
        //    }

        //    var randomValue = _randomValueGenerationService
        //        .Generate(seed, epoch, position, 1);

        //    var mutationResultValue = (int)(randomValue * cumulative.Last());

        //    int index = Array.BinarySearch(cumulative.ToArray(), mutationResultValue);

        //    if (index < 0)
        //    {
        //        index = ~index;
        //    }

        //    var mutationResultTileConfig = tileConfigsSortedList[index];

        //    var representationId = GenerateTileRepresentation(
        //        seed,
        //        epoch,
        //        position,
        //        mutationResultTileConfig.RepresentationsIds);

        //    return new Tile
        //    {
        //        ConfigId = mutationResultTileConfig.Id,
        //        RepresentationId = representationId,
        //        MutationChance = mutationResultTileConfig.MutationChance,
        //        BirthEpoch = epoch
        //    };
        //}

        //private string GenerateTileRepresentation(
        //    int seed,
        //    int epoch,
        //    IPosition position,
        //    List<string> representationIds)
        //{
        //    var randomValue = _randomValueGenerationService.Generate(
        //        seed,
        //        epoch,
        //        position,
        //        2);

        //    return representationIds.ElementAt(
        //        (int)(randomValue * representationIds.Count()));
        //}
    }
}