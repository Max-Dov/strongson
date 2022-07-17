import {TileShape} from '@constants/tile-shape.enum';
import {TileConfig} from '@models/tile-config.model';
import {Tile} from '@models/tile.model';
import {World} from '@models/world.model';
import {rngInteger, rngSegmentIndex} from '@utils/rng.utils';
import {checkIfTileConfigIsAllowed} from '@utils/check-if-tile-config-is-allowed.util';
import {getTileHash} from '@utils/get-tile-hash.util';

// TODO info about neighboring tiles should be shared with other constraint checks as otherwise it takes time to do same search operation for every constraint.
// TODO number of "all tiles" in world should be shared with constraint checks to allow "maxDistance" constraint to be optional.

/**
 * For given coordinates, generates random tile.
 * @param tilesConfigs - tiles configs for that world.
 * @param world - world with all tiles; used for figuring out what tile can exist there; used in rng
 * @param coordinates - new tile coordinates; used in rng
 */
export const generateRandomTile = <Shape extends TileShape>(
    coordinates: Tile<Shape>['coordinates'],
    tilesConfigs: TileConfig[],
    world: World<Shape>,
): Tile<Shape> => {
    const {seed, epoch, tileShape, tiles} = world;

    /**
     * To figure out what tile can exist on given coordinate, list of available TileConfigs should be obtained.
     * Expect that all TileConfigs are available, then for every config check its neighbor constraints.
     * If any constraint fails - tile should be excluded from available TileConfigs.
     */
    const availableTileConfigs = [...tilesConfigs.values()]
        .filter(tileConfig => checkIfTileConfigIsAllowed(tileConfig, coordinates, world));

    /**
     * Figure out tileConfig.
     * Make sure to account for tile "crowdWeightMultipliers" and base "mutationWeight" for a tile config.
     */
    let tileConfig: TileConfig;
    // tile info that already existed on given coordinate
    let placeholderTile = tiles[getTileHash(coordinates, tileShape)];
    const crowdWeightMultipliers = placeholderTile.crowdWeightMultipliers || {};
    {
        const tileSegments = availableTileConfigs.map(tileConfig => {
            const crowdWeightMultiplier = crowdWeightMultipliers[tileConfig.id] || 1;
            return tileConfig.mutationWeight * crowdWeightMultiplier;
        });
        const tileConfigIndex = rngSegmentIndex(seed, epoch, coordinates, tileSegments);
        tileConfig = availableTileConfigs[tileConfigIndex];
    }

    /**
     * Figure out tile representation.
     */
    const availableRepresentations = tileConfig.representationsIds;
    const rngRepresentationIdIndex = rngInteger(world.seed, world.epoch, coordinates, availableRepresentations.length);
    const representationId = availableRepresentations[rngRepresentationIdIndex];

    return {
        configId: tileConfig.id,
        representationId,
        coordinates,
        birthEpoch: world.epoch,
        chanceToMutate: tileConfig.mutationChance * (placeholderTile.chanceToMutate || 1),
        crowdWeightMultipliers,
    };
};