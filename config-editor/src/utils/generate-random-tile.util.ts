import {Tile} from '../models/tile.model';
import {TileConfig} from '../models/tile-config.model';
import {World} from '../models/world.model';
import {rngNumber} from './rng.util';
import {WorldGeometry} from '../constants/world-geometry.model';
import {getIsTileConfigAllowed} from './get-is-tile-config-allowed.util';

/**
 * For given coordinates, create random tile.
 * @param tilesConfigs - tiles configs for that world.
 * @param world - world with all tiles; used for figuring out what tile can exist there; used in rng
 * @param coordinates - new tile coordinates; used in rng
 */
export const generateRandomTile = <Geometry extends WorldGeometry>(
    tilesConfigs: TileConfig[],
    world: World<Geometry>,
    coordinates: Tile<Geometry>['coordinates']
): Tile<Geometry> => {
    /**
     * To figure out what tile can exist on given coordinate, list of available TileConfigs should be obtained.
     * Expect that all TileConfigs are available, then for every config check its neighbor constraints.
     * If any constraint fails - tile should be excluded from available TileConfigs.
     */
    const availableTileConfigs = [...tilesConfigs.values()].filter(tileConfig => getIsTileConfigAllowed(tileConfig, coordinates, world));
    /**
     * Figure out TileConfig.
     */
    const rngConfigIndex = rngNumber(world.seed, world.epoch, coordinates, availableTileConfigs.length)
    const tileConfig = availableTileConfigs[rngConfigIndex];
    /**
     * Figure out tile representation.
     */
    const availableRepresentation = tileConfig.representation;
    let representation = availableRepresentation as string;
    if (Array.isArray(availableRepresentation)) {
        const rngRepresentationIndex = rngNumber(world.seed, world.epoch, coordinates, availableRepresentation.length)
        representation = availableRepresentation[rngRepresentationIndex];
    }
    return {
        id: tileConfig.id,
        representation,
        coordinates,
        chanceToMutate: tileConfig.chanceToMutate,
    };
}