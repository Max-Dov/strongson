import {TileShape} from '@constants/tile-shape.enum';
import {TileConfig} from '@models/tile-config.model';
import {Tile} from '@models/tile.model';
import {World} from '@models/world.model';
import {rngNumber, rngSegmentIndex} from '@utils/rng.utils';
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
     */
    let worldTile = tiles.get(getTileHash(coordinates, tileShape));
    let tileConfig: TileConfig;
    if (!worldTile) {
        const tileSegments = availableTileConfigs.map(tileConfig => tileConfig.mutationWeight);
        const tileConfigIndex = rngSegmentIndex(seed, epoch, coordinates, tileSegments);
        tileConfig = availableTileConfigs[tileConfigIndex];
    } else {
        const crowdWeightMultipliers = worldTile.crowdWeightMultipliers;
        const tileSegments = availableTileConfigs.map(tileConfig => tileConfig.mutationWeight * crowdWeightMultipliers[tileConfig.id]);
        const tileConfigIndex = rngSegmentIndex(seed, epoch, coordinates, tileSegments);
        tileConfig = availableTileConfigs[tileConfigIndex];
    }

    /**
     * Figure out tile representation.
     */
    const availableRepresentations = tileConfig.representationsIds;
    const rngRepresentationIdIndex = rngNumber(world.seed, world.epoch, coordinates, availableRepresentations.length);
    const representationId = availableRepresentations[rngRepresentationIdIndex];

    const {chanceToMutate, crowdWeightMultipliers} = worldTile || {};

    return {
        configId: tileConfig.id,
        representationId,
        coordinates,
        birthEpoch: world.epoch,
        chanceToMutate: chanceToMutate ? tileConfig.mutationChance * chanceToMutate : tileConfig.mutationChance,
        crowdWeightMultipliers: crowdWeightMultipliers || {},
    };
};