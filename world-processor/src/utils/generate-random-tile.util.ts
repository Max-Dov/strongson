import {TileShape} from '@constants/tile-shape.enum';
import {TileConfig} from '@models/tile-config.model';
import {Tile} from '@models/tile.model';
import {World} from '@models/world.model';
import {rngNumber} from '@utils/rng.util';
import {checkIfTileConfigAllowed} from '@utils/check-if-tile-config-acceptable.util';

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
    /**
     * To figure out what tile can exist on given coordinate, list of available TileConfigs should be obtained.
     * Expect that all TileConfigs are available, then for every config check its neighbor constraints.
     * If any constraint fails - tile should be excluded from available TileConfigs.
     */
    const availableTileConfigs = [...tilesConfigs.values()]
        .filter(tileConfig => checkIfTileConfigAllowed(tileConfig, coordinates, world));
    /**
     * Figure out TileConfig.
     */
    const rngConfigIndex = rngNumber(world.seed, world.epoch, coordinates, availableTileConfigs.length);
    const tileConfig = availableTileConfigs[rngConfigIndex];
    /**
     * Figure out tile representation.
     */
    const availableRepresentations = tileConfig.representationsIds;
    const rngRepresentationIdIndex = rngNumber(world.seed, world.epoch, coordinates, availableRepresentations.length);
    const representationId = availableRepresentations[rngRepresentationIdIndex];

    return {
        configId: tileConfig.id,
        representationId,
        coordinates,
        chanceToMutate: tileConfig.mutationChance,
        birthEpoch: world.epoch,
    };
};