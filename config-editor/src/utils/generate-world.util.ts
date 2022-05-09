import {WorldConfig} from '../models/world-config.model';
import {World} from '../models/world.model';
import {Tile} from '../models/tile.model';
import {TileConfig} from '../models/tile-config.model';
import {getTileHash} from './get-tile-hash.util';
import {WorldGeometry} from '../constants/world-geometry.model';
import {generateRandomTile} from './generate-random-tile.util';

/**
 * Generates World. Expected use case is preview of possible world for given world config.
 */
export const generateWorld = <Geometry extends WorldGeometry = WorldGeometry.UNKNOWN>(
    config: WorldConfig,
    seed: World<Geometry>['seed'],
    epoch: World<Geometry>['epoch'],
    dimensions: World<Geometry>['dimensions'],
): World<Geometry> => {
    const worldTiles: World<Geometry>['tiles'] = new Map();
    const availableTiles = config.tiles;
    const world: World<Geometry> = {
        configId: config.id,
        seed,
        epoch,
        dimensions,
        tiles: worldTiles,
        geometry: config.geometry as Geometry,
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
    if (world.geometry === WorldGeometry.HEXAGONAL) {
        const [maxX, maxY, maxZ] = world.dimensions as World<WorldGeometry.HEXAGONAL>['dimensions'];
        for (let x = 0; x < maxX; x++)
            for (let y = 0; y < maxY; y++)
                for (let z = 0; z < maxZ; z++) {
                    const newTile = generateRandomTile<WorldGeometry.HEXAGONAL>(
                        config.tiles,
                        world as World<WorldGeometry.HEXAGONAL>,
                        [x, y, z],
                    );
                    worldTiles.set(getTileHash(newTile.coordinates), newTile as Tile<Geometry>)
                }
    }

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
            return generateRandomTile(availableTileConfigs, world, []); // idk what that even would be
    }
};