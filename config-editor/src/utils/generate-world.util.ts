import {WorldConfig} from '../models/world-config.model';
import {World} from '../models/world.model';
import {Tile} from '../models/tile.model';
import {TileConfig} from '../models/tile-config.model';
import {getTileHash} from './get-tile-hash.util';
import {WorldGeometry} from '../constants/world-geometry.model';
import {getIsTileConfigAllowed} from './get-is-tile-config-allowed.util';
import {generateRandomTile} from './generate-random-tile.util';

/**
 * Generates World. Expected use case is preview of possible world for given world config.
 */
export const generateWorld = <Geometry extends WorldGeometry = WorldGeometry.UNKNOWN>(
    config: WorldConfig,
    seed: World<Geometry>['seed'],
    epoch: World<Geometry>['epoch'],
    dimensions: World<Geometry>['dimensions'],
): World<WorldGeometry> => {
    const worldTiles: World<Geometry>['tiles'] = new Map();
    const availableTiles = config.tiles;
    const world: World<WorldGeometry> = {
        configId: config.id,
        seed,
        epoch,
        dimensions,
        tiles: worldTiles,
        geometry: config.geometry,
    };

    if (config.geometry === WorldGeometry.UNKNOWN) { // should not happen, but theoretically can.
        return world;
    }

    /**
     * Create starting tile.
     */
    const startingTile = generateStartingTile(availableTiles, world);
    worldTiles.set(getTileHash(startingTile.coordinates), startingTile as Tile<Geometry>);

    /**
     * Iterate through every dimension and create tile for every coordinate.
     */


    return world;
};

export const generateStartingTile = (
    availableTileConfigs: TileConfig[],
    world: World<WorldGeometry>,
): Tile<WorldGeometry> => {
    switch (world.geometry) {
        case WorldGeometry.HEXAGONAL:
            return generateRandomTile(availableTileConfigs, world, [0, 0, 0]);
        default:
            return generateRandomTile(availableTileConfigs, world, []) // idk what that even would be
    }
};

/**
 * For given coordinates, create random tile.
 */
const iterateCoordinates = (coordinates: Tile['coordinates'], world: World, configTiles: WorldConfig['tiles']): Tile => {
    /**
     * To figure out what tile can exist on given coordinate, list of available TileConfigs should be obtained.
     * Expect that all TileConfigs are available, then for every config check its neighbor constraints.
     * If any constraint fails - tile should be excluded from available TileConfigs.
     */
    const availableTileConfigs = [...configTiles.values()].filter(tileConfig => getIsTileConfigAllowed(tileConfig, coordinates, world));

};