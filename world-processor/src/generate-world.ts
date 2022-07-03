import {World} from '@models/world.model';
import {WorldConfig} from '@models/world-config.model';
import {TileShape} from '@constants/tile-shape.enum';
import {TileHash} from '@models/tile-hash.model';
import {Tile} from '@models/tile.model';
import {Logger} from '@utils/logger.util';
import {getTileHash} from '@utils/get-tile-hash.util';
import {generateRandomTile} from '@utils/generate-random-tile.util';
import {applyTileMultipliers} from '@utils/apply-tile-multipliers.util';
import {resetRng, rngInteger} from '@utils/rng.utils';

export const generateWorld = <Shape extends TileShape>(
    epoch: World['epoch'],
    seed: World['seed'],
    dimensions: World<Shape>['dimensions'],
    worldConfig: WorldConfig,
): World<Shape> => {
    resetRng();
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
    Logger.info('Generating world', {configId, tileShape, dimensions, seed, epoch});
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
        return world;
    }
    Logger.info('Tiles in world:', world.tiles.size);
    Logger.goodInfo('World successfully generated!',);
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
    const tileShape = world.tileShape;

    Logger.info('Generating coordinates');
    const coordinates = generateHexagonalCoordinates(dimensions);

    Logger.info('Shuffling coordinates');
    shuffleArray(coordinates, seed, epoch, [0, 0, 0]);

    Logger.info('Generating tiles');
    const tilesAmount: { [key in Tile['configId']]: number } = {};
    coordinates.forEach(coordinate => {
        const newTile = generateRandomTile<TileShape.HEXAGONAL>(
            coordinate,
            worldConfig.tiles,
            world,
        );
        applyTileMultipliers(newTile, world, worldConfig);
        tiles.set(getTileHash(newTile.coordinates, tileShape), newTile);

        // tracking tiles amount
        const configId = newTile.configId;
        tilesAmount[configId] = (tilesAmount[configId] || 0) + 1;
    });

    Logger.goodInfo('Tiles generated:', tilesAmount);
    return tiles;
};

const generateHexagonalCoordinates = (dimensions: World<TileShape.HEXAGONAL>['dimensions']): [number, number, number][] => {
    const [xMax, yMax, zMax] = dimensions;
    const coordinates: [number, number, number][] = [[0, 0, 0]];
    /**
     * Tiles along X axis, left and right "triangle of tiles" touching X axis.
     * And tiles on Z axis.
     */
    for (let z = 1; z < zMax; z++) {
        coordinates.push([0, 0, z]);
        for (let y = 1; y < yMax; y++)
            coordinates.push([0, y, z]);
    }

    /**
     * Tiles along Y axis, left and right "triangle of tiles" touching Y axis.
     * And tiles on X axis.
     */
    for (let x = 1; x < xMax; x++) {
        coordinates.push([x, 0, 0]);
        for (let z = 1; z < zMax; z++)
            coordinates.push([x, 0, z]);
    }

    /**
     * Tiles along Z axis, left and right "triangle of tiles" touching Z axis.
     * And tiles on Y axis.
     */
    for (let y = 1; y < yMax; y++) {
        coordinates.push([0, y, 0]);
        for (let x = 1; x < xMax; x++)
            coordinates.push([x, y, 0]);
    }
    return coordinates;
};

const shuffleArray = (array: Array<unknown>, seed: World['seed'], epoch: World['epoch'], coordinates: Tile<TileShape>['coordinates']) => {
    for (let i = 0; i < array.length - 1; i++) {
        const newPosition = rngInteger(seed, epoch, coordinates, i + 1);
        [array[i], array[newPosition]] = [array[newPosition], array[i]];
    }
};