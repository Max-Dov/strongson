import {World} from '@models/world.model';
import {WorldConfig} from '@models/world-config.model';
import {TileShape} from '@constants/tile-shape.enum';
import {TileHash} from '@models/tile-hash.model';
import {Tile} from '@models/tile.model';
import {Logger} from '@utils/logger.util';
import {getTileHash} from '@utils/get-tile-hash.util';
import {generateRandomTile} from '@utils/generate-random-tile.util';

export const generateWorld = <Shape extends TileShape>(
    epoch: World['epoch'],
    seed: World['seed'],
    dimensions: World<Shape>['dimensions'],
    worldConfig: WorldConfig,
): World<Shape> => {
    const tileShape = worldConfig.tileShape as Shape;
    const configId = worldConfig.id;
    const world: World<Shape> = {
        epoch,
        seed,
        dimensions,
        tileShape,
        configId,
        tiles: new Map<TileHash, Tile<Shape>>(),
    };

    Logger.info('Starting tiles generation for:', {configId, tileShape, dimensions, seed, epoch});

    if (tileShape === TileShape.HEXAGONAL) {
        world.tiles = generateHexagonalTiles(
            worldConfig,
            world as World<TileShape.HEXAGONAL>,
            epoch,
            seed,
            dimensions as World<TileShape.HEXAGONAL>['dimensions'],
        ) as World<Shape>['tiles'];
    } else {
        Logger.warning('Can not generate tiles for world with any tile shape but HEXAGONAL.');
    }

    Logger.info('Tiles generation finished', {configId});

    return world;
};

const generateHexagonalTiles = (
    worldConfig: WorldConfig,
    world: World<TileShape.HEXAGONAL>,
    epoch: World<TileShape.HEXAGONAL>['epoch'],
    seed: World<TileShape.HEXAGONAL>['seed'],
    dimensions: World<TileShape.HEXAGONAL>['dimensions'],
): World<TileShape.HEXAGONAL>['tiles'] => {
    const tiles = new Map<TileHash, Tile<TileShape.HEXAGONAL>>();
    const [xMax, yMax, zMax] = dimensions;
    for (let x = 0; x < xMax; x++)
        for (let y = 0; y < yMax; y++)
            for (let z = 0; z < zMax; z++) {
                const newTile = generateRandomTile<TileShape.HEXAGONAL>(
                    [x, y, z],
                    worldConfig.tiles,
                    world,
                );
                tiles.set(getTileHash(newTile.coordinates), newTile);
            }
    return tiles;
};
