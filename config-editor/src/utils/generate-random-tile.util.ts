import {Tile} from '../models/tile.model';
import {TileConfig} from '../models/tile-config.model';
import {World} from '../models/world.model';
import {rngNumber} from './rng.util';
import {WorldGeometry} from '../constants/world-geometry.model';

/**
 * Generates random tile based on available TileConfigs. World parameters and tile coordinates are defining random config.
 */
export const generateRandomTile = <Geometry extends WorldGeometry>(
    availableTileConfigs: TileConfig[],
    world: World<Geometry>,
    coordinates: Tile<Geometry>['coordinates']
): Tile<Geometry> => {
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